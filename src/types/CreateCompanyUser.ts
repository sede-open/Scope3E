/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCompanyUserInput, ExpertiseDomain } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCompanyUser
// ====================================================

export interface CreateCompanyUser_createCompanyUser_company {
  id: any;
  name: string;
}

export interface CreateCompanyUser_createCompanyUser {
  id: any;
  email: string;
  firstName: string;
  lastName: string;
  expertiseDomain: ExpertiseDomain | null;
  company: CreateCompanyUser_createCompanyUser_company | null;
}

export interface CreateCompanyUser {
  createCompanyUser: CreateCompanyUser_createCompanyUser;
}

export interface CreateCompanyUserVariables {
  input: CreateCompanyUserInput;
}
