import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import {
  InviteAndConnectMutation,
  InviteAndConnectMutationVariables,
} from 'types/InviteAndConnectMutation';

export const INVITE_AND_CONNECT_MUTATION = gql`
  mutation InviteAndConnectMutation($input: InviteAndConnectToCompanyInput!) {
    inviteAndConnectToCompany(input: $input) {
      id
      status
      note
    }
  }
`;

export const useInviteAndConnectMutation = (
  options: MutationHookOptions<
    InviteAndConnectMutation,
    InviteAndConnectMutationVariables
  > = {}
) =>
  useMutation<InviteAndConnectMutation, InviteAndConnectMutationVariables>(
    INVITE_AND_CONNECT_MUTATION,
    {
      ...options,
      refetchQueries: ['CompanyRelationshipsQuery'],
    }
  );
