import { gql, useQuery } from '@apollo/client';
import { SectorsQuery, SectorsQueryVariables } from 'types/SectorsQuery';

export const SECTORS_QUERY = gql`
  query SectorsQuery(
    $searchTerm: SafeString
    $pageNumber: Int
    $pageSize: PageSize
  ) {
    sectors(
      searchTerm: $searchTerm
      pageNumber: $pageNumber
      pageSize: $pageSize
    ) {
      id
      name
    }
  }
`;

export const useSectorsQuery = ({
  searchTerm,
  pageNumber,
  pageSize,
}: SectorsQueryVariables = {}) =>
  useQuery<SectorsQuery, SectorsQueryVariables>(SECTORS_QUERY, {
    skip: true,
    variables: {
      searchTerm,
      pageNumber,
      pageSize,
    },
  });

export * from './constants';
export * from './utils';
