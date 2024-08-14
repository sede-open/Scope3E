import { gql, useQuery } from '@apollo/client';

import {
  EmissionAllocationsQuery,
  EmissionAllocationsQueryVariables,
} from 'types/EmissionAllocationsQuery';
import {
  CorporateEmissionsQuery,
  CorporateEmissionsQueryVariables,
} from 'types/CorporateEmissionsQuery';
import {
  PendingAllocationsQuery,
  PendingAllocationsQueryVariables,
} from 'types/PendingAllocationsQuery';
import {
  AllocateEmissionsFormQuery,
  AllocateEmissionsFormQueryVariables,
} from 'types/AllocateEmissionsFormQuery';

export const EMISSION_ALLOCATIONS_QUERY = gql`
  query EmissionAllocationsQuery(
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
  }
`;

export const useEmissionAllocationsQuery = ({
  companyId,
  emissionAllocation,
  statuses,
  year,
}: EmissionAllocationsQueryVariables) =>
  useQuery<EmissionAllocationsQuery, EmissionAllocationsQueryVariables>(
    EMISSION_ALLOCATIONS_QUERY,
    {
      variables: {
        companyId,
        emissionAllocation,
        statuses,
        year,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

export const PENDING_ALLOCATIONS_QUERY = gql`
  query PendingAllocationsQuery($companyId: UUID!, $year: Int) {
    awaitingApproval: emissionAllocations(
      companyId: $companyId
      emissionAllocation: EMISSION_ALLOCATED_BY_SUPPLIERS
      statuses: [AWAITING_APPROVAL]
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
    requested: emissionAllocations(
      companyId: $companyId
      emissionAllocation: EMISSION_ALLOCATED_TO_CUSTOMERS
      statuses: [REQUESTED]
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
  }
`;

export const usePendingAllocationsQuery = ({
  companyId,
  year,
}: PendingAllocationsQueryVariables) =>
  useQuery<PendingAllocationsQuery, PendingAllocationsQueryVariables>(
    PENDING_ALLOCATIONS_QUERY,
    {
      variables: {
        companyId,
        year,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

export const CORPORATE_EMISSIONS_QUERY = gql`
  query CorporateEmissionsQuery($companyId: UUID!) {
    corporateEmissions(companyId: $companyId) {
      id
      year
      scope1
      scope2
      scope3
      offset
    }
  }
`;

export const useCorporateEmissionsQuery = ({
  companyId,
}: CorporateEmissionsQueryVariables) =>
  useQuery<CorporateEmissionsQuery, CorporateEmissionsQueryVariables>(
    CORPORATE_EMISSIONS_QUERY,
    {
      variables: {
        companyId,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

export const ALLOCATE_EMISSIONS_FORM_QUERY = gql`
  query AllocateEmissionsFormQuery(
    $companyId: UUID!
    $relationshipType: CompanyRelationshipType!
    $status: InviteStatus!
  ) {
    companyRelationships: companyRelationships(
      companyId: $companyId
      relationshipType: $relationshipType
      status: $status
    ) {
      id
      inviteType
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
        location
        status
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
        location
        status
      }
      note
      createdAt
      updatedAt
    }
    corporateEmissions: corporateEmissions(companyId: $companyId) {
      id
      year
      scope1
      scope2
      scope3
      offset
    }
  }
`;

export const useAllocateEmissionsFormQuery = ({
  companyId,
  relationshipType,
  status,
}: AllocateEmissionsFormQueryVariables) =>
  useQuery<AllocateEmissionsFormQuery>(ALLOCATE_EMISSIONS_FORM_QUERY, {
    variables: {
      companyId,
      relationshipType,
      status,
    },
  });
