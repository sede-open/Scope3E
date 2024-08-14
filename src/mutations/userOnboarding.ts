import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import {
  CombinedUserOnboardingMutation,
  CombinedUserOnboardingMutationVariables,
} from 'types/CombinedUserOnboardingMutation';
import {
  UpdateUserSolutionInterestsMutation,
  UpdateUserSolutionInterestsMutationVariables,
} from 'types/UpdateUserSolutionInterestsMutation';

export const COMBINED_USER_ONBOARDING_MUTATION = gql`
  mutation CombinedUserOnboardingMutation(
    $companySectorsInput: UpdateCompanySectorsInput!
    $userSolutionInterestsInput: UpdateUserSolutionInterestsInput!
  ) {
    updateCompanySectors(input: $companySectorsInput) {
      sectorType
      sector {
        id
        name
      }
    }
    updateUserSolutionInterests(input: $userSolutionInterestsInput) {
      solutionInterest {
        id
      }
    }
  }
`;

export const useCombinedUserOnboardingMutation = (
  options: MutationHookOptions<
    CombinedUserOnboardingMutation,
    CombinedUserOnboardingMutationVariables
  > = {}
) =>
  useMutation<
    CombinedUserOnboardingMutation,
    CombinedUserOnboardingMutationVariables
  >(COMBINED_USER_ONBOARDING_MUTATION, {
    ...options,
    refetchQueries: ['CombinedUserDetailsQuery'],
  });

export const UPDATE_USER_SOLUTION_INTERESTS_MUTATION = gql`
  mutation UpdateUserSolutionInterestsMutation(
    $input: UpdateUserSolutionInterestsInput!
  ) {
    updateUserSolutionInterests(input: $input) {
      solutionInterest {
        id
      }
    }
  }
`;

export const useUpdateUserSolutionInterestsMutation = (
  options: MutationHookOptions<
    UpdateUserSolutionInterestsMutation,
    UpdateUserSolutionInterestsMutationVariables
  > = {}
) =>
  useMutation<
    UpdateUserSolutionInterestsMutation,
    UpdateUserSolutionInterestsMutationVariables
  >(UPDATE_USER_SOLUTION_INTERESTS_MUTATION, {
    ...options,
    refetchQueries: ['UserSolutionInterestsQuery'],
  });
