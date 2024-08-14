import { Row } from 'components/SortableTable/types';
import { createCompanyRelationship } from 'mocks/companyRelationships';
import { CompanyRelationshipWithSharedDataQuery_companyRelationships } from 'types/CompanyRelationshipWithSharedDataQuery';
import {
  CompanyRelationshipType,
  EmissionPrivacyStatus,
  InviteStatus,
} from 'types/globalTypes';
import { v4 } from 'uuid';
import { TableColumnNames } from './types';
import {
  convertRowsToOptions,
  filterRowsByOptions,
  getEmissionTableRowValues,
  getTableRowsSharedData,
  sortCompanyRelationships,
} from './utils';

describe(sortCompanyRelationships.name, () => {
  it('should sort company relationships by updated or created date', () => {
    const relationships = [
      createCompanyRelationship({
        overrides: {
          createdAt: new Date('2021-02-01'),
          updatedAt: null,
        },
      }),
      createCompanyRelationship({
        overrides: {
          createdAt: new Date('2021-01-01'),
          updatedAt: null,
        },
      }),
      createCompanyRelationship({
        overrides: {
          createdAt: new Date('2020-01-01'),
          updatedAt: new Date('2021-02-02'),
        },
      }),
    ];
    const result = sortCompanyRelationships([...relationships]);

    expect(result[0]).toEqual(relationships[2]);
    expect(result[1]).toEqual(relationships[0]);
    expect(result[2]).toEqual(relationships[1]);
  });
});

describe('getTableRowsSharedData', () => {
  it.each`
    relationship
    ${CompanyRelationshipType.CUSTOMER}
    ${CompanyRelationshipType.SUPPLIER}
  `(
    'should return the invitedBy name',
    ({ relationship }: { relationship: CompanyRelationshipType }) => {
      const firstNameCustomer = `firstNameCus`;
      const lastNameCustomer = 'lastNameCus';
      const firstNameSupplier = `firstNameSup`;
      const lastNameSupplier = 'lastNameSup';
      const relations: Partial<CompanyRelationshipWithSharedDataQuery_companyRelationships> = createCompanyRelationship(
        {
          overrides: {
            inviteType:
              relationship === CompanyRelationshipType.CUSTOMER
                ? CompanyRelationshipType.SUPPLIER
                : CompanyRelationshipType.CUSTOMER,
            status: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
            customerApprover: {
              firstName: firstNameCustomer,
              lastName: lastNameCustomer,
              email: '',
            },
            supplierApprover: {
              firstName: firstNameSupplier,
              lastName: lastNameSupplier,
              email: '',
            },
          },
        }
      );
      const result = getTableRowsSharedData({
        canEditCompanyRelationships: false,
        companyRelationships: [
          relations as CompanyRelationshipWithSharedDataQuery_companyRelationships,
        ],
        companyId: v4(),
        relationshipType: relationship,
        reSendInvite: jest.fn(),
        t: jest.fn(),
        isCompanyOverviewEnabled: false,
      });
      const invitedByExpectedName =
        relationship === CompanyRelationshipType.SUPPLIER
          ? `${firstNameCustomer} ${lastNameCustomer}`
          : `${firstNameSupplier} ${lastNameSupplier}`;

      const invitedByColumn = result[0].columns.find(
        (column) => column.cell === invitedByExpectedName
      );
      expect(invitedByColumn?.cell).toEqual(invitedByExpectedName);
    }
  );

  describe('when user has elevated permissions', () => {
    it('should return the resend value if CompanyRelationshipDisplayStatus is declined', () => {
      const relations: Partial<CompanyRelationshipWithSharedDataQuery_companyRelationships> = createCompanyRelationship(
        {
          overrides: {
            inviteType: CompanyRelationshipType.CUSTOMER,
            status: InviteStatus.REJECTED_BY_CUSTOMER,
          },
        }
      );
      const result = getTableRowsSharedData({
        canEditCompanyRelationships: true,
        companyRelationships: [
          relations as CompanyRelationshipWithSharedDataQuery_companyRelationships,
        ],
        companyId: v4(),
        relationshipType: CompanyRelationshipType.SUPPLIER,
        reSendInvite: jest.fn(),
        t: jest.fn(),
        isCompanyOverviewEnabled: false,
      });
      const resendColumn = result[0].columns.find(
        (column) => column.columnName === TableColumnNames.ACTIONS
      );
      expect(resendColumn?.sortValue).toEqual('resend');
    });
  });
});

describe('getEmissionTableRowValues()', () => {
  describe('when has no emission', () => {
    it('should display Not shared', () => {
      const result = getEmissionTableRowValues(
        EmissionPrivacyStatus.NOT_SHARED
      );
      expect(result.sortValue).toEqual('Not shared');
    });
  });

  describe('when relationship status is not connected', () => {
    it('should display -', () => {
      const result = getEmissionTableRowValues(null);
      expect(result.sortValue).toEqual('-');
    });
  });

  describe('when has emissions', () => {
    it('should display Shared', () => {
      const result = getEmissionTableRowValues(EmissionPrivacyStatus.SHARED);
      expect(result.sortValue).toEqual('Shared');
    });
  });
});

