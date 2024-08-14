import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import { ActivateUserAndCompany } from 'types/ActivateUserAndCompany';

export const ACTIVATE_USER_AND_COMPANY_MUTATION = gql`
  mutation ActivateUserAndCompany {
    activateUserAndCompany {
      id
      status
    }
  }
`;

export const useActivateMutation = (
  options: MutationHookOptions<ActivateUserAndCompany> = {}
) =>
  useMutation<ActivateUserAndCompany>(ACTIVATE_USER_AND_COMPANY_MUTATION, {
    ...options,
    refetchQueries: ['GetMe'],
  });
