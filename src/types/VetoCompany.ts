/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VetoCompanyInput, CompanyStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: VetoCompany
// ====================================================

export interface VetoCompany_vetoCompany {
  id: any;
  status: CompanyStatus;
}

export interface VetoCompany {
  vetoCompany: VetoCompany_vetoCompany;
}

export interface VetoCompanyVariables {
  input: VetoCompanyInput;
}
