/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SolutionInterestsSystemName } from "./globalTypes";

// ====================================================
// GraphQL query operation: SolutionInterestsQuery
// ====================================================

export interface SolutionInterestsQuery_solutionInterests {
  id: string;
  systemName: SolutionInterestsSystemName;
}

export interface SolutionInterestsQuery {
  solutionInterests: SolutionInterestsQuery_solutionInterests[];
}
