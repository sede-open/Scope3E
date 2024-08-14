import { OptionType } from 'components/SingleSelect';
import { ReductionRankType } from 'types/globalTypes';
import { ReductionRankQuery_corporateEmissionRanks as Rank } from 'types/ReductionRankQuery';
import { getEmissionYears } from 'utils/emissions';

export const getYearOption = (year: number): OptionType => ({
  value: year,
  label: `${year - 1} – ${year}`,
});

export const getYearOptions = () => getEmissionYears().map(getYearOption);

export const getSelectOption = (value: string | null): OptionType => ({
  label: value,
  value,
});

export const doesRankHaveSector = (sector: string | null) => (rank: Rank) =>
  sector === rank.primarySector || rank.rankType === ReductionRankType.SELECTED;

export const doesRankHaveVerification = (rank: Rank) =>
  rank.hasVerificationFile && rank.hasPreviousYearVerificationFile;

const identity = (a: any) => a;

export const getConditionalFilter = (
  condition: boolean,
  filter: (rank: Rank) => boolean
) => (condition ? filter : identity);
