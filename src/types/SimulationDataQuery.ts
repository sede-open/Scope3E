/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TargetStrategyType, Scope2Type } from "./globalTypes";

// ====================================================
// GraphQL query operation: SimulationDataQuery
// ====================================================

export interface SimulationDataQuery_target {
  scope1And2Year: number;
  scope1And2Reduction: number;
  scope3Year: number | null;
  scope3Reduction: number | null;
  strategy: TargetStrategyType;
  includeCarbonOffset: boolean;
}

export interface SimulationDataQuery_baseline_verificationFile {
  id: any;
  originalFilename: string;
}

export interface SimulationDataQuery_baseline {
  id: any;
  year: number;
  scope1: number;
  scope2: number;
  scope3: number | null;
  scope2Type: Scope2Type;
  offset: number | null;
  verificationFile: SimulationDataQuery_baseline_verificationFile | null;
}

export interface SimulationDataQuery_latestCorporateEmission_verificationFile {
  id: any;
  originalFilename: string;
}

export interface SimulationDataQuery_latestCorporateEmission {
  id: any;
  year: number;
  scope1: number;
  scope2: number;
  scope3: number | null;
  scope2Type: Scope2Type;
  offset: number | null;
  verificationFile: SimulationDataQuery_latestCorporateEmission_verificationFile | null;
}

export interface SimulationDataQuery {
  target: SimulationDataQuery_target | null;
  baseline: SimulationDataQuery_baseline | null;
  latestCorporateEmission: SimulationDataQuery_latestCorporateEmission | null;
}

export interface SimulationDataQueryVariables {
  companyId: any;
}
