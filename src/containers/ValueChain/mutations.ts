import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import {
  DeleteEmissionAllocationMutation,
  DeleteEmissionAllocationMutationVariables,
} from 'types/DeleteEmissionAllocationMutation';
import {
  UpdateEmissionAllocationMutation,
  UpdateEmissionAllocationMutationVariables,
} from 'types/UpdateEmissionAllocationMutation';

import {
  CreateEmissionAllocationMutation,
  CreateEmissionAllocationMutationVariables,
} from 'types/CreateEmissionAllocationMutation';

export const UPDATE_EMISSION_ALLOCATION_MUTATION = gql`
  mutation UpdateEmissionAllocationMutation(
    $input: UpdateEmissionAllocationInput!
  ) {
    updateEmissionAllocation(input: $input) {
      id
    }
  }
`;

export const useUpdateEmissionAllocationMutation = (
  options: MutationHookOptions<
    UpdateEmissionAllocationMutation,
    UpdateEmissionAllocationMutationVariables
  > = {}
) =>
  useMutation<
    UpdateEmissionAllocationMutation,
    UpdateEmissionAllocationMutationVariables
  >(UPDATE_EMISSION_ALLOCATION_MUTATION, {
    ...options,
    refetchQueries: ['EmissionAllocationsQuery', 'PendingAllocationsQuery'],
  });

export const DELETE_EMISSION_ALLOCATION_MUTATION = gql`
  mutation DeleteEmissionAllocationMutation(
    $input: DeleteEmissionAllocationInput!
  ) {
    deleteEmissionAllocation(input: $input)
  }
`;

export const useDeleteEmissionAllocationMutation = (
  options: MutationHookOptions<
    DeleteEmissionAllocationMutation,
    DeleteEmissionAllocationMutationVariables
  > = {}
) =>
  useMutation<
    DeleteEmissionAllocationMutation,
    DeleteEmissionAllocationMutationVariables
  >(DELETE_EMISSION_ALLOCATION_MUTATION, {
    ...options,
    refetchQueries: ['EmissionAllocationsQuery', 'PendingAllocationsQuery'],
  });

export const CREATE_EMISSION_ALLOCATION_MUTATION = gql`
  mutation CreateEmissionAllocationMutation(
    $input: CreateEmissionAllocationInput!
  ) {
    createEmissionAllocation(input: $input) {
      id
    }
  }
`;

export const useCreateEmissionAllocationMutation = (
  options: MutationHookOptions<
    CreateEmissionAllocationMutation,
    CreateEmissionAllocationMutationVariables
  > = {}
) =>
  useMutation<
    CreateEmissionAllocationMutation,
    CreateEmissionAllocationMutationVariables
  >(CREATE_EMISSION_ALLOCATION_MUTATION, {
    ...options,
    refetchQueries: ['EmissionAllocationsQuery'],
  });
