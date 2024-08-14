/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CorporateEmissionType, Scope2Type, CarbonIntensityMetricType, TargetStrategyType, TargetPrivacyType } from "./globalTypes";

// ====================================================
// GraphQL query operation: DataPrivacyWizardQuery
// ====================================================

export interface DataPrivacyWizardQuery_companyDataPrivacyCompleteness {
  isComplete: boolean;
  numCorporateEmissionAccessMissing: number;
  numIntensityTargetPrivacyTypeMissing: number;
  numAbsoluteTargetPrivacyTypeMissing: number;
}

export interface DataPrivacyWizardQuery_corporateEmissions_verificationFile {
  id: any;
  originalFilename: string;
}

export interface DataPrivacyWizardQuery_corporateEmissions_carbonIntensities {
  intensityMetric: CarbonIntensityMetricType;
  intensityValue: number;
}

export interface DataPrivacyWizardQuery_corporateEmissions_corporateEmissionAccess {
  scope1And2: boolean | null;
  scope3: boolean | null;
  carbonOffsets: boolean | null;
  carbonIntensity: boolean | null;
  publicLink: any | null;
}

export interface DataPrivacyWizardQuery_corporateEmissions {
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
  verificationFile: DataPrivacyWizardQuery_corporateEmissions_verificationFile | null;
  carbonIntensities: DataPrivacyWizardQuery_corporateEmissions_carbonIntensities[];
  corporateEmissionAccess: DataPrivacyWizardQuery_corporateEmissions_corporateEmissionAccess | null;
}

export interface DataPrivacyWizardQuery_targets_absolute {
  scope1And2Year: number;
  scope1And2Reduction: number;
  scope3Year: number | null;
  scope3Reduction: number | null;
  strategy: TargetStrategyType;
  includeCarbonOffset: boolean;
  scope1And2PrivacyType: TargetPrivacyType | null;
  scope3PrivacyType: TargetPrivacyType | null;
}

export interface DataPrivacyWizardQuery_targets_intensity {
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

export interface DataPrivacyWizardQuery_targets {
  absolute: DataPrivacyWizardQuery_targets_absolute[];
  intensity: DataPrivacyWizardQuery_targets_intensity[];
}

export interface DataPrivacyWizardQuery {
  companyDataPrivacyCompleteness: DataPrivacyWizardQuery_companyDataPrivacyCompleteness | null;
  corporateEmissions: DataPrivacyWizardQuery_corporateEmissions[];
  targets: DataPrivacyWizardQuery_targets | null;
}

export interface DataPrivacyWizardQueryVariables {
  companyId: any;
}
