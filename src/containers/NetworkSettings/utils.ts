import { QuickConnectContentType } from 'containers/QuickConnect/types';
import { CompanyRelationshipType } from 'types/globalTypes';
import { NetworkSettingsRoutes } from './constants';

export const getQuickConnectFilterType = (
  tab: NetworkSettingsRoutes
): CompanyRelationshipType[] | undefined => {
  switch (tab) {
    case NetworkSettingsRoutes.Customers:
      return [CompanyRelationshipType.CUSTOMER];
    case NetworkSettingsRoutes.Suppliers:
      return [CompanyRelationshipType.SUPPLIER];
    case NetworkSettingsRoutes.Invitations:
      return [
        CompanyRelationshipType.CUSTOMER,
        CompanyRelationshipType.SUPPLIER,
      ];
    default:
      return undefined;
  }
};

export const getQuckConnectContentType = (
  tab: NetworkSettingsRoutes
): QuickConnectContentType => {
  switch (tab) {
    case NetworkSettingsRoutes.Customers:
      return QuickConnectContentType.CUSTOMER;
    case NetworkSettingsRoutes.Suppliers:
      return QuickConnectContentType.SUPPLIER;
    case NetworkSettingsRoutes.Invitations:
      return QuickConnectContentType.ANY;
    default:
      return QuickConnectContentType.ANY;
  }
};
