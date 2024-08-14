import useTranslation from 'next-translate/useTranslation';
import { getRoleLabel, getRoleTypeFromRoles } from 'utils/roleHelpers';
import { AccountSettingsDataQuery_companyUsers as User } from 'types/AccountSettingsDataQuery';
import { UserStatus } from 'types/globalTypes';
import { Status } from 'components/Status';
import { Row, SortableHeader } from 'components/SortableTable/types';
import { GetMe_me_roles as Role } from 'types/GetMe';
import { toSentenceCase } from 'utils/toSentenceCase';
import { CompanyUserActions } from '../CompanyUserActions';
import { ModalState } from '../types';

export const getUserName = (user: User) =>
  `${user.firstName} ${user.lastName}` ?? '-';
export const getUserEmail = (user: User) => user.email ?? '-';
export const getUserExpertiseDomain = (user: User) =>
  user.expertiseDomain ?? '-';
export const getCompanyName = (user: User) => user.company?.name ?? '-';
export const getUserStatus = (user: User) => (
  <Status
    status={user.status}
    translationNamespace="accountSettings"
    statusControls={null}
    key={user.id}
  />
);
export const getCompanyUserActions = (
  user: User,
  currentUserId: string,
  setModalState: (state: ModalState) => void
) => (
  <CompanyUserActions
    user={user}
    setModalState={setModalState}
    currentUserId={currentUserId}
  />
);

export enum TableColumnNames {
  NAME = 'NAME',
  EXPERTISE_DOMAIN = 'EXPERTISE_DOMAIN',
  EMAIL = 'EMAIL',
  ROLE_TYPE = 'ROLE_TYPE',
  STATUS = 'STATUS',
  ACTION = 'ACTION',
}

const STATUS_ORDER = [UserStatus.PENDING, UserStatus.ACTIVE];

export const sortByStatusAscending = (
  a?: string | number | null,
  b?: string | number | null
) => {
  const aValue = a as UserStatus;
  const bValue = b as UserStatus;

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
  const aValue = a as UserStatus;
  const bValue = b as UserStatus;

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

export const getTableHeaders = (): SortableHeader<TableColumnNames>[] => [
  {
    columnName: TableColumnNames.NAME,
    cell: `accountSettings:team-members-table-header-${TableColumnNames.NAME}`,
    isSortable: true,
  },
  {
    columnName: TableColumnNames.EXPERTISE_DOMAIN,
    cell: `accountSettings:team-members-table-header-${TableColumnNames.EXPERTISE_DOMAIN}`,
    isSortable: true,
  },
  {
    columnName: TableColumnNames.EMAIL,
    cell: `accountSettings:team-members-table-header-${TableColumnNames.EMAIL}`,
    isSortable: true,
  },
  {
    columnName: TableColumnNames.ROLE_TYPE,
    cell: `accountSettings:team-members-table-header-${TableColumnNames.ROLE_TYPE}`,
    isSortable: true,
  },
  {
    columnName: TableColumnNames.STATUS,
    cell: `accountSettings:team-members-table-header-${TableColumnNames.STATUS}`,
    isSortable: true,
    sortFunction: sortByStatusFunction,
  },
  {
    columnName: TableColumnNames.ACTION,
    cell: `accountSettings:team-members-table-header-${TableColumnNames.ACTION}`,
    isSortable: false,
  },
];

export interface GetTableRowProps {
  setModalState: (state: ModalState) => void;
  usersList: User[];
  currentUserId: string;
}

export const getUsersTableRows = ({
  usersList,
  setModalState,
  currentUserId,
}: GetTableRowProps) => {
  const { t } = useTranslation();
  return usersList
    .slice()
    .sort((a: any, b: any) => a.firstName.localeCompare(b.firstName))
    .map((user: User) => {
      const userRoleNames = user.roles?.map((role: Role) => role.name) ?? [];
      return {
        rowName: user.id,
        columns: [
          {
            columnName: TableColumnNames.NAME,
            cell: getUserName(user),
          },
          {
            columnName: TableColumnNames.EXPERTISE_DOMAIN,
            cell: toSentenceCase(getUserExpertiseDomain(user)),
          },
          {
            columnName: TableColumnNames.EMAIL,
            cell: getUserEmail(user),
          },
          {
            columnName: TableColumnNames.ROLE_TYPE,
            cell: getRoleLabel(getRoleTypeFromRoles(userRoleNames), t),
          },
          {
            columnName: TableColumnNames.STATUS,
            cell: getUserStatus(user),
            sortValue: user.status,
          },
          {
            columnName: TableColumnNames.ACTION,
            cell: getCompanyUserActions(user, currentUserId, setModalState),
          },
        ],
      };
    });
};
