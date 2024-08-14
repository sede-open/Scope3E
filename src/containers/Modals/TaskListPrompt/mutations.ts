import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { SuppressTaskListPrompt } from 'types/SuppressTaskListPrompt';

export const SUPPRESS_TASK_LIST_PROMPT_MUTATION = gql`
  mutation SuppressTaskListPrompt {
    editPreferences(input: { suppressTaskListPrompt: true }) {
      id
    }
  }
`;

export const useSuppressTaskListPrompt = (
  options: MutationHookOptions<SuppressTaskListPrompt> = {}
) =>
  useMutation<SuppressTaskListPrompt>(SUPPRESS_TASK_LIST_PROMPT_MUTATION, {
    ...options,
    refetchQueries: ['GetMe'],
  });
