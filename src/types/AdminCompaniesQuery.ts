/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyStatus, RoleName } from "./globalTypes";

// ====================================================
// GraphQL query operation: AdminCompaniesQuery
// ====================================================

export interface AdminCompaniesQuery_companies_data_users_roles {
  id: any;
  name: RoleName;
}

export interface AdminCompaniesQuery_companies_data_users {
  id: any;
  firstName: string;
  lastName: string;
  email: string;
  roles: AdminCompaniesQuery_companies_data_users_roles[] | null;
}

export interface AdminCompaniesQuery_companies_data {
  id: any;
  name: string;
  dnbCountry: string | null;
  status: CompanyStatus;
  updatedAt: any | null;
  createdAt: any | null;
  reviewedAt: any | null;
  createdByUser: AdminCompaniesQuery_companies_data_users | null;
  users: AdminCompaniesQuery_companies_data_users[];
}

export interface AdminCompaniesQuery_companies {
  data: AdminCompaniesQuery_companies_data[];
  total: number;
}

export interface AdminCompaniesQuery {
  companies: AdminCompaniesQuery_companies;
}

export interface AdminCompaniesQueryVariables {
  offset?: number | null;
  limit?: number | null;
}
