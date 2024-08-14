import { UpdateEmissionAllocationInput } from 'types/globalTypes';
import { UPDATE_EMISSION_ALLOCATION_MUTATION } from 'containers/ValueChain/mutations';
import { GraphQLError } from 'graphql';

export const getAcceptEmissionAllocationMock = ({
  addedToCustomerScopeTotal,
  allocationMethod,
  categoryId,
  customerEmissionId,
  id,
  status,
}: UpdateEmissionAllocationInput) => ({
  request: {
    query: UPDATE_EMISSION_ALLOCATION_MUTATION,
    variables: {
      input: {
        addedToCustomerScopeTotal,
        allocationMethod,
        categoryId,
        customerEmissionId,
        id,
        status,
      },
    },
  },
  result: {
    data: {
      emissionAllocation: {
        id,
      },
    },
  },
});

export const getAcceptEmissionAllocationMockError = ({
  addedToCustomerScopeTotal,
  allocationMethod,
  categoryId,
  customerEmissionId,
  id,
  status,
}: UpdateEmissionAllocationInput) => ({
  request: {
    query: UPDATE_EMISSION_ALLOCATION_MUTATION,
    variables: {
      input: {
        addedToCustomerScopeTotal,
        allocationMethod,
        categoryId,
        customerEmissionId,
        id,
        status,
      },
    },
  },
  result: {
    data: null,
    errors: [
      new GraphQLError('Response not successful: Received status code 503'),
    ],
  },
});

export const getRejectEmissionAllocationMock = ({
  id,
  status,
}: UpdateEmissionAllocationInput) => ({
  request: {
    query: UPDATE_EMISSION_ALLOCATION_MUTATION,
    variables: {
      input: {
        id,
        status,
      },
    },
  },
  result: {
    data: {
      emissionAllocation: {
        id,
      },
    },
  },
});

export const getRejectEmissionAllocationMockError = ({
  customerEmissionId,
  id,
  status,
}: UpdateEmissionAllocationInput) => ({
  request: {
    query: UPDATE_EMISSION_ALLOCATION_MUTATION,
    variables: {
      input: {
        customerEmissionId,
        id,
        status,
      },
    },
  },
  result: {
    data: null,
    errors: [
      new GraphQLError('Response not successful: Received status code 503'),
    ],
  },
});

export const getEditEmissionAllocationMock = ({
  allocationMethod,
  emissions,
  id,
  supplierEmissionId,
  note,
  status,
}: UpdateEmissionAllocationInput) => ({
  request: {
    query: UPDATE_EMISSION_ALLOCATION_MUTATION,
    variables: {
      input: {
        allocationMethod,
        emissions,
        id,
        supplierEmissionId,
        note,
        status,
      },
    },
  },
  result: {
    data: {
      emissionAllocation: {
        id,
      },
    },
  },
});

export const getEditEmissionAllocationMockError = ({
  allocationMethod,
  emissions,
  id,
  supplierEmissionId,
  note,
  status,
}: UpdateEmissionAllocationInput) => ({
  request: {
    query: UPDATE_EMISSION_ALLOCATION_MUTATION,
    variables: {
      input: {
        allocationMethod,
        emissions,
        id,
        supplierEmissionId,
        note,
        status,
      },
    },
  },
  result: {
    data: null,
    errors: [
      new GraphQLError('Response not successful: Received status code 503'),
    ],
  },
});
