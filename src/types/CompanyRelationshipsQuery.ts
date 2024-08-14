/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyRelationshipType, InviteStatus, CompanySectorType, CompanyStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: CompanyRelationshipsQuery
// ====================================================

export interface CompanyRelationshipsQuery_companyRelationships_customer_companySectors_sector {
  name: string;
}

export interface CompanyRelationshipsQuery_companyRelationships_customer_companySectors {
  sectorType: CompanySectorType;
  sector: CompanyRelationshipsQuery_companyRelationships_customer_companySectors_sector;
}

export interface CompanyRelationshipsQuery_companyRelationships_customer {
  id: any;
  name: string;
  companySectors: CompanyRelationshipsQuery_companyRelationships_customer_companySectors[] | null;
  location: string | null;
  status: CompanyStatus;
}

export interface CompanyRelationshipsQuery_companyRelationships_supplier_companySectors_sector {
  name: string;
}

export interface CompanyRelationshipsQuery_companyRelationships_supplier_companySectors {
  sectorType: CompanySectorType;
  sector: CompanyRelationshipsQuery_companyRelationships_supplier_companySectors_sector;
}

export interface CompanyRelationshipsQuery_companyRelationships_supplier {
  id: any;
  name: string;
  companySectors: CompanyRelationshipsQuery_companyRelationships_supplier_companySectors[] | null;
  location: string | null;
  status: CompanyStatus;
}

export interface CompanyRelationshipsQuery_companyRelationships {
  id: any;
  inviteType: CompanyRelationshipType;
  status: InviteStatus;
  customer: CompanyRelationshipsQuery_companyRelationships_customer;
  supplier: CompanyRelationshipsQuery_companyRelationships_supplier;
  note: string | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface CompanyRelationshipsQuery {
  companyRelationships: CompanyRelationshipsQuery_companyRelationships[];
}

export interface CompanyRelationshipsQueryVariables {
  companyId: any;
  relationshipType: CompanyRelationshipType;
}
