import { OptionType } from 'components/MultiSelect';
import { CompanyRelationshipsQuery_companyRelationships } from 'types/CompanyRelationshipsQuery';
import { CompanyRelationshipType } from 'types/globalTypes';

export interface IProps {
  relationships: CompanyRelationshipsQuery_companyRelationships[];
  relationshipType: CompanyRelationshipType;
}

export enum FormType {
  CREATE_RELATIONSHIP,
  INVITE_COMPANY,
}

interface ICreateRelationshipFormProps {
  existingRelationship:
    | CompanyRelationshipsQuery_companyRelationships
    | undefined;
}

export interface IModalState {
  isOpen: boolean;
  formType?: FormType;
  formProps?: ICreateRelationshipFormProps;
}

export enum TableColumnNames {
  COMPANY_NAME = 'COMPANY_NAME',
  LOCATION = 'LOCATION',
  SECTOR = 'SECTOR',
  STATUS = 'STATUS',
  INVITED_BY = 'INVITED_BY',
  EMISSIONS_DATA = 'EMISSIONS_DATA',
  AMBITION = 'AMBITION',
  ACTIONS = 'ACTIONS',
}

interface NetworkMultiSelect {
  columnDisplayName: string;
  columnName: TableColumnNames;
}

export interface NetworkOptionType extends OptionType<NetworkMultiSelect> {
  metadata: NetworkMultiSelect;
}
