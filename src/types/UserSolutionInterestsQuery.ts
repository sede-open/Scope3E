/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SolutionInterestsSystemName } from "./globalTypes";

// ====================================================
// GraphQL query operation: UserSolutionInterestsQuery
// ====================================================

export interface UserSolutionInterestsQuery_userSolutionInterests_solutionInterest {
  id: string;
  systemName: SolutionInterestsSystemName;
}

export interface UserSolutionInterestsQuery_userSolutionInterests {
  id: any;
  solutionInterest: UserSolutionInterestsQuery_userSolutionInterests_solutionInterest;
}

export interface UserSolutionInterestsQuery {
  userSolutionInterests: UserSolutionInterestsQuery_userSolutionInterests[];
}
