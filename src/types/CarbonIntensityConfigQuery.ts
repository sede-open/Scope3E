/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CarbonIntensityMetricType, CarbonIntensityGroupType } from "./globalTypes";

// ====================================================
// GraphQL query operation: CarbonIntensityConfigQuery
// ====================================================

export interface CarbonIntensityConfigQuery_carbonIntensityConfig {
  type: CarbonIntensityMetricType;
  minValue: number;
  maxValue: number;
  numberOfDecimals: number;
  group: CarbonIntensityGroupType;
}

export interface CarbonIntensityConfigQuery {
  carbonIntensityConfig: CarbonIntensityConfigQuery_carbonIntensityConfig[];
}
