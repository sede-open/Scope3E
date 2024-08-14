/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCompanySectorsInput, CompanySectorType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCompanySectorsMutation
// ====================================================

export interface UpdateCompanySectorsMutation_updateCompanySectors_sector {
  id: any;
  name: string;
}

export interface UpdateCompanySectorsMutation_updateCompanySectors {
  sectorType: CompanySectorType;
  sector: UpdateCompanySectorsMutation_updateCompanySectors_sector;
}

export interface UpdateCompanySectorsMutation {
  updateCompanySectors: UpdateCompanySectorsMutation_updateCompanySectors[];
}

export interface UpdateCompanySectorsMutationVariables {
  companySectorsInput: UpdateCompanySectorsInput;
}
