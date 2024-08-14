/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCompanyUserInput, ExpertiseDomain } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditCompanyUser
// ====================================================

export interface EditCompanyUser_editCompanyUser_company {
  id: any;
  name: string;
}

export interface EditCompanyUser_editCompanyUser {
  id: any;
  email: string;
  firstName: string;
  lastName: string;
  expertiseDomain: ExpertiseDomain | null;
  company: EditCompanyUser_editCompanyUser_company | null;
}

export interface EditCompanyUser {
  editCompanyUser: EditCompanyUser_editCompanyUser;
}

export interface EditCompanyUserVariables {
  input: EditCompanyUserInput;
}
