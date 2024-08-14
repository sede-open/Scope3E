import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import {
  AcceptCompanyInviteMutation,
  AcceptCompanyInviteMutationVariables,
} from 'types/AcceptCompanyInviteMutation';
import {
  DeclineCompanyInviteMutation,
  DeclineCompanyInviteMutationVariables,
} from 'types/DeclineCompanyInviteMutation';

export const ACCEPT_COMPANY_INVITE_MUTATION = gql`
  mutation AcceptCompanyInviteMutation($input: AcceptCompanyInviteInput!) {
    acceptCompanyInvite(input: $input)
  }
`;

export const useAcceptCompanyInviteMutation = (
  options: MutationHookOptions<
    AcceptCompanyInviteMutation,
    AcceptCompanyInviteMutationVariables
  > = {}
) =>
  useMutation<
    AcceptCompanyInviteMutation,
    AcceptCompanyInviteMutationVariables
  >(ACCEPT_COMPANY_INVITE_MUTATION, {
    ...options,
  });

export const DECLINE_COMPANY_INVITE_MUTATION = gql`
  mutation DeclineCompanyInviteMutation($input: DeclineCompanyInviteInput!) {
    declineCompanyInvite(input: $input)
  }
`;

export const useDeclineCompanyInviteMutation = (
  options: MutationHookOptions<
    DeclineCompanyInviteMutation,
    DeclineCompanyInviteMutationVariables
  > = {}
) =>
  useMutation<
    DeclineCompanyInviteMutation,
    DeclineCompanyInviteMutationVariables
  >(DECLINE_COMPANY_INVITE_MUTATION, {
    ...options,
  });
