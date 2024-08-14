import { useQuery, gql } from '@apollo/client';
import { CompaniesQuery } from 'types/CompaniesQuery';

export const COMPANIES_QUERY = gql`
  query CompaniesQuery {
    companies {
      data {
        id
        name
      }
    }
  }
`;

export const useCompaniesQuery = (skip: boolean) =>
  useQuery<CompaniesQuery>(COMPANIES_QUERY, { skip });
