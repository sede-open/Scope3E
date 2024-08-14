/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InviteStatus, CompanyRelationshipType, CompanyStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: CompanyRelationshipsOnboardingQuery
// ====================================================

export interface CompanyRelationshipsOnboardingQuery_customer_customer {
  name: string;
  status: CompanyStatus;
}

export interface CompanyRelationshipsOnboardingQuery_customer_supplier {
  name: string;
  status: CompanyStatus;
}

export interface CompanyRelationshipsOnboardingQuery_customer {
  id: any;
  status: InviteStatus;
  inviteType: CompanyRelationshipType;
  customer: CompanyRelationshipsOnboardingQuery_customer_customer;
  supplier: CompanyRelationshipsOnboardingQuery_customer_supplier;
}

export interface CompanyRelationshipsOnboardingQuery_supplier_customer {
  name: string;
  status: CompanyStatus;
}

export interface CompanyRelationshipsOnboardingQuery_supplier_supplier {
  name: string;
  status: CompanyStatus;
}

export interface CompanyRelationshipsOnboardingQuery_supplier {
  id: any;
  status: InviteStatus;
  inviteType: CompanyRelationshipType;
  customer: CompanyRelationshipsOnboardingQuery_supplier_customer;
  supplier: CompanyRelationshipsOnboardingQuery_supplier_supplier;
}

export interface CompanyRelationshipsOnboardingQuery {
  customer: CompanyRelationshipsOnboardingQuery_customer[];
  supplier: CompanyRelationshipsOnboardingQuery_supplier[];
}

export interface CompanyRelationshipsOnboardingQueryVariables {
  companyId: any;
}
