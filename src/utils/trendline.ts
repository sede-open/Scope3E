import PolynomialRegression from 'nodejs-polynomial-regression';

import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { getCurrentYear } from './date';
import { getFutureYearOptions } from './emissions';
import { captureException } from './logging';

type RegressionData = {
  x: number;
  y: number | null;
};

export type EmissionsTrendData = {
  scope1: number;
  scope2: number;
  scope3: number | null;
  year: number;
  isPrediction: boolean;
};

type RegressionInput = {
  year: number;
  scope1: number;
  scope2: number;
  scope3: number | null;
};

type ScopePrediction = {
  [key: number]: number;
};

const getScopeData = (emissions: RegressionInput[]) => (
  scopeKey: keyof RegressionInput
): RegressionData[] =>
  emissions.map((emission: RegressionInput) => ({
    x: emission.year,
    y: emission[scopeKey],
  }));

const formatPrediction = (prediction: number): number =>
  prediction > 0 ? Number(prediction.toFixed(2)) : 0;

const getScopePrediction = (yearOptions: number[]) => (
  inputData: RegressionData[],
  suppressValues: boolean = false
): ScopePrediction => {
  const RegressionModel = PolynomialRegression.read(inputData, 3);
  const regressionTerms = RegressionModel.getTerms();

  return yearOptions.reduce((acc, year) => {
    const yearPrediction = suppressValues
      ? null
      : formatPrediction(RegressionModel.predictY(regressionTerms, year));

    return {
      ...acc,
      [year]: yearPrediction,
    };
  }, {});
};

const getRegressionInput = ({
  year,
  scope1,
  scope2,
  scope3,
}: Emission): RegressionInput => ({
  year,
  scope1,
  scope2,
  scope3,
});

export const getContiguousEmissions = (emissions: Emission[]) => {
  const contiguousEmissionsWithData: Emission[] = [];

  emissions
    .slice()
    .reverse()
    .forEach((emission) => {
      const { year } = emission;

      const lastContiguousYear =
        contiguousEmissionsWithData[contiguousEmissionsWithData.length - 1]
          ?.year || getCurrentYear();

      const lastAndCurrentYearDelta = lastContiguousYear - year;

      if (lastAndCurrentYearDelta < 3) {
        contiguousEmissionsWithData.push(emission);
      }
    });

  return contiguousEmissionsWithData.reverse();
};

const getScope3DataCount = (emissions: RegressionInput[]): number =>
  emissions.reduce(
    (acc, { scope3 }) => (scope3 && scope3 > 0 ? acc + 1 : acc),
    0
  );

const getYearCount = (emissionsLength: number) => {
  if (emissionsLength > 4) {
    return 3;
  }

  if (emissionsLength === 4) {
    return 2;
  }

  return 1;
};

export const getEmissionsTrend = (
  emissions: Emission[]
): EmissionsTrendData[] => {
  try {
    const yearCount = getYearCount(emissions.length);
    const futureYears = getFutureYearOptions(yearCount);

    const getScopePredictionForYears = getScopePrediction(futureYears);

    const regressionInput = emissions.map(getRegressionInput);
    const scope3DataCount = getScope3DataCount(regressionInput);
    const shouldSuppressScope3Values = scope3DataCount < 3;

    const getScopeRegressionData = getScopeData(regressionInput);

    const scope1Prediction = getScopePredictionForYears(
      getScopeRegressionData('scope1')
    );
    const scope2Prediction = getScopePredictionForYears(
      getScopeRegressionData('scope2')
    );

    const scope3Prediction = getScopePredictionForYears(
      getScopeRegressionData('scope3'),
      shouldSuppressScope3Values
    );

    return futureYears.map((year: number) => ({
      year,
      scope1: scope1Prediction[year],
      scope2: scope2Prediction[year],
      scope3: scope3Prediction[year],
      isPrediction: true,
    }));
  } catch (e) {
    captureException(e);
    throw new Error('Failed to calculate emissions trend data');
  }
};

const getEmptyEmissionForYear = (year: number) => ({
  year,
  scope1: 0,
  scope2: 0,
  scope3: 0,
});

export const getHistoricalEmissionsWithFillers = (
  historicalEmissions: Emission[]
) => {
  const { year: startYear } = historicalEmissions[0];
  const { year: endYear } = historicalEmissions[historicalEmissions.length - 1];
  const contiguousHistoricalYears = new Array(endYear - startYear + 1)
    .fill(undefined)
    .map((_, index) => index + startYear);

  return contiguousHistoricalYears.map(
    (year) =>
      historicalEmissions.find((emission) => year === emission.year) ||
      getEmptyEmissionForYear(year)
  );
};
