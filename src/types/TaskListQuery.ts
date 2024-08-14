/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { InviteStatus, EmissionAllocationStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: TaskListQuery
// ====================================================

export interface TaskListQuery_baseline {
  id: any;
}

export interface TaskListQuery_target {
  scope1And2Year: number;
}

export interface TaskListQuery_latestCorporateEmission {
  year: number;
}

export interface TaskListQuery_customerRelationships {
  status: InviteStatus;
}

export interface TaskListQuery_emissionAllocations {
  id: any;
  status: EmissionAllocationStatus;
}

export interface TaskListQuery_supplierRelationships {
  status: InviteStatus;
}

export interface TaskListQuery_companyPrivacy {
  allPlatform: boolean;
  customerNetwork: boolean;
  supplierNetwork: boolean;
}

export interface TaskListQuery {
  baseline: TaskListQuery_baseline | null;
  target: TaskListQuery_target | null;
  latestCorporateEmission: TaskListQuery_latestCorporateEmission | null;
  customerRelationships: TaskListQuery_customerRelationships[];
  emissionAllocations: TaskListQuery_emissionAllocations[];
  supplierRelationships: TaskListQuery_supplierRelationships[];
  companyPrivacy: TaskListQuery_companyPrivacy | null;
}

export interface TaskListQueryVariables {
  companyId: any;
}
