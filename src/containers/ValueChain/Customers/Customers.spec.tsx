import { MockedProvider } from '@apollo/client/testing';
import {
  act,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';
import * as corporateEmissionsMocks from 'mocks/corporateEmissions';
import * as emissionAllocationsMocks from 'mocks/emissionAllocations';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';
import { CorporateEmissionsQuery_corporateEmissions } from 'types/CorporateEmissionsQuery';
import {
  CompanyRelationshipType,
  CompanySectorType,
  EmissionAllocationDirection,
  EmissionAllocationMethod,
  EmissionAllocationStatus,
  InviteStatus,
} from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import { VALUE_CHAIN_SELECT_YEAR } from 'utils/analyticsEvents';
import { formatInteger, formatOneDecimalPlace } from 'utils/number';
import { getSerialisedExpects } from 'utils/tests';
import { Customers } from '.';
import commonNamespace from '../../../../locales/en/common.json';
import valueChainNamespace from '../../../../locales/en/valueChain.json';
import * as selectors from '../selectors';
import { FormType } from '../types';
import * as yearSelectSelectors from '../YearSelect/selectors';
import { TableColumnNames } from './types';

jest.mock('effects/useAuthenticatedUser');
jest.mock('utils/analytics');

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

const companySectors = [
  {
    sector: { name: 'Dog walking' },
    sectorType: CompanySectorType.PRIMARY,
  },
];

const companyRelationshipsMock = companyRelationshipsMocks.getCompanyRelationshipsMock(
  CompanyRelationshipType.CUSTOMER,
  [companyRelationship]
);

const setModalState = jest.fn();
const defaultYearOptions = [2020, 2019, 2018, 2017];

const corporateEmissions: CorporateEmissionsQuery_corporateEmissions[] = [
  {
    id: 'emission-0',
    scope1: 123,
    scope2: 123,
    scope3: 123,
    offset: 0,
    year: defaultYearOptions[0],
  },
];

const setup = ({
  yearOptions = defaultYearOptions,
  mocks,
}: {
  yearOptions?: number[];
  mocks: any[];
}) =>
  render(
    <I18nProvider
      namespaces={{
        valueChain: valueChainNamespace,
        common: commonNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <Customers setModalState={setModalState} yearOptions={yearOptions} />
      </MockedProvider>
    </I18nProvider>
  );

const getStatusString = (status: string) =>
  valueChainNamespace[`status-${status}` as keyof typeof valueChainNamespace];
const getAllocationMethodString = (status: string) =>
  valueChainNamespace[
    `allocation-method-${status}` as keyof typeof valueChainNamespace
  ];
const getFormattedEmissions = (emissions: number) =>
  `${formatInteger(emissions)} tCO2e`;
const getFormattedByOneDecimalPlaceEmissions = (emissions: number) =>
  `${formatOneDecimalPlace(emissions)} tCO2e`;

const commonMockArgs = {
  statuses: [
    EmissionAllocationStatus.REJECTED,
    EmissionAllocationStatus.APPROVED,
    EmissionAllocationStatus.AWAITING_APPROVAL,
  ],
  emissionAllocation:
    EmissionAllocationDirection.EMISSION_ALLOCATED_TO_CUSTOMERS,
  year: defaultYearOptions[0],
};
const getEmissionAllocation = (status: EmissionAllocationStatus) => ({
  ...emissionAllocationsMocks.approvedEmissionAllocation,
  allocationMethod: EmissionAllocationMethod.ECONOMICAL,
  id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCB5',
  emissions: 100,
  status,
});

describe('Supply chain - Customers', () => {
  beforeAll(() => {
    resetLDMocks();
    mockFlags({ isCompanyOverviewEnabled: false });
  });
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      company: { id: userCompany.id },
    }));
  });

  describe('when there are no customer emission allocations', () => {
    it('should display the empty view', async () => {
      const mock = emissionAllocationsMocks.getEmissionAllocationsForYearMock({
        ...commonMockArgs,
        emissionAllocations: [],
      });

      const { findByTestId } = setup({ mocks: [mock] });

      expect(
        await findByTestId(selectors.customersEmptyView)
      ).toBeInTheDocument();
    });
  });

  describe('when there are emission allocations with different statuses', () => {
    const emissionAllocations =
      emissionAllocationsMocks.emissionAllocationsAsSupplier;

    const mocks = [
      emissionAllocationsMocks.getEmissionAllocationsForYearMock({
        ...commonMockArgs,
        emissionAllocations,
      }),
      corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
    ];

    it('should sort them AWAITING_APPROVAL -> REJECTED -> APPROVED by default', async () => {
      const { findAllByTestId } = setup({ mocks });
      const allocationRows = await findAllByTestId(
        `${selectors.emissionAllocationsTable}-row`
      );

      expect(
        within(allocationRows[0]).getByText(
          emissionAllocations[2].customer.name
        )
      ).toBeInTheDocument();
      expect(
        within(allocationRows[1]).getByText(
          emissionAllocations[1].customer.name
        )
      ).toBeInTheDocument();
      expect(
        within(allocationRows[2]).getByText(
          emissionAllocations[0].customer.name
        )
      ).toBeInTheDocument();
    });

    describe('when status header is clicked', () => {
      it('should sort rows by status APPROVED -> REJECTED -> REQUESTED -> AWAITING_APPROVAL', async () => {
        const { findAllByTestId, findByTestId } = setup({ mocks });

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.STATUS}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.emissionAllocationsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(
              emissionAllocations[0].customer.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(
              emissionAllocations[1].customer.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(
              emissionAllocations[2].customer.name
            )
          ).toBeInTheDocument();
        });
      });
    });

    describe('when customer name header is clicked', () => {
      it('should sort rows by customer name alphabetically in an ascending order', async () => {
        const { findAllByTestId, findByTestId } = setup({ mocks });

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.CUSTOMER_NAME}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.emissionAllocationsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(
              emissionAllocations[2].customer.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(
              emissionAllocations[1].customer.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(
              emissionAllocations[0].customer.name
            )
          ).toBeInTheDocument();
        });
      });

      describe('when customer name header is clicked again', () => {
        it('should sort rows by customer name alphabetically in an descending order', async () => {
          const { findAllByTestId, findByTestId } = setup({ mocks });

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.CUSTOMER_NAME}`)
          );

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.CUSTOMER_NAME}`)
          );

          const allocationRows = await findAllByTestId(
            `${selectors.emissionAllocationsTable}-row`
          );

          await waitFor(() => {
            expect(
              within(allocationRows[0]).getByText(
                emissionAllocations[0].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                emissionAllocations[1].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                emissionAllocations[2].customer.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe('when allocation method header is clicked', () => {
      it('should sort rows by allocation method alphabetically in an ascending order', async () => {
        const { findAllByTestId, findByTestId } = setup({ mocks });

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.ALLOCATION_METHOD}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.emissionAllocationsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(
              emissionAllocations[2].customer.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(
              emissionAllocations[0].customer.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(
              emissionAllocations[1].customer.name
            )
          ).toBeInTheDocument();
        });
      });

      describe('when allocation method header is clicked again', () => {
        it('should sort rows by allocation method alphabetically in an descending order', async () => {
          const { findAllByTestId, findByTestId } = setup({ mocks });

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.ALLOCATION_METHOD}`)
          );

          fireEvent.click(
            await findByTestId(`header-${TableColumnNames.ALLOCATION_METHOD}`)
          );

          const allocationRows = await findAllByTestId(
            `${selectors.emissionAllocationsTable}-row`
          );

          await waitFor(() => {
            expect(
              within(allocationRows[0]).getByText(
                emissionAllocations[1].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                emissionAllocations[0].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                emissionAllocations[2].customer.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });

    describe('when emissions header is clicked', () => {
      it('should sort rows by emissions in an ascending order', async () => {
        const { findAllByTestId, findByTestId } = setup({ mocks });

        fireEvent.click(
          await findByTestId(`header-${TableColumnNames.EMISSIONS}`)
        );

        const allocationRows = await findAllByTestId(
          `${selectors.emissionAllocationsTable}-row`
        );

        await waitFor(() => {
          expect(
            within(allocationRows[0]).getByText(
              emissionAllocations[0].customer.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[1]).getByText(
              emissionAllocations[1].customer.name
            )
          ).toBeInTheDocument();
          expect(
            within(allocationRows[2]).getByText(
              emissionAllocations[2].customer.name
            )
          ).toBeInTheDocument();
        });
      });

      describe('when emissions header is clicked again', () => {
        it('should sort rows by emissions in an descending order', async () => {
          const { findAllByTestId, findByTestId } = setup({ mocks });

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
                emissionAllocations[2].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[1]).getByText(
                emissionAllocations[1].customer.name
              )
            ).toBeInTheDocument();
            expect(
              within(allocationRows[2]).getByText(
                emissionAllocations[0].customer.name
              )
            ).toBeInTheDocument();
          });
        });
      });
    });
  });

  describe.each`
    status
    ${EmissionAllocationStatus.APPROVED}
    ${EmissionAllocationStatus.REJECTED}
    ${EmissionAllocationStatus.REQUESTED}
    ${EmissionAllocationStatus.AWAITING_APPROVAL}
  `(
    'when there are $status customer emission allocations',
    ({ status }: { status: EmissionAllocationStatus }) => {
      const emissionAllocation = getEmissionAllocation(status);

      it('should correctly display in a table', async () => {
        const mocks = [
          emissionAllocationsMocks.getEmissionAllocationsForYearMock({
            ...commonMockArgs,
            emissionAllocations: [
              emissionAllocation,
              {
                ...emissionAllocation,
                customer: {
                  id: 'some-other-id',
                  name: 'Google',
                  companySectors,
                },
                emissions: 1000,
                allocationMethod: EmissionAllocationMethod.OTHER,
              },
            ],
          }),
          corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
        ];
        const { findByTestId } = setup({ mocks });

        const emissionAllocationsTable = await findByTestId(
          selectors.emissionAllocationsTable
        );

        const expects = getSerialisedExpects([
          async () =>
            expect(
              await within(emissionAllocationsTable).findByText(
                emissionAllocation.customer.name
              )
            ).toBeInTheDocument(),
          async () =>
            expect(
              await within(emissionAllocationsTable).findByText(
                getAllocationMethodString(emissionAllocation.allocationMethod)
              )
            ).toBeInTheDocument(),
          async () =>
            expect(
              await within(emissionAllocationsTable).findByText(
                getFormattedByOneDecimalPlaceEmissions(
                  emissionAllocation.emissions
                )
              )
            ).toBeInTheDocument(),
          async () =>
            expect(
              await within(emissionAllocationsTable).findAllByText(
                getStatusString(emissionAllocation.status)
              )
            ).toHaveLength(2),
        ]);

        await expects;
      });
    }
  );

  it('should display the total approved allocated emissions', async () => {
    const emissionAllocation = getEmissionAllocation(
      EmissionAllocationStatus.APPROVED
    );

    const mocks = [
      emissionAllocationsMocks.getEmissionAllocationsForYearMock({
        ...commonMockArgs,
        emissionAllocations: [
          emissionAllocation,
          {
            ...emissionAllocation,
            customer: {
              id: 'some-other-id',
              name: 'Google',
              companySectors,
            },
            emissions: 100,
            allocationMethod: EmissionAllocationMethod.OTHER,
          },
        ],
      }),
      corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
    ];
    const { findByTestId } = setup({ mocks });

    const totalAllocatedCell = await findByTestId(selectors.totalAllocatedCell);

    expect(
      await within(totalAllocatedCell).findByText(
        getFormattedEmissions(emissionAllocation.emissions + 100)
      )
    ).toBeInTheDocument();

    expect(
      await within(totalAllocatedCell).queryByTestId(
        selectors.totalAllocatedOverAllocatedMessage
      )
    ).not.toBeInTheDocument();
  });

  describe('when more emissions have been allocated than are available', () => {
    it('should display the over-allocated message', async () => {
      const emissionAllocation = getEmissionAllocation(
        EmissionAllocationStatus.APPROVED
      );

      const mocks = [
        emissionAllocationsMocks.getEmissionAllocationsForYearMock({
          ...commonMockArgs,
          emissionAllocations: [
            emissionAllocation,
            {
              ...emissionAllocation,
              customer: {
                id: 'some-other-id',
                companySectors,
                name: 'Google',
              },
              emissions: 1000,
              allocationMethod: EmissionAllocationMethod.OTHER,
            },
          ],
        }),
        corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
      ];
      const { findByTestId } = setup({ mocks });

      const totalAllocatedCell = await findByTestId(
        selectors.totalAllocatedCell
      );

      expect(
        await within(totalAllocatedCell).findByText(
          getFormattedEmissions(emissionAllocation.emissions + 1000)
        )
      ).toBeInTheDocument();

      expect(
        await within(totalAllocatedCell).queryByTestId(
          selectors.totalAllocatedOverAllocatedMessage
        )
      ).toBeInTheDocument();
    });
  });

  it('should display the YearSelect, with the most recent year which has historical emmission data as its default value', async () => {
    const emissionAllocation = getEmissionAllocation(
      EmissionAllocationStatus.APPROVED
    );

    const yearOptions = [2015, 2013, 2010, 1967];
    const mock = emissionAllocationsMocks.getEmissionAllocationsForYearMock({
      ...commonMockArgs,
      year: yearOptions[0],
      emissionAllocations: [emissionAllocation],
    });
    const { findByTestId } = setup({ mocks: [mock], yearOptions });

    const yearSelect = await findByTestId(yearSelectSelectors.yearSelect);

    expect(
      await within(yearSelect).findByText(String(yearOptions[0]))
    ).toBeInTheDocument();
  });

  describe('when there is only one year which has historical emission data', () => {
    it('should display the YearSelect in its disabled state', async () => {
      const emissionAllocation = getEmissionAllocation(
        EmissionAllocationStatus.APPROVED
      );

      const yearOptions = [2015];
      const mock = emissionAllocationsMocks.getEmissionAllocationsForYearMock({
        ...commonMockArgs,
        year: yearOptions[0],
        emissionAllocations: [emissionAllocation],
      });
      const { getByLabelText } = setup({ mocks: [mock], yearOptions });

      const yearSelectInput = getByLabelText('Year');

      expect(yearSelectInput).toHaveAttribute('disabled');
    });
  });

  it('should display emission allocation data for the selected year', async () => {
    const emissionAllocation = getEmissionAllocation(
      EmissionAllocationStatus.APPROVED
    );

    const emissionAllocation2 = {
      ...emissionAllocation,
      customer: {
        ...emissionAllocation.customer,
        name: 'Last year Ltd.',
      },
    };

    const mocks = [
      emissionAllocationsMocks.getEmissionAllocationsForYearMock({
        ...commonMockArgs,
        emissionAllocations: [emissionAllocation],
      }),
      emissionAllocationsMocks.getEmissionAllocationsForYearMock({
        ...commonMockArgs,
        year: defaultYearOptions[1],
        emissionAllocations: [emissionAllocation2],
      }),
      emissionAllocationsMocks.getEmissionAllocationsForYearMock({
        ...commonMockArgs,
        year: defaultYearOptions[2],
        emissionAllocations: [],
      }),
    ];
    const { findByTestId, findByLabelText } = setup({ mocks });

    const yearSelect = await findByLabelText('Year');

    expect(
      await within(
        await findByTestId(selectors.emissionAllocationsTable)
      ).findByText(emissionAllocation.customer.name)
    ).toBeInTheDocument();

    await act(async () => {
      await selectEvent.select(yearSelect, String(defaultYearOptions[1]));
    });

    expect(
      await within(
        await findByTestId(selectors.emissionAllocationsTable)
      ).findByText(emissionAllocation2.customer.name)
    ).toBeInTheDocument();

    await expect(trackEvent).toHaveBeenCalledWith(VALUE_CHAIN_SELECT_YEAR, {
      year: defaultYearOptions[1],
    });

    await act(async () => {
      await selectEvent.select(yearSelect, String(defaultYearOptions[2]));
    });

    expect(
      await findByTestId(selectors.customersEmptyView)
    ).toBeInTheDocument();

    await expect(trackEvent).toHaveBeenCalledWith(VALUE_CHAIN_SELECT_YEAR, {
      year: defaultYearOptions[2],
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

    it('should display the "Allocate emissions" button', () => {
      const mock = emissionAllocationsMocks.getEmissionAllocationsForYearMock({
        ...commonMockArgs,
        emissionAllocations: [],
      });

      const { queryByTestId } = setup({ mocks: [mock] });

      expect(
        queryByTestId(selectors.allocateEmissionsButton)
      ).toBeInTheDocument();
    });

    describe('when the "Allocate emissions" button is clicked ', () => {
      it('should display the Allocate Emissions form', async () => {
        const mocks = [
          emissionAllocationsMocks.getEmissionAllocationsForYearMock({
            ...commonMockArgs,
            emissionAllocations: [],
          }),
          companyRelationshipsMock,
          corporateEmissionsMocks.getCorporateEmissions(corporateEmissions),
        ];

        const { findByTestId } = setup({ mocks });

        const allocateEmissionsButton = await findByTestId(
          selectors.allocateEmissionsButton
        );

        await act(async () => {
          fireEvent.click(allocateEmissionsButton);
        });

        await waitFor(() => {
          expect(setModalState).toHaveBeenCalledWith({
            isOpen: true,
            formType: FormType.ALLOCATE_EMISSIONS,
            allocateEmissionsFormProps: {
              selectedYear: 2020,
              isEditing: false,
            },
          });
        });
      });
    });

    it('should display the "Delete" button', async () => {
      const emissionAllocation = getEmissionAllocation(
        EmissionAllocationStatus.APPROVED
      );

      const mocks = [
        emissionAllocationsMocks.getEmissionAllocationsForYearMock({
          ...commonMockArgs,
          emissionAllocations: [emissionAllocation],
        }),
      ];

      const { findByTestId } = setup({ mocks });

      expect(
        await findByTestId(selectors.deleteEmissionAllocationButton)
      ).toBeInTheDocument();
    });

    describe('when the "Delete" button is clicked', () => {
      it('should display the Delete emission allocation form', async () => {
        const emissionAllocation = getEmissionAllocation(
          EmissionAllocationStatus.APPROVED
        );

        const mocks = [
          emissionAllocationsMocks.getEmissionAllocationsForYearMock({
            ...commonMockArgs,
            emissionAllocations: [emissionAllocation],
          }),
        ];

        const { findByTestId } = setup({ mocks });

        const deleteButton = await findByTestId(
          selectors.deleteEmissionAllocationButton
        );

        await act(async () => {
          fireEvent.click(deleteButton);
        });

        await waitFor(() => {
          expect(setModalState).toHaveBeenCalledWith({
            isOpen: true,
            formType: FormType.DELETE_ALLOCATION,
            deleteAllocationFormProps: {
              id: emissionAllocation.id,
            },
          });
        });
      });
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
        const emissionAllocation = getEmissionAllocation(status);

        const mocks = [
          emissionAllocationsMocks.getEmissionAllocationsForYearMock({
            ...commonMockArgs,
            emissionAllocations: [emissionAllocation],
          }),
        ];

        const { findByTestId } = setup({ mocks });

        const editButton = await findByTestId(
          selectors.editEmissionAllocationButton
        );
        expect(editButton).toBeInTheDocument();
        expect(editButton).toHaveTextContent(buttonText);
      }
    );
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

    it('should not display the "Allocate emissions" button', () => {
      const mock = emissionAllocationsMocks.getEmissionAllocationsForYearMock({
        ...commonMockArgs,
        emissionAllocations: [],
      });

      const { queryByTestId } = setup({ mocks: [mock] });

      expect(
        queryByTestId(selectors.allocateEmissionsButton)
      ).not.toBeInTheDocument();
    });

    it('should not display the "Delete" button', async () => {
      const emissionAllocation = getEmissionAllocation(
        EmissionAllocationStatus.APPROVED
      );

      const mocks = [
        emissionAllocationsMocks.getEmissionAllocationsForYearMock({
          ...commonMockArgs,
          emissionAllocations: [emissionAllocation],
        }),
      ];

      const { queryByTestId } = setup({ mocks });

      await waitFor(() => {
        expect(
          queryByTestId(selectors.deleteEmissionAllocationButton)
        ).not.toBeInTheDocument();
      });
    });

    it('should not display the "Edit" / "Re-send" button', async () => {
      const emissionAllocation = getEmissionAllocation(
        EmissionAllocationStatus.APPROVED
      );

      const mocks = [
        emissionAllocationsMocks.getEmissionAllocationsForYearMock({
          ...commonMockArgs,
          emissionAllocations: [emissionAllocation],
        }),
      ];

      const { queryByTestId } = setup({ mocks });

      await waitFor(() => {
        expect(
          queryByTestId(selectors.editEmissionAllocationButton)
        ).not.toBeInTheDocument();
      });
    });
  });
});
