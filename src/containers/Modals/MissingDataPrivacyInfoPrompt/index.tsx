import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import Modal from 'components/Modal';
import Button from 'components/Button';
import { CloudDocumentWithInfoGlobe } from 'components/Glyphs/CloudDocumentWithInfoGlobe';
import {
  LocalStorageKeys,
  setItem as setLocalStorageItem,
} from 'utils/localStorage';

import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export interface IProps {
  closeModal: () => void;
  name: string;
}
export const MissingDataPrivacyInfoPrompt = ({ closeModal, name }: IProps) => {
  const { t } = useTranslation();

  const handleClose = async () => {
    const now = new Date().getTime();
    setLocalStorageItem(
      LocalStorageKeys.DATA_PRIVACY_MODAL_SNOOZED_ON,
      String(now)
    );
    closeModal();
  };

  return (
    <Modal
      isOpen
      onClose={handleClose}
      customStyleExtras={{ marginRight: 0, width: '66%' }}
    >
      <StyledComponents.Container>
        <StyledComponents.ImageContainer>
          <CloudDocumentWithInfoGlobe />
        </StyledComponents.ImageContainer>
        <StyledComponents.ContentContainer
          data-testid={selectors.missingDataPrivacyInfoModal}
        >
          <StyledComponents.TextContainer>
            <StyledComponents.Header>
              {t('dashboard:missing-privacy-info-modal-header', {
                name,
              })}
            </StyledComponents.Header>
            <StyledComponents.Body>
              {t('dashboard:missing-privacy-info-modal-body')}
            </StyledComponents.Body>
          </StyledComponents.TextContainer>
          <StyledComponents.ButtonContainer>
            <Button
              color="secondary"
              data-testid={selectors.dismissButton}
              onClick={handleClose}
            >
              {t('dashboard:missing-privacy-info-modal-body-add-later')}
            </Button>
            <Link href="/privacy/update-wizard" passHref>
              <Button color="primary" data-testid={selectors.acceptButton}>
                {t('dashboard:missing-privacy-info-start-now')}
              </Button>
            </Link>
          </StyledComponents.ButtonContainer>
        </StyledComponents.ContentContainer>
      </StyledComponents.Container>
    </Modal>
  );
};
