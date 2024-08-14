/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DnBTypeaheadQuery
// ====================================================

export interface DnBTypeaheadQuery_dnbTypeaheadSearch {
  duns: string;
  primaryName: string;
  isGlobalUltimate: boolean;
  globalUltimateDuns: string | null;
  globalUltimatePrimaryName: string | null;
  addressLine1: string | null;
  addressCountryIsoAlpha2Code: string | null;
  addressRegionName: string | null;
}

export interface DnBTypeaheadQuery {
  dnbTypeaheadSearch: DnBTypeaheadQuery_dnbTypeaheadSearch[];
}

export interface DnBTypeaheadQueryVariables {
  searchTerm: string;
}
