import useTranslation from 'next-translate/useTranslation';
import {
  UsersQuery_users_data as User,
  UsersQuery_users_data_roles as Role,
} from 'types/UsersQuery';
import { RoleName } from 'types/globalTypes';
import { Status } from 'components/Status';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { getRoleTypeFromRoles, getRoleLabel } from 'utils/roleHelpers';
import { ModalState } from '../../types';
import { UserUpdateActions } from './UserUpdateActions';
import * as StyledComponents from '../../AdminDashboardTable/styledComponents';

export const usersTableHeaders = [
  'usersAdminDashboard:users-table-header-user-details',
  'usersAdminDashboard:users-table-header-company',
  'usersAdminDashboard:users-table-header-role',
  'usersAdminDashboard:users-table-header-status',
  'usersAdminDashboard:users-table-header-actions',
];

export const getUserDetails = (user: User) => (
  <StyledComponents.DetailsContainer key={user.id}>
    <StyledComponents.UserName>
      {user.firstName} {user.lastName}
    </StyledComponents.UserName>
    <div>{user.email}</div>
  </StyledComponents.DetailsContainer>
);

export const getCompanyName = (user: User) => user.company?.name ?? '-';

export const getUserStatus = (user: User) => (
  <Status
    status={user.status}
    translationNamespace="usersAdminDashboard"
    statusControls={null}
    key={user.id}
  />
);

export const getRoleName = (role: RoleName | undefined) => {
  switch (role) {
    case RoleName.ADMIN:
      return 'Admin';
    case RoleName.ACCOUNT_MANAGER:
      return 'Account Manager';
    case RoleName.SUPPLIER_EDITOR:
      return 'Editor';
    case RoleName.SUPPLIER_VIEWER:
      return 'Viewer';
    default:
      return '-';
  }
};

export const getUserActions = (
  user: User,
  currentUserId: string,
  setModalState: (state: ModalState) => void
) => (
  <UserUpdateActions
    user={user}
    setModalState={setModalState}
    currentUserId={currentUserId}
  />
);

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
  const { roles } = useAuthenticatedUser();
  const { t } = useTranslation();
  const isRoleAdmin = roles
    .map((userRole) => userRole.name)
    .includes(RoleName.ADMIN);
  return usersList
    .slice()
    .sort((a, b) => a.firstName.localeCompare(b.firstName))
    .map((user: User) => {
      const userRoleNames = user.roles?.map((role: Role) => role.name) ?? [];
      return [
        getUserDetails(user),
        getCompanyName(user),
        getRoleLabel(getRoleTypeFromRoles(userRoleNames), t),
        getUserStatus(user),
        isRoleAdmin && getUserActions(user, currentUserId, setModalState),
      ];
    });
};
