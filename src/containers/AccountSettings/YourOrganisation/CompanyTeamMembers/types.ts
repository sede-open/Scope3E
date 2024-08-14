import { AccountSettingsDataQuery_companyUsers as User } from 'types/AccountSettingsDataQuery';

export enum ModalType {
  INVITE_USER_FORM = 'INVITE_USER_FORM',
  USER_DELETE_CONFIRMATION = 'USER_DELETE_CONFIRMATION',
}

interface CompanyUserFormProps {
  user: User;
}

interface UserDeleteConfirmationProps {
  user: User;
}

export interface ModalState {
  isOpen: boolean;
  formType?: ModalType;
  companyUserFormProps?: CompanyUserFormProps;
  userToDeleteProps?: UserDeleteConfirmationProps;
}
