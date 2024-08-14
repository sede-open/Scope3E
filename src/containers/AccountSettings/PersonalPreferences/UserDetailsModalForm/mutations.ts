import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import { UpdateMe, UpdateMeVariables } from 'types/UpdateMe';

export const UPDATE_ME_MUTATION = gql`
  mutation UpdateMe($input: UpdateMeInput!) {
    updateMe(input: $input) {
      id
      firstName
      lastName
      expertiseDomain
    }
  }
`;

export const useUpdateMe = (
  options: MutationHookOptions<UpdateMe, UpdateMeVariables> = {}
) =>
  useMutation<UpdateMe, UpdateMeVariables>(UPDATE_ME_MUTATION, {
    ...options,
  });
