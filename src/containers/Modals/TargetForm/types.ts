import {
  TargetStrategyType,
  CarbonIntensityMetricType,
  TargetPrivacyType,
} from 'types/globalTypes';
import { OptionType } from 'components/SingleSelect';

export enum IncludeCarbonOffsetStatus {
  INCLUDED = 'INCLUDED',
  EXCLUDED = 'EXCLUDED',
}

export enum FormTargetType {
  ABSOLUTE = 'absolute',
  INTENSITY = 'intensity',
}

export interface AbsoluteFormValues {
  baselineScope1And2: OptionType;
  baselineScope3: OptionType;
  scope1And2Year: { value: number; label: number } | null;
  scope3Year: { value: number; label: number } | null;
  scope1And2Reduction: number | null;
  scope3Reduction: number | null;
  strategy: TargetStrategyType | null;
  includeCarbonOffset: IncludeCarbonOffsetStatus | null;
  scope1And2PrivacyType: TargetPrivacyType | null;
  scope3PrivacyType: TargetPrivacyType | null;
}

export interface IntensityFormValues extends AbsoluteFormValues {
  intensityMetric: {
    value: CarbonIntensityMetricType;
    label: string;
    intensityValue: number;
  } | null;
}

export interface FormValues {
  absolute: AbsoluteFormValues[];
  intensity: IntensityFormValues[];
}

export const FIELD_KEYS = {
  INTENSITY_METRIC: 'intensityMetric',
  BASELINE_SCOPE_1_AND_2: 'baselineScope1And2',
  BASELINE_SCOPE_3: 'baselineScope3',
  SCOPE_1_AND_2_YEAR: 'scope1And2Year',
  SCOPE_3_YEAR: 'scope3Year',
  SCOPE_1_AND_2_REDUCTION: 'scope1And2Reduction',
  SCOPE_3_REDUCTION: 'scope3Reduction',
  STRATEGY: 'strategy',
  INCLUDE_CARBON_OFFSET: 'includeCarbonOffset',
  SCOPE_1_AND_2_PRIVACY_TYPE: 'scope1And2PrivacyType',
  SCOPE_3_PRIVACY_TYPE: 'scope3PrivacyType',
} as const;
