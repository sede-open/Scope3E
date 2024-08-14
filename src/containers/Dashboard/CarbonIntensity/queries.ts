import { useQuery, gql } from '@apollo/client';
import { TargetsQuery, TargetsQueryVariables } from 'types/TargetsQuery';

export const TARGETS_DATA_QUERY = gql`
  query TargetsQuery($companyId: UUID!) {
    targets(companyId: $companyId) {
      intensity {
        intensityMetric
        scope1And2Year
        scope1And2Reduction
        scope3Year
        scope3Reduction
        strategy
        includeCarbonOffset
      }
    }
  }
`;

export const useTargetsData = ({ companyId }: TargetsQueryVariables) =>
  useQuery<TargetsQuery, TargetsQueryVariables>(TARGETS_DATA_QUERY, {
    variables: {
      companyId,
    },
    fetchPolicy: 'cache-and-network',
  });
