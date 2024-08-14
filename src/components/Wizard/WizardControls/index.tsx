import useTranslation from 'next-translate/useTranslation';

import { Button } from 'components/Button';
import { ButtonSpacer } from 'components/ButtonSpacer';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

export interface IProps {
  closeModal: () => void;
  isSubmitting: boolean;
  isValid: boolean;
  onBack?: () => void;
  onNext?: () => void;
  nextText?: string;
  cancelText?: string;
}

export const WizardControls = ({
  isSubmitting,
  onBack,
  isValid,
  closeModal,
  onNext,
  cancelText,
  nextText,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <StyledComponents.ButtonContainer>
      <StyledComponents.RightButtonContainer>
        {onBack && (
          <Button
            color="text-button"
            data-testid={selectors.backBtn}
            disabled={isSubmitting}
            onClick={onBack}
          >
            {t('common:back')}
          </Button>
        )}
      </StyledComponents.RightButtonContainer>

      <StyledComponents.LeftButtonContainer>
        <Button
          type="submit"
          color="primary"
          data-testid={selectors.nextBtn}
          disabled={!isValid || isSubmitting}
          onClick={onNext}
        >
          {nextText ?? t('common:next')}
        </Button>
        <ButtonSpacer />
        <Button
          color="secondary"
          data-testid={selectors.cancelBtn}
          disabled={isSubmitting}
          onClick={closeModal}
        >
          {cancelText ?? t('common:cancel')}
        </Button>
      </StyledComponents.LeftButtonContainer>
    </StyledComponents.ButtonContainer>
  );
};
