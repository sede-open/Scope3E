/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyPrivacyInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createCompanyPrivacy
// ====================================================

export interface createCompanyPrivacy_createCompanyPrivacy {
  allPlatform: boolean;
  customerNetwork: boolean;
  supplierNetwork: boolean;
}

export interface createCompanyPrivacy {
  createCompanyPrivacy: createCompanyPrivacy_createCompanyPrivacy | null;
}

export interface createCompanyPrivacyVariables {
  input: CompanyPrivacyInput;
}
