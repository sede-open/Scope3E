import { gql, useQuery } from '@apollo/client';
import { NetworkPendingInvitesQuery } from 'types/NetworkPendingInvitesQuery';

export const NETWORK_PENDING_INVITES = gql`
  query NetworkPendingInvitesQuery {
    networkSummary {
      pendingInvitations {
        updatedAt
        createdAt
        note
        supplierName
        status
        customerName
        inviteType
        id
      }
    }
  }
`;

export const useNetworkPendingInvitesQuery = () =>
  useQuery<NetworkPendingInvitesQuery>(NETWORK_PENDING_INVITES, {
    fetchPolicy: 'cache-and-network',
  });
