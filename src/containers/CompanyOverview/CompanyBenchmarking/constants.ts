import {
  CarbonIntensityMetricType,
  CarbonIntensityType,
  CompaniesBenchmarkOrderBy,
  OrderBy,
} from 'types/globalTypes';

export const headerNames = [
  CompaniesBenchmarkOrderBy.COMPANY_NAME,
  CompaniesBenchmarkOrderBy.ESTIMATED_NUMBER_OF_EMPLOYEES, // size
  CompaniesBenchmarkOrderBy.BASELINE_YEAR,
  CompaniesBenchmarkOrderBy.TOTAL_EMISSION_VARIANCE,
  CompaniesBenchmarkOrderBy.ANNUAL_EMISSION_VARIANCE,
  CompaniesBenchmarkOrderBy.CARBON_INTENSITY_RATIO,
  CompaniesBenchmarkOrderBy.COMPANY_RELATIONSHIP,
];

export const initBenchmarkQueryVars = {
  limit: 15,
  offset: 0,
  orderBy: CompaniesBenchmarkOrderBy.ANNUAL_EMISSION_VARIANCE,
  order: OrderBy.ASC,
  intensityMetric: CarbonIntensityMetricType.NUMBER_OF_EMPLOYEES,
  intensityType: CarbonIntensityType.ESTIMATED,
};
