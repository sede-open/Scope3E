import { UPDATE_COMPANY_RELATIONSHIP_MUTATION } from 'containers/AccountSettings/CompanyRelationships/mutations';
import { GraphQLError } from 'graphql';
import { COMBINED_USER_ONBOARDING_MUTATION } from 'mutations/userOnboarding';
import {
  COMBINED_SECTORS_QUERY,
  COMBINED_SOLUTION_INTERESTS_QUERY,
  COMPANY_RELATIONSHIPS_ONBOARDING_QUERY,
} from 'queries/userOnboarding';
import {
  CompanyRelationshipsOnboardingQuery_customer,
  CompanyRelationshipsOnboardingQuery_supplier,
} from 'types/CompanyRelationshipsOnboardingQuery';
import { CompanySectorsQuery_companySectors } from 'types/CompanySectorsQuery';
import {
  InviteStatus,
  UpdateCompanySectorsInput,
  UpdateUserSolutionInterestsInput,
} from 'types/globalTypes';
import { UpdateCompanyRelationshipMutation_updateCompanyRelationship } from 'types/UpdateCompanyRelationshipMutation';

import { USER_COMPANY_ID } from './constants';
import { getSectorId } from './sectors';
import { solutionInterests } from './solutionInterests';

export const getCombinedUserOnboardingMutationMock = (
  updateCompanySectors: UpdateCompanySectorsInput,
  updateUserSolutionInterests: UpdateUserSolutionInterestsInput
) => ({
  request: {
    query: COMBINED_USER_ONBOARDING_MUTATION,
    variables: {
      companySectorsInput: updateCompanySectors,
      userSolutionInterestsInput: updateUserSolutionInterests,
    },
  },
  result: {
    data: {
      updateCompanySectors: updateCompanySectors.sectors.map(
        ({ sectorType, id }) => ({
          sectorType,
          sector: {
            id,
            systemName: id.slice(0, -3),
          },
        })
      ),
      updateUserSolutionInterests: updateUserSolutionInterests.solutionInterestIds.map(
        (id) => ({
          solutionInterest: { id },
        })
      ),
    },
  },
});

export const getCombinedUserOnboardingMutationMockError = (
  updateCompanySectors: UpdateCompanySectorsInput,
  updateUserSolutionInterests: UpdateUserSolutionInterestsInput
) => ({
  request: {
    query: COMBINED_USER_ONBOARDING_MUTATION,
    variables: {
      companySectorsInput: updateCompanySectors,
      userSolutionInterestsInput: updateUserSolutionInterests,
    },
  },
  result: {
    data: null,
    errors: [
      new GraphQLError('Response not successful: Received status code 503'),
    ],
  },
});

export const updateCompanyRelationshipMutationMock = (
  relationshipId: string,
  status: InviteStatus,
  result: UpdateCompanyRelationshipMutation_updateCompanyRelationship | null,
  errors?: GraphQLError[] | null
) => ({
  request: {
    query: UPDATE_COMPANY_RELATIONSHIP_MUTATION,
    variables: {
      input: { id: relationshipId, status },
    },
  },
  result: {
    data: result
      ? {
          updateCompanyRelationship: {
            result,
          },
        }
      : null,
    errors,
  },
});

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

export const getCombinedSectorsQueryMock = (
  companySectors: CompanySectorsQuery_companySectors[]
) => ({
  request: {
    query: COMBINED_SECTORS_QUERY,
    variables: {
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      companySectors,
      sectors: [
        'Coating, engraving and allied services',
        'Telephone communication',
        'Arrangement of passenger transportation',
        'Petroleum and petroleum products, nec',
      ].map((systemName: string) => ({
        id: getSectorId(systemName),
        systemName,
      })),
    },
  },
});

export const getCompanyRelationshipsUserOnboardingMock = ({
  companyId,
  customer = [],
  supplier = [],
}: {
  companyId?: string;
  customer?: CompanyRelationshipsOnboardingQuery_customer[];
  supplier?: CompanyRelationshipsOnboardingQuery_supplier[];
}) => ({
  request: {
    query: COMPANY_RELATIONSHIPS_ONBOARDING_QUERY,
    variables: {
      companyId: companyId ?? USER_COMPANY_ID,
    },
  },
  result: {
    data: {
      customer: customer || [],
      supplier: supplier || [],
    },
  },
});
