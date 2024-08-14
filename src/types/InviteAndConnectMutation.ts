/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InviteAndConnectToCompanyInput, InviteStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: InviteAndConnectMutation
// ====================================================

export interface InviteAndConnectMutation_inviteAndConnectToCompany {
  id: any;
  status: InviteStatus;
  note: string | null;
}

export interface InviteAndConnectMutation {
  inviteAndConnectToCompany: InviteAndConnectMutation_inviteAndConnectToCompany;
}

export interface InviteAndConnectMutationVariables {
  input: InviteAndConnectToCompanyInput;
}
