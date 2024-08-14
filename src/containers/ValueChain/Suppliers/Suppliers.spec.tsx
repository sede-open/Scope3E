import {
  act,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as emissionAllocationsMocks from 'mocks/emissionAllocations';
import { formatOneDecimalPlace, formatInteger } from 'utils/number';
import * as emissionUtils from 'utils/emissions';
import { getSerialisedExpects } from 'utils/tests';
import { trackEvent } from 'utils/analytics';
import { VALUE_CHAIN_SELECT_YEAR } from 'utils/analyticsEvents';
import {
  CompanySectorType,
  EmissionAllocationDirection,
} from 'types/globalTypes';
import * as toast from 'utils/toast';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';

import valueChainNamespace from '../../../../locales/en/valueChain.json';
import commonNamespace from '../../../../locales/en/common.json';
import { IProps, Suppliers } from '.';
import * as selectors from '../selectors';
import * as yearSelectSelectors from '../YearSelect/selectors';
import { FormType } from '../types';
import { TableColumnNames } from './types';

jest.mock('effects/useAuthenticatedUser');
jest.mock('utils/analytics');

const expectedDeleteRequestSuccessToastPayload = {
  title: 'Allocation request successfully deleted',
};

const expectedDeleteRequestFailToastPayload = {
  title: 'Something went wrong',
  subtitle: "We couldn't delete the allocation request. Try again later.",
};

const setModalState = jest.fn();
const setup = (mocks: any[], overrides: Partial<IProps> = {}) => {
  const props: IProps = {
    setModalState,
    yearOptionsWithEmissionsData: [],
    ...overrides,
  };

  return render(
    <I18nProvider
      namespaces={{
        valueChain: valueChainNamespace,
        common: commonNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <Suppliers {...props} />
      </MockedProvider>
    </I18nProvider>
  );
};

const getStatusString = (status: string) =>
  valueChainNamespace[`status-${status}` as keyof typeof valueChainNamespace];

const { userCompany } = companyRelationshipsMocks;
const PREVIOUS_YEAR = 2020;
const commonMockArgs = {
  emissionAllocation:
    EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
  year: PREVIOUS_YEAR,
};

describe('Supply chain - Suppliers', () => {
  beforeAll(() => {
    resetLDMocks();
    mockFlags({ isCompanyOverviewEnabled: false });
  });
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: userCompany.id },
    }));
    jest
      .spyOn(emissionUtils, 'getEmissionYears')
      .mockImplementation(() => [
        PREVIOUS_YEAR,
        PREVIOUS_YEAR - 1,
        PREVIOUS_YEAR - 2,
      ]);
  });

  describe('when user has emissions', () => {
    it('should default to the latest emission year', async () => {
      const expectedYear = PREVIOUS_YEAR - 2;
      const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
        {
          ...commonMockArgs,
          emissionAllocations: [],
        }
      );
      const { findByTestId } = setup([mock], {
        yearOptionsWithEmissionsData: [expectedYear, expectedYear - 1],
      });

      expect(
        await findByTestId(yearSelectSelectors.yearSelect)
      ).toHaveTextContent(expectedYear.toString());
    });
  });

  describe('when user has no emissions', () => {
    it('should default to the previous year', async () => {
      const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
        {
          ...commonMockArgs,
          emissionAllocations: [],
        }
      );
      const { findByTestId } = setup([mock]);
      expect(
        await findByTestId(yearSelectSelectors.yearSelect)
      ).toHaveTextContent(PREVIOUS_YEAR.toString());
    });
  });

  describe('when there are no supplier emission allocations', () => {
    it('should display the empty view', async () => {
      const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
        {
          ...commonMockArgs,
          emissionAllocations: [],
        }
      );

      const { findByTestId } = setup([mock]);

      expect(
        await findByTestId(selectors.suppliersEmptyView)
      ).toBeInTheDocument();
    });
  });

  describe('when there are emission allocations with different statuses', () => {
    const emissionAllocations =
      emissionAllocationsMocks.emissionAllocationsAsCustomer;

    const mocks = [
      emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock({
        ...commonMockArgs,
        emissionAllocations,
      }),
    ];

    it('should sort them REQUESTED -> REQUEST_DISMISSED -> APPROVED by default', async () => {
      const { findAllByTestId } = setup(mocks);

      const allocationRows = await findAllByTestId(
        `${selectors.emissionAllocationsTable}-row`
      );

      expect(
        within(allocationRows[0]).getByText(
          emissionAllocations[1].supplier!.name
        )
      ).toBeInTheDocument();
      expect(
        within(allocationRows[1]).getByText(
          emissionAllocations[2].supplier!.name
        )
      ).toBeInTheDocument();
      expect(
        within(allocationRows[2]).getByText(
          emissionAllocations[0].supplier!.name
        )
      ).toBeInTheDocument();
    });

    describe('when status header is clicked', () => {
      it('should sort rows by status APPROVED -> REQUEST_DISMISSED -> REQUESTED', async () => {
        const { findAllByTestId, findByTestId } = setup(mocks);

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.STATUS}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.emissionAllocationsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(
              emissionAllocations[0].supplier!.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(
              emissionAllocations[2].supplier!.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(
              emissionAllocations[1].supplier!.name
            )
          ).toBeInTheDocument();
        });
      });
    });

    describe('when supplier name header is clicked', () => {
      it('should sort rows by supplier name alphabetically in an ascending order', async () => {
        const { findAllByTestId, findByTestId } = setup(mocks);

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.SUPPLIER_NAME}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.emissionAllocationsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(
              emissionAllocations[2].supplier!.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(
              emissionAllocations[1].supplier!.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(
              emissionAllocations[0].supplier!.name
            )
          ).toBeInTheDocument();
        });
      });

      describe('when supplier name header is clicked again', () => {
        it('should sort rows by supplier name alphabetically in an descending order', async () => {
          const { findAllByTestId, findByTestId } = setup(mocks);

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.SUPPLIER_NAME}`)
          );

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.SUPPLIER_NAME}`)
          );

          const allocationRows = await findAllByTestId(
            `${selectors.emissionAllocationsTable}-row`
          );

          await waitFor(() => {
            expect(
              within(allocationRows[0]).getByText(
                emissionAllocations[0].supplier!.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                emissionAllocations[1].supplier!.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                emissionAllocations[2].supplier!.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe('when category header is clicked', () => {
      it('should sort rows by category in an ascending order', async () => {
        const { findAllByTestId, findByTestId } = setup(mocks);

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.CATEGORY}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.emissionAllocationsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(
              emissionAllocations[0].supplier!.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(
              emissionAllocations[1].supplier!.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(
              emissionAllocations[2].supplier!.name
            )
          ).toBeInTheDocument();
        });
      });

      describe('when category header is clicked again', () => {
        it('should sort rows by category in an descending order', async () => {
          const { findAllByTestId, findByTestId } = setup(mocks);

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.CATEGORY}`)
          );

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.CATEGORY}`)
          );

          const allocationRows = await findAllByTestId(
            `${selectors.emissionAllocationsTable}-row`
          );

          await waitFor(() => {
            expect(
              within(allocationRows[0]).getByText(
                emissionAllocations[2].supplier!.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                emissionAllocations[1].supplier!.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                emissionAllocations[0].supplier!.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe('when emissions header is clicked', () => {
      it('should sort rows by emissions in an ascending order', async () => {
        const { findAllByTestId, findByTestId } = setup(mocks);

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.EMISSIONS}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.emissionAllocationsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(
              emissionAllocations[0].supplier!.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(
              emissionAllocations[1].supplier!.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(
              emissionAllocations[2].supplier!.name
            )
          ).toBeInTheDocument();
        });
      });

      describe('when emissions header is clicked again', () => {
        it('should sort rows by emissions in an descending order', async () => {
          const { findAllByTestId, findByTestId } = setup(mocks);

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.EMISSIONS}`)
          );

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.EMISSIONS}`)
          );

          const allocationRows = await findAllByTestId(
            `${selectors.emissionAllocationsTable}-row`
          );

          await waitFor(() => {
            expect(
              within(allocationRows[0]).getByText(
                emissionAllocations[2].supplier!.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                emissionAllocations[1].supplier!.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                emissionAllocations[0].supplier!.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });
  });

  describe('when there are approved supplier emission allocations', () => {
    const getFormattedEmissions = (emissions: number) =>
      `${formatInteger(emissions)} tCO2e`;
    const getFormattedByOneDecimalPlaceEmissions = (emissions: number) =>
      `${formatOneDecimalPlace(emissions)} tCO2e`;

    const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
      {
        ...commonMockArgs,
        emissionAllocations: [
          emissionAllocationsMocks.approvedEmissionAllocation,
          {
            ...emissionAllocationsMocks.approvedEmissionAllocation,
            emissions: 1000,
            supplier: {
              companySectors: [
                {
                  sectorType: CompanySectorType.PRIMARY,
                  sector: {
                    name: 'Package disposal',
                  },
                },
              ],
              name: 'Hermes',
              id: 'some-other-id',
            },
          },
        ],
      }
    );

    it('should correctly display in a table', async () => {
      const { findByTestId } = setup([mock]);

      const emissionAllocationsTable = await findByTestId(
        selectors.emissionAllocationsTable
      );
      const totalAllocatedCell = await findByTestId(
        selectors.totalAllocatedCell
      );

      const expects = getSerialisedExpects([
        async () =>
          expect(
            await within(emissionAllocationsTable).findByText(
              emissionAllocationsMocks.approvedEmissionAllocation.supplier!.name
            )
          ).toBeInTheDocument(),
        async () =>
          expect(
            await within(emissionAllocationsTable).findByText(
              getFormattedByOneDecimalPlaceEmissions(
                emissionAllocationsMocks.approvedEmissionAllocation!.emissions!
              )
            )
          ).toBeInTheDocument(),
        async () =>
          expect(
            await within(emissionAllocationsTable).findAllByText(
              getStatusString(
                emissionAllocationsMocks.approvedEmissionAllocation.status
              )
            )
          ).toHaveLength(2),
        async () =>
          expect(
            await within(totalAllocatedCell).findByText(
              getFormattedEmissions(
                emissionAllocationsMocks.approvedEmissionAllocation!
                  .emissions! + 1000
              )
            )
          ).toBeInTheDocument(),
      ]);

      await expects;
    });

    it('should summarise the allocations in a total row', async () => {
      const { findByTestId, findByText } = setup([mock]);

      const emissionAllocationsTable = await findByTestId(
        selectors.emissionAllocationsTable
      );

      expect(emissionAllocationsTable).toBeInTheDocument();

      expect(
        await findByText('Total estimated to', { exact: false })
      ).toHaveTextContent('Total estimated to 2 suppliers:');
    });
  });

  it('should display the YearSelect, with the previous year as its default value', async () => {
    const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
      {
        ...commonMockArgs,
        emissionAllocations: [
          emissionAllocationsMocks.approvedEmissionAllocation,
        ],
      }
    );
    const { findByTestId } = setup([mock]);

    const yearSelect = await findByTestId(yearSelectSelectors.yearSelect);
    expect(
      await within(yearSelect).findByText(String(PREVIOUS_YEAR))
    ).toBeInTheDocument();
  });

  it('should display emission allocation data for the selected year', async () => {
    const emissionAllocation2 = {
      ...emissionAllocationsMocks.approvedEmissionAllocation,
      customer: {
        ...emissionAllocationsMocks.approvedEmissionAllocation.customer,
        name: 'Last year Ltd.',
      },
    };

    const mocks = [
      emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock({
        ...commonMockArgs,
        emissionAllocations: [
          emissionAllocationsMocks.approvedEmissionAllocation,
        ],
      }),
      emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock({
        ...commonMockArgs,
        year: PREVIOUS_YEAR - 1,
        emissionAllocations: [emissionAllocation2],
      }),
      emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock({
        ...commonMockArgs,
        year: PREVIOUS_YEAR - 2,
        emissionAllocations: [],
      }),
    ];
    const { findByTestId, findByLabelText } = setup(mocks);

    const yearSelect = await findByLabelText('Year');

    expect(
      await within(
        await findByTestId(selectors.emissionAllocationsTable)
      ).findByText(
        emissionAllocationsMocks.approvedEmissionAllocation.supplier!.name
      )
    ).toBeInTheDocument();

    await act(async () => {
      await selectEvent.select(yearSelect, String(PREVIOUS_YEAR - 1));

      expect(
        await within(
          await findByTestId(selectors.emissionAllocationsTable)
        ).findByText(emissionAllocation2.supplier!.name)
      ).toBeInTheDocument();
    });

    await expect(trackEvent).toHaveBeenCalledWith(VALUE_CHAIN_SELECT_YEAR, {
      year: PREVIOUS_YEAR - 1,
    });

    await act(async () => {
      await selectEvent.select(yearSelect, String(PREVIOUS_YEAR - 2));
    });

    expect(
      await findByTestId(selectors.suppliersEmptyView)
    ).toBeInTheDocument();

    await expect(trackEvent).toHaveBeenCalledWith(VALUE_CHAIN_SELECT_YEAR, {
      year: PREVIOUS_YEAR - 2,
    });
  });

  describe('when the user has edit permission', () => {
    beforeEach(() => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          company: { id: userCompany.id },
          canEditSupplyDashboard: true,
        })
      );
    });

    it('should open request allocation modal', async () => {
      const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
        {
          ...commonMockArgs,
          emissionAllocations: [],
        }
      );
      const { findByTestId } = setup([mock]);

      await act(async () => {
        await fireEvent.click(
          await findByTestId(selectors.requestEmissionsButton)
        );
      });

      await waitFor(() => {
        expect(setModalState).toHaveBeenCalledWith({
          isOpen: true,
          formType: FormType.REQUEST_ALLOCATION,
          requestAllocationFormProps: {
            isEditing: false,
            selectedYear: commonMockArgs.year,
            allocation: undefined,
          },
        });
      });
    });

    describe('when allocation has an APPROVED status', () => {
      it('should display the "Edit" button', async () => {
        const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
          {
            ...commonMockArgs,
            emissionAllocations: [
              emissionAllocationsMocks.approvedEmissionAllocation,
            ],
          }
        );
        const { findByTestId } = setup([mock]);

        expect(
          await findByTestId(selectors.editEmissionAllocationButton)
        ).toBeInTheDocument();
      });

      describe('when the "Edit" button is clicked', () => {
        it('should display the "Edit allocation" form', async () => {
          const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
            {
              ...commonMockArgs,
              emissionAllocations: [
                emissionAllocationsMocks.approvedEmissionAllocation,
              ],
            }
          );
          const { findByTestId } = setup([mock]);

          await act(async () => {
            await fireEvent.click(
              await findByTestId(selectors.editEmissionAllocationButton)
            );
          });

          await waitFor(() => {
            expect(setModalState).toHaveBeenCalledWith({
              isOpen: true,
              formType: FormType.ACCEPT_ALLOCATION,
              acceptAllocationFormProps: {
                allocation: emissionAllocationsMocks.approvedEmissionAllocation,
                isEditing: true,
              },
            });
          });
        });
      });
    });

    describe('when allocation has an REQUEST_DISMISSED status', () => {
      it('should display the "Re-send" button', async () => {
        const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
          {
            ...commonMockArgs,
            emissionAllocations: [
              emissionAllocationsMocks.allocationRequestDismissed,
            ],
          }
        );
        const { findByTestId } = setup([mock]);

        expect(
          await findByTestId(selectors.rerequestEmissionAllocationButton)
        ).toBeInTheDocument();
      });

      describe('when the "Allocate" button is clicked', () => {
        it('should display the "Request emissions" form', async () => {
          const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
            {
              ...commonMockArgs,
              emissionAllocations: [
                emissionAllocationsMocks.allocationRequestDismissed,
              ],
            }
          );

          const { findByTestId } = setup([mock]);

          await act(async () => {
            await fireEvent.click(
              await findByTestId(selectors.rerequestEmissionAllocationButton)
            );
          });

          await waitFor(() => {
            expect(setModalState).toHaveBeenCalledWith({
              isOpen: true,
              formType: FormType.REQUEST_ALLOCATION,
              requestAllocationFormProps: {
                allocation: emissionAllocationsMocks.allocationRequestDismissed,
                isEditing: true,
                selectedYear:
                  emissionAllocationsMocks.allocationRequestDismissed.year,
              },
            });
          });
        });
      });
    });

    describe('when allocation has an REQUEST_DISMISSED status', () => {
      it('should display the "Delete" button', async () => {
        const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
          {
            ...commonMockArgs,
            emissionAllocations: [
              emissionAllocationsMocks.allocationRequestDismissed,
            ],
          }
        );
        const { findByTestId } = setup([mock]);

        expect(
          await findByTestId(selectors.deleteEmissionAllocationButton)
        ).toBeInTheDocument();
      });

      describe('when the "Delete" button is clicked', () => {
        describe('on successful deletion', () => {
          it('should should show a success toaster', async () => {
            jest.spyOn(toast, 'displaySuccessMessage');

            const initialLoadMock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
              {
                ...commonMockArgs,
                emissionAllocations: [
                  emissionAllocationsMocks.allocationRequestDismissed,
                ],
              }
            );
            const deleteMock = emissionAllocationsMocks.getAllocationRequestDeleteSuccessMock(
              {
                id: emissionAllocationsMocks.allocationRequestDismissed.id,
              }
            );

            const postDeleteMock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
              {
                ...commonMockArgs,
                emissionAllocations: [
                  emissionAllocationsMocks.allocationRequestDismissed,
                ],
              }
            );
            const { findByTestId } = setup([
              initialLoadMock,
              deleteMock,
              postDeleteMock,
            ]);

            await act(async () => {
              await fireEvent.click(
                await findByTestId(selectors.deleteEmissionAllocationButton)
              );

              await waitFor(() => {
                expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
                  expect.objectContaining(
                    expectedDeleteRequestSuccessToastPayload
                  )
                );
              });
            });
          });
        });

        describe('on failed deletion', () => {
          it('should should show an error toaster', async () => {
            jest.spyOn(toast, 'displayErrorMessage');

            const initialLoadMock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
              {
                ...commonMockArgs,
                emissionAllocations: [
                  emissionAllocationsMocks.allocationRequestDismissed,
                ],
              }
            );
            const deleteFailedMock = emissionAllocationsMocks.getAllocationRequestDeleteFailMock(
              {
                id: emissionAllocationsMocks.allocationRequestDismissed.id,
              }
            );

            const { findByTestId } = setup([initialLoadMock, deleteFailedMock]);

            await act(async () => {
              await fireEvent.click(
                await findByTestId(selectors.deleteEmissionAllocationButton)
              );

              await waitFor(() => {
                expect(toast.displayErrorMessage).toHaveBeenCalledTimes(1);
                expect(toast.displayErrorMessage).toHaveBeenCalledWith(
                  expect.objectContaining(expectedDeleteRequestFailToastPayload)
                );
              });
            });
          });
        });
      });
    });
  });

  describe('when the user does not have edit permission', () => {
    beforeEach(() => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          company: { id: userCompany.id },
          canEditSupplyDashboard: false,
        })
      );
    });

    it('should not display the "Edit" button', async () => {
      const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
        {
          ...commonMockArgs,
          emissionAllocations: [
            emissionAllocationsMocks.approvedEmissionAllocation,
          ],
        }
      );
      const { queryByTestId } = setup([mock]);

      await waitFor(() => {
        expect(
          queryByTestId(selectors.editEmissionAllocationButton)
        ).not.toBeInTheDocument();
      });
    });

    it('should not display the "Re-send" button', async () => {
      const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
        {
          ...commonMockArgs,
          emissionAllocations: [
            emissionAllocationsMocks.allocationRequestDismissed,
          ],
        }
      );
      const { queryByTestId } = setup([mock]);

      await waitFor(() => {
        expect(
          queryByTestId(selectors.rerequestEmissionAllocationButton)
        ).not.toBeInTheDocument();
      });
    });

    it('should not display the "Request data" button', async () => {
      const mock = emissionAllocationsMocks.getSupplierDashboardAllocationsForYearMock(
        {
          ...commonMockArgs,
          emissionAllocations: [],
        }
      );
      const { queryByTestId } = setup([mock]);

      await waitFor(() => {
        expect(
          queryByTestId(selectors.requestEmissionsButton)
        ).not.toBeInTheDocument();
      });
    });
  });
});
