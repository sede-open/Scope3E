/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserSolutionInterestsInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserSolutionInterestsMutation
// ====================================================

export interface UpdateUserSolutionInterestsMutation_updateUserSolutionInterests_solutionInterest {
  id: string;
}

export interface UpdateUserSolutionInterestsMutation_updateUserSolutionInterests {
  solutionInterest: UpdateUserSolutionInterestsMutation_updateUserSolutionInterests_solutionInterest;
}

export interface UpdateUserSolutionInterestsMutation {
  updateUserSolutionInterests: UpdateUserSolutionInterestsMutation_updateUserSolutionInterests[];
}

export interface UpdateUserSolutionInterestsMutationVariables {
  input: UpdateUserSolutionInterestsInput;
}
