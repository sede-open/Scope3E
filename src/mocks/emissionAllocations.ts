import { GraphQLError } from 'graphql';

import { DELETE_EMISSION_ALLOCATION_MUTATION } from 'containers/ValueChain/mutations';
import {
  EMISSION_ALLOCATIONS_QUERY,
  PENDING_ALLOCATIONS_QUERY,
} from 'containers/ValueChain/queries';
import * as companyRelationshipsMocks from 'mocks/companyRelationships';
import { EmissionAllocationsQuery_emissionAllocations as EmissionAllocation } from 'types/EmissionAllocationsQuery';
import {
  CompanySectorType,
  EmissionAllocationDirection,
  EmissionAllocationMethod,
  EmissionAllocationStatus,
} from 'types/globalTypes';

const { externalCompany, userCompany } = companyRelationshipsMocks;

const externalCompanyFields = {
  id: externalCompany.id,
  companySectors: externalCompany.companySectors,
  name: externalCompany.name,
};

const userCompanyFields = {
  id: userCompany.id,
  companySectors: [
    {
      sectorType: CompanySectorType.PRIMARY,
      sector: {
        name: 'Carbon trading',
      },
    },
  ],
  name: userCompany.name,
};

export const getEmissionAllocation = (
  overwrites: Partial<EmissionAllocation> & { as: 'supplier' | 'customer' }
) => {
  const { as, ...rest } = overwrites;
  return {
    addedToCustomerScopeTotal: false,
    allocationMethod: null,
    id: '2FA2BE18-0E99-4F4D-815D-C66F143CFCB5',
    emissions: 8937,
    status: rest.status ?? EmissionAllocationStatus.APPROVED,
    note: 'Hello there',
    customer: as === 'customer' ? userCompanyFields : externalCompanyFields,
    supplier: as === 'supplier' ? userCompanyFields : externalCompanyFields,
    category: {
      id: '3A46C00E-CD7C-496C-98B2-4B83599F9C37',
      name: 'Cat. 13 - Some category',
      order: 13,
    },
    createdAt: '2021-02-26 09:41:06.937',
    year: 2020,
    ...rest,
  };
};

export const emissionAllocationsAsSupplier = [
  getEmissionAllocation({
    as: 'supplier',
    id: '1',
    emissions: 1,
    status: EmissionAllocationStatus.APPROVED,
    customer: {
      ...externalCompanyFields,
      name: 'Zed Ltd',
    },
    allocationMethod: EmissionAllocationMethod.OTHER,
  }),
  getEmissionAllocation({
    as: 'supplier',
    id: '2',
    emissions: 2,
    status: EmissionAllocationStatus.REJECTED,
    customer: {
      ...externalCompanyFields,
      name: 'Pom Ltd',
    },
    allocationMethod: EmissionAllocationMethod.PHYSICAL,
  }),
  getEmissionAllocation({
    as: 'supplier',
    id: '4',
    emissions: 4,
    status: EmissionAllocationStatus.AWAITING_APPROVAL,
    customer: {
      ...externalCompanyFields,
      name: 'Gig Ltd',
    },
    allocationMethod: EmissionAllocationMethod.ECONOMICAL,
  }),
];

export const emissionAllocationsAsCustomer = [
  getEmissionAllocation({
    as: 'customer',
    id: '1',
    emissions: 1,
    status: EmissionAllocationStatus.APPROVED,
    category: {
      id: 'b83cfc9c-3a2a-4215-ad34-9f9e169a67c8',
      name: 'Cat. 5 - Some category 5',
      order: 5,
    },
    supplier: {
      ...externalCompanyFields,
      name: 'Zed Ltd',
    },
    allocationMethod: EmissionAllocationMethod.OTHER,
  }),
  getEmissionAllocation({
    as: 'customer',
    id: '2',
    emissions: 2,
    status: EmissionAllocationStatus.REQUESTED,
    category: {
      id: 'c79411a4-942c-4278-a152-6c6fbc39e316',
      name: 'Cat. 7 - Some category 7',
      order: 7,
    },
    supplier: {
      ...externalCompanyFields,
      name: 'Pom Ltd',
    },
    allocationMethod: EmissionAllocationMethod.PHYSICAL,
  }),
  getEmissionAllocation({
    as: 'customer',
    id: '4',
    emissions: 4,
    status: EmissionAllocationStatus.REQUEST_DISMISSED,
    category: {
      id: 'c79411a4-942c-4278-a152-6c6fbc39e316',
      name: 'Cat. 15 - Some category 15',
      order: 15,
    },
    supplier: {
      ...externalCompanyFields,
      name: 'Gig Ltd',
    },
    allocationMethod: EmissionAllocationMethod.ECONOMICAL,
  }),
];

