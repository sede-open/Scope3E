import { useCallback, useEffect, useState } from 'react';

import { CorporateEmissionType } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import { INEXPERIENCED_FLOW_START } from 'utils/analyticsEvents';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { ExternalLinkDisclaimer } from 'components/ExternalLinkDisclaimer';
import Modal from 'components/Modal';
import { ProgressBar } from 'components/ProgressBar';
import { companySectorsPrimarySectorName } from 'utils/companySectors';

import { CancelConfirmation } from './CancelConfirmation';
import { Steps } from './Steps';
import { InexperiencedFlowSteps, WizardModalType, WizardState } from './types';
import {
  getInitialWizardState,
  getWizardStateWithEmissionResets,
  getWizardSteps,
  isCancelConfirmationStep,
} from './utils';
import * as selectors from './selectors';

export interface IProps {
  closeModal: () => void;
  emissionType: CorporateEmissionType | null;
  selectedEmissionYear?: number;
}

export const InexperiencedEmissionsWizard = ({
  closeModal,
  emissionType,
  selectedEmissionYear,
}: IProps) => {
  const { company } = useAuthenticatedUser();

  useEffect(() => {
    trackEvent(INEXPERIENCED_FLOW_START, {
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      companyName: company?.name,
      emissionType,
    });
  }, []);

  const [currentStep, setCurrentStep] = useState<InexperiencedFlowSteps>(
    InexperiencedFlowSteps.SELECT_EMISSION_YEAR
  );

  const [wizardState, setWizardState] = useState<WizardState>(
    getInitialWizardState()
  );

  const [modalType, setModalType] = useState<WizardModalType>(
    WizardModalType.STEPS
  );

  const setStepsModalType = useCallback(() => {
    setModalType(WizardModalType.STEPS);
  }, []);

  const onSetCancelConfirmationModalType = useCallback(() => {
    setModalType(WizardModalType.CANCEL_CONFIRMATION);
  }, []);

  const goToNextStep = useCallback(() => {
    const currentStepIndex = wizardState.steps.findIndex(
      (step) => step === currentStep
    );
    setCurrentStep(wizardState.steps[currentStepIndex + 1]);
  }, [currentStep]);

  const goToPreviousStep = useCallback(() => {
    const currentStepIndex = wizardState.steps.findIndex(
      (step) => step === currentStep
    );
    setCurrentStep(wizardState.steps[currentStepIndex - 1]);
  }, [currentStep]);

  const updateWizardStateAndSteps = useCallback(
    (update: Partial<WizardState>) => {
      const newWizardState = {
        ...wizardState,
        ...getWizardStateWithEmissionResets(update),
        ...update,
      };

      const updatedSteps = getWizardSteps(newWizardState);

      setWizardState({
        ...newWizardState,
        steps: updatedSteps,
      });
    },
    [currentStep, wizardState, modalType]
  );

  const onNext = useCallback(
    (update: Partial<WizardState> = {}) => {
      updateWizardStateAndSteps(update);
      goToNextStep();
    },
    [currentStep, wizardState]
  );

  const onBack = useCallback(
    (update: Partial<WizardState> = {}) => {
      updateWizardStateAndSteps(update);
      goToPreviousStep();
    },
    [currentStep, wizardState]
  );

  const onConditionalClose = useCallback(
    (update: Partial<WizardState> = {}) => {
      if (isCancelConfirmationStep(currentStep)) {
        updateWizardStateAndSteps(update);
        onSetCancelConfirmationModalType();
      } else {
        closeModal();
      }
    },
    [currentStep]
  );

  const [externalLinkUrl, setExternalLinkUrl] = useState('');

  const onSetExternalLinkDisclaimer = useCallback(
    (url: string, update: Partial<WizardState> = {}) => {
      updateWizardStateAndSteps(update);
      setModalType(WizardModalType.EXTERNAL_LINK_DISCLAIMER);
      setExternalLinkUrl(url);
    },
    [currentStep, wizardState]
  );

  const getProgressPercentage = useCallback(() => {
    const wizardSteps = wizardState.steps;
    const currentStepIndex = wizardSteps.findIndex(
      (step) => step === currentStep
    );

    return (currentStepIndex / wizardSteps.length) * 100;
  }, [currentStep, wizardState.steps]);

  if (modalType === WizardModalType.CANCEL_CONFIRMATION) {
    return (
      <Modal isOpen onClose={setStepsModalType} isWizard>
        <CancelConfirmation
          currentStep={currentStep}
          emissionType={emissionType}
          onDismiss={setStepsModalType}
          onConfirm={closeModal}
        />
      </Modal>
    );
  }

  if (modalType === WizardModalType.STEPS) {
    return (
      <Modal isOpen onClose={onConditionalClose} hasProgressBar isWizard>
        <ProgressBar
          dataTestId={selectors.progressBar}
          percentage={getProgressPercentage()}
        />
        <Steps
          currentStep={currentStep}
          onBack={onBack}
          closeModal={closeModal}
          onConditionalClose={onConditionalClose}
          onNext={onNext}
          onSetExternalLinkDisclaimer={onSetExternalLinkDisclaimer}
          wizardState={wizardState}
          emissionType={emissionType}
          selectedEmissionYear={selectedEmissionYear}
        />
      </Modal>
    );
  }

  if (modalType === WizardModalType.EXTERNAL_LINK_DISCLAIMER) {
    return (
      <Modal isOpen onClose={setStepsModalType}>
        <ExternalLinkDisclaimer
          externalLink={externalLinkUrl}
          onClose={setStepsModalType}
        />
      </Modal>
    );
  }

  return null;
};
