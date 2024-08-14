import { useQuery, gql } from '@apollo/client';
import {
  TargetFormDataQuery,
  TargetFormDataQueryVariables,
} from 'types/TargetFormDataQuery';

export const TARGET_FORM_DATA_QUERY = gql`
  query TargetFormDataQuery($companyId: UUID!) {
    corporateEmissions(companyId: $companyId) {
      id
      type
      year
      scope1
      scope2
      scope3
      scope2Type
      offset
      examplePercentage
      headCount
      verificationFile {
        id
        originalFilename
      }
      carbonIntensities {
        intensityMetric
        intensityValue
      }
    }
    targets(companyId: $companyId) {
      absolute {
        scope1And2Year
        scope1And2Reduction
        scope3Year
        scope3Reduction
        strategy
        includeCarbonOffset
        scope1And2PrivacyType
        scope3PrivacyType
      }
      intensity {
        scope1And2Year
        scope1And2Reduction
        scope3Year
        scope3Reduction
        strategy
        includeCarbonOffset
        intensityMetric
        scope1And2PrivacyType
        scope3PrivacyType
      }
    }
  }
`;

export const useTargetFormData = ({
  companyId,
}: TargetFormDataQueryVariables) =>
  useQuery<TargetFormDataQuery>(TARGET_FORM_DATA_QUERY, {
    variables: {
      companyId,
    },
    fetchPolicy: 'cache-and-network',
  });
