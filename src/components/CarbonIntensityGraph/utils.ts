import {
  getIntensityEmission,
  IntensityEmission,
} from 'utils/carbonIntensities';
import { getLastTargetYear } from 'utils/targets';
import { TargetsQuery_targets_intensity as IntensityTarget } from 'types/TargetsQuery';
import { sortObjectsByKey } from 'utils/sortObjectsByKey';
import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';

import { CarbonIntensityMetricType } from 'types/globalTypes';

import { CarbonIntensitiesChartData, CarbonIntensityChartKey } from './types';

export const getYears = (
  intensities: IntensityEmission[],
  target: IntensityTarget | null
) => {
  const years = [];
  const lastYear = getLastTargetYear(target);

  if (lastYear && intensities.length > 0) {
    const startYear = Math.min(
      ...intensities.map((intensity) => intensity.year)
    );

    for (let i = startYear; i <= lastYear; i += 1) {
      years.push(i);
    }
  }

  return years;
};

export const getActualIntensityGraphData = (
  intensities: IntensityEmission[]
): CarbonIntensitiesChartData[] =>
  intensities
    .map((intensity) => ({
      year: intensity.year,
      [CarbonIntensityChartKey.ACTUAL_INTENSITIES]: intensity.netEmissions,
    }))
    .sort(sortObjectsByKey('year'));

export const getYAxisHighestPoint = ({
  actualIntensities = [],
}: {
  actualIntensities: CarbonIntensitiesChartData[];
}) => {
  const highestPoint = Math.max(
    ...actualIntensities.map(
      (e) => e[CarbonIntensityChartKey.ACTUAL_INTENSITIES]
    )
  );

  return Math.ceil(highestPoint);
};

export const getIntensityEmissionsForMetric = (
  emissions: Emission[],
  baselineYear: number,
  intensityMeasure?: CarbonIntensityMetricType
) => {
  const intensities: IntensityEmission[] = [];

  emissions.forEach((emission: Emission) => {
    if (emission.year >= baselineYear) {
      const intensityForMetric = emission.carbonIntensities.find(
        (e) => e.intensityMetric === intensityMeasure
      );

      if (intensityForMetric) {
        intensities.push(
          getIntensityEmission({ emission, intensity: intensityForMetric })
        );
      }
    }
  });

  return intensities;
};
