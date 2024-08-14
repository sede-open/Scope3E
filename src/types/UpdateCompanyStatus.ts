/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCompanyStatusInput, CompanyStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCompanyStatus
// ====================================================

export interface UpdateCompanyStatus_updateCompanyStatus {
  id: any;
  status: CompanyStatus;
}

export interface UpdateCompanyStatus {
  updateCompanyStatus: UpdateCompanyStatus_updateCompanyStatus;
}

export interface UpdateCompanyStatusVariables {
  input: UpdateCompanyStatusInput;
}
