/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReductionRankType } from "./globalTypes";

// ====================================================
// GraphQL query operation: CompanyReductionRankQuery
// ====================================================

export interface CompanyReductionRankQuery_currentRank {
  id: any;
  rank: number;
  currentYear: number;
  primarySector: string | null;
  reductionPercentage: number;
  rankType: ReductionRankType;
  hasVerificationFile: boolean;
  hasPreviousYearVerificationFile: boolean;
}

export interface CompanyReductionRankQuery_previousRank {
  id: any;
  rank: number;
  currentYear: number;
  primarySector: string | null;
  reductionPercentage: number;
  rankType: ReductionRankType;
  hasVerificationFile: boolean;
  hasPreviousYearVerificationFile: boolean;
}

export interface CompanyReductionRankQuery {
  currentRank: CompanyReductionRankQuery_currentRank | null;
  previousRank: CompanyReductionRankQuery_previousRank | null;
}

export interface CompanyReductionRankQueryVariables {
  companyId: any;
  year: number;
  previousYear: number;
}
