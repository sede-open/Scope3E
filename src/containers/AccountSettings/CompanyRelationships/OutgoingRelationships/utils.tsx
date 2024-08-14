import NextLink from 'next/link';
import {
  Column,
  ColumnCell,
  Row,
  SortableHeader,
} from 'components/SortableTable/types';
import { Text } from 'components/Text';
import { OptionsType } from 'react-select';
import { AlizarinCrimson, FunGreen } from 'styles/colours';
import {
  CompanyRelationshipsQuery_companyRelationships as CompanyRelationship,
  CompanyRelationshipsQuery_companyRelationships,
} from 'types/CompanyRelationshipsQuery';
import { CompanyRelationshipWithSharedDataQuery_companyRelationships } from 'types/CompanyRelationshipWithSharedDataQuery';
import {
  AmbitionPrivacyStatus,
  CompanyRelationshipType,
  CompanyStatus,
  EmissionPrivacyStatus,
  InviteStatus,
} from 'types/globalTypes';
import { companySectorsPrimarySectorName } from 'utils/companySectors';
import { Link } from 'components/Link';
import { RelationshipStatus as RelationshipStatusOld } from '../RelationshipStatus';
import { RelationshipStatus } from '../RelationshipStatus/relationshipStatus';
import { ReSend } from '../RelationshipStatus/styledComponents';
import { CompanyRelationshipDisplayStatus } from '../types';
import { getRelationshipCompany } from '../utils';
import { NetworkOptionType, TableColumnNames } from './types';

const RELATIONSHIP_CUSTOMER_KEY = 'customer';
const RELATIONSHIP_SUPPLIER_KEY = 'supplier';

const companyRelationshipDisplayStatusMatrix: {
  [companyStatus in CompanyStatus]: {
    [inviteStatus in InviteStatus]: CompanyRelationshipDisplayStatus;
  };
} = {
  [CompanyStatus.ACTIVE]: {
    [InviteStatus.APPROVED]: CompanyRelationshipDisplayStatus.CONNECTED,
    [InviteStatus.AWAITING_CUSTOMER_APPROVAL]:
      CompanyRelationshipDisplayStatus.INVITATION_SENT,
    [InviteStatus.AWAITING_SUPPLIER_APPROVAL]:
      CompanyRelationshipDisplayStatus.INVITATION_SENT,
    [InviteStatus.REJECTED_BY_CUSTOMER]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
    [InviteStatus.REJECTED_BY_SUPPLIER]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
  },
  [CompanyStatus.PENDING_USER_ACTIVATION]: {
    [InviteStatus.APPROVED]: CompanyRelationshipDisplayStatus.CONNECTED,
    [InviteStatus.AWAITING_CUSTOMER_APPROVAL]:
      CompanyRelationshipDisplayStatus.INVITATION_SENT,
    [InviteStatus.AWAITING_SUPPLIER_APPROVAL]:
      CompanyRelationshipDisplayStatus.INVITATION_SENT,
    [InviteStatus.REJECTED_BY_CUSTOMER]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
    [InviteStatus.REJECTED_BY_SUPPLIER]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
  },
  [CompanyStatus.INVITATION_DECLINED]: {
    [InviteStatus.APPROVED]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
    [InviteStatus.AWAITING_CUSTOMER_APPROVAL]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
    [InviteStatus.AWAITING_SUPPLIER_APPROVAL]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
    [InviteStatus.REJECTED_BY_CUSTOMER]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
    [InviteStatus.REJECTED_BY_SUPPLIER]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
  },
  [CompanyStatus.PENDING_USER_CONFIRMATION]: {
    [InviteStatus.APPROVED]: CompanyRelationshipDisplayStatus.INVITATION_SENT,
    [InviteStatus.AWAITING_CUSTOMER_APPROVAL]:
      CompanyRelationshipDisplayStatus.INVITATION_SENT,
    [InviteStatus.AWAITING_SUPPLIER_APPROVAL]:
      CompanyRelationshipDisplayStatus.INVITATION_SENT,
    [InviteStatus.REJECTED_BY_CUSTOMER]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
    [InviteStatus.REJECTED_BY_SUPPLIER]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
  },
  [CompanyStatus.VETOED]: {
    [InviteStatus.APPROVED]: CompanyRelationshipDisplayStatus.VETOED,
    [InviteStatus.AWAITING_CUSTOMER_APPROVAL]:
      CompanyRelationshipDisplayStatus.VETOED,
    [InviteStatus.AWAITING_SUPPLIER_APPROVAL]:
      CompanyRelationshipDisplayStatus.VETOED,
    [InviteStatus.REJECTED_BY_CUSTOMER]:
      CompanyRelationshipDisplayStatus.VETOED,
    [InviteStatus.REJECTED_BY_SUPPLIER]:
      CompanyRelationshipDisplayStatus.VETOED,
  },
  [CompanyStatus.VETTING_IN_PROGRESS]: {
    [InviteStatus.APPROVED]: CompanyRelationshipDisplayStatus.INVITATION_SENT,
    [InviteStatus.AWAITING_CUSTOMER_APPROVAL]:
      CompanyRelationshipDisplayStatus.INVITATION_SENT,
    [InviteStatus.AWAITING_SUPPLIER_APPROVAL]:
      CompanyRelationshipDisplayStatus.INVITATION_SENT,
    [InviteStatus.REJECTED_BY_CUSTOMER]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
    [InviteStatus.REJECTED_BY_SUPPLIER]:
      CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
  },
};

