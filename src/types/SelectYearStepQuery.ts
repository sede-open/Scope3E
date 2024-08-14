/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CorporateEmissionType } from "./globalTypes";

// ====================================================
// GraphQL query operation: SelectYearStepQuery
// ====================================================

export interface SelectYearStepQuery_corporateEmissions {
  id: any;
  type: CorporateEmissionType;
  year: number;
}

export interface SelectYearStepQuery {
  corporateEmissions: SelectYearStepQuery_corporateEmissions[];
}

export interface SelectYearStepQueryVariables {
  companyId: any;
}
