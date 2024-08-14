/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ApproveCompanyInput, CompanyStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ApproveCompany
// ====================================================

export interface ApproveCompany_approveCompany {
  id: any;
  status: CompanyStatus;
}

export interface ApproveCompany {
  approveCompany: ApproveCompany_approveCompany;
}

export interface ApproveCompanyVariables {
  input: ApproveCompanyInput;
}