export const getRelationshipStatus = ({
  relationship,
  relationshipType,
}: {
  relationship: CompanyRelationship;
  relationshipType: CompanyRelationshipType;
}) => {
  const { status: relationshipStatus } = relationship;

  const companyKey =
    relationshipType === CompanyRelationshipType.SUPPLIER
      ? RELATIONSHIP_SUPPLIER_KEY
      : RELATIONSHIP_CUSTOMER_KEY;
  const companyStatus = relationship[companyKey].status;

  return companyRelationshipDisplayStatusMatrix[companyStatus][
    relationshipStatus
  ];
};

export const sortCompanyRelationships = (
  relationships: CompanyRelationship[]
) =>
  relationships.sort((a, b) => {
    const aUpdatedDate = a.updatedAt || a.createdAt;
    const bUpdatedDate = b.updatedAt || b.createdAt;

    if (aUpdatedDate < bUpdatedDate) {
      return 1;
    }
    if (aUpdatedDate > bUpdatedDate) {
      return -1;
    }

    return 0;
  });

const STATUS_ORDER = [
  CompanyRelationshipDisplayStatus.INVITATION_SENT,
  CompanyRelationshipDisplayStatus.INVITATION_DECLINED,
  CompanyRelationshipDisplayStatus.CONNECTED,
  CompanyRelationshipDisplayStatus.VETOED,
];

export const sortByStatusAscending = (
  a?: string | number | null,
  b?: string | number | null
) => {
  const aValue = a as CompanyRelationshipDisplayStatus; // relationship display status
  const bValue = b as CompanyRelationshipDisplayStatus; // relationship display status

  if (STATUS_ORDER.indexOf(aValue) < STATUS_ORDER.indexOf(bValue)) {
    return -1;
  }

  if (STATUS_ORDER.indexOf(aValue) > STATUS_ORDER.indexOf(bValue)) {
    return 1;
  }

  return 0;
};

export const sortByStatusDescending = (
  a?: string | number | null,
  b?: string | number | null
) => {
  const aValue = a as CompanyRelationshipDisplayStatus;
  const bValue = b as CompanyRelationshipDisplayStatus;

  if (STATUS_ORDER.indexOf(aValue) < STATUS_ORDER.indexOf(bValue)) {
    return 1;
  }

  if (STATUS_ORDER.indexOf(aValue) > STATUS_ORDER.indexOf(bValue)) {
    return -1;
  }

  return 0;
};

export const sortByStatusFunction: <ColumnName extends string>(p: {
  unsortedRows: Row<ColumnName>[];
  sortByColumn: ColumnName;
  isSortedAscending: boolean;
}) => Row<ColumnName>[] = ({ unsortedRows, sortByColumn, isSortedAscending }) =>
  unsortedRows.sort((a, b) => {
    const aColumn = a.columns.find(
      (column) => column.columnName === sortByColumn
    );
    const bColumn = b.columns.find(
      (column) => column.columnName === sortByColumn
    );

    const aColumnValue = aColumn?.sortValue;
    const bColumnValue = bColumn?.sortValue;

    return isSortedAscending
      ? sortByStatusAscending(aColumnValue, bColumnValue)
      : sortByStatusDescending(aColumnValue, bColumnValue);
  });

