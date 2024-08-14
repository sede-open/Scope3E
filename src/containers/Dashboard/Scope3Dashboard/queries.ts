import { gql, useQuery } from '@apollo/client';

import {
  Scope3DashboardAllocationsQuery,
  Scope3DashboardAllocationsQueryVariables,
} from 'types/Scope3DashboardAllocationsQuery';

export const SCOPE3_DASHBOARD_ALLOCATIONS_QUERY = gql`
  query Scope3DashboardAllocationsQuery(
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
        order
        systemName
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
  }
`;

export const useScope3DashboardAllocationsQuery = ({
  companyId,
  emissionAllocation,
  statuses,
  year,
}: Scope3DashboardAllocationsQueryVariables) =>
  useQuery<
    Scope3DashboardAllocationsQuery,
    Scope3DashboardAllocationsQueryVariables
  >(SCOPE3_DASHBOARD_ALLOCATIONS_QUERY, {
    variables: {
      companyId,
      emissionAllocation,
      statuses,
      year,
    },
    fetchPolicy: 'cache-and-network',
  });
