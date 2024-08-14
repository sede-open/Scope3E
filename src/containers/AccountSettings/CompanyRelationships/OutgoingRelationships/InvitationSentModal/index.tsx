import Button from 'components/Button';
import { Link } from 'components/Link';
import Modal from 'components/Modal';
import { Text } from 'components/Text';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { ButtonContainer, ModalContainer } from './styledComponents';

interface IInvitationSentModal {
  closeModal: () => void;
}

export const InvitationSentModal = ({ closeModal }: IInvitationSentModal) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen onClose={closeModal}>
      <ModalContainer>
        <Text size="2rem" family={exampleBold} color={Tundora}>
          {t('companyRelationships:invitation-sent-modal-title')}
        </Text>
        <Text size="0.875rem" color={Tundora}>
          {t('companyRelationships:invitation-sent-modal-text-1')}
        </Text>
        <Text size="0.875rem" color={Tundora}>
          <Trans
            i18nKey="companyRelationships:invitation-sent-modal-text-2"
            components={[
              <Link href="/network/getting-started" target="_blank" />,
            ]}
          />
        </Text>
        <ButtonContainer>
          <Button onClick={closeModal}>OK</Button>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};
