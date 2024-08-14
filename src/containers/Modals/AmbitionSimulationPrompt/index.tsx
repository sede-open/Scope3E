import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { trackEvent } from 'utils/analytics';
import {
  BASELINE_SUCCESS_MODAL_DISMISSED,
  SHARE_AMBITION_EXPERIENCED_FLOW,
} from 'utils/analyticsEvents';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { AvenirNextBold } from 'styles/fonts';
import { Tundora } from 'styles/colours';
import { ModalType } from 'context/ModalProvider/types';
import { useModal } from 'effects/useModal';
import Button from 'components/Button';
import { Text } from 'components/Text';
import { ButtonSpacer } from 'components/ButtonSpacer';
import { Success } from 'components/Glyphs/Success';
import Modal from 'components/Modal';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  closeModal: () => void;
}

export const AmbitionSimulationPrompt = ({ closeModal }: IProps) => {
  const { t } = useTranslation();

  const { company } = useAuthenticatedUser();

  const { openModal } = useModal();

  const openNewTargetModal = useCallback(() => {
    openModal({
      modalType: ModalType.TARGET_FORM,
    });
  }, []);

  const onClose = useCallback(() => {
    closeModal();
    trackEvent(BASELINE_SUCCESS_MODAL_DISMISSED, {
      companyId: company?.id,
      companyName: company?.name,
    });
  }, []);

  return (
    <Modal isOpen onClose={closeModal}>
      <StyledComponents.Container data-testid={selectors.baselineSuccess}>
        <StyledComponents.Heading>
          <StyledComponents.IconContainer>
            <Success title="success check" />
          </StyledComponents.IconContainer>
          <StyledComponents.MessageContainer>
            <Text as="h1" size="32px" family={AvenirNextBold} color={Tundora}>
              {t('baselineSuccess:title')}
            </Text>
            <StyledComponents.Subtitle size="16px" color={Tundora}>
              {t('baselineSuccess:subtitle')}
            </StyledComponents.Subtitle>
          </StyledComponents.MessageContainer>
        </StyledComponents.Heading>
        <StyledComponents.ButtonContainer>
          <Button
            color="primary"
            data-testid={selectors.newBaselineSuccessAddTarget}
            onClick={() => {
              openNewTargetModal();
              trackEvent(SHARE_AMBITION_EXPERIENCED_FLOW, {
                companyId: company?.id,
                companyName: company?.name,
              });
            }}
          >
            {t('baselineSuccess:add-target')}
          </Button>
          <ButtonSpacer />
          <Button
            color="secondary"
            data-testid={selectors.baselineSuccessClose}
            onClick={onClose}
          >
            {t('baselineSuccess:add-later')}
          </Button>
        </StyledComponents.ButtonContainer>
      </StyledComponents.Container>
    </Modal>
  );
};
