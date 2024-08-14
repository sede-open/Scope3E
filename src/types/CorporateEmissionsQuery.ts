/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CorporateEmissionsQuery
// ====================================================

export interface CorporateEmissionsQuery_corporateEmissions {
  id: any;
  year: number;
  scope1: number;
  scope2: number;
  scope3: number | null;
  offset: number | null;
}

export interface CorporateEmissionsQuery {
  corporateEmissions: CorporateEmissionsQuery_corporateEmissions[];
}

export interface CorporateEmissionsQueryVariables {
  companyId: any;
}
