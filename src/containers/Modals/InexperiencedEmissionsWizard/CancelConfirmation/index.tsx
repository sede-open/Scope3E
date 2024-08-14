import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { CorporateEmissionType } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import {
  INEXPERIENCED_FLOW_CANCEL_CONFIRM,
  INEXPERIENCED_FLOW_CANCEL_DISMISS,
} from 'utils/analyticsEvents';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import Button from 'components/Button';
import { CTAContainer } from 'components/CTAContainer';
import { ModalForm } from 'components/ModalForm';
import { WizardStepLayout } from 'components/Wizard/WizardStepLayout';
import { companySectorsPrimarySectorName } from 'utils/companySectors';

import { InexperiencedFlowSteps } from '../types';
import * as selectors from '../selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  emissionType: CorporateEmissionType | null;
  currentStep: InexperiencedFlowSteps;
  onDismiss: () => void;
  onConfirm: () => void;
}

export const CancelConfirmation = ({
  emissionType,
  currentStep,
  onDismiss,
  onConfirm,
}: IProps) => {
  const { t } = useTranslation();

  const { company } = useAuthenticatedUser();

  const handleConfirm = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_CANCEL_CONFIRM, {
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      companyName: company?.name,
      emissionType,
      currentStep,
    });

    onConfirm();
  }, []);

  const handleDismiss = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_CANCEL_DISMISS, {
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      companyName: company?.name,
      emissionType,
      currentStep,
    });

    onDismiss();
  }, []);

  return (
    <WizardStepLayout>
      <ModalForm
        dataTestId={selectors.cancelConfirmation}
        isLoading={false}
        title={t('inexperiencedFlow:cancel-confirmation-title')}
        onSubmit={handleConfirm}
      >
        <StyledComponents.StyledParagraph>
          {t('inexperiencedFlow:cancel-confirmation-text')}
        </StyledComponents.StyledParagraph>

        <CTAContainer>
          <Button
            width="auto"
            color="secondary"
            data-testid={selectors.cancelConfirmationCancel}
            onClick={handleDismiss}
          >
            {t('inexperiencedFlow:cancel-confirmation-cancel')}
          </Button>
          <Button
            width="auto"
            type="button"
            color="primary"
            data-testid={selectors.cancelConfirmationConfirm}
            onClick={handleConfirm}
          >
            {t('inexperiencedFlow:cancel-confirmation-confirm')}
          </Button>
        </CTAContainer>
      </ModalForm>
    </WizardStepLayout>
  );
};
