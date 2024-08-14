import {
  CompanyRelationshipsOnboardingQuery_supplier_customer,
  CompanyRelationshipsOnboardingQuery_customer_customer,
  CompanyRelationshipsOnboardingQuery_supplier_supplier,
  CompanyRelationshipsOnboardingQuery_customer_supplier,
} from 'types/CompanyRelationshipsOnboardingQuery';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';

export type InvitationType = {
  id: string;
  status: InviteStatus;
  inviteType: CompanyRelationshipType;
  customer:
    | CompanyRelationshipsOnboardingQuery_supplier_customer
    | CompanyRelationshipsOnboardingQuery_customer_customer;
  supplier:
    | CompanyRelationshipsOnboardingQuery_supplier_supplier
    | CompanyRelationshipsOnboardingQuery_customer_supplier;
};
