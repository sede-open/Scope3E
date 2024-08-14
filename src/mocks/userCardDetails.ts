import { USER_SOLUTION_INTERESTS_QUERY } from 'queries/userOnboarding';
import { CompanySectorType } from 'types/globalTypes';
import { editorRole, viewerRole } from './adminDashboard';
import { USER_COMPANY_ID } from './constants';

export const userDetails = {
  id: '3',
  email: 'john.smith@example.com',
  firstName: 'Test',
  lastName: 'McTest',
  company: {
    id: USER_COMPANY_ID,
    name: 'Company test',
    location: 'test location',
  },
  role: editorRole,
  roles: [editorRole, viewerRole],
  canEditSupplyDashboard: true,
  canViewUsersAdminDashboard: true,
  canViewCompaniesAdminDashboard: true,
  canViewSupplyDashboard: false,
};

export const companySectors = [
  {
    id: '3',
    sectorType: CompanySectorType.PRIMARY,
    sector: {
      id: '3',
      systemName: 'RETAILING',
    },
    hasBeenUpdated: true,
  },
  {
    id: '4',
    sectorType: CompanySectorType.SECONDARY,
    sector: {
      id: '3',
      systemName: 'CHEMICALS',
    },
    hasBeenUpdated: true,
  },
];

export const getUserSolutionInterestsQueryMock = (
  userSolutionInterests: any[]
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
