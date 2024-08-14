import { AccountSettingsDataQuery_companyUsers as User } from 'types/AccountSettingsDataQuery';

import { ModalState } from '../types';

export interface IProps {
  setModalState: (state: ModalState) => void;
  user: User;
  currentUserId: string;
}
