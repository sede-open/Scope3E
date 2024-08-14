import {
  DEFAULT_CHART_END_YEAR,
  IEA_BELOW_2_DEGREES_SCENARIO,
  IEA_2_DEGREES_SCENARIO,
  IEA_START_YEAR,
} from '../constants';

export type IEAChartData = {
  year?: number;
  iea?: number[];
};

export const getIEAChartData = (
  emissions?: number | null,
  baselineYear?: number,
  targetYear?: number
): IEAChartData[] => {
  const chartData: { year: number; iea: number[] }[] = [];

  if (emissions && baselineYear) {
    const ieaYears: number[] = Object.keys(IEA_2_DEGREES_SCENARIO).map((e) =>
      parseInt(e, 10)
    );

    let ieaBelow2DegreeEmissions = emissions;
    let iea2DegreeEmissions = emissions;

    // want to display range starting with IEA_START_YEAR earliest
    const startYear =
      baselineYear > IEA_START_YEAR ? baselineYear : IEA_START_YEAR;

    const endYear = targetYear ?? DEFAULT_CHART_END_YEAR;

    for (let i = startYear; i <= endYear; i += 1) {
      // start year value is always 100%
      if (i === startYear) {
        chartData.push({
          year: startYear,
          iea: [iea2DegreeEmissions, ieaBelow2DegreeEmissions],
        });
      } else {
        const nextIEAYear = ieaYears.find((e) => e >= i);

        if (nextIEAYear) {
          const isIEAYear = nextIEAYear === i;

          const eiaBelow2DegreeChange =
            IEA_BELOW_2_DEGREES_SCENARIO[nextIEAYear];
          const eia2DegreeChange = IEA_2_DEGREES_SCENARIO[nextIEAYear];

          if (isIEAYear) {
            // accumulation should only happen on IEA years
            ieaBelow2DegreeEmissions = Math.round(
              ieaBelow2DegreeEmissions * eiaBelow2DegreeChange
            );
            iea2DegreeEmissions = Math.round(
              iea2DegreeEmissions * eia2DegreeChange
            );

            chartData.push({
              year: i,
              iea: [ieaBelow2DegreeEmissions, iea2DegreeEmissions],
            });
          } else {
            // calculate fractional values for years in between IEA years
            const range = Math.abs(5 - (nextIEAYear - i));

            const EIABelow2RangeValue = Math.round(
              ieaBelow2DegreeEmissions *
                (1 + (range / 5) * (eiaBelow2DegreeChange - 1))
            );
            const EIA2RangeValue = Math.round(
              iea2DegreeEmissions * (1 + (range / 5) * (eia2DegreeChange - 1))
            );

            chartData.push({
              year: i,
              iea: [EIABelow2RangeValue, EIA2RangeValue],
            });
          }
        }
      }
    }
  }

  return chartData;
};
