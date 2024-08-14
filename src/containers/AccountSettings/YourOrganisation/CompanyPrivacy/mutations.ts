import { gql, MutationHookOptions, useMutation } from '@apollo/client';
import {
  createCompanyPrivacyVariables,
  createCompanyPrivacy_createCompanyPrivacy,
} from 'types/createCompanyPrivacy';
import {
  updateCompanyPrivacyVariables,
  updateCompanyPrivacy_updateCompanyPrivacy,
} from 'types/updateCompanyPrivacy';

export const COMPANY_PRIVACY_CREATE_MUTATION = gql`
  mutation createCompanyPrivacy($input: CompanyPrivacyInput!) {
    createCompanyPrivacy(input: $input) {
      allPlatform
      customerNetwork
      supplierNetwork
    }
  }
`;

export const COMPANY_PRIVACY_UPDATE_MUTATION = gql`
  mutation updateCompanyPrivacy($input: CompanyPrivacyInput!) {
    updateCompanyPrivacy(input: $input) {
      allPlatform
      customerNetwork
      supplierNetwork
    }
  }
`;

export const useUpdateCompanyPrivacyMutation = (
  options: MutationHookOptions<
    updateCompanyPrivacy_updateCompanyPrivacy,
    updateCompanyPrivacyVariables
  > = {}
) =>
  useMutation<
    updateCompanyPrivacy_updateCompanyPrivacy,
    updateCompanyPrivacyVariables
  >(COMPANY_PRIVACY_UPDATE_MUTATION, {
    refetchQueries: ['companyPrivacy'],
    ...options,
  });

export const useCreateCompanyPrivacyMutation = (
  options: MutationHookOptions<
    createCompanyPrivacy_createCompanyPrivacy,
    createCompanyPrivacyVariables
  > = {}
) =>
  useMutation<
    createCompanyPrivacy_createCompanyPrivacy,
    createCompanyPrivacyVariables
  >(COMPANY_PRIVACY_CREATE_MUTATION, {
    refetchQueries: ['companyPrivacy'],
    ...options,
  });
