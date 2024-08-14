import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import {
  CombinedSectorsQuery,
  CombinedSectorsQueryVariables,
} from 'types/CombinedSectorsQuery';
import { CombinedSolutionInterestsQuery } from 'types/CombinedSolutionInterestsQuery';
import {
  CompanyRelationshipsOnboardingQuery,
  CompanyRelationshipsOnboardingQueryVariables,
} from 'types/CompanyRelationshipsOnboardingQuery';

import {
  CompanySectorsQuery,
  CompanySectorsQueryVariables,
} from 'types/CompanySectorsQuery';
import { SolutionInterestsQuery } from 'types/SolutionInterestsQuery';
import { UserSolutionInterestsQuery } from 'types/UserSolutionInterestsQuery';

export const COMPANY_SECTORS_QUERY = gql`
  query CompanySectorsQuery($companyId: UUID!) {
    companySectors(companyId: $companyId) {
      id
      sector {
        id
        name
      }
      sectorType
      hasBeenUpdated
    }
  }
`;

export const useCompanySectorsQuery = ({
  companyId,
}: CompanySectorsQueryVariables) =>
  useQuery<CompanySectorsQuery>(COMPANY_SECTORS_QUERY, {
    variables: {
      companyId,
    },
  });

export const COMBINED_SECTORS_QUERY = gql`
  query CombinedSectorsQuery($companyId: UUID!) {
    sectors {
      id
      name
    }
    companySectors(companyId: $companyId) {
      id
      sector {
        id
        name
      }
      sectorType
      hasBeenUpdated
    }
  }
`;

export const useCombinedSectorsQuery = ({
  companyId,
}: CombinedSectorsQueryVariables) =>
  useQuery<CombinedSectorsQuery>(COMBINED_SECTORS_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      companyId,
    },
  });

export const SOLUTION_INTERESTS_QUERY = gql`
  query SolutionInterestsQuery {
    solutionInterests {
      id
      systemName
    }
  }
`;

export const useSolutionInterestsQuery = () =>
  useQuery<SolutionInterestsQuery>(SOLUTION_INTERESTS_QUERY);

export const USER_SOLUTION_INTERESTS_QUERY = gql`
  query UserSolutionInterestsQuery {
    userSolutionInterests {
      id
      solutionInterest {
        id
        systemName
      }
    }
  }
`;

export const useUserSolutionInterestsQuery = () =>
  useQuery<UserSolutionInterestsQuery>(USER_SOLUTION_INTERESTS_QUERY);

export const COMBINED_SOLUTION_INTERESTS_QUERY = gql`
  query CombinedSolutionInterestsQuery {
    userSolutionInterests {
      id
      solutionInterest {
        id
        systemName
      }
    }
    solutionInterests {
      id
      systemName
    }
  }
`;

export const useCombinedSolutionInterestsQuery = () =>
  useQuery<CombinedSolutionInterestsQuery>(COMBINED_SOLUTION_INTERESTS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

export const COMPANY_RELATIONSHIPS_ONBOARDING_QUERY = gql`
  query CompanyRelationshipsOnboardingQuery($companyId: UUID!) {
    customer: companyRelationships(
      companyId: $companyId
      relationshipType: CUSTOMER
    ) {
      id
      status
      inviteType
      customer {
        name
        status
      }
      supplier {
        name
        status
      }
    }
    supplier: companyRelationships(
      companyId: $companyId
      relationshipType: SUPPLIER
    ) {
      id
      status
      inviteType
      customer {
        name
        status
      }
      supplier {
        name
        status
      }
    }
  }
`;

export const useCompanyRelationshipsOnboardingQuery = (
  options: QueryHookOptions<
    CompanyRelationshipsOnboardingQuery,
    CompanyRelationshipsOnboardingQueryVariables
  >
) =>
  useQuery<
    CompanyRelationshipsOnboardingQuery,
    CompanyRelationshipsOnboardingQueryVariables
  >(COMPANY_RELATIONSHIPS_ONBOARDING_QUERY, options);
