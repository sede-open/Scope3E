/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCorporateEmissionInput, CorporateEmissionType, Scope2Type, CarbonIntensityMetricType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCorporateEmission
// ====================================================

export interface UpdateCorporateEmission_updateCorporateEmission_carbonIntensities {
  intensityMetric: CarbonIntensityMetricType;
  intensityValue: number;
}

export interface UpdateCorporateEmission_updateCorporateEmission {
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
  carbonIntensities: UpdateCorporateEmission_updateCorporateEmission_carbonIntensities[];
}

export interface UpdateCorporateEmission {
  updateCorporateEmission: UpdateCorporateEmission_updateCorporateEmission | null;
}

export interface UpdateCorporateEmissionVariables {
  input: UpdateCorporateEmissionInput;
}
