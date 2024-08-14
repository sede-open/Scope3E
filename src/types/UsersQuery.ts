/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RoleName, CompanyStatus, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: UsersQuery
// ====================================================

export interface UsersQuery_users_data_roles {
  id: any;
  name: RoleName;
}

export interface UsersQuery_users_data_company {
  id: any;
  name: string;
  status: CompanyStatus;
}

export interface UsersQuery_users_data {
  id: any;
  email: string;
  firstName: string;
  lastName: string;
  roles: UsersQuery_users_data_roles[] | null;
  company: UsersQuery_users_data_company | null;
  status: UserStatus;
}

export interface UsersQuery_users {
  data: UsersQuery_users_data[];
  count: number;
}

export interface UsersQuery {
  users: UsersQuery_users;
}

export interface UsersQueryVariables {
  offset?: number | null;
  limit?: number | null;
}
