/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompaniesBenchmarkInput, CompanyRelationshipType, InviteStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: CompaniesBenchmarkQuery
// ====================================================

export interface CompaniesBenchmarkQuery_companiesBenchmark_data {
  companyId: string;
  companyName: string;
  companyDuns: string;
  estimatedNumberOfEmployees: number | null;
  baselineYear: number | null;
  totalEmissionVariance: number | null;
  annualEmissionVariance: number | null;
  emissionToIntensityRatio: number | null;
  companyRelationshipType: CompanyRelationshipType | null;
  companyRelationshipStatus: InviteStatus | null;
}

export interface CompaniesBenchmarkQuery_companiesBenchmark {
  data: CompaniesBenchmarkQuery_companiesBenchmark_data[];
  total: number;
}

export interface CompaniesBenchmarkQuery {
  companiesBenchmark: CompaniesBenchmarkQuery_companiesBenchmark;
}

export interface CompaniesBenchmarkQueryVariables {
  input?: CompaniesBenchmarkInput | null;
}
