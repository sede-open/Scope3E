import { fireEvent, act, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import { v4 as uuidV4 } from 'uuid';
import selectEvent from 'react-select-event';

import * as toast from 'utils/toast';
import {
  CompanyRelationshipType,
  EmissionAllocationDirection,
  EmissionAllocationMethod,
  EmissionAllocationStatus,
  InviteStatus,
} from 'types/globalTypes';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { USER_COMPANY_ID } from 'mocks/constants';
import * as emissionAllocationsMocks from 'mocks/emissionAllocations';
import * as allocateEmissionsMocks from 'mocks/allocateEmissions';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';
import * as allocateEmissionsFormMocks from 'mocks/allocateEmissionsForm';
import * as updateEmissionAllocationMocks from 'mocks/updateEmissionAllocation';
import { CorporateEmissionsQuery_corporateEmissions } from 'types/CorporateEmissionsQuery';
import * as modalFormSelectors from 'components/ModalForm/selectors';
import valueChainNamespace from '../../../../../locales/en/valueChain.json';
import commonNamespace from '../../../../../locales/en/common.json';
import { RequestAllocationForm } from '.';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');
jest.mock('utils/toast');

const { externalCompany, userCompany } = companyRelationshipsMocks;
const companyRelationship = {
  id: 'some-relationship-id',
  inviteType: CompanyRelationshipType.SUPPLIER,
  status: InviteStatus.APPROVED,
  supplier: externalCompany,
  customer: userCompany,
  note: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const defaultYearOptions = [2020, 2019, 2018, 2017];

const corporateEmissions: CorporateEmissionsQuery_corporateEmissions[] = [
  {
    id: 'emission-0',
    scope1: 1000,
    scope2: 1000,
    scope3: 1000,
    offset: 1000,
    year: defaultYearOptions[0],
  },
];

const allocateEmissionsFormMock = allocateEmissionsFormMocks.getAllocateEmissionsFormMock(
  {
    corporateEmissions,
    relationshipType: CompanyRelationshipType.SUPPLIER,
    relationships: [companyRelationship],
  }
);

const mockOnClose = jest.fn();
const setup = ({
  allocation = undefined,
  isEditing = false,
  mocks,
  year,
  yearOptions = defaultYearOptions,
}: {
  allocation?: EmissionAllocationsQuery_emissionAllocations;
  isEditing?: boolean;
  mocks: any[];
  year: number;
  yearOptions?: number[];
}) =>
  render(
    <I18nProvider
      namespaces={{
        valueChain: valueChainNamespace,
        common: commonNamespace,
      }}
    >
      <MockedProvider
        mocks={[allocateEmissionsFormMock, ...mocks]}
        addTypename={false}
      >
        <RequestAllocationForm
          allocation={allocation}
          isEditing={isEditing}
          selectedYear={year}
          onClose={mockOnClose}
          yearOptions={yearOptions}
        />
      </MockedProvider>
    </I18nProvider>
  );

const getEmissionAllocation = ({
  emissions,
  status,
}: {
  status: EmissionAllocationStatus;
  emissions?: number;
}) => ({
  ...emissionAllocationsMocks.approvedEmissionAllocation,
  allocationMethod: EmissionAllocationMethod.ECONOMICAL,
  id: uuidV4(),
  emissions:
    emissions ?? emissionAllocationsMocks.approvedEmissionAllocation.emissions,
  status,
});

const getApprovedErrorMessage = (errorYear: number) =>
  `This company already sent you emissions for ${errorYear}. You can see the allocation information in the 'Estimated by suppliers' tab`;
const getApprovalPendingErrorMessage = (errorYear: number) =>
  `This company already sent you emissions for ${errorYear}, go to 'Pending request' tab to link or dismiss.`;

describe('RequestAllocationForm', () => {
  const year = 2020;

  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: USER_COMPANY_ID },
      canEditSupplyDashboard: true,
    }));
  });

  it('should preselect the Year select value', async () => {
    const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
      {
        emissionAllocation:
          EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
        emissionAllocations: [],
        year,
      }
    );
    const { findByTestId } = setup({
      year,
      mocks: [emissionAllocationMock],
    });

    expect(
      await findByTestId(
        modalFormSelectors.getFormSelector(selectors.requestEmissionsForm)
      )
    ).toHaveFormValues({
      year: String(year),
    });
  });

  describe('when the form is in create mode', () => {
    describe('when a year other than default is selected', () => {
      describe.each`
        status                                        | getErrorMessage
        ${EmissionAllocationStatus.APPROVED}          | ${getApprovedErrorMessage}
        ${EmissionAllocationStatus.AWAITING_APPROVAL} | ${getApprovalPendingErrorMessage}
      `(
        'when a supplier with an existing $status allocation is selected',
        ({ status, getErrorMessage }) => {
          it('should display a supplier field error', async () => {
            const selectYear = 2018;
            const allocatioEmptyMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
              {
                emissionAllocation:
                  EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
                emissionAllocations: [],
                year,
                statuses: null,
              }
            );
            const allocatioMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
              {
                emissionAllocation:
                  EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
                emissionAllocations: [
                  emissionAllocationsMocks.getEmissionAllocation({
                    status,
                    as: 'customer',
                  }),
                ],
                year: selectYear,
                statuses: null,
              }
            );

            const {
              findByTestId,
              findByLabelText,
              getByTestId,
              queryByTestId,
            } = setup({
              year,
              mocks: [allocatioEmptyMock, allocatioMock],
            });

            expect(
              await findByTestId(selectors.requestEmissionsForm)
            ).toBeInTheDocument();

            const supplierSelect = await findByLabelText('Select supplier');
            await selectEvent.select(supplierSelect, externalCompany.name);

            await waitFor(() => {
              expect(
                queryByTestId(
                  `${selectors.requestEmissionsSupplierInput}-error`
                )
              ).toBeNull();
            });

            // re-select year
            const yearSelect = await findByLabelText('Year');
            await selectEvent.select(yearSelect, selectYear.toString());

            await waitFor(() => {
              const supplierError = getByTestId(
                `${selectors.requestEmissionsSupplierInput}-error`
              );
              expect(supplierError).toHaveTextContent(
                getErrorMessage(selectYear)
              );
            });
          });
        }
      );
    });

    describe.each`
      status                                        | errorMessageGetter
      ${EmissionAllocationStatus.APPROVED}          | ${getApprovedErrorMessage}
      ${EmissionAllocationStatus.AWAITING_APPROVAL} | ${getApprovalPendingErrorMessage}
    `(
      'when a supplier with an existing $status allocation is selected',
      ({ status, errorMessageGetter }) => {
        const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
          {
            emissionAllocation:
              EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
            emissionAllocations: [
              emissionAllocationsMocks.getEmissionAllocation({
                status,
                year,
                as: 'customer',
              }),
            ],
            year,
            statuses: null,
          }
        );

        it('should display a supplier field error', async () => {
          const { findByTestId, findByLabelText, getByTestId } = setup({
            year,
            mocks: [emissionAllocationMock],
          });

          expect(
            await findByTestId(selectors.requestEmissionsForm)
          ).toBeInTheDocument();

          const supplierSelect = await findByLabelText('Select supplier');
          await selectEvent.select(supplierSelect, externalCompany.name);

          await waitFor(() => {
            const supplierError = getByTestId(
              `${selectors.requestEmissionsSupplierInput}-error`
            );
            expect(supplierError).toHaveTextContent(errorMessageGetter(year));
          });
        });

        describe('when a different year is selected with no allocations', () => {
          it('should clear the error message', async () => {
            const selectYear = year - 1;
            const emissionAllocationEmptyMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
              {
                emissionAllocation:
                  EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
                emissionAllocations: [],
                year: selectYear,
                statuses: null,
              }
            );

            const {
              findByTestId,
              findByLabelText,
              getByTestId,
              queryByTestId,
            } = setup({
              year,
              mocks: [emissionAllocationMock, emissionAllocationEmptyMock],
            });

            expect(
              await findByTestId(selectors.requestEmissionsForm)
            ).toBeInTheDocument();

            const supplierSelect = await findByLabelText('Select supplier');
            await selectEvent.select(supplierSelect, externalCompany.name);

            await waitFor(() => {
              const supplierError = getByTestId(
                `${selectors.requestEmissionsSupplierInput}-error`
              );
              expect(supplierError).toHaveTextContent(errorMessageGetter(year));
            });

            // select a different year
            const yearSelect = await findByLabelText('Year');
            await selectEvent.select(yearSelect, selectYear.toString());

            await waitFor(() => {
              expect(
                queryByTestId(
                  `${selectors.requestEmissionsSupplierInput}-error`
                )
              ).toBeNull();
            });
          });
        });

        describe('when a different year is selected with an existing allocation', () => {
          it('should display error message with the new year', async () => {
            const selectYear = year - 1;
            const emissionAllocationMockForSelectYear = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
              {
                emissionAllocation:
                  EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
                emissionAllocations: [
                  emissionAllocationsMocks.getEmissionAllocation({
                    status,
                    year: selectYear,
                    as: 'customer',
                  }),
                ],
                year: selectYear,
                statuses: null,
              }
            );

            const { findByTestId, findByLabelText, getByTestId } = setup({
              year,
              mocks: [
                emissionAllocationMock,
                emissionAllocationMockForSelectYear,
              ],
            });

            expect(
              await findByTestId(selectors.requestEmissionsForm)
            ).toBeInTheDocument();

            const supplierSelect = await findByLabelText('Select supplier');
            await selectEvent.select(supplierSelect, externalCompany.name);

            await waitFor(() => {
              const supplierError = getByTestId(
                `${selectors.requestEmissionsSupplierInput}-error`
              );
              expect(supplierError).toHaveTextContent(errorMessageGetter(year));
            });

            // select a different year
            const yearSelect = await findByLabelText('Year');
            await selectEvent.select(yearSelect, selectYear.toString());

            await waitFor(() => {
              const supplierError = getByTestId(
                `${selectors.requestEmissionsSupplierInput}-error`
              );
              expect(supplierError).toHaveTextContent(
                errorMessageGetter(selectYear)
              );
            });
          });
        });
      }
    );

    describe.each`
      status
      ${EmissionAllocationStatus.REJECTED}
      ${EmissionAllocationStatus.REQUESTED}
      ${EmissionAllocationStatus.REQUEST_DISMISSED}
    `(
      'when a supplier with an existing $status allocation is selected',
      ({ status }: { status: EmissionAllocationStatus }) => {
        describe('when form is successfully submitted', () => {
          const allocation = emissionAllocationsMocks.getEmissionAllocation({
            status,
            as: 'customer',
          });

          const getSuccessMocks = () => {
            const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
              {
                emissionAllocation:
                  EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
                emissionAllocations: [
                  emissionAllocationsMocks.getEmissionAllocation({
                    status,
                    as: 'customer',
                  }),
                ],
                year,
                statuses: null,
              }
            );

            const editEmissionAllocationMock = updateEmissionAllocationMocks.getEditEmissionAllocationMock(
              {
                id: allocation.id,
                customerEmissionId: corporateEmissions[0].id,
                status: EmissionAllocationStatus.REQUESTED,
                note: '',
              }
            );

            return [
              emissionAllocationMock,
              editEmissionAllocationMock,
              emissionAllocationMock,
            ];
          };

          it('should trigger success notification', async () => {
            jest.spyOn(toast, 'displaySuccessMessage');
            const expectedSuccessToastPayload = {
              title: 'Request successfully sent',
              subtitle:
                'You will receive an email when they send their emission details',
            };

            const { findByTestId, findByLabelText } = setup({
              year,
              mocks: getSuccessMocks(),
            });
            expect(
              await findByTestId(selectors.requestEmissionsForm)
            ).toBeInTheDocument();
            const supplierSelect = await findByLabelText('Select supplier');
            await selectEvent.select(supplierSelect, externalCompany.name);

            const submitButton = await findByTestId(
              selectors.requestEmissionsSubmit
            );

            await act(async () => {
              fireEvent.click(submitButton);
            });

            await waitFor(() => {
              expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
                expectedSuccessToastPayload
              );
            });
          });
        });

        describe('when form submission returns an error', () => {
          const allocation = emissionAllocationsMocks.getEmissionAllocation({
            status,
            as: 'customer',
          });

          const getErrorMocks = () => {
            const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
              {
                emissionAllocation:
                  EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
                emissionAllocations: [
                  emissionAllocationsMocks.getEmissionAllocation({
                    status,
                    as: 'customer',
                  }),
                ],
                year,
                statuses: null,
              }
            );

            const editEmissionAllocationErrorMock = updateEmissionAllocationMocks.getEditEmissionAllocationMockError(
              {
                id: allocation.id,
                customerEmissionId: corporateEmissions[0].id,
                status: EmissionAllocationStatus.REQUESTED,
                note: '',
              }
            );

            return [
              emissionAllocationMock,
              editEmissionAllocationErrorMock,
              emissionAllocationMock,
            ];
          };

          it('should trigger an error notification', async () => {
            jest.spyOn(toast, 'displayErrorMessage');
            const expectedErrorToastPayload = {
              title: 'Something went wrong',
              subtitle: "We couldn't process the request. Try again later.",
            };

            const { findByTestId, findByLabelText } = setup({
              year,
              mocks: getErrorMocks(), // error mocks
            });
            expect(
              await findByTestId(selectors.requestEmissionsForm)
            ).toBeInTheDocument();
            const supplierSelect = await findByLabelText('Select supplier');
            await selectEvent.select(supplierSelect, externalCompany.name);

            const submitButton = await findByTestId(
              selectors.requestEmissionsSubmit
            );

            await act(async () => {
              fireEvent.click(submitButton);
            });

            await waitFor(() => {
              expect(toast.displayErrorMessage).toHaveBeenCalledWith(
                expectedErrorToastPayload
              );
            });
          });
        });
      }
    );

    describe('when a supplier with no existing allocation is selected', () => {
      describe('when form is successfully submitted', () => {
        const allocation = emissionAllocationsMocks.getEmissionAllocation({
          as: 'customer',
        });

        const getSuccessMocks = () => {
          const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
            {
              emissionAllocation:
                EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
              emissionAllocations: [],
              year,
              statuses: null,
            }
          );

          const createEmissionAllocationMock = allocateEmissionsMocks.getCreateEmissionAllocationMock(
            {
              customerEmissionId: corporateEmissions[0].id,
              year: allocation.year,
              note: '',
              customerId: allocation.customer.id,
              supplierId: allocation.supplier!.id,
            }
          );

          return [
            emissionAllocationMock,
            createEmissionAllocationMock,
            emissionAllocationMock,
          ];
        };

        it('should show a success toaster', async () => {
          jest.spyOn(toast, 'displaySuccessMessage');
          const expectedSuccessToastPayload = {
            title: 'Request successfully sent',
            subtitle:
              'You will receive an email when they send their emission details',
          };

          const { findByTestId, findByLabelText } = setup({
            year,
            mocks: getSuccessMocks(),
          });
          expect(
            await findByTestId(selectors.requestEmissionsForm)
          ).toBeInTheDocument();
          const supplierSelect = await findByLabelText('Select supplier');
          await selectEvent.select(supplierSelect, externalCompany.name);

          const submitButton = await findByTestId(
            selectors.requestEmissionsSubmit
          );

          await act(async () => {
            fireEvent.click(submitButton);
          });

          await waitFor(() => {
            expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
              expectedSuccessToastPayload
            );
          });
        });
      });

      describe('when form is submitted unsuccessfully', () => {
        const allocation = emissionAllocationsMocks.getEmissionAllocation({
          as: 'customer',
        });

        const getErrorMocks = () => {
          const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
            {
              emissionAllocation:
                EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
              emissionAllocations: [],
              year,
              statuses: null,
            }
          );

          const createEmissionAllocationMockError = allocateEmissionsMocks.getCreateEmissionAllocationErrorMock(
            {
              customerEmissionId: corporateEmissions[0].id,
              year: allocation.year,
              note: '',
              customerId: allocation.customer.id,
              supplierId: allocation.supplier!.id,
            }
          );

          return [
            emissionAllocationMock,
            createEmissionAllocationMockError,
            emissionAllocationMock,
          ];
        };

        it('should show a error toaster', async () => {
          jest.spyOn(toast, 'displayErrorMessage');
          const expectedErrorToastPayload = {
            title: 'Something went wrong',
            subtitle: "We couldn't process the request. Try again later.",
          };

          const { findByTestId, findByLabelText } = setup({
            year,
            mocks: getErrorMocks(),
          });
          expect(
            await findByTestId(selectors.requestEmissionsForm)
          ).toBeInTheDocument();
          const supplierSelect = await findByLabelText('Select supplier');
          await selectEvent.select(supplierSelect, externalCompany.name);

          const submitButton = await findByTestId(
            selectors.requestEmissionsSubmit
          );

          await act(async () => {
            fireEvent.click(submitButton);
          });

          await waitFor(() => {
            expect(toast.displayErrorMessage).toHaveBeenCalledWith(
              expectedErrorToastPayload
            );
          });
        });
      });
    });
  });

  describe('when the form is in edit mode', () => {
    const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
      {
        emissionAllocation:
          EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
        emissionAllocations: [],
        year,
      }
    );
    const note = 'Hello thee';

    it('should disable the year and supplier inputs', async () => {
      const allocation = getEmissionAllocation({
        status: EmissionAllocationStatus.REQUEST_DISMISSED,
      });
      const { findByLabelText } = setup({
        allocation,
        isEditing: true,
        year,
        mocks: [emissionAllocationMock],
      });

      expect(await findByLabelText('Year')).toHaveAttribute('disabled');
      expect(await findByLabelText('Select supplier')).toHaveAttribute(
        'disabled'
      );
    });

    describe('when the form is successfully submitted', () => {
      const allocation = getEmissionAllocation({
        status: EmissionAllocationStatus.REQUEST_DISMISSED,
      });
      const getSuccessMocks = () => {
        const editEmissionAllocationMock = updateEmissionAllocationMocks.getEditEmissionAllocationMock(
          {
            id: allocation.id,
            customerEmissionId: corporateEmissions[0].id,
            status: EmissionAllocationStatus.REQUESTED,
            note,
          }
        );

        return [
          emissionAllocationMock,
          editEmissionAllocationMock,
          emissionAllocationMock,
        ];
      };

      it('should display the success toast message', async () => {
        jest.spyOn(toast, 'displaySuccessMessage');
        const expectedSuccessToastPayload = {
          title: 'Request successfully sent',
          subtitle:
            'You will receive an email when they send their emission details',
        };

        const { findByTestId } = setup({
          allocation,
          isEditing: true,
          year,
          mocks: getSuccessMocks(),
        });

        const noteTextarea = await findByTestId(
          `${selectors.requestEmissionsNote}-input`
        );
        fireEvent.change(noteTextarea, {
          target: {
            value: note,
          },
        });

        const submitButton = await findByTestId(
          selectors.requestEmissionsSubmit
        );

        await act(async () => {
          fireEvent.click(submitButton);
        });

        await waitFor(() => {
          expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
            expectedSuccessToastPayload
          );
        });
      });
    });

    describe('when the form is unsuccessfully submitted', () => {
      const allocation = getEmissionAllocation({
        status: EmissionAllocationStatus.REQUEST_DISMISSED,
      });
      const getErrorMocks = () => {
        const editEmissionAllocationMock = updateEmissionAllocationMocks.getEditEmissionAllocationMockError(
          {
            id: allocation.id,
            status: EmissionAllocationStatus.REQUESTED,
            note,
          }
        );

        return [
          emissionAllocationMock,
          editEmissionAllocationMock,
          emissionAllocationMock,
        ];
      };

      it('should display the error toast message', async () => {
        jest.spyOn(toast, 'displaySuccessMessage');
        const expectedErrorToastPayload = {
          title: 'Something went wrong',
          subtitle: "We couldn't process the request. Try again later.",
        };

        const { findByTestId } = setup({
          allocation,
          isEditing: true,
          year,
          mocks: getErrorMocks(),
        });

        const noteTextarea = await findByTestId(
          `${selectors.requestEmissionsNote}-input`
        );
        fireEvent.change(noteTextarea, {
          target: {
            value: note,
          },
        });

        const submitButton = await findByTestId(
          selectors.requestEmissionsSubmit
        );

        await act(async () => {
          fireEvent.click(submitButton);
        });

        await waitFor(() => {
          expect(toast.displayErrorMessage).toHaveBeenCalledWith(
            expectedErrorToastPayload
          );
        });
      });
    });
  });
});
