/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: EditUser
// ====================================================

export interface EditUser_editUser_company {
  id: any;
  name: string;
  location: string | null;
}

export interface EditUser_editUser {
  id: any;
  email: string;
  firstName: string;
  lastName: string;
  company: EditUser_editUser_company | null;
}

export interface EditUser {
  editUser: EditUser_editUser;
}

export interface EditUserVariables {
  input: EditUserInput;
}
