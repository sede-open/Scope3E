import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import {
  CreateCompanyRelationshipMutation,
  CreateCompanyRelationshipMutationVariables,
} from 'types/CreateCompanyRelationshipMutation';
import {
  UpdateCompanyRelationshipMutation,
  UpdateCompanyRelationshipMutationVariables,
} from 'types/UpdateCompanyRelationshipMutation';

export const UPDATE_COMPANY_RELATIONSHIP_MUTATION = gql`
  mutation UpdateCompanyRelationshipMutation(
    $input: UpdateCompanyRelationshipInput!
  ) {
    updateCompanyRelationship(input: $input) {
      id
    }
  }
`;

export const useUpdateCompanyRelationshipMutation = (
  options: MutationHookOptions<
    UpdateCompanyRelationshipMutation,
    UpdateCompanyRelationshipMutationVariables
  > = {}
) =>
  useMutation<
    UpdateCompanyRelationshipMutation,
    UpdateCompanyRelationshipMutationVariables
  >(UPDATE_COMPANY_RELATIONSHIP_MUTATION, {
    refetchQueries: [
      'CompanyRelationshipsQuery',
      'NetworkPendingInvitesQuery',
      'CompanyRelationshipWithSharedDataQuery',
    ],
    ...options,
  });

export const CREATE_COMPANY_RELATIONSHIP_MUTATION = gql`
  mutation CreateCompanyRelationshipMutation(
    $input: CreateCompanyRelationshipInput!
  ) {
    createCompanyRelationship(input: $input) {
      id
    }
  }
`;

export const useCreateCompanyRelationshipMutation = (
  options: MutationHookOptions<
    CreateCompanyRelationshipMutation,
    CreateCompanyRelationshipMutationVariables
  > = {}
) =>
  useMutation<
    CreateCompanyRelationshipMutation,
    CreateCompanyRelationshipMutationVariables
  >(CREATE_COMPANY_RELATIONSHIP_MUTATION, {
    ...options,
    refetchQueries: ['CompanyRelationshipsQuery'],
  });