export const approvedEmissionAllocation = getEmissionAllocation({
  status: EmissionAllocationStatus.APPROVED,
  as: 'supplier',
});

export const allocationRequestDismissed = getEmissionAllocation({
  status: EmissionAllocationStatus.REQUEST_DISMISSED,
  as: 'supplier',
});

export const getEmissionAllocationsForYearMock = ({
  emissionAllocations,
  emissionAllocation,
  year,
  statuses,
}: {
  emissionAllocations: EmissionAllocation[];
  emissionAllocation: EmissionAllocationDirection;
  year: number;
  statuses?: EmissionAllocationStatus[] | null;
}) => ({
  request: {
    query: EMISSION_ALLOCATIONS_QUERY,
    variables: {
      companyId: userCompany.id,
      emissionAllocation,
      statuses: statuses ?? null,
      year,
    },
  },
  result: {
    data: {
      emissionAllocations,
    },
  },
});

export const getSupplierDashboardAllocationsForYearMock = ({
  emissionAllocations,
  emissionAllocation,
  year,
}: {
  emissionAllocations: EmissionAllocation[];
  emissionAllocation: EmissionAllocationDirection;
  year: number;
}) => ({
  request: {
    query: EMISSION_ALLOCATIONS_QUERY,
    variables: {
      companyId: userCompany.id,
      emissionAllocation,
      statuses: [
        EmissionAllocationStatus.APPROVED,
        EmissionAllocationStatus.REQUESTED,
        EmissionAllocationStatus.REQUEST_DISMISSED,
      ],
      year,
    },
  },
  result: {
    data: {
      emissionAllocations,
    },
  },
});

export const getApprovedEmissionAllocationsForYearMock = ({
  emissionAllocations,
  emissionAllocation,
  year,
}: {
  emissionAllocations: EmissionAllocation[];
  emissionAllocation: EmissionAllocationDirection;
  year: number;
}) => ({
  request: {
    query: EMISSION_ALLOCATIONS_QUERY,
    variables: {
      companyId: userCompany.id,
      emissionAllocation,
      statuses: [EmissionAllocationStatus.APPROVED],
      year,
    },
  },
  result: {
    data: {
      emissionAllocations,
    },
  },
});

export const getEmissionAllocationsMock = ({
  emissionAllocations,
  emissionAllocation,
}: {
  emissionAllocations: EmissionAllocation[];
  emissionAllocation: EmissionAllocationDirection;
}) => ({
  request: {
    query: EMISSION_ALLOCATIONS_QUERY,
    variables: {
      companyId: userCompany.id,
      emissionAllocation,
      statuses: null,
      year: null,
    },
  },
  result: {
    data: {
      emissionAllocations,
    },
  },
});

export const getApprovedEmissionAllocationsMock = ({
  emissionAllocations,
  emissionAllocation,
}: {
  emissionAllocations: EmissionAllocation[];
  emissionAllocation: EmissionAllocationDirection;
}) => ({
  request: {
    query: EMISSION_ALLOCATIONS_QUERY,
    variables: {
      companyId: userCompany.id,
      emissionAllocation,
      statuses: [EmissionAllocationStatus.APPROVED],
      year: null,
    },
  },
  result: {
    data: {
      emissionAllocations,
    },
  },
});

export const getPendingEmissionAllocationsMock = ({
  requested,
  awaitingApproval,
}: {
  awaitingApproval: EmissionAllocation[];
  requested: EmissionAllocation[];
  emissionAllocation: EmissionAllocationDirection;
}) => ({
  request: {
    query: PENDING_ALLOCATIONS_QUERY,
    variables: {
      companyId: userCompany.id,
      year: null,
    },
  },
  result: {
    data: {
      awaitingApproval,
      requested,
    },
  },
});

export const getAllocationRequestDeleteSuccessMock = ({
  id,
}: {
  id: string;
}) => ({
  request: {
    query: DELETE_EMISSION_ALLOCATION_MUTATION,
    variables: {
      input: {
        id,
      },
    },
  },
  result: {
    data: { deleteEmissionAllocation: id },
  },
});

export const getAllocationRequestDeleteFailMock = ({ id }: { id: string }) => ({
  request: {
    query: DELETE_EMISSION_ALLOCATION_MUTATION,
    variables: {
      input: {
        id,
      },
    },
  },
  result: {
    data: null,
    errors: [new GraphQLError('error')],
  },
});
