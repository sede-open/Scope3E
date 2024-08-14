/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput, RoleName, CompanyStatus, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser_roles {
  id: any;
  name: RoleName;
}

export interface CreateUser_createUser_company {
  id: any;
  name: string;
  status: CompanyStatus;
}

export interface CreateUser_createUser {
  id: any;
  email: string;
  firstName: string;
  lastName: string;
  roles: CreateUser_createUser_roles[] | null;
  company: CreateUser_createUser_company | null;
  status: UserStatus;
}

export interface CreateUser {
  createUser: CreateUser_createUser;
}

export interface CreateUserVariables {
  input: CreateUserInput;
}
