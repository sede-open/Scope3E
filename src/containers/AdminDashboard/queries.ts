import { useQuery, gql } from '@apollo/client';
import { UsersQuery } from 'types/UsersQuery';
import { AdminCompaniesQuery } from 'types/AdminCompaniesQuery';

export const USERS_QUERY = gql`
  query UsersQuery($offset: Int, $limit: Int) {
    users(offset: $offset, limit: $limit) {
      data {
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
      count
    }
  }
`;

export const useUsersQuery = (variables: { offset: number; limit: number }) =>
  useQuery<UsersQuery>(USERS_QUERY, { variables });

export const ADMIN_COMPANIES_QUERY = gql`
  query AdminCompaniesQuery($offset: Int, $limit: Int) {
    companies(offset: $offset, limit: $limit) {
      data {
        id
        name
        dnbCountry
        status
        updatedAt
        createdAt
        reviewedAt
        createdByUser {
          id
          firstName
          lastName
          email
          roles {
            id
            name
          }
        }
        users {
          id
          firstName
          lastName
          email
          roles {
            id
            name
          }
        }
      }
      total
    }
  }
`;

export const useAdminCompaniesQuery = (variables: {
  offset: number;
  limit: number;
}) => {
  return useQuery<AdminCompaniesQuery>(ADMIN_COMPANIES_QUERY, { variables });
};
