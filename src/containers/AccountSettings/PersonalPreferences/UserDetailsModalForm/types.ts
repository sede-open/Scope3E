import { ExpertiseDomain } from 'types/globalTypes';

export interface IProps {
  closeModal: () => void;
}

export enum USER_DETAILS_FIELD_KEYS {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EXPERTISE_DOMAIN = 'expertiseDomain',
}

export const EMAIL = 'email';

export type ExpertiseDomainOptionType = {
  label: string;
  value: ExpertiseDomain;
};
export interface IUserDetailsFormValues {
  firstName: string;
  lastName: string;
  expertiseDomain: ExpertiseDomainOptionType;
}
