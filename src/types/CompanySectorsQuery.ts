/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanySectorType } from "./globalTypes";

// ====================================================
// GraphQL query operation: CompanySectorsQuery
// ====================================================

export interface CompanySectorsQuery_companySectors_sector {
  id: any;
  name: string;
}

export interface CompanySectorsQuery_companySectors {
  id: any;
  sector: CompanySectorsQuery_companySectors_sector;
  sectorType: CompanySectorType;
  hasBeenUpdated: boolean | null;
}

export interface CompanySectorsQuery {
  companySectors: CompanySectorsQuery_companySectors[];
}

export interface CompanySectorsQueryVariables {
  companyId: any;
}
