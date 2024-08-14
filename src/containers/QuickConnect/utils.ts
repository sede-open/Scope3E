import { CompanyRelationshipRecommendationsQuery_companyRelationshipRecommendations as Recommendation } from 'types/CompanyRelationshipRecommendationsQuery';
import { QuickConnectContentType } from './types';

export const hasRecommendationsToShow = (
  contentType: QuickConnectContentType,
  suppliers: Recommendation[],
  customers: Recommendation[]
) => {
  switch (contentType) {
    case QuickConnectContentType.CUSTOMER:
      return !!customers.length;
    case QuickConnectContentType.SUPPLIER:
      return !!suppliers.length;
    case QuickConnectContentType.ANY:
      return !!suppliers.length || !!customers.length;
    default:
      return !!suppliers.length || !!customers.length;
  }
};

export const getNumRecommendationsToDisplay = (
  contentType: QuickConnectContentType
) => {
  switch (contentType) {
    case QuickConnectContentType.CUSTOMER:
      return 5;
    case QuickConnectContentType.SUPPLIER:
      return 5;
    case QuickConnectContentType.ANY:
      return 3;
    default:
      return 3;
  }
};
