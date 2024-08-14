import { UsersQuery_users_data as User } from 'types/UsersQuery';
import { AdminCompaniesQuery_companies_data as Company } from 'types/AdminCompaniesQuery';

export enum ModalType {
  EXTERNAL_USER_FORM,
  INTERNAL_USER_FORM,
  DELETE_USER_FORM,
  APPROVE_COMPANY_CONFIRMATION_FORM,
  VETO_COMPANY_CONFIRMATION_FORM,
  COMPANY_USER_DETAILS,
}

interface ExternalUserFormProps {
  user: User;
}

interface InternalUserFormProps {
  user: User;
}

interface DeleteUserFormProps {
  user: User;
}

interface ApproveCompanyConfirmationFormProps {
  company: Company;
}

interface VetoCompanyConfirmationFormProps {
  company: Company;
}

interface CompanyUserDetailsProps {
  company: Company;
}

export interface ModalState {
  isOpen: boolean;
  formType?: ModalType;
  externalUserFormProps?: ExternalUserFormProps;
  internalUserFormProps?: InternalUserFormProps;
  deleteUserFormProps?: DeleteUserFormProps;
  approveCompanyConfirmationFormProps?: ApproveCompanyConfirmationFormProps;
  vetoCompanyConfirmationFormProps?: VetoCompanyConfirmationFormProps;
  companyUserDetailsProps?: CompanyUserDetailsProps;
}
