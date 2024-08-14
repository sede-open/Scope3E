/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CarbonIntensityMetricType, TargetStrategyType } from "./globalTypes";

// ====================================================
// GraphQL query operation: TargetsQuery
// ====================================================

export interface TargetsQuery_targets_intensity {
  intensityMetric: CarbonIntensityMetricType;
  scope1And2Year: number;
  scope1And2Reduction: number;
  scope3Year: number | null;
  scope3Reduction: number | null;
  strategy: TargetStrategyType;
  includeCarbonOffset: boolean;
}

export interface TargetsQuery_targets {
  intensity: TargetsQuery_targets_intensity[];
}

export interface TargetsQuery {
  targets: TargetsQuery_targets | null;
}

export interface TargetsQueryVariables {
  companyId: any;
}
