/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCorporateEmissionInput, CorporateEmissionType, Scope2Type, CarbonIntensityMetricType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCorporateEmission
// ====================================================

export interface CreateCorporateEmission_createCorporateEmission_carbonIntensities {
  intensityMetric: CarbonIntensityMetricType;
  intensityValue: number;
}

export interface CreateCorporateEmission_createCorporateEmission_corporateEmissionAccess {
  scope1And2: boolean | null;
  scope3: boolean | null;
  publicLink: any | null;
  carbonOffsets: boolean | null;
  carbonIntensity: boolean | null;
}

export interface CreateCorporateEmission_createCorporateEmission {
  id: any;
  type: CorporateEmissionType;
  year: number;
  scope1: number;
  scope2: number;
  scope2Type: Scope2Type;
  scope3: number | null;
  offset: number | null;
  examplePercentage: number | null;
  headCount: number | null;
  carbonIntensities: CreateCorporateEmission_createCorporateEmission_carbonIntensities[];
  corporateEmissionAccess: CreateCorporateEmission_createCorporateEmission_corporateEmissionAccess | null;
}

export interface CreateCorporateEmission {
  createCorporateEmission: CreateCorporateEmission_createCorporateEmission | null;
}

export interface CreateCorporateEmissionVariables {
  input: CreateCorporateEmissionInput;
}
