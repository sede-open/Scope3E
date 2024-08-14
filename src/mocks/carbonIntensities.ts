import { DashboardDataQuery_corporateEmissions_carbonIntensities as CarbonIntensity } from 'types/DashboardDataQuery';
import { CarbonIntensityMetricType } from 'types/globalTypes';

export const getCarbonIntensityMock = (
  overrides: Partial<CarbonIntensity> = {}
): CarbonIntensity => ({
  intensityMetric: CarbonIntensityMetricType.KM,
  intensityValue: 10,
  ...overrides,
});
