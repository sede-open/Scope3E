import { DeleteEmissionAllocationInput } from 'types/globalTypes';
import { DELETE_EMISSION_ALLOCATION_MUTATION } from 'containers/ValueChain/mutations';
import { GraphQLError } from 'graphql';

export const getDeleteEmissionAllocationMock = ({
  id,
}: DeleteEmissionAllocationInput) => ({
  request: {
    query: DELETE_EMISSION_ALLOCATION_MUTATION,
    variables: {
      input: {
        id,
      },
    },
  },
  result: {
    data: id,
  },
});

export const getDeleteEmissionAllocationMockError = ({
  id,
}: DeleteEmissionAllocationInput) => ({
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
    errors: [
      new GraphQLError('Response not successful: Received status code 503'),
    ],
  },
});
