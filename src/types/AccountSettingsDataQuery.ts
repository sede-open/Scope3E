/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExpertiseDomain, RoleName, CompanyStatus, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: AccountSettingsDataQuery
// ====================================================

export interface AccountSettingsDataQuery_companyUsers_roles {
  id: any;
  name: RoleName;
}

export interface AccountSettingsDataQuery_companyUsers_company {
  id: any;
  name: string;
  status: CompanyStatus;
}

export interface AccountSettingsDataQuery_companyUsers {
  id: any;
  email: string;
  firstName: string;
  lastName: string;
  expertiseDomain: ExpertiseDomain | null;
  roles: AccountSettingsDataQuery_companyUsers_roles[] | null;
  company: AccountSettingsDataQuery_companyUsers_company | null;
  status: UserStatus;
}

export interface AccountSettingsDataQuery {
  companyUsers: AccountSettingsDataQuery_companyUsers[];
}
