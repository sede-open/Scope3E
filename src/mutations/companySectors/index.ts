import { MutationHookOptions, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import {
  UpdateCompanySectorsMutation,
  UpdateCompanySectorsMutationVariables,
} from 'types/UpdateCompanySectorsMutation';

export const UPDATE_COMPANY_SECTORS_MUTATION = gql`
  mutation UpdateCompanySectorsMutation(
    $companySectorsInput: UpdateCompanySectorsInput!
  ) {
    updateCompanySectors(input: $companySectorsInput) {
      sectorType
      sector {
        id
        name
      }
    }
  }
`;

export const useUpdateCompanySectorsMutation = (
  options: MutationHookOptions<
    UpdateCompanySectorsMutation,
    UpdateCompanySectorsMutationVariables
  > = {}
) =>
  useMutation<
    UpdateCompanySectorsMutation,
    UpdateCompanySectorsMutationVariables
  >(UPDATE_COMPANY_SECTORS_MUTATION, {
    refetchQueries: ['GetMe'],
    ...options,
  });

export * from './types';
export * from './utils';
