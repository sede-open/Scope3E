import { Link } from 'components/Link';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useFlags } from 'launchdarkly-react-client-sdk';
import useTranslation from 'next-translate/useTranslation';
import { useAllCompanyRelationshipsQuery } from 'queries/companyRelationships';
import { useEffect } from 'react';
import {
  AllCompanyRelationshipsQuery_customer,
  AllCompanyRelationshipsQuery_supplier,
} from 'types/AllCompanyRelationshipsQuery';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';
import { getItem, setItem } from 'utils/sessionStorage';
import { displayCtaMessage } from 'utils/toast';

export const HAS_USER_DISMISSED_INVITES_ALERT =
  'HAS_USER_DISMISSED_INVITES_ALERT';
export const INVITES_TOAST_ID = 'COMPANY_RELATIONSHIPS_INVITES_TOAST';

const isIncomingRelationship = (
  relationship:
    | AllCompanyRelationshipsQuery_customer
    | AllCompanyRelationshipsQuery_supplier,
  relationshipType: CompanyRelationshipType
) =>
  relationship.inviteType !== relationshipType &&
  (relationship.status === InviteStatus.AWAITING_CUSTOMER_APPROVAL ||
    relationship.status === InviteStatus.AWAITING_SUPPLIER_APPROVAL);

export const CompanyRelationshipsInvitesToast = () => {
  const { t } = useTranslation();
  const { company, canEditSupplyDashboard } = useAuthenticatedUser();
  const companyId = company?.id;

  const { isNetworkPageEnabled } = useFlags();

  if (!companyId) {
    return null;
  }

  const {
    data: companyRelationshipsData,
    loading: isLoading,
  } = useAllCompanyRelationshipsQuery({
    companyId,
  });

  const incomingCustomerRelationshipsCount = companyRelationshipsData
    ? companyRelationshipsData.customer.filter((relationship) =>
        isIncomingRelationship(relationship, CompanyRelationshipType.CUSTOMER)
      ).length
    : 0;
  const incomingSupplierRelationshipsCount = companyRelationshipsData
    ? companyRelationshipsData.supplier.filter((relationship) =>
        isIncomingRelationship(relationship, CompanyRelationshipType.SUPPLIER)
      ).length
    : 0;
  const invitationCount =
    incomingCustomerRelationshipsCount + incomingSupplierRelationshipsCount;

  const hasUserDismissedInvitesToast =
    getItem(HAS_USER_DISMISSED_INVITES_ALERT) === 'true';
  const shouldDisplayCompanyInvitesAlert =
    !isLoading &&
    invitationCount > 0 &&
    canEditSupplyDashboard &&
    !hasUserDismissedInvitesToast;

  const inviteCtaLink = isNetworkPageEnabled ? '/network' : '/account-settings';

  const companyInviteAlertCta = (
    <Link href={inviteCtaLink}>
      {t('dashboard:company-relationships-invites-alert-link')}
    </Link>
  );

  useEffect(() => {
    if (shouldDisplayCompanyInvitesAlert) {
      displayCtaMessage({
        cta: companyInviteAlertCta,
        title: t('dashboard:company-relationships-invites-alert-title', {
          invitationCount,
        }),
        subtitle: t('dashboard:company-relationships-invites-alert-subtitle'),
        options: {
          onClose: () => setItem(HAS_USER_DISMISSED_INVITES_ALERT, 'true'),
          toastId: INVITES_TOAST_ID,
        },
      });
    }
  }, [isLoading]);

  return null;
};