export const getNetworkTableHeaders = (): SortableHeader<
  TableColumnNames
>[] => [
  {
    columnName: TableColumnNames.COMPANY_NAME,
    cell: 'companyRelationships:table-header-name',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.INVITED_BY,
    cell: 'companyRelationships:table-header-invited-by',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.SECTOR,
    cell: 'companyRelationships:table-header-sector',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.EMISSIONS_DATA,
    cell: 'companyRelationships:table-header-emissions-data',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.AMBITION,
    cell: 'companyRelationships:table-header-ambition',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.STATUS,
    cell: 'companyRelationships:table-header-status',
    isSortable: true,
    sortFunction: sortByStatusFunction,
  },
  {
    columnName: TableColumnNames.ACTIONS,
    cell: 'companyRelationships:table-header-actions',
    isSortable: true,
  },
];

/**
 * @deprecated Can be Removed once isNetworkEnabledFlag is removed.
 */
export const getTableHeaders = (): SortableHeader<TableColumnNames>[] => [
  {
    columnName: TableColumnNames.COMPANY_NAME,
    cell: 'companyRelationships:table-header-name',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.SECTOR,
    cell: 'companyRelationships:table-header-sector',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.LOCATION,
    cell: 'companyRelationships:table-header-location',
    isSortable: true,
  },
  {
    columnName: TableColumnNames.STATUS,
    cell: 'companyRelationships:table-header-status',
    isSortable: true,
    sortFunction: sortByStatusFunction,
  },
];

/**
 * @deprecated Can be Removed once isNetworkEnabledFlag is removed.
 */
export const getTableRows = ({
  canEditCompanyRelationships,
  companyRelationships,
  companyId,
  relationshipType,
  reSendInvite,
}: {
  canEditCompanyRelationships: boolean;
  companyRelationships: CompanyRelationshipsQuery_companyRelationships[];
  companyId: string;
  relationshipType: CompanyRelationshipType;
  reSendInvite: (
    relationship: CompanyRelationshipsQuery_companyRelationships
  ) => void;
}): Row<TableColumnNames>[] =>
  companyRelationships.map((relationship) => {
    const status = getRelationshipStatus({
      relationship,
      relationshipType,
    });

    const relationshipCompany = getRelationshipCompany({
      relationship,
      companyId,
    });
    const { name, location, companySectors } = relationshipCompany;

    const primarySector = companySectorsPrimarySectorName(companySectors);

    return {
      rowName: relationship.id,
      columns: [
        {
          columnName: TableColumnNames.COMPANY_NAME,
          cell: name,
        },
        {
          columnName: TableColumnNames.SECTOR,
          cell: primarySector,
        },
        {
          columnName: TableColumnNames.LOCATION,
          cell: location,
        },
        {
          columnName: TableColumnNames.STATUS,
          cell: (
            <RelationshipStatusOld
              canEditSupplyDashboard={canEditCompanyRelationships}
              reSendInvite={() => reSendInvite(relationship)}
              status={status}
            />
          ),
          sortValue: status,
        },
      ],
    };
  });

export const getAmbitionTableRowValues = (
  status: AmbitionPrivacyStatus | null
): Column<TableColumnNames.AMBITION> => {
  const column: Column<TableColumnNames.AMBITION> = {
    columnName: TableColumnNames.AMBITION,
    cell: <Text color={AlizarinCrimson}>Not shared</Text>,
    sortValue: 'Not shared',
  };

  if (status === null) {
    column.sortValue = '-';
    column.cell = <Text>-</Text>;
  }

  if (status === AmbitionPrivacyStatus.SHARED) {
    column.sortValue = 'Shared';
    column.cell = <Text color={FunGreen}>Shared</Text>;
  }

  if (status === AmbitionPrivacyStatus.SHARED_SBTI) {
    column.sortValue = 'Shared (SBTi)';
    column.cell = <Text color={FunGreen}>Shared (SBTi)</Text>;
  }
  return column;
};

