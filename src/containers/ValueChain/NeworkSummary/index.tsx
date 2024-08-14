import { Link } from 'components/Link';
import { CartIcon } from 'components/Glyphs/Cart';
import { ExclamationIcon } from 'components/Glyphs/Exclamation';
import { TransportTruckIcon } from 'components/Glyphs/TransportTruck';
import { Spinner } from 'components/Spinner';
import useTranslation from 'next-translate/useTranslation';
import { useNetworkSummaryQuery } from './queries';
import * as StyledComponents from './styledComponents';
import * as selectors from '../selectors';

const networkSummaryDefault = {
  networkSummary: {
    numCustomers: 0,
    numSuppliers: 0,
    numPendingInvitations: 0,
  },
};

export const NetworkSummary = () => {
  const { t } = useTranslation();
  const networkSummary = useNetworkSummaryQuery();

  const { data, loading } = networkSummary;

  const {
    networkSummary: { numCustomers, numSuppliers, numPendingInvitations },
  } = data ?? networkSummaryDefault;

  const suppliersMessage =
    numSuppliers === 1
      ? t('valueChain:network-suppliers-count-singular')
      : t('valueChain:network-suppliers-count-plural', { count: numSuppliers });
  const customersMessage =
    numCustomers === 1
      ? t('valueChain:network-customers-count-singular')
      : t('valueChain:network-customers-count-plural', { count: numCustomers });
  const pendingInvitationsMessage =
    numPendingInvitations === 1
      ? t('valueChain:network-pending-invitations-count-singular')
      : t('valueChain:network-pending-invitations-count-plural', {
          count: numPendingInvitations,
        });

  return (
    <>
      <StyledComponents.Title data-testid={selectors.networkSummaryTitle}>
        {t('valueChain:network-summary-title')}
      </StyledComponents.Title>
      <StyledComponents.SummaryRows>
        <StyledComponents.SummaryRow>
          <StyledComponents.SummaryRowIcon>
            <TransportTruckIcon />
          </StyledComponents.SummaryRowIcon>
          <StyledComponents.SummaryRowContentContainer>
            <StyledComponents.SummaryRowContentHeader>
              {t('valueChain:network-summary-connected-with')}
            </StyledComponents.SummaryRowContentHeader>
            <span data-testid={selectors.supplierSummaryMessage}>
              {loading ? (
                <Spinner $size="1rem" />
              ) : (
                <Link href="/network/suppliers">{suppliersMessage}</Link>
              )}
            </span>
          </StyledComponents.SummaryRowContentContainer>
        </StyledComponents.SummaryRow>
        <StyledComponents.SummaryRow>
          <StyledComponents.SummaryRowIcon>
            <CartIcon />
          </StyledComponents.SummaryRowIcon>
          <StyledComponents.SummaryRowContentContainer>
            <StyledComponents.SummaryRowContentHeader>
              {t('valueChain:network-summary-connected-with')}
            </StyledComponents.SummaryRowContentHeader>
            <span data-testid={selectors.customerSummaryMessage}>
              {loading ? (
                <Spinner $size="1rem" />
              ) : (
                <Link href="/network/customers">{customersMessage}</Link>
              )}
            </span>
          </StyledComponents.SummaryRowContentContainer>
        </StyledComponents.SummaryRow>
        <StyledComponents.SummaryRow>
          <StyledComponents.SummaryRowIcon>
            <ExclamationIcon />
          </StyledComponents.SummaryRowIcon>
          <StyledComponents.SummaryRowContentContainer>
            <StyledComponents.SummaryRowContentHeader>
              {t('valueChain:network-summary-pending-invitations')}
            </StyledComponents.SummaryRowContentHeader>
            <span data-testid={selectors.pendingInvitationsSummaryMessage}>
              {loading ? (
                <Spinner $size="1rem" />
              ) : (
                <Link href="/network">{pendingInvitationsMessage}</Link>
              )}
            </span>
          </StyledComponents.SummaryRowContentContainer>
        </StyledComponents.SummaryRow>
      </StyledComponents.SummaryRows>
    </>
  );
};
