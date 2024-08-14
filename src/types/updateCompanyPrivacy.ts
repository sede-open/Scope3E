/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyPrivacyInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateCompanyPrivacy
// ====================================================

export interface updateCompanyPrivacy_updateCompanyPrivacy {
  allPlatform: boolean;
  customerNetwork: boolean;
  supplierNetwork: boolean;
}

export interface updateCompanyPrivacy {
  updateCompanyPrivacy: updateCompanyPrivacy_updateCompanyPrivacy | null;
}

export interface updateCompanyPrivacyVariables {
  input: CompanyPrivacyInput;
}
