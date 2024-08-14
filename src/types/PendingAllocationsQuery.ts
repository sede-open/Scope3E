/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmissionAllocationMethod, EmissionAllocationStatus, CompanySectorType } from "./globalTypes";

// ====================================================
// GraphQL query operation: PendingAllocationsQuery
// ====================================================

export interface PendingAllocationsQuery_awaitingApproval_category {
  id: any;
  name: string;
  order: number;
}

export interface PendingAllocationsQuery_awaitingApproval_customer_companySectors_sector {
  name: string;
}

export interface PendingAllocationsQuery_awaitingApproval_customer_companySectors {
  sectorType: CompanySectorType;
  sector: PendingAllocationsQuery_awaitingApproval_customer_companySectors_sector;
}

export interface PendingAllocationsQuery_awaitingApproval_customer {
  id: any;
  name: string;
  companySectors: PendingAllocationsQuery_awaitingApproval_customer_companySectors[] | null;
}

export interface PendingAllocationsQuery_awaitingApproval_supplier_companySectors_sector {
  name: string;
}

export interface PendingAllocationsQuery_awaitingApproval_supplier_companySectors {
  sectorType: CompanySectorType;
  sector: PendingAllocationsQuery_awaitingApproval_supplier_companySectors_sector;
}

export interface PendingAllocationsQuery_awaitingApproval_supplier {
  id: any;
  name: string;
  companySectors: PendingAllocationsQuery_awaitingApproval_supplier_companySectors[] | null;
}

export interface PendingAllocationsQuery_awaitingApproval {
  addedToCustomerScopeTotal: boolean | null;
  allocationMethod: EmissionAllocationMethod | null;
  note: string | null;
  category: PendingAllocationsQuery_awaitingApproval_category | null;
  createdAt: any;
  id: any;
  emissions: number | null;
  status: EmissionAllocationStatus;
  customer: PendingAllocationsQuery_awaitingApproval_customer;
  supplier: PendingAllocationsQuery_awaitingApproval_supplier | null;
  year: number;
}

export interface PendingAllocationsQuery_requested_category {
  id: any;
  name: string;
  order: number;
}

export interface PendingAllocationsQuery_requested_customer_companySectors_sector {
  name: string;
}

export interface PendingAllocationsQuery_requested_customer_companySectors {
  sectorType: CompanySectorType;
  sector: PendingAllocationsQuery_requested_customer_companySectors_sector;
}

export interface PendingAllocationsQuery_requested_customer {
  id: any;
  name: string;
  companySectors: PendingAllocationsQuery_requested_customer_companySectors[] | null;
}

export interface PendingAllocationsQuery_requested_supplier_companySectors_sector {
  name: string;
}

export interface PendingAllocationsQuery_requested_supplier_companySectors {
  sectorType: CompanySectorType;
  sector: PendingAllocationsQuery_requested_supplier_companySectors_sector;
}

export interface PendingAllocationsQuery_requested_supplier {
  id: any;
  name: string;
  companySectors: PendingAllocationsQuery_requested_supplier_companySectors[] | null;
}

export interface PendingAllocationsQuery_requested {
  addedToCustomerScopeTotal: boolean | null;
  allocationMethod: EmissionAllocationMethod | null;
  note: string | null;
  category: PendingAllocationsQuery_requested_category | null;
  createdAt: any;
  id: any;
  emissions: number | null;
  status: EmissionAllocationStatus;
  customer: PendingAllocationsQuery_requested_customer;
  supplier: PendingAllocationsQuery_requested_supplier | null;
  year: number;
}

export interface PendingAllocationsQuery {
  awaitingApproval: PendingAllocationsQuery_awaitingApproval[];
  requested: PendingAllocationsQuery_requested[];
}

export interface PendingAllocationsQueryVariables {
  companyId: any;
  year?: number | null;
}
