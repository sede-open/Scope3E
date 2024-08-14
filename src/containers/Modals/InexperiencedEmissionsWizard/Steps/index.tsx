import { CorporateEmissionType } from 'types/globalTypes';
import { ModalType } from 'context/ModalProvider/types';
import { useModal } from 'effects/useModal';
import { TaskListPromptContentType } from 'containers/Modals/TaskListPrompt/types';

import { InexperiencedFlowSteps, WizardState } from '../types';
import { SelectYear } from './SelectYear';
import { SelectScope1Sources } from './SelectScope1Sources';
import { SelectScope2Sources } from './SelectScope2Sources';
import { DataNeededOverview } from './DataNeededOverview';
import { StationaryMobileCombustionForm } from './StationaryMobileCombustionForm';
import { HeatCoolingForm } from './HeatCoolingForm';
import { Summary } from './Summary';
import { ProcessRefrigerantsForm } from './ProcessRefrigerantsForm';
import { ElectricityForm } from './ElectricityForm';

interface IProps {
  currentStep: InexperiencedFlowSteps;
  onBack: () => void;
  closeModal: () => void;
  onConditionalClose: (update?: Partial<WizardState>) => void;
  onNext: () => void;
  onSetExternalLinkDisclaimer: (
    url: string,
    update?: Partial<WizardState>
  ) => void;
  wizardState: WizardState;
  emissionType: CorporateEmissionType | null;
  selectedEmissionYear?: number;
}

export const Steps = ({
  currentStep,
  onBack,
  closeModal,
  onConditionalClose,
  onNext,
  emissionType,
  onSetExternalLinkDisclaimer,
  wizardState,
  selectedEmissionYear,
}: IProps) => {
  const { openModal } = useModal();

  const onSuccess = () => {
    if (emissionType === CorporateEmissionType.BASELINE) {
      openModal({
        modalType: ModalType.TASK_LIST_PROMPT,
        contentProps: {
          contentType: TaskListPromptContentType.UNLOCKED_DASHBOARD,
        },
      });

      return;
    }

    closeModal();
  };

  switch (currentStep) {
    case InexperiencedFlowSteps.SELECT_EMISSION_YEAR:
      return (
        <SelectYear
          closeModal={onConditionalClose}
          onNext={onNext}
          wizardState={wizardState}
          emissionType={emissionType}
          selectedEmissionYear={selectedEmissionYear}
        />
      );

    case InexperiencedFlowSteps.SELECT_SCOPE_1_SOURCES:
      return (
        <SelectScope1Sources
          closeModal={onConditionalClose}
          emissionType={emissionType}
          onBack={onBack}
          onNext={onNext}
          wizardState={wizardState}
        />
      );
    case InexperiencedFlowSteps.SELECT_SCOPE_2_SOURCES:
      return (
        <SelectScope2Sources
          closeModal={onConditionalClose}
          emissionType={emissionType}
          onBack={onBack}
          onNext={onNext}
          wizardState={wizardState}
        />
      );
    case InexperiencedFlowSteps.DATA_NEEDED_OVERVIEW:
      return (
        <DataNeededOverview
          closeModal={onConditionalClose}
          emissionType={emissionType}
          onBack={onBack}
          onNext={onNext}
          wizardState={wizardState}
        />
      );
    case InexperiencedFlowSteps.STATIONARY_MOBILE_COMBUSTION_FORM:
      return (
        <StationaryMobileCombustionForm
          closeModal={onConditionalClose}
          emissionType={emissionType}
          onBack={onBack}
          onNext={onNext}
          onSetExternalLinkDisclaimer={onSetExternalLinkDisclaimer}
          wizardState={wizardState}
        />
      );
    case InexperiencedFlowSteps.PROCESS_REFRIGERANT_FORM:
      return (
        <ProcessRefrigerantsForm
          closeModal={onConditionalClose}
          emissionType={emissionType}
          onBack={onBack}
          onNext={onNext}
          onSetExternalLinkDisclaimer={onSetExternalLinkDisclaimer}
          wizardState={wizardState}
        />
      );
    case InexperiencedFlowSteps.ELECTRICITY_FORM:
      return (
        <ElectricityForm
          closeModal={onConditionalClose}
          emissionType={emissionType}
          onBack={onBack}
          onNext={onNext}
          wizardState={wizardState}
        />
      );
    case InexperiencedFlowSteps.HEAT_COOLING_FORM:
      return (
        <HeatCoolingForm
          closeModal={onConditionalClose}
          emissionType={emissionType}
          onBack={onBack}
          onNext={onNext}
          wizardState={wizardState}
        />
      );
    case InexperiencedFlowSteps.SUMMARY:
      return (
        <Summary
          closeModal={onConditionalClose}
          emissionType={emissionType}
          onBack={onBack}
          onNext={onSuccess}
          wizardState={wizardState}
        />
      );
    default:
      return null;
  }
};

Steps.defaultProps = {
  selectedEmissionYear: undefined,
};
