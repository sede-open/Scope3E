import moment from 'moment';
import { CorporateEmissionType } from 'types/globalTypes';
import { getNetEmissions, getGrossEmissions } from 'utils/emissions';
import { getLastTargetYear } from 'utils/targets';
import {
  DashboardDataQuery_corporateEmissions as Emission,
  DashboardDataQuery_target as Target,
} from 'types/DashboardDataQuery';

import { example_TARGET_YEAR } from '../../constants';

const DEFAULT_LAST_DISPLAY_YEAR = 2040;

export enum EmissionChartKeys {
  NET_EMISSION = 'netEmissions',
  GROSS_EMISSION = 'grossEmissions',
  TOTAL_TARGET_EMISSION = 'totalTargetEmission',
  IEA = 'iea',
}

export type EmissionChartData = {
  year?: number;
  [EmissionChartKeys.NET_EMISSION]?: number;
  [EmissionChartKeys.GROSS_EMISSION]?: number;
  exampleShare?: number;
  type?: CorporateEmissionType;
};

export const getEmissionsData = (emissions: Emission[]): EmissionChartData[] =>
  emissions
    .map((emission) => {
      const netEmissions = getNetEmissions(emission);
      const grossEmissions = getGrossEmissions(emission);
      const exampleShare = (netEmissions * (emission.examplePercentage ?? 0)) / 100;

      return {
        year: emission.year,
        [EmissionChartKeys.NET_EMISSION]: netEmissions,
        [EmissionChartKeys.GROSS_EMISSION]: grossEmissions,
        exampleShare,
        type: emission.type,
      };
    })
    .sort((a, b) => {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }
      return 0;
    });

export const getYears = (emissions: Emission[], target?: Target | null) => {
  if (emissions.length === 0) {
    return [];
  }
  // starting point for the graph
  const lastTargetYear = getLastTargetYear(target);
  const startYear = emissions[0].year || new Date().getFullYear();
  const lastEmissionYear = emissions[emissions.length - 1].year;
  // end point for the graph
  let lastYear = lastEmissionYear;
  if (lastYear < DEFAULT_LAST_DISPLAY_YEAR) {
    lastYear = DEFAULT_LAST_DISPLAY_YEAR;
  }
  if (lastTargetYear && lastYear < lastTargetYear) {
    lastYear = lastTargetYear;
  }

  const years = [];
  for (let i = startYear; i <= lastYear; i += 1) {
    years.push(i);
  }

  return years;
};

export const formatTick = (tick: number) => {
  const formattedYear = `'${moment().set('year', tick).format('YY')}`;
  if (tick === example_TARGET_YEAR) {
    return `${formattedYear}*`;
  }
  return formattedYear;
};

export const getexampleTargetLineValues = () => {
  const yAxis = 0;
  const xAxisStartPoint = example_TARGET_YEAR - 0.5;
  const xAxisEndPoint = example_TARGET_YEAR + 0.5;
  return [
    { year: xAxisStartPoint, value: yAxis },
    { year: xAxisEndPoint, value: yAxis },
  ];
};