describe('convertRowsToOptions()', () => {
  it('should return an array of optionTypes for Suppliers', () => {
    const rows: Row<TableColumnNames>[] = [
      {
        rowName: 'test1',
        columns: [
          {
            columnName: TableColumnNames.COMPANY_NAME,
            cell: 'exampleValue',
          },
        ],
      },
    ];

    const t = jest.fn();
    const result = convertRowsToOptions(
      rows,
      CompanyRelationshipType.SUPPLIER,
      t
    );
    expect(result[0].value).toEqual(rows[0].columns[0].cell);
    expect(t).toHaveBeenNthCalledWith(
      1,
      'companyRelationships:dropdown-supplier'
    );
  });

  it('should return an array of optionTypes for Inviters and Sectors', () => {
    const rows: Row<TableColumnNames>[] = [
      {
        rowName: 'test1',
        columns: [
          {
            columnName: TableColumnNames.INVITED_BY,
            cell: 'exampleValue',
          },
          {
            columnName: TableColumnNames.SECTOR,
            cell: 'exampleValue2',
          },
        ],
      },
    ];

    const t = jest.fn();
    const result = convertRowsToOptions(
      rows,
      CompanyRelationshipType.CUSTOMER,
      t
    );
    expect(result[0].value).toEqual(rows[0].columns[0].cell);
    expect(result[1].value).toEqual(rows[0].columns[1].cell);
    expect(t).toHaveBeenNthCalledWith(
      2,
      'companyRelationships:dropdown-inviter'
    );
    expect(t).toHaveBeenNthCalledWith(
      3,
      'companyRelationships:dropdown-sector'
    );
  });

  it('should return an array of optionTypes for Customers', () => {
    const rows: Row<TableColumnNames>[] = [
      {
        rowName: 'test1',
        columns: [
          {
            columnName: TableColumnNames.COMPANY_NAME,
            cell: 'exampleValue',
          },
        ],
      },
    ];

    const t = jest.fn();
    const result = convertRowsToOptions(
      rows,
      CompanyRelationshipType.CUSTOMER,
      t
    );
    expect(result[0].value).toEqual(rows[0].columns[0].cell);
    expect(t).toHaveBeenNthCalledWith(
      1,
      'companyRelationships:dropdown-customer'
    );
  });
  it('should sort options alphabetically', () => {
    const t = jest.fn();
    const rows: Row<TableColumnNames>[] = [
      {
        rowName: 'test1',
        columns: [
          {
            columnName: TableColumnNames.COMPANY_NAME,
            cell: 'exampleValue',
          },
        ],
      },
      {
        rowName: 'test1',
        columns: [
          {
            columnName: TableColumnNames.COMPANY_NAME,
            cell: 'AxampleValue',
          },
        ],
      },
      {
        rowName: 'test1',
        columns: [
          {
            columnName: TableColumnNames.COMPANY_NAME,
            cell: 'ZxampleValue',
          },
        ],
      },
      {
        rowName: 'test1',
        columns: [
          {
            columnName: TableColumnNames.COMPANY_NAME,
            cell: 'LxampleValue',
          },
        ],
      },
    ];
    const result = convertRowsToOptions(
      rows,
      CompanyRelationshipType.CUSTOMER,
      t
    );
    expect(result[0].label).toEqual(rows[1].columns[0].cell);
    expect(result[3].label).toEqual(rows[2].columns[0].cell);
  });

  it('should contain distinct values', () => {
    const t = jest.fn();
    const rows: Row<TableColumnNames>[] = [
      {
        rowName: 'test1',
        columns: [
          {
            columnName: TableColumnNames.COMPANY_NAME,
            cell: 'exampleValue',
          },
        ],
      },
      {
        rowName: 'test1',
        columns: [
          {
            columnName: TableColumnNames.COMPANY_NAME,
            cell: 'exampleValue',
          },
        ],
      },
    ];
    const result = convertRowsToOptions(
      rows,
      CompanyRelationshipType.CUSTOMER,
      t
    );
    const actual = result.filter((r) => {
      return r.label === 'exampleValue';
    });
    expect(actual.length).toEqual(1);
  });
});

describe('filterRowsByOptions()', () => {
  const rows: Row<TableColumnNames>[] = [
    {
      rowName: 'test1',
      columns: [
        {
          columnName: TableColumnNames.COMPANY_NAME,
          cell: 'exampleValue',
        },
      ],
    },
    {
      rowName: 'test1',
      columns: [
        {
          columnName: TableColumnNames.COMPANY_NAME,
          cell: 'AxampleValue',
        },
      ],
    },
    {
      rowName: 'test1',
      columns: [
        {
          columnName: TableColumnNames.COMPANY_NAME,
          cell: 'ZxampleValue',
        },
      ],
    },
    {
      rowName: 'test1',
      columns: [
        {
          columnName: TableColumnNames.COMPANY_NAME,
          cell: 'LxampleValue',
        },
      ],
    },
  ];
  describe('when searchOptions length === 0', () => {
    it('should return all rows', () => {
      const result = filterRowsByOptions(rows, []);
      expect(result.length).toEqual(rows.length);
    });
  });
  describe('when searchOptions length > 0', () => {
    it('should return match where all searchOptions Match', () => {
      const result = filterRowsByOptions(rows, [
        {
          label: 'LxampleValue',
          value: 'LxampleValue',
          metadata: {
            columnName: TableColumnNames.COMPANY_NAME,
            columnDisplayName: 'Company',
          },
        },
      ]);
      expect(result.length).toEqual(1);
    });
    it('should not return a match if none exist', () => {
      const result = filterRowsByOptions(rows, [
        {
          label: 'does not exist',
          value: 'does not exist',
          metadata: {
            columnName: TableColumnNames.COMPANY_NAME,
            columnDisplayName: 'Company',
          },
        },
      ]);
      expect(result.length).toEqual(0);
    });
  });
});
