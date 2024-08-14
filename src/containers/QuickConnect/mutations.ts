import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import {
  UpdateCompanyRelationshipRecommendationStatus,
  UpdateCompanyRelationshipRecommendationStatusVariables,
} from 'types/UpdateCompanyRelationshipRecommendationStatus';

export const UPDATE_COMPANY_RELATIONSHIP_RECOMMENDATION_STATUS_MUTATION = gql`
  mutation UpdateCompanyRelationshipRecommendationStatus(
    $id: UUID!
    $status: CompanyRelationshipRecommendationStatus!
  ) {
    updateCompanyRelationshipRecommendationStatus(id: $id, status: $status)
  }
`;

export const useUpdateCompanyRelationshipRecommendationStatus = (
  options: MutationHookOptions<
    UpdateCompanyRelationshipRecommendationStatus,
    UpdateCompanyRelationshipRecommendationStatusVariables
  > = {}
) =>
  useMutation<
    UpdateCompanyRelationshipRecommendationStatus,
    UpdateCompanyRelationshipRecommendationStatusVariables
  >(UPDATE_COMPANY_RELATIONSHIP_RECOMMENDATION_STATUS_MUTATION, {
    ...options,
  });
