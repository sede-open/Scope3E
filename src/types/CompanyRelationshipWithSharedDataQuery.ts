/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyRelationshipType, InviteStatus, CompanySectorType, CompanyStatus, AmbitionPrivacyStatus, EmissionPrivacyStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: CompanyRelationshipWithSharedDataQuery
// ====================================================

export interface CompanyRelationshipWithSharedDataQuery_companyRelationships_customer_companySectors_sector {
  name: string;
}

export interface CompanyRelationshipWithSharedDataQuery_companyRelationships_customer_companySectors {
  sectorType: CompanySectorType;
  sector: CompanyRelationshipWithSharedDataQuery_companyRelationships_customer_companySectors_sector;
}

export interface CompanyRelationshipWithSharedDataQuery_companyRelationships_customer {
  id: any;
  name: string;
  companySectors: CompanyRelationshipWithSharedDataQuery_companyRelationships_customer_companySectors[] | null;
  location: string | null;
  status: CompanyStatus;
}

export interface CompanyRelationshipWithSharedDataQuery_companyRelationships_supplier_companySectors_sector {
  name: string;
}

export interface CompanyRelationshipWithSharedDataQuery_companyRelationships_supplier_companySectors {
  sectorType: CompanySectorType;
  sector: CompanyRelationshipWithSharedDataQuery_companyRelationships_supplier_companySectors_sector;
}

export interface CompanyRelationshipWithSharedDataQuery_companyRelationships_supplier {
  id: any;
  name: string;
  companySectors: CompanyRelationshipWithSharedDataQuery_companyRelationships_supplier_companySectors[] | null;
  location: string | null;
  status: CompanyStatus;
}

export interface CompanyRelationshipWithSharedDataQuery_companyRelationships_supplierApprover {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CompanyRelationshipWithSharedDataQuery_companyRelationships_customerApprover {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CompanyRelationshipWithSharedDataQuery_companyRelationships {
  id: any;
  inviteType: CompanyRelationshipType;
  status: InviteStatus;
  customer: CompanyRelationshipWithSharedDataQuery_companyRelationships_customer;
  supplier: CompanyRelationshipWithSharedDataQuery_companyRelationships_supplier;
  ambitionPrivacyStatus: AmbitionPrivacyStatus | null;
  emissionPrivacyStatus: EmissionPrivacyStatus | null;
  supplierApprover: CompanyRelationshipWithSharedDataQuery_companyRelationships_supplierApprover | null;
  customerApprover: CompanyRelationshipWithSharedDataQuery_companyRelationships_customerApprover | null;
  note: string | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface CompanyRelationshipWithSharedDataQuery {
  companyRelationships: CompanyRelationshipWithSharedDataQuery_companyRelationships[];
}

export interface CompanyRelationshipWithSharedDataQueryVariables {
  companyId: any;
  relationshipType: CompanyRelationshipType;
}
