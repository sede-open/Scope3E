import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import { SaveTargets, SaveTargetsVariables } from 'types/SaveTargets';

export const SAVE_TARGETS_MUTATION = gql`
  mutation SaveTargets($input: SaveTargetsInput!) {
    saveTargets(input: $input) {
      success
    }
  }
`;

export const useSaveTargets = (
  options: MutationHookOptions<SaveTargets, SaveTargetsVariables> = {}
) =>
  useMutation<SaveTargets, SaveTargetsVariables>(SAVE_TARGETS_MUTATION, {
    ...options,
    refetchQueries: ['DashboardDataQuery', 'SimulationDataQuery'],
  });
