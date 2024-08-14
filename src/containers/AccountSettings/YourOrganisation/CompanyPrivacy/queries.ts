import {
  gql,
  OperationVariables,
  QueryHookOptions,
  useQuery,
} from '@apollo/client';
import { companyPrivacy } from 'types/companyPrivacy';

export const COMPANY_PRIVACY_QUERY = gql`
  query companyPrivacy {
    companyPrivacy {
      allPlatform
      customerNetwork
      supplierNetwork
    }
  }
`;

export const useCompanyPrivacyQuery = (
  options?: QueryHookOptions<companyPrivacy, OperationVariables>
) => useQuery<companyPrivacy>(COMPANY_PRIVACY_QUERY, options);
