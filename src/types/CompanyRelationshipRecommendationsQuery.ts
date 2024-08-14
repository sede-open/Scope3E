/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyRelationshipType, CompanyRelationshipRecommendationStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: CompanyRelationshipRecommendationsQuery
// ====================================================

export interface CompanyRelationshipRecommendationsQuery_companyRelationshipRecommendations {
  id: any;
  duns: string;
  relationshipType: CompanyRelationshipType;
  recommendationStatus: CompanyRelationshipRecommendationStatus;
  name: string;
  companyId: any | null;
  sector: string | null;
  region: string | null;
  country: string | null;
}

export interface CompanyRelationshipRecommendationsQuery {
  companyRelationshipRecommendations: CompanyRelationshipRecommendationsQuery_companyRelationshipRecommendations[];
}

export interface CompanyRelationshipRecommendationsQueryVariables {
  companyId: any;
  relationshipTypes: CompanyRelationshipType[];
  recommendationStatuses: CompanyRelationshipRecommendationStatus[];
}
