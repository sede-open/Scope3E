/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CarbonIntensityQuery
// ====================================================

export interface CarbonIntensityQuery_corporateCarbonIntensityComparisons_sectorIntensity {
  scope1: number | null;
  scope2: number | null;
  scope3: number | null;
}

export interface CarbonIntensityQuery_corporateCarbonIntensityComparisons_companyIntensity {
  scope1: number | null;
  scope2: number | null;
  scope3: number | null;
}

export interface CarbonIntensityQuery_corporateCarbonIntensityComparisons {
  year: number;
  sectorIntensity: CarbonIntensityQuery_corporateCarbonIntensityComparisons_sectorIntensity;
  companyIntensity: CarbonIntensityQuery_corporateCarbonIntensityComparisons_companyIntensity;
}

export interface CarbonIntensityQuery {
  corporateCarbonIntensityComparisons: CarbonIntensityQuery_corporateCarbonIntensityComparisons[] | null;
}

export interface CarbonIntensityQueryVariables {
  companyId: any;
  years: number[];
}
