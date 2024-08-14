/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: CompanyByDunsQuery
// ====================================================

export interface CompanyByDunsQuery_companyByDuns {
  id: any;
  name: string;
  status: CompanyStatus;
}

export interface CompanyByDunsQuery {
  companyByDuns: CompanyByDunsQuery_companyByDuns | null;
}

export interface CompanyByDunsQueryVariables {
  duns: string;
}
