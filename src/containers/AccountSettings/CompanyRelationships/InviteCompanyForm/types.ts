import { SearchSelectOption } from 'components/SearchSelect/types';
import { CompanyRelationshipType } from 'types/globalTypes';

export interface IProps {
  companyId: string;
  relationshipType: CompanyRelationshipType;
  onClose: () => void;
  onCompleted?: () => void;
  initialCompany?: {
    name: string;
    duns: string;
  };
}

export enum FIELD_KEYS {
  COMPANY = 'company',
  NOTE = 'note',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
}

export interface FormValues {
  [FIELD_KEYS.COMPANY]: SearchSelectOption | null;
  [FIELD_KEYS.NOTE]: string;
  [FIELD_KEYS.FIRST_NAME]: string;
  [FIELD_KEYS.LAST_NAME]: string;
  [FIELD_KEYS.EMAIL]: string;
}