export const getEmissionTableRowValues = (
  emissionPrivacyStatus: EmissionPrivacyStatus | null
): Column<TableColumnNames.EMISSIONS_DATA> => {
  const column: Column<TableColumnNames.EMISSIONS_DATA> = {
    columnName: TableColumnNames.EMISSIONS_DATA,
    cell: <Text>-</Text>,
    sortValue: '-',
  };
  if (emissionPrivacyStatus === EmissionPrivacyStatus.NOT_SHARED) {
    column.cell = <Text color={AlizarinCrimson}>Not shared</Text>;
    column.sortValue = 'Not shared';
  }

  if (emissionPrivacyStatus === EmissionPrivacyStatus.SHARED) {
    column.cell = <Text color={FunGreen}>Shared</Text>;
    column.sortValue = 'Shared';
  }
  return column;
};

export const getTableRowsSharedData = ({
  canEditCompanyRelationships,
  companyRelationships,
  companyId,
  relationshipType,
  reSendInvite,
  t,
  isCompanyOverviewEnabled,
}: {
  canEditCompanyRelationships: boolean;
  companyRelationships: CompanyRelationshipWithSharedDataQuery_companyRelationships[];
  companyId: string;
  relationshipType: CompanyRelationshipType;
  reSendInvite: (
    relationship: CompanyRelationshipsQuery_companyRelationships
  ) => void;
  t: any;
  isCompanyOverviewEnabled: boolean;
}): Row<TableColumnNames>[] =>
  companyRelationships.map((relationship) => {
    const status = getRelationshipStatus({
      relationship,
      relationshipType,
    });

    const relationshipCompany = getRelationshipCompany({
      relationship,
      companyId,
    });
    const { name, companySectors } = relationshipCompany;
    const {
      emissionPrivacyStatus,
      ambitionPrivacyStatus,
      customerApprover,
      supplierApprover,
    } = relationship;

    const shouldDisplayResend =
      canEditCompanyRelationships &&
      status === CompanyRelationshipDisplayStatus.INVITATION_DECLINED;
    const onReSend = shouldDisplayResend ? reSendInvite : () => {};

    const primarySector = companySectorsPrimarySectorName(companySectors);

    let invitedBy = customerApprover
      ? `${customerApprover.firstName} ${customerApprover.lastName}`
      : '-';
    if (relationshipType === CompanyRelationshipType.CUSTOMER) {
      invitedBy = supplierApprover
        ? `${supplierApprover.firstName} ${supplierApprover.lastName}`
        : '-';
    }

    const companyNameCell = isCompanyOverviewEnabled ? (
      <NextLink href={`/company/${relationshipCompany.id}`}>
        <Link href={`/company/${relationshipCompany.id}`}>{name}</Link>
      </NextLink>
    ) : (
      name
    );

    return {
      rowName: relationship.id,
      columns: [
        {
          columnName: TableColumnNames.COMPANY_NAME,
          cell: companyNameCell,
          sortValue: name,
        },
        {
          columnName: TableColumnNames.INVITED_BY,
          cell: invitedBy,
        },
        {
          columnName: TableColumnNames.SECTOR,
          cell: primarySector,
        },
        getEmissionTableRowValues(emissionPrivacyStatus),
        getAmbitionTableRowValues(ambitionPrivacyStatus),
        {
          columnName: TableColumnNames.STATUS,
          cell: <RelationshipStatus status={status} />,
          sortValue: status,
        },
        {
          columnName: TableColumnNames.ACTIONS,
          cell: shouldDisplayResend ? (
            <ReSend onClick={() => onReSend(relationship)}>
              {t('companyRelationships:status-re-send')}
            </ReSend>
          ) : (
            '-'
          ),
          sortValue: shouldDisplayResend ? 'resend' : '-',
        },
      ],
    };
  });

