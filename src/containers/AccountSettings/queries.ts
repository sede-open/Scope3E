import { useQuery, gql } from '@apollo/client';
import { AccountSettingsDataQuery } from 'types/AccountSettingsDataQuery';

export const ACCOUNT_SETTINGS_DATA_QUERY = gql`
  query AccountSettingsDataQuery {
    companyUsers {
      id
      email
      firstName
      lastName
      expertiseDomain
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

export const useAccountSettingsData = () =>
  useQuery<AccountSettingsDataQuery>(ACCOUNT_SETTINGS_DATA_QUERY);
