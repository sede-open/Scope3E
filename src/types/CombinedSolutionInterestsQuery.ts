/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SolutionInterestsSystemName } from "./globalTypes";

// ====================================================
// GraphQL query operation: CombinedSolutionInterestsQuery
// ====================================================

export interface CombinedSolutionInterestsQuery_userSolutionInterests_solutionInterest {
  id: string;
  systemName: SolutionInterestsSystemName;
}

export interface CombinedSolutionInterestsQuery_userSolutionInterests {
  id: any;
  solutionInterest: CombinedSolutionInterestsQuery_userSolutionInterests_solutionInterest;
}

export interface CombinedSolutionInterestsQuery_solutionInterests {
  id: string;
  systemName: SolutionInterestsSystemName;
}

export interface CombinedSolutionInterestsQuery {
  userSolutionInterests: CombinedSolutionInterestsQuery_userSolutionInterests[];
  solutionInterests: CombinedSolutionInterestsQuery_solutionInterests[];
}
