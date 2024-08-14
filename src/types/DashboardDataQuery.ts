/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CorporateEmissionType, Scope2Type, CarbonIntensityMetricType, TargetStrategyType } from "./globalTypes";

// ====================================================
// GraphQL query operation: DashboardDataQuery
// ====================================================

export interface DashboardDataQuery_corporateEmissions_verificationFile {
  id: any;
  originalFilename: string;
}

export interface DashboardDataQuery_corporateEmissions_carbonIntensities {
  intensityMetric: CarbonIntensityMetricType;
  intensityValue: number;
}

export interface DashboardDataQuery_corporateEmissions {
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
  verificationFile: DashboardDataQuery_corporateEmissions_verificationFile | null;
  carbonIntensities: DashboardDataQuery_corporateEmissions_carbonIntensities[];
}

export interface DashboardDataQuery_target {
  scope1And2Year: number;
  scope1And2Reduction: number;
  scope3Year: number | null;
  scope3Reduction: number | null;
  strategy: TargetStrategyType;
  includeCarbonOffset: boolean;
}

export interface DashboardDataQuery_companyDataPrivacyCompleteness {
  isComplete: boolean;
}

export interface DashboardDataQuery {
  corporateEmissions: DashboardDataQuery_corporateEmissions[];
  target: DashboardDataQuery_target | null;
  companyDataPrivacyCompleteness: DashboardDataQuery_companyDataPrivacyCompleteness | null;
}

export interface DashboardDataQueryVariables {
  companyId: any;
}
