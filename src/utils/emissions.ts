import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { SimulationDataQuery_latestCorporateEmission as LatestEmission } from 'types/SimulationDataQuery';

import { TargetStrategyType } from 'types/globalTypes';
import { round } from 'utils/number';

export const getNetEmissions = (
  emission?:
    | Emission
    | LatestEmission
    | Pick<Emission, 'scope1' | 'scope2' | 'scope3' | 'offset'>
    | null
) =>
  (emission?.scope1 ?? 0) +
  (emission?.scope2 ?? 0) +
  (emission?.scope3 ?? 0) -
  (emission?.offset ?? 0);

export const getGrossEmissions = (
  emission?: Emission | LatestEmission | null
) =>
  (emission?.scope1 ?? 0) + (emission?.scope2 ?? 0) + (emission?.scope3 ?? 0);

export type TargetChartData = {
  year?: number;
  scope1And2TargetEmission?: number;
  scope3TargetEmission?: number;
  totalTargetEmission?: number;
};

// Y = BE - ((BE - TE) / N) * X
const getModerateEmission = ({
  year: X,
  baselineEmissions: BE,
  targetEmissions: TE,
  yearPeriod: N,
}: {
  year: number;
  baselineEmissions: number;
  targetEmissions: number;
  yearPeriod: number;
}) => Math.round(BE - ((BE - TE) / N) * X);

// Y = BE - ((BE - TE) / (N^2)) * (X^2)
const getPassiveEmission = ({
  year: X,
  baselineEmissions: BE,
  targetEmissions: TE,
  yearPeriod: N,
}: {
  year: number;
  baselineEmissions: number;
  targetEmissions: number;
  yearPeriod: number;
}) => Math.round(BE - ((BE - TE) / (N * N)) * (X * X));

// Y = BE - ((BE - TE) / (sqrt(N)) * sqrt(X)
const getAggressiveEmission = ({
  year: X,
  baselineEmissions: BE,
  targetEmissions: TE,
  yearPeriod: N,
}: {
  year: number;
  baselineEmissions: number;
  targetEmissions: number;
  yearPeriod: number;
}) => Math.round(BE - ((BE - TE) / Math.sqrt(N)) * Math.sqrt(X));

const targetCalculationMethod = {
  [TargetStrategyType.AGGRESSIVE]: getAggressiveEmission,
  [TargetStrategyType.MODERATE]: getModerateEmission,
  [TargetStrategyType.PASSIVE]: getPassiveEmission,
};

type TargetDataPayload = {
  baselineData: {
    year: number;
    scope1: number;
    scope2: number;
    scope3?: number | null;
    offset?: number | null;
  };
  targetData: {
    strategy: TargetStrategyType;
    includeCarbonOffset: boolean;
    scope1And2Year: number;
    scope1And2Reduction: number;
    scope3Year?: number | null;
    scope3Reduction?: number | null;
  };
};

export const getTargetData = ({
  baselineData: { year: baselineYear, scope1, scope2, scope3 = 0, offset = 0 },
  targetData: {
    scope1And2Year,
    scope1And2Reduction,
    scope3Year,
    scope3Reduction = 0,
    strategy,
    includeCarbonOffset,
  },
}: TargetDataPayload) => {
  const getTargetEmissionData = targetCalculationMethod[strategy];

  const defaultOffset = offset ?? 0;
  const defaultScope3 = scope3 ?? 0;
  const defaultScope3Reduction = scope3Reduction ?? 0;

  const scope1And2 = scope1 + scope2;
  const scope1And2OffsetShare =
    defaultOffset * (scope1And2 / (scope1And2 + defaultScope3));
  const scope1And2BaseEmission = includeCarbonOffset
    ? scope1And2 - scope1And2OffsetShare
    : scope1And2;
  const scope1And2TargetEmission = scope1And2 * (1 - scope1And2Reduction / 100);

  const scope3OffsetShare =
    defaultScope3 === 0
      ? 0
      : defaultOffset * (defaultScope3 / (scope1And2 + defaultScope3));
  const scope3BaseEmission = includeCarbonOffset
    ? defaultScope3 - scope3OffsetShare
    : defaultScope3;
  const scope3TargetEmission =
    defaultScope3 * (1 - defaultScope3Reduction / 100);

  const scope1And2YearPeriod = scope1And2Year - baselineYear;
  const scope3YearPeriod = scope3Year ? scope3Year - baselineYear : undefined;
  const overallTargetYear =
    scope3Year && scope3Year > scope1And2Year ? scope3Year : scope1And2Year;
  const yearPeriod = overallTargetYear - baselineYear;

  const chartData: TargetChartData[] = [];
  for (let i = 0; i <= yearPeriod; i += 1) {
    const chartYear = baselineYear + i;
    // after the scope 1 and 2 year target reached,
    // for following years the emission should stay the same
    const scope1And2Emission = getTargetEmissionData({
      year: chartYear > scope1And2Year ? scope1And2YearPeriod : i,
      baselineEmissions: scope1And2BaseEmission,
      targetEmissions: scope1And2TargetEmission,
      yearPeriod: scope1And2YearPeriod,
    });

    // always fallback to the baseline values
    let scope3Emission = scope3BaseEmission ?? 0;
    if (scope3 && scope3Year && scope3YearPeriod) {
      // after the scope 3 year target reached,
      // for following years the emission should stay the same
      scope3Emission = getTargetEmissionData({
        year: chartYear > scope3Year ? scope3YearPeriod : i,
        baselineEmissions: scope3BaseEmission,
        targetEmissions: scope3TargetEmission,
        yearPeriod: scope3YearPeriod,
      });
    }

    chartData.push({
      year: chartYear,
      scope1And2TargetEmission: round(scope1And2Emission, 1),
      scope3TargetEmission: round(scope3Emission, 1),
      totalTargetEmission: round(scope3Emission + scope1And2Emission, 1),
    });
  }

  return chartData;
};

export const getTargetReductionForYear = ({
  baselineData,
  targetData,
  comparisonYear,
}: { comparisonYear: number } & TargetDataPayload) => {
  const targetEmissions = getTargetData({
    baselineData,
    targetData,
  });

  return targetEmissions.find((e) => e.year === comparisonYear);
};

export const getEmissionYears = (period: number = 16) => {
  const years: number[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < period; i += 1) {
    years.push(currentYear - i);
  }
  return years;
};

export const getYearSelectOptions = (years: number[]) =>
  years.map((year) => ({
    label: year,
    value: year,
  }));

export const getReductionPercentage = (
  currentEmissions: number,
  desiredEmissions: number
) => {
  const reductionPercentage = (1 - desiredEmissions / currentEmissions) * 100;
  const isReductionPercentagePositive = reductionPercentage > 0;
  return isReductionPercentagePositive ? reductionPercentage : 0;
};

export const getPercentileEmissions = (
  latestEmissions: number,
  percentage: number
) => Math.round(latestEmissions * (1 - percentage / 100));

export const getFutureYearOptions = (period: number = 4) => {
  const years: number[] = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < period; i += 1) {
    years.push(currentYear + i);
  }
  return years;
};

export const getEmissionPercentage = (total?: number, fraction?: number) => {
  if (typeof total === 'undefined' || typeof fraction === 'undefined') {
    return undefined;
  }

  return (fraction * 100) / total;
};