// transforms the options array into a map for O of n access time when filtering.
const searchOptionsToMap = (searchOptions: OptionsType<NetworkOptionType>) => {
  const searchOptionMap = new Map<TableColumnNames, undefined | string>([
    [TableColumnNames.COMPANY_NAME, undefined],
    [TableColumnNames.INVITED_BY, undefined],
    [TableColumnNames.SECTOR, undefined],
  ]);
  for (let i = 0; i < searchOptions.length; i++) {
    const { metadata, value } = searchOptions[i];

    // Checks if there is already a search parameter. If yes then returns empty array
    // as there will be 0 results with two columnName values
    if (searchOptionMap.get(metadata.columnName)) {
      throw new Error('Multiple of the same Column Name options selected');
    }
    searchOptionMap.set(metadata.columnName, value);
  }
  return searchOptionMap;
};

// transforms the columns array into a map for O of n access time when filtering.
const rowColumnsToMap = (
  row: Row<TableColumnNames>,
  columnNames: TableColumnNames[]
) => {
  const rowMap = new Map<TableColumnNames, ColumnCell>();
  for (let i = 0; i < row.columns.length; i++) {
    const { columnName, cell, sortValue } = row.columns[i];
    if (columnNames.includes(columnName)) {
      rowMap.set(columnName, sortValue ?? cell);
    }
    // exits early once all columnNames values have been added
    if (rowMap.size === columnNames.length) {
      break;
    }
  }
  return rowMap;
};

export const filterRowsByOptions = (
  rows: Row<TableColumnNames>[],
  searchOptions: OptionsType<NetworkOptionType>
) => {
  if (searchOptions.length === 0) {
    return rows;
  }

  let searchOptionMap: Map<TableColumnNames, string | undefined>;
  try {
    searchOptionMap = searchOptionsToMap(searchOptions);
  } catch (err) {
    return [];
  }
  const columnNamesToFilterBy = [
    TableColumnNames.COMPANY_NAME,
    TableColumnNames.INVITED_BY,
    TableColumnNames.SECTOR,
  ];
  return rows.filter((row) => {
    const rowMap = rowColumnsToMap(row, columnNamesToFilterBy);
    // loop through column names and check if all searchOption values match the rows data
    for (let i = 0; i < columnNamesToFilterBy.length; i++) {
      const rowValueForColumnName = rowMap.get(columnNamesToFilterBy[i]);
      const searchValueForColumnName = searchOptionMap.get(
        columnNamesToFilterBy[i]
      );
      if (
        searchValueForColumnName &&
        searchValueForColumnName !== rowValueForColumnName
      ) {
        return false;
      }
    }
    return true;
  });
};

const columnToOption = (
  r: Row<TableColumnNames>,
  columnName: TableColumnNames,
  columnDisplayName: string
): NetworkOptionType | undefined => {
  const column = r.columns.find((c) => c.columnName === columnName);
  if (
    column &&
    column.cell &&
    (column.sortValue || typeof column.cell === 'string')
  ) {
    return {
      label: column.sortValue ? String(column.sortValue) : String(column.cell),
      value: column.sortValue ? String(column.sortValue) : String(column.cell),
      metadata: {
        columnDisplayName,
        columnName,
      },
    };
  }
  return undefined;
};

const removeDuplicatesAndSortOptions = (options: NetworkOptionType[]) => {
  return Array.from(
    new Map(
      options.map((object) => {
        return [object.label, object];
      })
    ).values()
  ).sort((a, b) => {
    return a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1;
  });
};

export const convertRowsToOptions = (
  rows: Row<TableColumnNames>[],
  relationshipType: CompanyRelationshipType,
  t: any
): NetworkOptionType[] => {
  const formattedOptions = rows.flatMap((row) => {
    const options = [];
    const companyNameOption = columnToOption(
      row,
      TableColumnNames.COMPANY_NAME,
      t(`companyRelationships:dropdown-${relationshipType.toLowerCase()}`)
    );
    if (companyNameOption) {
      options.push(companyNameOption);
    }
    const invitedByOption = columnToOption(
      row,
      TableColumnNames.INVITED_BY,
      t('companyRelationships:dropdown-inviter')
    );
    if (invitedByOption) {
      options.push(invitedByOption);
    }
    const sectorOption = columnToOption(
      row,
      TableColumnNames.SECTOR,
      t('companyRelationships:dropdown-sector')
    );
    if (sectorOption) {
      options.push(sectorOption);
    }
    return options;
  });
  return removeDuplicatesAndSortOptions(formattedOptions);
};
