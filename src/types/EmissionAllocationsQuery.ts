/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmissionAllocationDirection, EmissionAllocationStatus, EmissionAllocationMethod, CompanySectorType } from "./globalTypes";

// ====================================================
// GraphQL query operation: EmissionAllocationsQuery
// ====================================================

export interface EmissionAllocationsQuery_emissionAllocations_category {
  id: any;
  name: string;
  order: number;
}

export interface EmissionAllocationsQuery_emissionAllocations_customer_companySectors_sector {
  name: string;
}

export interface EmissionAllocationsQuery_emissionAllocations_customer_companySectors {
  sectorType: CompanySectorType;
  sector: EmissionAllocationsQuery_emissionAllocations_customer_companySectors_sector;
}

export interface EmissionAllocationsQuery_emissionAllocations_customer {
  id: any;
  name: string;
  companySectors: EmissionAllocationsQuery_emissionAllocations_customer_companySectors[] | null;
}

export interface EmissionAllocationsQuery_emissionAllocations_supplier_companySectors_sector {
  name: string;
}

export interface EmissionAllocationsQuery_emissionAllocations_supplier_companySectors {
  sectorType: CompanySectorType;
  sector: EmissionAllocationsQuery_emissionAllocations_supplier_companySectors_sector;
}

export interface EmissionAllocationsQuery_emissionAllocations_supplier {
  id: any;
  name: string;
  companySectors: EmissionAllocationsQuery_emissionAllocations_supplier_companySectors[] | null;
}

export interface EmissionAllocationsQuery_emissionAllocations {
  addedToCustomerScopeTotal: boolean | null;
  allocationMethod: EmissionAllocationMethod | null;
  note: string | null;
  category: EmissionAllocationsQuery_emissionAllocations_category | null;
  createdAt: any;
  id: any;
  emissions: number | null;
  status: EmissionAllocationStatus;
  customer: EmissionAllocationsQuery_emissionAllocations_customer;
  supplier: EmissionAllocationsQuery_emissionAllocations_supplier | null;
  year: number;
}

export interface EmissionAllocationsQuery {
  emissionAllocations: EmissionAllocationsQuery_emissionAllocations[];
}

export interface EmissionAllocationsQueryVariables {
  companyId: any;
  emissionAllocation?: EmissionAllocationDirection | null;
  statuses?: EmissionAllocationStatus[] | null;
  year?: number | null;
}
