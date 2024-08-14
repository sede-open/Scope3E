import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import * as modalFormSelectors from 'components/ModalForm/selectors';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as allocateEmissionsMocks from 'mocks/allocateEmissions';
import * as allocateEmissionsFormMocks from 'mocks/allocateEmissionsForm';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';
import { USER_COMPANY_ID } from 'mocks/constants';
import * as emissionAllocationsMocks from 'mocks/emissionAllocations';
import * as updateEmissionAllocationMocks from 'mocks/updateEmissionAllocation';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import { CorporateEmissionsQuery_corporateEmissions } from 'types/CorporateEmissionsQuery';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import {
  CompanyRelationshipType,
  EmissionAllocationDirection,
  EmissionAllocationMethod,
  EmissionAllocationStatus,
  InviteStatus,
} from 'types/globalTypes';
import * as toast from 'utils/toast';
import { v4 as uuidV4 } from 'uuid';
import { AllocateEmissionsForm } from '.';
import commonNamespace from '../../../../../locales/en/common.json';
import valueChainNamespace from '../../../../../locales/en/valueChain.json';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');
jest.mock('utils/toast');

const { externalCompany, userCompany } = companyRelationshipsMocks;
const companyRelationship = {
  id: 'some-relationship-id',
  inviteType: CompanyRelationshipType.CUSTOMER,
  status: InviteStatus.APPROVED,
  supplier: userCompany,
  customer: externalCompany,
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
    relationshipType: CompanyRelationshipType.CUSTOMER,
    relationships: [companyRelationship],
  }
);

const mockOnClose = jest.fn();
const mockOnSuccess = jest.fn();
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
        <AllocateEmissionsForm
          allocation={allocation}
          isEditing={isEditing}
          selectedYear={year}
          onClose={mockOnClose}
          onSuccess={mockOnSuccess}
          yearOptions={yearOptions}
        />
      </MockedProvider>
    </I18nProvider>
  );

const getEmissionAllocation = ({
  emissions,
  status,
}: {
  emissions: number;
  status: EmissionAllocationStatus;
}) => ({
  ...emissionAllocationsMocks.approvedEmissionAllocation,
  allocationMethod: EmissionAllocationMethod.ECONOMICAL,
  id: uuidV4(),
  emissions,
  status,
});

const selectValidValues = async (findByLabelText: any) => {
  const customerSelect = await findByLabelText('Select customer');
  await selectEvent.select(customerSelect, externalCompany.name);

  const methodSelect = await findByLabelText('Allocation method', {
    exact: false,
  });
  await selectEvent.select(methodSelect, 'Other');
};

