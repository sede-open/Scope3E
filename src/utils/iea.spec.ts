import {
  DashboardDataQuery_target as Target,
  DashboardDataQuery_corporateEmissions as Emission,
} from 'types/DashboardDataQuery';
import { DEFAULT_CHART_END_YEAR } from '../constants';
import { getNetEmissions } from './emissions';
import { getIEAChartData } from './iea';

describe('getIEAChartData()', () => {
  const baseline = {
    year: 2012,
    scope1: 10000,
    scope2: 10000,
    scope3: 24254,
    offset: 10000,
  } as Emission;
  const emissions = getNetEmissions(baseline);

  it('should return yearly iea values', () => {
    const target = {
      scope1And2Year: 2058,
    } as Target;
    const result = getIEAChartData(
      emissions,
      baseline.year,
      target.scope1And2Year
    );
    expect(result).toMatchSnapshot();
  });

  it('should return an empty array if baseline is not provided', () => {
    const result = getIEAChartData();
    expect(result).toEqual([]);
  });

  it('should return data up to DEFAULT_CHART_END_YEAR by default', () => {
    const result = getIEAChartData(emissions, baseline.year);
    expect(result[result.length - 1].year).toBe(DEFAULT_CHART_END_YEAR);
  });

  it('should return data up to target year', () => {
    const target = {
      scope1And2Year: 2030,
    } as Target;
    const result = getIEAChartData(
      emissions,
      baseline.year,
      target.scope1And2Year
    );
    expect(result[result.length - 1].year).toBe(target.scope1And2Year);
  });

  it('should return data up to 2055 if target year is later than that', () => {
    const target = {
      scope1And2Year: 2058,
    } as Target;
    const result = getIEAChartData(
      emissions,
      baseline.year,
      target.scope1And2Year
    );
    expect(result[result.length - 1].year).toBe(2055);
  });
});
