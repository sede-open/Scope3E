import { ReductionRankType } from 'types/globalTypes';
import { ReductionRankQuery_corporateEmissionRanks } from 'types/ReductionRankQuery';
import { REDUCTION_RANK_QUERY } from 'containers/Dashboard/queries';

import { USER_COMPANY_ID } from './constants';

export const getRank = ({
  hasPreviousYearVerificationFile = true,
  hasVerificationFile = true,
  primarySector,
  secondarySector,
  rank,
  year,
}: {
  hasPreviousYearVerificationFile?: boolean;
  hasVerificationFile?: boolean;
  primarySector: string | null;
  secondarySector: string;
  rank: number;
  year: number;
}): ReductionRankQuery_corporateEmissionRanks => ({
  rank,
  id: `rank-id-${rank}`,
  rankType: ReductionRankType.OTHER,
  currentYear: year,
  primarySector,
  secondarySector,
  reductionPercentage: -2,
  hasPreviousYearVerificationFile,
  hasVerificationFile,
});

export const getReductionRankQueryMock = (
  year: number,
  ranks: ReductionRankQuery_corporateEmissionRanks[]
) => ({
  request: {
    query: REDUCTION_RANK_QUERY,
    variables: {
      year,
      companyId: USER_COMPANY_ID,
    },
  },
  result: {
    data: { corporateEmissionRanks: ranks },
  },
});
