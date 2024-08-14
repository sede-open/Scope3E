import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { DeleteUser, DeleteUserVariables } from 'types/DeleteUser';

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input)
  }
`;

export const useDeleteUser = (
  options: MutationHookOptions<DeleteUser, DeleteUserVariables> = {}
) =>
  useMutation<DeleteUser, DeleteUserVariables>(DELETE_USER_MUTATION, {
    ...options,
    refetchQueries: ['UsersQuery', 'AccountSettingsDataQuery'],
  });
