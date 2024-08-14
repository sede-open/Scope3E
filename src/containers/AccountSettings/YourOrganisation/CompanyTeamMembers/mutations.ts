import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import {
  CreateCompanyUser,
  CreateCompanyUserVariables,
} from 'types/CreateCompanyUser';
import {
  EditCompanyUser,
  EditCompanyUserVariables,
} from 'types/EditCompanyUser';
import {
  ResendAkamaiInvite,
  ResendAkamaiInviteVariables,
} from 'types/ResendAkamaiInvite';

export const CREATE_COMPANY_USER_MUTATION = gql`
  mutation CreateCompanyUser($input: CreateCompanyUserInput!) {
    createCompanyUser(input: $input) {
      id
      email
      firstName
      lastName
      expertiseDomain
      company {
        id
        name
      }
    }
  }
`;

export const useCreateCompanyUser = (
  options: MutationHookOptions<
    CreateCompanyUser,
    CreateCompanyUserVariables
  > = {}
) =>
  useMutation<CreateCompanyUser, CreateCompanyUserVariables>(
    CREATE_COMPANY_USER_MUTATION,
    {
      ...options,
      refetchQueries: ['AccountSettingsDataQuery'],
    }
  );

export const EDIT_COMPANY_USER_MUTATION = gql`
  mutation EditCompanyUser($input: EditCompanyUserInput!) {
    editCompanyUser(input: $input) {
      id
      email
      firstName
      lastName
      expertiseDomain
      company {
        id
        name
      }
    }
  }
`;

export const useEditCompanyUser = (
  options: MutationHookOptions<EditCompanyUser, EditCompanyUserVariables> = {}
) =>
  useMutation<EditCompanyUser, EditCompanyUserVariables>(
    EDIT_COMPANY_USER_MUTATION,
    {
      ...options,
      refetchQueries: ['AccountSettingsDataQuery'],
    }
  );

export const RESEND_INVITE_MUTATION = gql`
  mutation ResendAkamaiInvite($input: ResentAkamaiInviteInput!) {
    resendAkamaiInvite(input: $input)
  }
`;

export const useResendAkamaiInvite = (
  options: MutationHookOptions<
    ResendAkamaiInvite,
    ResendAkamaiInviteVariables
  > = {}
) =>
  useMutation<ResendAkamaiInvite, ResendAkamaiInviteVariables>(
    RESEND_INVITE_MUTATION,
    {
      ...options,
    }
  );
