/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SectorsQuery
// ====================================================

export interface SectorsQuery_sectors {
  id: any;
  name: string;
}

export interface SectorsQuery {
  sectors: SectorsQuery_sectors[];
}

export interface SectorsQueryVariables {
  searchTerm?: any | null;
  pageNumber?: number | null;
  pageSize?: any | null;
}
