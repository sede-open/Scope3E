import { gql, useQuery } from '@apollo/client';
import {
  CompanyRelationshipRecommendationsQuery,
  CompanyRelationshipRecommendationsQueryVariables,
} from 'types/CompanyRelationshipRecommendationsQuery';

export const COMPANY_RELATIONSHIP_RECOMMENDATIONS_QUERY = gql`
  query CompanyRelationshipRecommendationsQuery(
    $companyId: UUID!
    $relationshipTypes: [CompanyRelationshipType!]!
    $recommendationStatuses: [CompanyRelationshipRecommendationStatus!]!
  ) {
    companyRelationshipRecommendations(
      companyId: $companyId
      relationshipTypes: $relationshipTypes
      recommendationStatuses: $recommendationStatuses
    ) {
      id
      duns
      relationshipType
      recommendationStatus
      name
      companyId
      sector
      region
      country
    }
  }
`;

export const useCompanyRelationshipRecommendationsQuery = ({
  companyId,
  relationshipTypes,
  recommendationStatuses,
}: CompanyRelationshipRecommendationsQueryVariables) =>
  useQuery<CompanyRelationshipRecommendationsQuery>(
    COMPANY_RELATIONSHIP_RECOMMENDATIONS_QUERY,
    {
      variables: {
        companyId,
        relationshipTypes,
        recommendationStatuses,
      },
      fetchPolicy: 'cache-and-network',
    }
  );
