import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { OptionType } from 'components/SingleSelect';
import { CorporateEmissionType } from 'types/globalTypes';
import { sortObjectsByKey } from 'utils/sortObjectsByKey';

export const FIELD_KEYS = {
  YEAR: 'year',
  EMISSIONS: 'emissions',
} as const;

export const defaultYearValue = { value: '', label: '' };

export const getEmissionYears = (emissions: Emission[]) => {
  const years: OptionType[] = [];

  emissions.forEach(({ year, type }) => {
    if (type === CorporateEmissionType.ACTUAL)
      years.push({ value: year, label: String(year) });
  });

  return years.sort(sortObjectsByKey('value', 'DESC'));
};
