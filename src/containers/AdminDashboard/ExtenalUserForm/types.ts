import { UsersQuery_users_data as User } from 'types/UsersQuery';
import { AdminCompaniesQuery_companies_data } from 'types/AdminCompaniesQuery';

export type SelectOption = { label: string; value: string; meta?: string };

export interface IExternalUserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  companyId: SelectOption;
  roleId: SelectOption;
}

export interface IProps {
  onClose: () => void;
  onSubmit: (data: IExternalUserFormValues) => Promise<void>;
  companies: AdminCompaniesQuery_companies_data[];
  user?: User;
  isLoading: boolean;
  apiError: string;
}

export const FIELD_KEYS = {
  ROLES: 'roles',
  ROLE_ID_TYPE: 'roleId',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  COMPANY_ID: 'companyId',
} as const;
