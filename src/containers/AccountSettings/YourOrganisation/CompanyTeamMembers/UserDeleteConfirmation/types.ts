import { AccountSettingsDataQuery_companyUsers as User } from 'types/AccountSettingsDataQuery';

export interface IProps {
  onClose: () => void;
  userToDelete: User;
}
