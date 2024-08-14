import { GraphQLError } from 'graphql';
import { NETWORK_SUMMARY_QUERY } from 'containers/ValueChain/NeworkSummary/queries';
import { NetworkSummaryQuery_networkSummary as NetworkSummary } from 'types/NetworkSummaryQuery';

export const networkSummaryMock = (
  {
    companyId,
    numCustomers,
    numSuppliers,
    numPendingInvitations,
  }: Partial<NetworkSummary> & { companyId: string },
  errors?: GraphQLError[] | null
) => ({
  request: {
    query: NETWORK_SUMMARY_QUERY,
  },
  result: {
    data: errors
      ? {}
      : {
          networkSummary: {
            numCustomers: numCustomers ?? 0,
            numSuppliers: numSuppliers ?? 0,
            numPendingInvitations: numPendingInvitations ?? 0,
            companyId,
          },
        },
    errors,
  },
});
