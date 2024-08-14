import Button from 'components/Button';
import { CTAContainer } from 'components/CTAContainer';
import { Text } from 'components/Text';
import useTranslation from 'next-translate/useTranslation';
import { CompanyRelationshipsQuery_companyRelationships } from 'types/CompanyRelationshipsQuery';
import { CompanyRelationshipType } from 'types/globalTypes';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  dataTestId?: string;
  invite: CompanyRelationshipsQuery_companyRelationships;
  isDisabled: boolean;
  onAccept: (id: string, companyName: string) => void;
  onReject: (id: string, companyName: string) => void;
  shouldDisplayControls: boolean;
}
/**
 * @deprecated
 * Can be removed once network epic is released and stable
 */
export const Invite = ({
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
    ? invite.supplier.name
    : invite.customer.name;

  return (
    <StyledComponents.InviteContainer data-testid={dataTestId}>
      <StyledComponents.InviterContainer>
        <StyledComponents.InviterInfo>
          <StyledComponents.InviteTitle>
            {inviteTitle}
          </StyledComponents.InviteTitle>
          <Text>{companyName}</Text>
        </StyledComponents.InviterInfo>
        {shouldDisplayControls && (
          <CTAContainer>
            <Button
              color="secondary"
              disabled={isDisabled}
              data-testid={selectors.rejectButton}
              onClick={() => onReject(invite.id, companyName)}
            >
              {t('companyRelationships:invite-button-reject')}
            </Button>
            <Button
              color="primary"
              disabled={isDisabled}
              data-testid={selectors.acceptButton}
              onClick={() => onAccept(invite.id, companyName)}
            >
              {t('companyRelationships:invite-button-accept')}
            </Button>
          </CTAContainer>
        )}
      </StyledComponents.InviterContainer>

      <StyledComponents.InviteTitle>
        {t('companyRelationships:invite-message-title')}
      </StyledComponents.InviteTitle>
      <Text>
        {invite.note ?? t('companyRelationships:invite-message-placeholder')}
      </Text>
    </StyledComponents.InviteContainer>
  );
};

Invite.defaultProps = {
  dataTestId: undefined,
};
