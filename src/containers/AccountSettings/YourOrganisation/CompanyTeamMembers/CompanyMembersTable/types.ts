import { AccountSettingsDataQuery_companyUsers as User } from 'types/AccountSettingsDataQuery';
import { ModalState } from '../types';

export interface InviteUserFormProps {
  user: User;
}

export interface IProps {
  usersList: User[];
  setModalState: (state: ModalState) => void;
}
