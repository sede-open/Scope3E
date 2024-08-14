/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmissionAllocationDirection, EmissionAllocationStatus, EmissionAllocationMethod, CategoriesSystemName, CompanySectorType } from "./globalTypes";

// ====================================================
// GraphQL query operation: Scope3DashboardAllocationsQuery
// ====================================================

export interface Scope3DashboardAllocationsQuery_emissionAllocations_category {
  id: any;
  order: number;
  systemName: CategoriesSystemName;
}

export interface Scope3DashboardAllocationsQuery_emissionAllocations_customer_companySectors_sector {
  name: string;
}

export interface Scope3DashboardAllocationsQuery_emissionAllocations_customer_companySectors {
  sectorType: CompanySectorType;
  sector: Scope3DashboardAllocationsQuery_emissionAllocations_customer_companySectors_sector;
}

export interface Scope3DashboardAllocationsQuery_emissionAllocations_customer {
  id: any;
  name: string;
  companySectors: Scope3DashboardAllocationsQuery_emissionAllocations_customer_companySectors[] | null;
}

export interface Scope3DashboardAllocationsQuery_emissionAllocations_supplier_companySectors_sector {
  name: string;
}

export interface Scope3DashboardAllocationsQuery_emissionAllocations_supplier_companySectors {
  sectorType: CompanySectorType;
  sector: Scope3DashboardAllocationsQuery_emissionAllocations_supplier_companySectors_sector;
}

export interface Scope3DashboardAllocationsQuery_emissionAllocations_supplier {
  id: any;
  name: string;
  companySectors: Scope3DashboardAllocationsQuery_emissionAllocations_supplier_companySectors[] | null;
}

export interface Scope3DashboardAllocationsQuery_emissionAllocations {
  addedToCustomerScopeTotal: boolean | null;
  allocationMethod: EmissionAllocationMethod | null;
  note: string | null;
  category: Scope3DashboardAllocationsQuery_emissionAllocations_category | null;
  createdAt: any;
  id: any;
  emissions: number | null;
  status: EmissionAllocationStatus;
  customer: Scope3DashboardAllocationsQuery_emissionAllocations_customer;
  supplier: Scope3DashboardAllocationsQuery_emissionAllocations_supplier | null;
  year: number;
}

export interface Scope3DashboardAllocationsQuery {
  emissionAllocations: Scope3DashboardAllocationsQuery_emissionAllocations[];
}

export interface Scope3DashboardAllocationsQueryVariables {
  companyId: any;
  emissionAllocation?: EmissionAllocationDirection | null;
  statuses?: EmissionAllocationStatus[] | null;
  year?: number | null;
}
