import { Tasks } from './types';

export const TASK_IDS = {
  [Tasks.AREAS_OF_INTEREST]: 'areas-of-interest',
  [Tasks.BASELINE]: 'baseline',
  [Tasks.AMBITION]: 'ambition',
  [Tasks.LAST_YEAR_EMISSIONS]: 'last-year-emissions',
  [Tasks.CUSTOMER_RELATIONSHIPS]: 'customer-relationships',
  [Tasks.CUSTOMER_ALLOCATIONS]: 'customer-allocations',
  [Tasks.SUPPLIER_RELATIONSHIPS]: 'supplier-relationships',
  [Tasks.PRIVACY_SHARING]: 'privacy-sharing',
};

export enum taskListTabRoutes {
  AccountSettingsCustomer = '/account-settings/customers',
  NetworkSettingsCustomer = '/network/customers',
  ValueChainAllocateToCustomer = '/value-chain/customers',
  AccountSettingsSupplier = '/account-settings/suppliers',
  NetworkSettingsSupplier = '/network/suppliers',
  PrivacySharing = '/account-settings/your-organisation',
}
