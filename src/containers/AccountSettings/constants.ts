import { NavLink } from 'components/SubheaderNavigation';

export const ACCOUNT_SETTINGS_ROUTE_PREFIX = '/account-settings';

export enum AccountSettingsRoutes {
  PersonalPreferences = '/personal-preferences',
  YourOrganisation = '/your-organisation',
  Suppliers = '/suppliers',
  Customers = '/customers',
}

export const accountSettingsNavLinks: NavLink[] = [
  {
    label: 'accountSettings:personal-preferences',
    link: AccountSettingsRoutes.PersonalPreferences,
  },
  {
    label: 'accountSettings:tabs-your-organisation',
    link: AccountSettingsRoutes.YourOrganisation,
  },
  {
    label: 'accountSettings:tabs-suppliers',
    link: AccountSettingsRoutes.Suppliers,
  },
  {
    label: 'accountSettings:tabs-customers',
    link: AccountSettingsRoutes.Customers,
  },
];
