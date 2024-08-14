/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReductionRankType } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReductionRankQuery
// ====================================================

export interface ReductionRankQuery_corporateEmissionRanks {
  id: any;
  rank: number;
  currentYear: number;
  primarySector: string | null;
  secondarySector: string | null;
  reductionPercentage: number;
  rankType: ReductionRankType;
  hasVerificationFile: boolean;
  hasPreviousYearVerificationFile: boolean;
}

export interface ReductionRankQuery {
  corporateEmissionRanks: ReductionRankQuery_corporateEmissionRanks[];
}

export interface ReductionRankQueryVariables {
  companyId: any;
  year: number;
}
