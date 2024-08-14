import { UsersQuery_users_data as User } from 'types/UsersQuery';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { AdminDashboardTable } from '../../AdminDashboardTable/AdminDashboardTable';
import { ModalState } from '../../types';
import { usersTableHeaders, getUsersTableRows } from './utils';

interface IProps {
  usersList: User[];
  setModalState: (state: ModalState) => void;
}

export const UsersTable = ({ usersList, setModalState }: IProps) => {
  const { id: currentUserId } = useAuthenticatedUser();

  const tableRows = getUsersTableRows({
    usersList,
    currentUserId,
    setModalState,
  });
  return <AdminDashboardTable headers={usersTableHeaders} rows={tableRows} />;
};
