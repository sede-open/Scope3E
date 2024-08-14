import { TargetsQuery_targets_intensity as IntensityTarget } from 'types/TargetsQuery';
import { DashboardDataQuery_corporateEmissions as CarbonEmissions } from 'types/DashboardDataQuery';

export interface IProps {
  target: IntensityTarget;
  emissions: CarbonEmissions[];
  baselineYear: number;
}

export enum CarbonIntensityChartKey {
  ACTUAL_INTENSITIES = 'actualIntensities',
  TARGET_INTENSITIES = 'totalTargetEmission',
  IEA = 'iea',
}

export type CarbonIntensitiesChartData = {
  year: number;
  [CarbonIntensityChartKey.ACTUAL_INTENSITIES]: number;
};
