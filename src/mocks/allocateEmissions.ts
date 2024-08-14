import { CreateEmissionAllocationInput } from 'types/globalTypes';
import { CREATE_EMISSION_ALLOCATION_MUTATION } from 'containers/ValueChain/mutations';
import { GraphQLError } from 'graphql';
import { USER_COMPANY_ID } from './constants';

export const getCreateEmissionAllocationMock = ({
  allocationMethod,
  customerId,
  supplierId,
  emissions,
  supplierEmissionId,
  customerEmissionId,
  year,
  note,
}: CreateEmissionAllocationInput) => ({
  request: {
    query: CREATE_EMISSION_ALLOCATION_MUTATION,
    variables: {
      input: {
        allocationMethod,
        customerId,
        emissions,
        supplierEmissionId,
        customerEmissionId,
        supplierId: supplierId ?? USER_COMPANY_ID,
        year,
        note,
      },
    },
  },
  result: {
    data: {
      emissionAllocation: {
        id: 'some-id',
      },
    },
  },
});

export const getCreateEmissionAllocationErrorMock = ({
  allocationMethod,
  customerId,
  emissions,
  supplierEmissionId,
  year,
}: CreateEmissionAllocationInput) => ({
  request: {
    query: CREATE_EMISSION_ALLOCATION_MUTATION,
    variables: {
      input: {
        allocationMethod,
        customerId,
        emissions,
        supplierEmissionId,
        supplierId: USER_COMPANY_ID,
        year,
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
