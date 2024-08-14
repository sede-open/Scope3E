/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CorporateEmissionType, Scope2Type, CarbonIntensityMetricType } from "./globalTypes";

// ====================================================
// GraphQL query operation: RemoveEmissionFormQuery
// ====================================================

export interface RemoveEmissionFormQuery_corporateEmissions_verificationFile {
  id: any;
  originalFilename: string;
}

export interface RemoveEmissionFormQuery_corporateEmissions_carbonIntensities {
  intensityMetric: CarbonIntensityMetricType;
  intensityValue: number;
}

export interface RemoveEmissionFormQuery_corporateEmissions {
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
  verificationFile: RemoveEmissionFormQuery_corporateEmissions_verificationFile | null;
  carbonIntensities: RemoveEmissionFormQuery_corporateEmissions_carbonIntensities[];
}

export interface RemoveEmissionFormQuery {
  corporateEmissions: RemoveEmissionFormQuery_corporateEmissions[];
}

export interface RemoveEmissionFormQueryVariables {
  companyId: any;
}
