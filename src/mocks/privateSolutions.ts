import {
  COMBINED_SOLUTION_INTERESTS_QUERY,
  USER_SOLUTION_INTERESTS_QUERY,
} from 'queries/userOnboarding';
import { CompanySectorType } from 'types/globalTypes';
import { UserSolutionInterestsQuery_userSolutionInterests } from 'types/UserSolutionInterestsQuery';
import { solutionInterests } from './solutionInterests';

export const user = {
  canEditSupplyDashboard: true,
  company: {
    id: 'some-id',
    name: 'Surfs Up',
    companySectors: [
      {
        sectorType: CompanySectorType.PRIMARY,
        sector: { name: 'IT services' },
      },
    ],
  },
};

export const privateSolutionCardMock = {
  MOCK_example_SOLUTION: {
    src: 'image-path/to-somewhere',
    title: 'Test Solution',
    subtext: 'Some solution subtext',
    url: 'http://wwww.example.com',
  },

  MOCK_THIRD_PARTY_SOLUTION: {
    src: 'image-path/to-somewhere',
    title: 'Another Test Solution',
    subtext: 'Another solution subtext',
    url: 'http://wwww.testurl.com',
  },
};

export const getCombinedSolutionInterestsQueryMock = (
  userSolutionInterests: any[]
) => ({
  request: {
    query: COMBINED_SOLUTION_INTERESTS_QUERY,
  },
  result: {
    data: {
      solutionInterests,
      userSolutionInterests,
    },
  },
});

export const getUserSolutionInterestsQueryMock = (
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
