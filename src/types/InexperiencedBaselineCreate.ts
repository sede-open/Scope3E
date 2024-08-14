/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCorporateEmissionInput, CorporateEmissionType, Scope2Type } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: InexperiencedBaselineCreate
// ====================================================

export interface InexperiencedBaselineCreate_createCorporateEmission {
  id: any;
  type: CorporateEmissionType;
  year: number;
  scope1: number;
  scope2: number;
  scope2Type: Scope2Type;
  scope3: number | null;
  offset: number | null;
}

export interface InexperiencedBaselineCreate {
  createCorporateEmission: InexperiencedBaselineCreate_createCorporateEmission | null;
}

export interface InexperiencedBaselineCreateVariables {
  input: CreateCorporateEmissionInput;
}
