/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CorporateEmissionType, Scope2Type, CarbonIntensityMetricType, TargetStrategyType, TargetPrivacyType } from "./globalTypes";

// ====================================================
// GraphQL query operation: TargetFormDataQuery
// ====================================================

export interface TargetFormDataQuery_corporateEmissions_verificationFile {
  id: any;
  originalFilename: string;
}

export interface TargetFormDataQuery_corporateEmissions_carbonIntensities {
  intensityMetric: CarbonIntensityMetricType;
  intensityValue: number;
}

export interface TargetFormDataQuery_corporateEmissions {
  id: any;
  type: CorporateEmissionType;
  year: number;
  scope1: number;
  scope2: number;
  scope3: number | null;
  scope2Type: Scope2Type;
  offset: number | null;
  examplePercentage: number | null;
  headCount: number | null;
  verificationFile: TargetFormDataQuery_corporateEmissions_verificationFile | null;
  carbonIntensities: TargetFormDataQuery_corporateEmissions_carbonIntensities[];
}

export interface TargetFormDataQuery_targets_absolute {
  scope1And2Year: number;
  scope1And2Reduction: number;
  scope3Year: number | null;
  scope3Reduction: number | null;
  strategy: TargetStrategyType;
  includeCarbonOffset: boolean;
  scope1And2PrivacyType: TargetPrivacyType | null;
  scope3PrivacyType: TargetPrivacyType | null;
}

export interface TargetFormDataQuery_targets_intensity {
  scope1And2Year: number;
  scope1And2Reduction: number;
  scope3Year: number | null;
  scope3Reduction: number | null;
  strategy: TargetStrategyType;
  includeCarbonOffset: boolean;
  intensityMetric: CarbonIntensityMetricType;
  scope1And2PrivacyType: TargetPrivacyType | null;
  scope3PrivacyType: TargetPrivacyType | null;
}

export interface TargetFormDataQuery_targets {
  absolute: TargetFormDataQuery_targets_absolute[];
  intensity: TargetFormDataQuery_targets_intensity[];
}

export interface TargetFormDataQuery {
  corporateEmissions: TargetFormDataQuery_corporateEmissions[];
  targets: TargetFormDataQuery_targets | null;
}

export interface TargetFormDataQueryVariables {
  companyId: any;
}
