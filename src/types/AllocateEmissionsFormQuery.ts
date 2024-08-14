/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyRelationshipType, InviteStatus, CompanySectorType, CompanyStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: AllocateEmissionsFormQuery
// ====================================================

export interface AllocateEmissionsFormQuery_companyRelationships_customer_companySectors_sector {
  name: string;
}

export interface AllocateEmissionsFormQuery_companyRelationships_customer_companySectors {
  sectorType: CompanySectorType;
  sector: AllocateEmissionsFormQuery_companyRelationships_customer_companySectors_sector;
}

export interface AllocateEmissionsFormQuery_companyRelationships_customer {
  id: any;
  name: string;
  companySectors: AllocateEmissionsFormQuery_companyRelationships_customer_companySectors[] | null;
  location: string | null;
  status: CompanyStatus;
}

export interface AllocateEmissionsFormQuery_companyRelationships_supplier_companySectors_sector {
  name: string;
}

export interface AllocateEmissionsFormQuery_companyRelationships_supplier_companySectors {
  sectorType: CompanySectorType;
  sector: AllocateEmissionsFormQuery_companyRelationships_supplier_companySectors_sector;
}

export interface AllocateEmissionsFormQuery_companyRelationships_supplier {
  id: any;
  name: string;
  companySectors: AllocateEmissionsFormQuery_companyRelationships_supplier_companySectors[] | null;
  location: string | null;
  status: CompanyStatus;
}

export interface AllocateEmissionsFormQuery_companyRelationships {
  id: any;
  inviteType: CompanyRelationshipType;
  status: InviteStatus;
  customer: AllocateEmissionsFormQuery_companyRelationships_customer;
  supplier: AllocateEmissionsFormQuery_companyRelationships_supplier;
  note: string | null;
  createdAt: any;
  updatedAt: any | null;
}

export interface AllocateEmissionsFormQuery_corporateEmissions {
  id: any;
  year: number;
  scope1: number;
  scope2: number;
  scope3: number | null;
  offset: number | null;
}

export interface AllocateEmissionsFormQuery {
  companyRelationships: AllocateEmissionsFormQuery_companyRelationships[];
  corporateEmissions: AllocateEmissionsFormQuery_corporateEmissions[];
}

export interface AllocateEmissionsFormQueryVariables {
  companyId: any;
  relationshipType: CompanyRelationshipType;
  status: InviteStatus;
}
