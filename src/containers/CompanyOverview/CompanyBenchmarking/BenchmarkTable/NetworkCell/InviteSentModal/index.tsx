import Button from 'components/Button';
import Modal from 'components/Modal';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import * as StyledComponents from './styles';
import * as selectors from '../../../selectors';

type Props = {
  isOpen: boolean;
  onClose(): void;
};

export const InviteSentModal = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation('companyOverview');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledComponents.Container>
        <StyledComponents.Title>{t('invitationSent')}</StyledComponents.Title>
        <StyledComponents.Content>
          {t('inviteSentModal.info')}
        </StyledComponents.Content>
        <StyledComponents.Content>
          <Trans
            i18nKey="companyOverview:inviteSentModal.moreInfo"
            components={{
              link: <Link href="/network" />,
            }}
          />
        </StyledComponents.Content>
        <StyledComponents.ActionButtonContainer>
          <Button
            data-testid={selectors.inviteSentModalCloseBtn}
            onClick={onClose}
          >
            {t('ok')}
          </Button>
        </StyledComponents.ActionButtonContainer>
      </StyledComponents.Container>
    </Modal>
  );
};
