/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateMeInput, ExpertiseDomain } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMe
// ====================================================

export interface UpdateMe_updateMe {
  id: any;
  firstName: string;
  lastName: string;
  expertiseDomain: ExpertiseDomain | null;
}

export interface UpdateMe {
  updateMe: UpdateMe_updateMe;
}

export interface UpdateMeVariables {
  input: UpdateMeInput;
}
