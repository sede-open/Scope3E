/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InviteStatus, CompanyRelationshipType, CompanyStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: AllCompanyRelationshipsQuery
// ====================================================

export interface AllCompanyRelationshipsQuery_customer_customer {
  status: CompanyStatus;
}

export interface AllCompanyRelationshipsQuery_customer_supplier {
  status: CompanyStatus;
}

export interface AllCompanyRelationshipsQuery_customer {
  id: any;
  status: InviteStatus;
  inviteType: CompanyRelationshipType;
  customer: AllCompanyRelationshipsQuery_customer_customer;
  supplier: AllCompanyRelationshipsQuery_customer_supplier;
}

export interface AllCompanyRelationshipsQuery_supplier_customer {
  status: CompanyStatus;
}

export interface AllCompanyRelationshipsQuery_supplier_supplier {
  status: CompanyStatus;
}

export interface AllCompanyRelationshipsQuery_supplier {
  id: any;
  status: InviteStatus;
  inviteType: CompanyRelationshipType;
  customer: AllCompanyRelationshipsQuery_supplier_customer;
  supplier: AllCompanyRelationshipsQuery_supplier_supplier;
}

export interface AllCompanyRelationshipsQuery {
  customer: AllCompanyRelationshipsQuery_customer[];
  supplier: AllCompanyRelationshipsQuery_supplier[];
}

export interface AllCompanyRelationshipsQueryVariables {
  companyId: any;
}
