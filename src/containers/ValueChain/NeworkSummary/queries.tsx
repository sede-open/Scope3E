import { gql, useQuery } from '@apollo/client';
import { NetworkSummaryQuery } from 'types/NetworkSummaryQuery';

export const NETWORK_SUMMARY_QUERY = gql`
  query NetworkSummaryQuery {
    networkSummary {
      companyId
      numSuppliers
      numCustomers
      numPendingInvitations
    }
  }
`;

export const useNetworkSummaryQuery = () =>
  useQuery<NetworkSummaryQuery>(NETWORK_SUMMARY_QUERY, {
    fetchPolicy: 'cache-and-network',
  });
