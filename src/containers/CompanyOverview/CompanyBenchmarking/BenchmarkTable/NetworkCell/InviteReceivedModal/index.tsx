import Link from 'next/link';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { CompanyRelationshipType } from 'types/globalTypes';
import * as StyledComponents from '../styles';
import * as selectors from '../../../selectors';

type Props = {
  isOpen: boolean;
  companyName: string;
  relationshipType: CompanyRelationshipType;
  onClose(): void;
};
export const InviteReceivedModal = ({
  isOpen,
  onClose,
  companyName,
  relationshipType,
}: Props) => {
  const { t } = useTranslation('companyOverview');
  const tRelationship =
    relationshipType === CompanyRelationshipType.CUSTOMER
      ? t('customer')
      : t('supplier');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledComponents.Container>
        <StyledComponents.Title>
          {t('invitationReceived')}
        </StyledComponents.Title>
        <StyledComponents.Content>
          {t('invitationReceivedModal.info', {
            companyName,
            relationship: tRelationship,
          })}
        </StyledComponents.Content>
        <StyledComponents.Content>
          <Trans
            i18nKey="companyOverview:invitationReceivedModal.moreInfo"
            components={{
              link: <Link href="/network" />,
            }}
          />
        </StyledComponents.Content>
        <StyledComponents.ActionButtonContainer>
          <Button
            data-testid={selectors.inviteReceivedModalCloseBtn}
            onClick={onClose}
          >
            {t('ok')}
          </Button>
        </StyledComponents.ActionButtonContainer>
      </StyledComponents.Container>
    </Modal>
  );
};
