import { NavLink } from 'components/SubheaderNavigation';

export const VALUE_CHAIN_ROUTE_PREFIX = '/value-chain';

export enum ValueChainRoutes {
  PendingRequests = '/pending-requests',
  Suppliers = '/suppliers',
  Customers = '/customers',
}

export const valueChainNavLinks: NavLink[] = [
  { label: 'valueChain:tabs-pending', link: ValueChainRoutes.PendingRequests },
  { label: 'valueChain:tabs-suppliers', link: ValueChainRoutes.Suppliers },
  { label: 'valueChain:tabs-customers', link: ValueChainRoutes.Customers },
];
