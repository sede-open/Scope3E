import { useQuery, gql } from '@apollo/client';

import {
  SimulationDataQuery,
  SimulationDataQueryVariables,
} from 'types/SimulationDataQuery';

export const SIMULATION_DATA_QUERY = gql`
  query SimulationDataQuery($companyId: UUID!) {
    target(companyId: $companyId) {
      scope1And2Year
      scope1And2Reduction
      scope3Year
      scope3Reduction
      strategy
      includeCarbonOffset
    }
    baseline(companyId: $companyId) {
      id
      year
      scope1
      scope2
      scope3
      scope2Type
      offset
      verificationFile {
        id
        originalFilename
      }
    }
    latestCorporateEmission(companyId: $companyId) {
      id
      year
      scope1
      scope2
      scope3
      scope2Type
      offset
      verificationFile {
        id
        originalFilename
      }
    }
  }
`;

export const useSimulationData = ({
  companyId,
}: SimulationDataQueryVariables) =>
  useQuery<SimulationDataQuery>(SIMULATION_DATA_QUERY, {
    variables: {
      companyId,
    },
    fetchPolicy: 'cache-and-network',
  });
