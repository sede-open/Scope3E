import Button from 'components/Button';
import Modal from 'components/Modal';
import { CloseModalType, ModalType } from 'context/ModalProvider/types';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { ctaSelector, dismissSelector } from './selectors';
import * as styledComponents from './styledComponents';

interface PrivacySharingModalProps {
  closeModal: (type?: CloseModalType) => void;
  modalType: ModalType.EMISSION_ALLOCATION | ModalType.NEW_CONNECTION;
}

export const PrivacySharingModal = ({
  closeModal,
  modalType,
}: PrivacySharingModalProps) => {
  const { t } = useTranslation();
  const header =
    modalType === ModalType.EMISSION_ALLOCATION
      ? t('valueChain:allocation-form-modal-save-title-success')
      : t('companyRelationships:new-connection-modal-save-title-success');
  const body =
    modalType === ModalType.EMISSION_ALLOCATION
      ? t('valueChain:allocation-form-modal-save-subtitle-success')
      : t('companyRelationships:new-connection-modal-save-subtitle-success');

  const cta =
    modalType === ModalType.EMISSION_ALLOCATION
      ? t('valueChain:allocation-form-modal-button-cta')
      : t('companyRelationships:new-connection-modal-button-cta');

  const dismiss =
    modalType === ModalType.EMISSION_ALLOCATION
      ? t('valueChain:allocation-form-modal-button-dismiss')
      : t('companyRelationships:new-connection-modal-button-dismiss');
  return (
    <Modal
      isOpen
      onClose={() => closeModal(CloseModalType.LATER)}
      customStyleExtras={{ maxWidth: '840px' }}
    >
      <div>
        <styledComponents.HeaderIcon />
        <styledComponents.HeaderText>{header}</styledComponents.HeaderText>
      </div>
      <styledComponents.BodyContent>{body}</styledComponents.BodyContent>

      <styledComponents.ButtonContainer>
        <Button
          color="secondary"
          data-testid={dismissSelector}
          onClick={() => closeModal(CloseModalType.LATER)}
        >
          {dismiss}
        </Button>

        <Link href="/account-settings/your-organisation" passHref>
          <Button color="primary" data-testid={ctaSelector}>
            {cta}
          </Button>
        </Link>
      </styledComponents.ButtonContainer>
    </Modal>
  );
};
