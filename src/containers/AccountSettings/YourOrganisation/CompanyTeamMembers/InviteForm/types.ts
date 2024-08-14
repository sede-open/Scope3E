import { SelectOption } from 'containers/AdminDashboard/ExtenalUserForm/types';
import { AccountSettingsDataQuery_companyUsers as User } from 'types/AccountSettingsDataQuery';
import { ExpertiseDomain } from 'types/globalTypes';

export type ExpertiseDomainOptionType = {
  label: string;
  value: ExpertiseDomain;
};
export interface IUserInviteFormValues {
  firstName: string;
  lastName: string;
  expertiseDomain: ExpertiseDomainOptionType;
  email: string;
  roleId: SelectOption;
}

export interface IProps {
  onClose: () => void;
  companyUser?: User;
}

export const FIELD_KEYS = {
  ROLE_ID_TYPE: 'roleId',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EXPERTISE_DOMAIN: 'expertiseDomain',
  EMAIL: 'email',
} as const;
