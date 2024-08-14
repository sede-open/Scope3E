import { SOLUTION_INTERESTS_QUERY } from 'queries/userOnboarding';
import { SolutionInterestsSystemName } from 'types/globalTypes';

export const getSolutionInterestId = (systemName: string) => `${systemName}-id`;

export const solutionInterests = Object.keys(SolutionInterestsSystemName).map(
  (systemName: string) => ({
    id: getSolutionInterestId(systemName),
    systemName,
  })
);

export const solutionInterestsMock = {
  request: {
    query: SOLUTION_INTERESTS_QUERY,
  },
  result: {
    data: {
      solutionInterests,
    },
  },
};
