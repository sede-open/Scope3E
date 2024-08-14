import {
  DataPrivacyWizardQuery_corporateEmissions as DataPrivacyCorporateEmission,
  DataPrivacyWizardQuery_targets_absolute as DataPrivacyAbsoluteTarget,
  DataPrivacyWizardQuery_targets_intensity as DataPrivacyIntensityTarget,
} from 'types/DataPrivacyWizardQuery';
import { TargetType } from 'types/globalTypes';
import {
  AbsoluteStepData,
  EmissionStepData,
  EntityType,
  IntensityStepData,
} from './types';

export const calculateProgressPercentage = (
  currentStepIndex: number,
  totalNumbSteps: number
) => Math.round(100 / totalNumbSteps) * currentStepIndex;

/**
 * We render one step if a user is missing privacy data for EITHER 1 or 2 target records.
 *
 * This is because 2 target records can be addressed in 1 step.
 */
export const getNumberOfRequiredStepsFromNumMissingTargets = (
  numMissingTargets: number
) => {
  return numMissingTargets > 0 ? 1 : 0;
};

export const filterEmissionsMissingCorporateEmissionAccess = (
  emission: DataPrivacyCorporateEmission
) => emission.corporateEmissionAccess === null;

export const dataPrivacyCorporateEmissionToEmissionStepData = (
  emission: DataPrivacyCorporateEmission
): EmissionStepData => ({
  ...emission,
  carbonIntensities: emission.carbonIntensities.map((intensity) => ({
    type: intensity.intensityMetric,
    value: intensity.intensityValue,
  })),
  stepType: EntityType.EMISSION,
});

export const filterTargetsMissingPrivacyType = (
  target: DataPrivacyAbsoluteTarget | DataPrivacyIntensityTarget
) => target.scope1And2PrivacyType === null || target.scope3PrivacyType === null;

export const dataPrivacyAbsoluteTargetToAbsoluteStepData = ({
  scope1And2Year,
  scope1And2Reduction,
  scope3Year,
  scope3Reduction,
  strategy,
  includeCarbonOffset,
  scope1And2PrivacyType,
  scope3PrivacyType,
}: DataPrivacyAbsoluteTarget): AbsoluteStepData => ({
  scope1And2Year,
  scope1And2Reduction,
  scope3Year,
  scope3Reduction,
  strategy,
  includeCarbonOffset,
  scope1And2PrivacyType,
  scope3PrivacyType,
  targetType: TargetType.ABSOLUTE,
  stepType: EntityType.ABSOLUTE_AMBITION,
});

export const dataPrivacyIntensityTargetToIntensityStepData = ({
  scope1And2Year,
  scope1And2Reduction,
  scope3Year,
  scope3Reduction,
  strategy,
  includeCarbonOffset,
  scope1And2PrivacyType,
  scope3PrivacyType,
  intensityMetric,
}: DataPrivacyIntensityTarget): IntensityStepData => ({
  scope1And2Year,
  scope1And2Reduction,
  scope3Year,
  scope3Reduction,
  strategy,
  includeCarbonOffset,
  scope1And2PrivacyType,
  scope3PrivacyType,
  intensityMetric,
  targetType: TargetType.INTENSITY,
  stepType: EntityType.INTENSITY_AMBITION,
});
