import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import { EditUser, EditUserVariables } from 'types/EditUser';
import { CreateUser, CreateUserVariables } from 'types/CreateUser';
import {
  UpdateCompanyStatus,
  UpdateCompanyStatusVariables,
} from 'types/UpdateCompanyStatus';
import { UsersQuery } from 'types/UsersQuery';
import {
  ResendUserInvite,
  ResendUserInviteVariables,
} from 'types/ResendUserInvite';
import { VetoCompany, VetoCompanyVariables } from 'types/VetoCompany';
import { ApproveCompany, ApproveCompanyVariables } from 'types/ApproveCompany';

import { USERS_QUERY } from './queries';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      firstName
      lastName
      roles {
        id
        name
      }
      company {
        id
        name
        status
      }
      status
    }
  }
`;

export const useCreateUser = (
  options: MutationHookOptions<CreateUser, CreateUserVariables> = {}
) =>
  useMutation<CreateUser, CreateUserVariables>(CREATE_USER_MUTATION, {
    ...options,
    update: (store, { data }) => {
      if (data) {
        const { createUser } = data;
        const existingData: UsersQuery | null = store.readQuery({
          query: USERS_QUERY,
          variables: {
            offset: 0,
            limit: 1000,
          },
        });

        if (existingData) {
          const updatedData = {
            ...existingData,
            users: {
              ...existingData.users,
              data: [createUser, ...existingData.users.data],
              count: existingData.users.count + 1,
            },
          };
          store.writeQuery({
            query: USERS_QUERY,
            data: updatedData,
            variables: { offset: 0, limit: 1000 },
          });
        }
      }
    },
  });

export const EDIT_USER_MUTATION = gql`
  mutation EditUser($input: EditUserInput!) {
    editUser(input: $input) {
      id
      email
      firstName
      lastName
      company {
        id
        name
        location
      }
    }
  }
`;

export const useEditUser = (
  options: MutationHookOptions<EditUser, EditUserVariables> = {}
) =>
  useMutation<EditUser, EditUserVariables>(EDIT_USER_MUTATION, {
    ...options,
    refetchQueries: ['AdminDataQuery'],
  });

export const UPDATE_COMPANY_STATUS_MUTATION = gql`
  mutation UpdateCompanyStatus($input: UpdateCompanyStatusInput!) {
    updateCompanyStatus(input: $input) {
      id
      status
    }
  }
`;

export const useUpdateCompanyStatus = (
  options: MutationHookOptions<
    UpdateCompanyStatus,
    UpdateCompanyStatusVariables
  > = {}
) =>
  useMutation<UpdateCompanyStatus, UpdateCompanyStatusVariables>(
    UPDATE_COMPANY_STATUS_MUTATION,
    {
      ...options,
      refetchQueries: ['AdminCompaniesQuery'],
    }
  );

export const RESEND_USER_INVITE_MUTATION = gql`
  mutation ResendUserInvite($input: ResendUserInviteToJoinEmailInput!) {
    resendUserInviteToJoinEmail(input: $input)
  }
`;

export const useResendUserInvite = (
  options: MutationHookOptions<ResendUserInvite, ResendUserInviteVariables> = {}
) =>
  useMutation<ResendUserInvite, ResendUserInviteVariables>(
    RESEND_USER_INVITE_MUTATION,
    {
      ...options,
    }
  );

export const VETO_COMPANY_MUTATION = gql`
  mutation VetoCompany($input: VetoCompanyInput!) {
    vetoCompany(input: $input) {
      id
      status
    }
  }
`;

export const useVetoCompany = (
  options: MutationHookOptions<VetoCompany, VetoCompanyVariables> = {}
) =>
  useMutation<VetoCompany, VetoCompanyVariables>(VETO_COMPANY_MUTATION, {
    ...options,
  });

export const APPROVE_COMPANY_MUTATION = gql`
  mutation ApproveCompany($input: ApproveCompanyInput!) {
    approveCompany(input: $input) {
      id
      status
    }
  }
`;

export const useApproveCompany = (
  options: MutationHookOptions<ApproveCompany, ApproveCompanyVariables> = {}
) =>
  useMutation<ApproveCompany, ApproveCompanyVariables>(
    APPROVE_COMPANY_MUTATION,
    {
      ...options,
    }
  );
