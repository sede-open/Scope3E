/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EmissionAllocationDirection, EmissionAllocationStatus, EmissionAllocationMethod, CompanySectorType, CorporateEmissionType, Scope2Type, CarbonIntensityMetricType } from "./globalTypes";

// ====================================================
// GraphQL query operation: CorporateEmissionFormQuery
// ====================================================

export interface CorporateEmissionFormQuery_emissionAllocations_category {
  id: any;
  name: string;
  order: number;
}

export interface CorporateEmissionFormQuery_emissionAllocations_customer_companySectors_sector {
  name: string;
}

export interface CorporateEmissionFormQuery_emissionAllocations_customer_companySectors {
  sectorType: CompanySectorType;
  sector: CorporateEmissionFormQuery_emissionAllocations_customer_companySectors_sector;
}

export interface CorporateEmissionFormQuery_emissionAllocations_customer {
  id: any;
  name: string;
  companySectors: CorporateEmissionFormQuery_emissionAllocations_customer_companySectors[] | null;
}

export interface CorporateEmissionFormQuery_emissionAllocations_supplier_companySectors_sector {
  name: string;
}

export interface CorporateEmissionFormQuery_emissionAllocations_supplier_companySectors {
  sectorType: CompanySectorType;
  sector: CorporateEmissionFormQuery_emissionAllocations_supplier_companySectors_sector;
}

export interface CorporateEmissionFormQuery_emissionAllocations_supplier {
  id: any;
  name: string;
  companySectors: CorporateEmissionFormQuery_emissionAllocations_supplier_companySectors[] | null;
}

export interface CorporateEmissionFormQuery_emissionAllocations {
  addedToCustomerScopeTotal: boolean | null;
  allocationMethod: EmissionAllocationMethod | null;
  note: string | null;
  category: CorporateEmissionFormQuery_emissionAllocations_category | null;
  createdAt: any;
  id: any;
  emissions: number | null;
  status: EmissionAllocationStatus;
  customer: CorporateEmissionFormQuery_emissionAllocations_customer;
  supplier: CorporateEmissionFormQuery_emissionAllocations_supplier | null;
  year: number;
}

export interface CorporateEmissionFormQuery_corporateEmissions_verificationFile {
  id: any;
  originalFilename: string;
}

export interface CorporateEmissionFormQuery_corporateEmissions_carbonIntensities {
  intensityMetric: CarbonIntensityMetricType;
  intensityValue: number;
}

export interface CorporateEmissionFormQuery_corporateEmissions_corporateEmissionAccess {
  scope1And2: boolean | null;
  scope3: boolean | null;
  carbonOffsets: boolean | null;
  carbonIntensity: boolean | null;
  publicLink: any | null;
}

export interface CorporateEmissionFormQuery_corporateEmissions {
  id: any;
  type: CorporateEmissionType;
  year: number;
  scope1: number;
  scope2: number;
  scope3: number | null;
  scope2Type: Scope2Type;
  offset: number | null;
  examplePercentage: number | null;
  headCount: number | null;
  verificationFile: CorporateEmissionFormQuery_corporateEmissions_verificationFile | null;
  carbonIntensities: CorporateEmissionFormQuery_corporateEmissions_carbonIntensities[];
  corporateEmissionAccess: CorporateEmissionFormQuery_corporateEmissions_corporateEmissionAccess | null;
}

export interface CorporateEmissionFormQuery {
  emissionAllocations: CorporateEmissionFormQuery_emissionAllocations[];
  corporateEmissions: CorporateEmissionFormQuery_corporateEmissions[];
}

export interface CorporateEmissionFormQueryVariables {
  companyId: any;
  emissionAllocation?: EmissionAllocationDirection | null;
  statuses?: EmissionAllocationStatus[] | null;
  year?: number | null;
}
