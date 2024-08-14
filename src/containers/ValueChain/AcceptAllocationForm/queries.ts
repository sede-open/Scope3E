import { gql, useQuery } from '@apollo/client';
import { CategoriesQuery } from 'types/CategoriesQuery';

export const CATEGORIES_QUERY = gql`
  query CategoriesQuery {
    categories {
      id
      name
    }
  }
`;

export const useCategoriesQuery = () =>
  useQuery<CategoriesQuery>(CATEGORIES_QUERY);
