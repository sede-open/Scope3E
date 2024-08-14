import {
  DataPrivacyWizardQuery_corporateEmissions as DataPrivacyCorporateEmission,
  DataPrivacyWizardQuery_targets_absolute as DataPrivacyAbsoluteTarget,
  DataPrivacyWizardQuery_targets_intensity as DataPrivacyIntensityTarget,
} from 'types/DataPrivacyWizardQuery';
import { CreateCarbonIntensityData, TargetType } from 'types/globalTypes';

export enum EntityType {
  EMISSION = 'EMISSION',
  ABSOLUTE_AMBITION = 'ABSOLUTE_AMBITION',
  INTENSITY_AMBITION = 'INTENSITY_AMBITION',
}

export type EmissionStepData = Omit<
  DataPrivacyCorporateEmission,
  'carbonIntensities'
> & {
  carbonIntensities: CreateCarbonIntensityData[] | null;
  stepType: EntityType.EMISSION;
};

export type AbsoluteStepData = DataPrivacyAbsoluteTarget & {
  targetType: TargetType.ABSOLUTE;
  stepType: EntityType.ABSOLUTE_AMBITION;
};

export type IntensityStepData = DataPrivacyIntensityTarget & {
  targetType: TargetType.INTENSITY;
  stepType: EntityType.INTENSITY_AMBITION;
};

export type DataPrivacyWizardSteps =
  | EmissionStepData
  | AbsoluteStepData
  | IntensityStepData;
