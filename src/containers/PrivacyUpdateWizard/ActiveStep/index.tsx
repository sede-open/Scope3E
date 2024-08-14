import {
  EmissionStepData,
  AbsoluteStepData,
  IntensityStepData,
  EntityType,
} from '../types';
import { PrivacyUpdateAbsoluteAmbitionStep } from './PrivacyUpdateAbsoluteAmbitionStep';
import { PrivacyUpdateEmissionStep } from './PrivacyUpdateEmissionStep';
import { PrivacyUpdateIntensityAmbitionStep } from './PrivacyUpdateIntensityAmbitionStep';

interface IProps {
  companyId: string;
  step: EmissionStepData | AbsoluteStepData | IntensityStepData;
  onBackClick: () => void;
  onNextClick: () => void;
  isFirstStep: boolean;
  isFinalStep: boolean;
}

export const ActiveStep = ({
  companyId,
  step,
  onBackClick,
  onNextClick,
  isFirstStep,
  isFinalStep,
}: IProps) => {
  switch (step.stepType) {
    case EntityType.EMISSION:
      return (
        <PrivacyUpdateEmissionStep
          step={step}
          onBackClick={onBackClick}
          onNextClick={onNextClick}
          isFirstStep={isFirstStep}
          isFinalStep={isFinalStep}
        />
      );
    case EntityType.ABSOLUTE_AMBITION:
      return (
        <PrivacyUpdateAbsoluteAmbitionStep
          companyId={companyId}
          step={step}
          onBackClick={onBackClick}
          onNextClick={onNextClick}
          isFirstStep={isFirstStep}
          isFinalStep={isFinalStep}
        />
      );
    case EntityType.INTENSITY_AMBITION:
      return (
        <PrivacyUpdateIntensityAmbitionStep
          companyId={companyId}
          step={step}
          onBackClick={onBackClick}
          onNextClick={onNextClick}
          isFirstStep={isFirstStep}
          isFinalStep={isFinalStep}
        />
      );
    default:
      return null;
  }
};
