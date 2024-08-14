import { GraphQLError } from 'graphql';
import { UPDATE_USER_SOLUTION_INTERESTS_MUTATION } from 'mutations/userOnboarding';
import { USER_SOLUTION_INTERESTS_QUERY } from 'queries/userOnboarding';

import { UserSolutionInterestsQuery_userSolutionInterests } from 'types/UserSolutionInterestsQuery';

export const getUsersolutionInterestsMock = (
  userSolutionInterests: UserSolutionInterestsQuery_userSolutionInterests[]
) => ({
  request: {
    query: USER_SOLUTION_INTERESTS_QUERY,
  },
  result: {
    data: {
      userSolutionInterests,
    },
  },
});

export const getUpdateUserSolutionInterestsMutationMock = (
  solutionInterestIds: string[]
) => ({
  request: {
    query: UPDATE_USER_SOLUTION_INTERESTS_MUTATION,
    variables: {
      input: {
        solutionInterestIds,
      },
    },
  },
  result: {
    data: {
      updateUserSolutionInterests: solutionInterestIds.map((id) => ({
        solutionInterest: { id },
      })),
    },
  },
});

export const getUpdateUserSolutionInterestsMutationMockError = (
  solutionInterestIds: string[]
) => ({
  request: {
    query: UPDATE_USER_SOLUTION_INTERESTS_MUTATION,
    variables: {
      input: {
        solutionInterestIds,
      },
    },
  },
  result: {
    data: null,
    errors: [
      new GraphQLError('Response not successful: Received status code 503'),
    ],
  },
});
