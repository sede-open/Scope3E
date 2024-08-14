import Button from 'components/Button';
import { CustomerIcon } from 'components/Glyphs/CustomerIcon';
import { SupplierIcon } from 'components/Glyphs/SupplierIcon';
import useTranslation from 'next-translate/useTranslation';
import { CompanyRelationshipType } from 'types/globalTypes';
import { NetworkPendingInvitesQuery_networkSummary_pendingInvitations } from 'types/NetworkPendingInvitesQuery';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  dataTestId?: string;
  invite: NetworkPendingInvitesQuery_networkSummary_pendingInvitations;
  isDisabled: boolean;
  onAccept: (id: string, companyName: string) => void;
  onReject: (id: string, companyName: string, isSupplier: boolean) => void;
  shouldDisplayControls: boolean;
}

export const NetworkInvite = ({
  dataTestId,
  invite,
  isDisabled,
  onAccept,
  onReject,
  shouldDisplayControls,
}: IProps) => {
  const { t } = useTranslation();
  const isInviteFromSupplier =
    invite.inviteType === CompanyRelationshipType.CUSTOMER;

  const inviteTitle = isInviteFromSupplier
    ? t('companyRelationships:invite-title-supplier')
    : t('companyRelationships:invite-title-customer');

  const companyName = isInviteFromSupplier
    ? invite.supplierName
    : invite.customerName;

  return (
    <StyledComponents.InviteContainer data-testid={dataTestId}>
      <StyledComponents.IconContainer>
        {isInviteFromSupplier ? (
          <SupplierIcon dataTestId={selectors.supplierIconSelector} />
        ) : (
          <CustomerIcon dataTestId={selectors.customerIconSelector} />
        )}
      </StyledComponents.IconContainer>
      <StyledComponents.ContentContainer>
        <StyledComponents.InviterContainer>
          <StyledComponents.InviteTitle>
            {inviteTitle}
          </StyledComponents.InviteTitle>
          <p>{companyName}</p>
        </StyledComponents.InviterContainer>
        <div>
          <StyledComponents.InviteTitle>
            {t('companyRelationships:invite-message-title')}
          </StyledComponents.InviteTitle>
          <p>
            {invite.note
              ? invite.note
              : t('companyRelationships:invite-message-placeholder')}
          </p>
        </div>
      </StyledComponents.ContentContainer>

      {shouldDisplayControls && (
        <StyledComponents.ButtonContainer>
          <StyledComponents.CTAContainer>
            <Button
              color="secondary"
              disabled={isDisabled}
              onClick={() =>
                onReject(invite.id, companyName, isInviteFromSupplier)
              }
            >
              {t('companyRelationships:invite-button-reject')}
            </Button>
            <Button
              color="primary"
              disabled={isDisabled}
              onClick={() => onAccept(invite.id, companyName)}
            >
              {t('companyRelationships:invite-button-accept')}
            </Button>
          </StyledComponents.CTAContainer>
        </StyledComponents.ButtonContainer>
      )}
    </StyledComponents.InviteContainer>
  );
};