describe('AllocateEmissionsForm', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: USER_COMPANY_ID },
      canEditSupplyDashboard: true,
    }));
    mockOnClose.mockClear();
    mockOnSuccess.mockClear();
  });

  it('should preselect the Year select value', async () => {
    const year = 2020;
    const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
      {
        emissionAllocation:
          EmissionAllocationDirection.EMISSION_ALLOCATED_TO_CUSTOMERS,
        emissionAllocations: [
          getEmissionAllocation({
            emissions: 1000,
            status: EmissionAllocationStatus.APPROVED,
          }),
        ],
        year,
      }
    );
    const { findByTestId } = setup({
      year,
      mocks: [emissionAllocationMock],
    });

    expect(
      await findByTestId(
        modalFormSelectors.getFormSelector(selectors.allocateEmissionsForm)
      )
    ).toHaveFormValues({
      year: String(year),
    });
  });

  describe('when the net unallocated emissions value is less than the entered Emissions value', () => {
    it('should display "0 tCO2e available" message and disable the submit button', async () => {
      const year = 2020;
      const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
        {
          emissionAllocation:
            EmissionAllocationDirection.EMISSION_ALLOCATED_TO_CUSTOMERS,
          emissionAllocations: [
            getEmissionAllocation({
              emissions: 1000,
              status: EmissionAllocationStatus.APPROVED,
            }),
          ],
          year,
          statuses: null,
        }
      );
      const { findByLabelText, findByTestId } = setup({
        year,
        mocks: [emissionAllocationMock],
      });

      await selectValidValues(findByLabelText);

      expect(
        await findByTestId(selectors.availableEmissionsMessage)
      ).toHaveTextContent('1,000 tCO2e available');

      expect(
        await findByTestId(selectors.allocateEmissionsSubmit)
      ).toHaveAttribute('disabled');

      const emissionsInput = await findByLabelText('Carbon emissions');

      fireEvent.change(emissionsInput, {
        target: {
          value: 999,
        },
      });

      expect(
        await findByTestId(selectors.availableEmissionsMessage)
      ).toHaveTextContent('1 tCO2e available');

      expect(
        await findByTestId(selectors.allocateEmissionsSubmit)
      ).not.toHaveAttribute('disabled');

      fireEvent.change(emissionsInput, {
        target: {
          value: 1000,
        },
      });

      expect(
        await findByTestId(selectors.availableEmissionsMessage)
      ).toHaveTextContent('0 tCO2e available');

      expect(
        await findByTestId(selectors.allocateEmissionsSubmit)
      ).not.toHaveAttribute('disabled');

      fireEvent.change(emissionsInput, {
        target: {
          value: 1001,
        },
      });

      expect(
        await findByTestId(selectors.allocateEmissionsSubmit)
      ).toHaveAttribute('disabled');
    });
  });

  describe('when in create mode', () => {
    describe('when the form is successfully submitted', () => {
      const year = 2020;
      const getSuccessMocks = () => {
        const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
          {
            emissionAllocation:
              EmissionAllocationDirection.EMISSION_ALLOCATED_TO_CUSTOMERS,
            emissionAllocations: [
              getEmissionAllocation({
                emissions: 1000,
                status: EmissionAllocationStatus.APPROVED,
              }),
            ],
            year,
          }
        );

        const createEmissionAllocationMock = allocateEmissionsMocks.getCreateEmissionAllocationMock(
          {
            allocationMethod: EmissionAllocationMethod.OTHER,
            customerId: externalCompany.id,
            supplierId: USER_COMPANY_ID,
            emissions: 999,
            supplierEmissionId: corporateEmissions[0].id,
            year,
          }
        );

        return [
          emissionAllocationMock,
          createEmissionAllocationMock,
          emissionAllocationMock,
        ];
      };

      it('should display close with success status', async () => {
        const { findByLabelText, findByTestId } = setup({
          year,
          mocks: getSuccessMocks(),
        });

        await selectValidValues(findByLabelText);

        const emissionsInput = await findByLabelText('Carbon emissions');

        fireEvent.change(emissionsInput, {
          target: {
            value: 999,
          },
        });

        const submitButton = await findByTestId(
          selectors.allocateEmissionsSubmit
        );

        await act(async () => {
          fireEvent.click(submitButton);
        });

        await waitFor(() => {
          expect(mockOnSuccess).toHaveBeenCalled();
        });
      });

      it('should close the modal', async () => {
        const { findByLabelText, findByTestId } = setup({
          year,
          mocks: getSuccessMocks(),
        });

        await selectValidValues(findByLabelText);

        const emissionsInput = await findByLabelText('Carbon emissions');

        fireEvent.change(emissionsInput, {
          target: {
            value: 999,
          },
        });

        const submitButton = await findByTestId(
          selectors.allocateEmissionsSubmit
        );

        await act(async () => {
          fireEvent.click(submitButton);

          await waitFor(() => {
            expect(mockOnSuccess).toHaveBeenCalled();
          });
        });
      });
    });

    describe('when the form submission returns an error', () => {
      const year = 2020;
      const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
        {
          emissionAllocation:
            EmissionAllocationDirection.EMISSION_ALLOCATED_TO_CUSTOMERS,
          emissionAllocations: [
            getEmissionAllocation({
              emissions: 1000,
              status: EmissionAllocationStatus.APPROVED,
            }),
          ],
          year,
        }
      );
      const createEmissionAllocationErrorMock = allocateEmissionsMocks.getCreateEmissionAllocationErrorMock(
        {
          allocationMethod: EmissionAllocationMethod.OTHER,
          customerId: externalCompany.id,
          supplierId: USER_COMPANY_ID,
          emissions: 999,
          supplierEmissionId: corporateEmissions[0].id,
          year,
        }
      );

      const getErrorMocks = () => [
        emissionAllocationMock,
        createEmissionAllocationErrorMock,
        emissionAllocationMock,
      ];

      it('should display the error displayErrorMessage toast', async () => {
        jest.spyOn(toast, 'displayErrorMessage');
        const expectedErrorToastPayload = {
          title: 'Something went wrong',
          subtitle: 'Please try again',
        };

        const { findByLabelText, findByTestId } = setup({
          year,
          mocks: getErrorMocks(),
        });

        await selectValidValues(findByLabelText);

        const emissionsInput = await findByLabelText('Carbon emissions');

        fireEvent.change(emissionsInput, {
          target: {
            value: 999,
          },
        });

        const submitButton = await findByTestId(
          selectors.allocateEmissionsSubmit
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

      it('should display the error message text in an InputError', async () => {
        jest.spyOn(toast, 'displayErrorMessage');
        const errorMocks = getErrorMocks();
        const { findByLabelText, findByTestId, getByTestId } = setup({
          year,
          mocks: errorMocks,
        });

        await selectValidValues(findByLabelText);

        const emissionsInput = await findByLabelText('Carbon emissions');

        fireEvent.change(emissionsInput, {
          target: {
            value: 999,
          },
        });

        const submitButton = await findByTestId(
          selectors.allocateEmissionsSubmit
        );

        await act(async () => {
          fireEvent.click(submitButton);

          await waitFor(() => {
            expect(
              getByTestId(selectors.allocateEmissionsApiError)
            ).toHaveTextContent(
              createEmissionAllocationErrorMock.result.errors[0].message
            );
          });
        });
      });
    });

    describe.each`
      status
      ${EmissionAllocationStatus.REQUESTED}
      ${EmissionAllocationStatus.REQUEST_DISMISSED}
    `(
      'when a customer with an existing $status allocation is selected',
      ({ status }) => {
        const year = 2020;
        const allocation = getEmissionAllocation({
          emissions: 1000,
          status,
        });

        const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
          {
            emissionAllocation:
              EmissionAllocationDirection.EMISSION_ALLOCATED_TO_CUSTOMERS,
            emissionAllocations: [allocation],
            year,
          }
        );

        describe('when the form is successfully submitted', () => {
          const getSuccessMocks = () => {
            const editEmissionAllocationMock = updateEmissionAllocationMocks.getEditEmissionAllocationMock(
              {
                allocationMethod: EmissionAllocationMethod.OTHER,
                emissions: 999,
                id: allocation.id,
                supplierEmissionId: corporateEmissions[0].id,
              }
            );

            return [
              emissionAllocationMock,
              editEmissionAllocationMock,
              emissionAllocationMock,
            ];
          };

          it('should close with success status', async () => {
            const { findByLabelText, findByTestId } = setup({
              isEditing: false,
              year,
              mocks: getSuccessMocks(),
            });

            await selectValidValues(findByLabelText);

            const customerSelect = await findByLabelText('Select customer');
            await selectEvent.select(customerSelect, allocation.customer.name);

            const emissionsInput = await findByLabelText('Carbon emissions');

            fireEvent.change(emissionsInput, {
              target: {
                value: 999,
              },
            });

            const submitButton = await findByTestId(
              selectors.allocateEmissionsSubmit
            );

            await act(async () => {
              fireEvent.click(submitButton);
            });

            await waitFor(() => {
              expect(mockOnSuccess).toHaveBeenCalled();
            });
          });
        });
      }
    );
  });

  describe('when the form is in edit mode', () => {
    const year = 2020;
    const emissionAllocationMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
      {
        emissionAllocation:
          EmissionAllocationDirection.EMISSION_ALLOCATED_TO_CUSTOMERS,
        emissionAllocations: [],
        year,
      }
    );

    it('should disable the year and customer inputs', async () => {
      const allocation = getEmissionAllocation({
        emissions: 1000,
        status: EmissionAllocationStatus.AWAITING_APPROVAL,
      });
      const { findByLabelText } = setup({
        allocation,
        isEditing: true,
        year,
        mocks: [emissionAllocationMock],
      });

      expect(await findByLabelText('Year')).toHaveAttribute('disabled');
      expect(await findByLabelText('Select customer')).toHaveAttribute(
        'disabled'
      );
    });

    it.each`
      status                                        | buttonText
      ${EmissionAllocationStatus.APPROVED}          | ${'Edit'}
      ${EmissionAllocationStatus.AWAITING_APPROVAL} | ${'Edit'}
      ${EmissionAllocationStatus.REJECTED}          | ${'Re-send'}
    `(
      'should display the "$buttonText" button when the allocation status is $status',
      async ({
        status,
        buttonText,
      }: {
        status: EmissionAllocationStatus;
        buttonText: string;
      }) => {
        const allocation = getEmissionAllocation({
          emissions: 1000,
          status,
        });
        const { findByTestId } = setup({
          allocation,
          isEditing: true,
          year,
          mocks: [emissionAllocationMock],
        });
        expect(
          await findByTestId(selectors.allocateEmissionsSubmit)
        ).toHaveTextContent(buttonText);
      }
    );

    describe('when the form is successfully submitted', () => {
      const allocation = getEmissionAllocation({
        emissions: 1000,
        status: EmissionAllocationStatus.AWAITING_APPROVAL,
      });
      const getSuccessMocks = () => {
        const editEmissionAllocationMock = updateEmissionAllocationMocks.getEditEmissionAllocationMock(
          {
            allocationMethod: EmissionAllocationMethod.OTHER,
            emissions: 999,
            id: allocation.id,
            supplierEmissionId: corporateEmissions[0].id,
          }
        );

        return [
          emissionAllocationMock,
          editEmissionAllocationMock,
          emissionAllocationMock,
        ];
      };

      it('should close with success status', async () => {
        const { findByLabelText, findByTestId } = setup({
          allocation,
          isEditing: true,
          year,
          mocks: getSuccessMocks(),
        });

        const emissionsInput = await findByLabelText('Carbon emissions');
        await act(async () => {
          await fireEvent.change(emissionsInput, {
            target: {
              value: 999,
            },
          });
        });

        const methodSelect = await findByLabelText('Allocation method', {
          exact: false,
        });
        await act(async () => {
          await selectEvent.select(methodSelect, 'Other');
        });

        const submitButton = await findByTestId(
          selectors.allocateEmissionsSubmit
        );

        await act(async () => {
          fireEvent.click(submitButton);
        });

        await waitFor(() => {
          expect(mockOnSuccess).toHaveBeenCalled();
        });
      });
    });
  });
});
