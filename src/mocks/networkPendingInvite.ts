import { NETWORK_PENDING_INVITES } from 'containers/NetworkSettings/Invitations/queries';
import { GraphQLError } from 'graphql';
import { NetworkPendingInvitesQuery_networkSummary } from 'types/NetworkPendingInvitesQuery';

export const networkPendingInviteMock = (
  { pendingInvitations }: Partial<NetworkPendingInvitesQuery_networkSummary>,
  errors?: GraphQLError[] | null
) => ({
  request: {
    query: NETWORK_PENDING_INVITES,
  },
  result: {
    data: errors
      ? {}
      : {
          networkSummary: {
            pendingInvitations,
          },
        },
    errors,
  },
});
