import { gql, useQuery, useLazyQuery } from '@apollo/client';
import {
  CompanyByDunsQuery,
  CompanyByDunsQueryVariables,
} from 'types/CompanyByDunsQuery';
import {
  DnBTypeaheadQuery,
  DnBTypeaheadQueryVariables,
} from 'types/DnBTypeaheadQuery';

export const DNB_TYPEAHEAD_QUERY = gql`
  query DnBTypeaheadQuery($searchTerm: String!) {
    dnbTypeaheadSearch(searchTerm: $searchTerm) {
      duns
      primaryName
      isGlobalUltimate
      globalUltimateDuns
      globalUltimatePrimaryName
      addressLine1
      addressCountryIsoAlpha2Code
      addressRegionName
    }
  }
`;

export const useDnBTypeaheadQuery = (
  { searchTerm }: DnBTypeaheadQueryVariables,
  skip: boolean = false
) =>
  useQuery<DnBTypeaheadQuery, DnBTypeaheadQueryVariables>(DNB_TYPEAHEAD_QUERY, {
    variables: {
      searchTerm,
    },
    skip,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });

export const COMPANY_BY_DUNS_QUERY = gql`
  query CompanyByDunsQuery($duns: String!) {
    companyByDuns(duns: $duns) {
      id
      name
      status
    }
  }
`;

export const useCompanyByDunsQuery = () =>
  useLazyQuery<CompanyByDunsQuery, CompanyByDunsQueryVariables>(
    COMPANY_BY_DUNS_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
    }
  );
