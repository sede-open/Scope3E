import { gql, useQuery } from '@apollo/client';

import {
  RemoveEmissionFormQuery,
  RemoveEmissionFormQueryVariables,
} from 'types/RemoveEmissionFormQuery';

export const REMOVE_EMISSION_FORM_QUERY = gql`
  query RemoveEmissionFormQuery($companyId: UUID!) {
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
  }
`;

export const useRemoveEmissionFormQuery = ({
  companyId,
}: RemoveEmissionFormQueryVariables) =>
  useQuery<RemoveEmissionFormQuery>(REMOVE_EMISSION_FORM_QUERY, {
    variables: {
      companyId,
    },
    fetchPolicy: 'cache-and-network',
  });
