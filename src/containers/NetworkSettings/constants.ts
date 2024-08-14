import { NavLink } from 'components/SubheaderNavigation';

export const NETWORK_SETTINGS_ROUTE_PREFIX = '/network';
export enum NetworkSettingsRoutes {
  Invitations = '/invitations',
  Suppliers = '/suppliers',
  Customers = '/customers',
}

export const networkSettingsNavLinks: NavLink[] = [
  {
    label: 'networkSettings:tabs-invites',
    link: NetworkSettingsRoutes.Invitations,
  },
  {
    label: 'networkSettings:tabs-suppliers',
    link: NetworkSettingsRoutes.Suppliers,
  },
  {
    label: 'networkSettings:tabs-customers',
    link: NetworkSettingsRoutes.Customers,
  },
];
