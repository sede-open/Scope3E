/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCompanySectorsInput, UpdateUserSolutionInterestsInput, CompanySectorType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CombinedUserOnboardingMutation
// ====================================================

export interface CombinedUserOnboardingMutation_updateCompanySectors_sector {
  id: any;
  name: string;
}

export interface CombinedUserOnboardingMutation_updateCompanySectors {
  sectorType: CompanySectorType;
  sector: CombinedUserOnboardingMutation_updateCompanySectors_sector;
}

export interface CombinedUserOnboardingMutation_updateUserSolutionInterests_solutionInterest {
  id: string;
}

export interface CombinedUserOnboardingMutation_updateUserSolutionInterests {
  solutionInterest: CombinedUserOnboardingMutation_updateUserSolutionInterests_solutionInterest;
}

export interface CombinedUserOnboardingMutation {
  updateCompanySectors: CombinedUserOnboardingMutation_updateCompanySectors[];
  updateUserSolutionInterests: CombinedUserOnboardingMutation_updateUserSolutionInterests[];
}

export interface CombinedUserOnboardingMutationVariables {
  companySectorsInput: UpdateCompanySectorsInput;
  userSolutionInterestsInput: UpdateUserSolutionInterestsInput;
}
