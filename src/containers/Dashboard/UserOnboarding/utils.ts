import {
  CompanyRelationshipsOnboardingQuery as CompanyRelationships,
  CompanyRelationshipsOnboardingQuery_customer as CustomerInvitations,
  CompanyRelationshipsOnboardingQuery_supplier as SupplierInvitiations,
} from 'types/CompanyRelationshipsOnboardingQuery';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';

const getCustomerInvitations = (invitationsData: CompanyRelationships) =>
  invitationsData?.customer || [];
const getSupplierInvitations = (invitationsData: CompanyRelationships) =>
  invitationsData?.supplier || [];

const getIncomingCustomerRelationships = (
  customerInvitations: CustomerInvitations[]
) =>
  customerInvitations?.filter(
    (relationship) =>
      relationship.inviteType !== CompanyRelationshipType.CUSTOMER ||
      relationship.status === InviteStatus.APPROVED
  );

const getIncomingSupplierRelationships = (
  supplierInvitations: SupplierInvitiations[]
) =>
  supplierInvitations?.filter(
    (relationship) =>
      relationship.inviteType !== CompanyRelationshipType.SUPPLIER ||
      relationship.status === InviteStatus.APPROVED
  );

export const getFilteredIncomingInvitations = (
  invitationData?: CompanyRelationships
) => {
  if (!invitationData) {
    return [];
  }

  const incomingCustomerRelationships = getCustomerInvitations(invitationData);
  const incomingSupplierRelationships = getSupplierInvitations(invitationData);

  return [
    ...getIncomingCustomerRelationships(incomingCustomerRelationships),
    ...getIncomingSupplierRelationships(incomingSupplierRelationships),
  ].filter(
    (relationship) =>
      relationship.status === InviteStatus.AWAITING_SUPPLIER_APPROVAL ||
      relationship.status === InviteStatus.AWAITING_CUSTOMER_APPROVAL
  );
};
