import { useQuery, gql } from '@apollo/client';

import {
  CorporateEmissionFormQuery,
  CorporateEmissionFormQueryVariables,
} from 'types/CorporateEmissionFormQuery';

export const CORPORATE_EMISSION_FORM_QUERY = gql`
  query CorporateEmissionFormQuery(
    $companyId: UUID!
    $emissionAllocation: EmissionAllocationDirection
    $statuses: [EmissionAllocationStatus!]
    $year: Int
  ) {
    emissionAllocations(
      companyId: $companyId
      emissionAllocation: $emissionAllocation
      statuses: $statuses
      year: $year
    ) {
      addedToCustomerScopeTotal
      allocationMethod
      note
      category {
        id
        name
        order
      }
      createdAt
      id
      emissions
      status
      customer {
        id
        name
        companySectors {
          sectorType
          sector {
            name
          }
        }
      }
      supplier {
        id
        name
        companySectors {
          sectorType
          sector {
            name
          }
        }
      }
      year
    }
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
      corporateEmissionAccess {
        scope1And2
        scope3
        carbonOffsets
        carbonIntensity
        publicLink
      }
    }
  }
`;

export const useCorporateEmissionFormQuery = ({
  companyId,
  emissionAllocation,
  statuses,
  year,
}: CorporateEmissionFormQueryVariables) =>
  useQuery<CorporateEmissionFormQuery>(CORPORATE_EMISSION_FORM_QUERY, {
    variables: {
      companyId,
      emissionAllocation,
      statuses,
      year,
    },
    fetchPolicy: 'cache-and-network',
  });
