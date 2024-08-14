import { useCompanyRelationshipsQuery } from 'queries/companyRelationships';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';
import { useAuthenticatedUser } from './useAuthenticatedUser';

export const useNetworkNotification = () => {
  const { company } = useAuthenticatedUser();
  const companyId = company?.id;
  const {
    data: supplierRes,
    loading: isLoadingSupplier,
  } = useCompanyRelationshipsQuery({
    companyId,
    relationshipType: CompanyRelationshipType.SUPPLIER,
  });

  const {
    data: customerRes,
    loading: isLoadingCustomer,
  } = useCompanyRelationshipsQuery({
    companyId,
    relationshipType: CompanyRelationshipType.CUSTOMER,
  });

  const hasSupplierInvites = supplierRes
    ? supplierRes.companyRelationships.filter(
        (relationship) =>
          relationship.status === InviteStatus.AWAITING_CUSTOMER_APPROVAL
      )
    : [];

  const hasCustomerInvites = customerRes
    ? customerRes.companyRelationships.filter(
        (relationship) =>
          relationship.status === InviteStatus.AWAITING_SUPPLIER_APPROVAL
      )
    : [];

  return {
    hasNetworkNotification:
      hasCustomerInvites.length > 0 || hasSupplierInvites.length > 0,
    loading: isLoadingCustomer || isLoadingSupplier,
  };
};
