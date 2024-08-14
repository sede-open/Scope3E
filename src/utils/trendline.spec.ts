import PolynomialRegression from 'nodejs-polynomial-regression';

import { CorporateEmissionType, Scope2Type } from 'types/globalTypes';
import { getFutureYearOptions } from './emissions';
import { getCurrentYear } from './date';
import {
  getContiguousEmissions,
  getEmissionsTrend,
  getHistoricalEmissionsWithFillers,
} from './trendline';

jest.mock('./emissions');
jest.mock('./date');

const corporateEmissionBoilerplate = {
  id: 'some-id',
  type: CorporateEmissionType.ACTUAL,
  offset: null,
  examplePercentage: null,
  headCount: null,
  verificationFile: null,
};
const futureYearOptions = [2030, 2031, 2032, 2033];
const regressionPrediction = 999;
const getEmission = (year: number, scope3: number | null) => ({
  ...corporateEmissionBoilerplate,
  scope1: 1234,
  scope2: 34565,
  scope3,
  scope2Type: Scope2Type.MARKET,
  year,
  carbonIntensities: [],
});
const getExpected = (year: number, scope3: number | null) => ({
  scope1: regressionPrediction,
  scope2: regressionPrediction,
  scope3,
  year,
  isPrediction: true,
});

describe('trendline utils', () => {
  describe('getEmissionsTrend', () => {
    it('should create a new PolynomialRegression using the correct values from emissions data', () => {
      const mockTerms = [0, 1, 2];
      PolynomialRegression.getTerms.mockReturnValue(mockTerms);

      ((getFutureYearOptions as unknown) as jest.Mock).mockImplementation(
        () => futureYearOptions
      );

      const yearOptions = [2016, 2017, 2018];
      const scope3Options = [234, 567, 891];

      const emissions = [
        getEmission(yearOptions[0], scope3Options[0]),
        getEmission(yearOptions[1], scope3Options[1]),
        getEmission(yearOptions[2], scope3Options[2]),
      ];

      const expected = [
        [
          { x: yearOptions[0], y: emissions[0].scope1 },
          { x: yearOptions[1], y: emissions[1].scope1 },
          { x: yearOptions[2], y: emissions[2].scope1 },
        ],
        [
          { x: yearOptions[0], y: emissions[0].scope2 },
          { x: yearOptions[1], y: emissions[1].scope2 },
          { x: yearOptions[2], y: emissions[2].scope2 },
        ],
        [
          { x: yearOptions[0], y: emissions[0].scope3 },
          { x: yearOptions[1], y: emissions[1].scope3 },
          { x: yearOptions[2], y: emissions[2].scope3 },
        ],
      ];

      getEmissionsTrend(emissions);

      expected.map((_, index) =>
        expect(PolynomialRegression.read).toHaveBeenCalledWith(
          expected[index],
          3
        )
      );
      futureYearOptions.map((year) =>
        expect(PolynomialRegression.predictY).toHaveBeenCalledWith(
          mockTerms,
          year
        )
      );
    });

    describe('when there is less than 3 years of scope 3 data', () => {
      it('should return EmissionsTrendData with nullified scope 3 values', () => {
        ((getFutureYearOptions as unknown) as jest.Mock).mockImplementation(
          () => futureYearOptions
        );

        PolynomialRegression.predictY.mockReturnValue(regressionPrediction);

        const emissions = [
          getEmission(2016, 0),
          getEmission(2017, null),
          getEmission(2018, 1234),
        ];

        const expected = [
          getExpected(futureYearOptions[0], null),
          getExpected(futureYearOptions[1], null),
          getExpected(futureYearOptions[2], null),
          getExpected(futureYearOptions[3], null),
        ];

        expect(getEmissionsTrend(emissions)).toEqual(expected);
      });
    });

    describe('when there is 3 or more years of scope 3 data', () => {
      it('should return EmissionsTrendData with predicted scope 3 values', () => {
        ((getFutureYearOptions as unknown) as jest.Mock).mockImplementation(
          () => futureYearOptions
        );

        PolynomialRegression.predictY.mockReturnValue(regressionPrediction);

        const emissions = [
          getEmission(2016, 333),
          getEmission(2017, 334),
          getEmission(2018, 3452),
        ];

        const expected = [
          getExpected(futureYearOptions[0], regressionPrediction),
          getExpected(futureYearOptions[1], regressionPrediction),
          getExpected(futureYearOptions[2], regressionPrediction),
          getExpected(futureYearOptions[3], regressionPrediction),
        ];

        expect(getEmissionsTrend(emissions)).toEqual(expected);
      });
    });
  });

  describe('getContiguousEmissions', () => {
    beforeEach(() => {
      ((getCurrentYear as unknown) as jest.Mock).mockImplementation(() => 2020);
    });

    it.each`
      inputYears                                    | expectedYears
      ${[2014, 2015, 2016, 2017]}                   | ${[]}
      ${[2015, 2016, 2017, 2018, 2019]}             | ${[2015, 2016, 2017, 2018, 2019]}
      ${[2015, 2018, 2019, 2020]}                   | ${[2018, 2019, 2020]}
      ${[2009, 2010, 2013, 2015, 2018, 2019, 2020]} | ${[2018, 2019, 2020]}
    `(
      'should return an array which has no delta between years greater than 1 ($inputYears)',
      ({
        inputYears,
        expectedYears,
      }: {
        inputYears: number[];
        expectedYears: number[];
      }) => {
        expect(
          getContiguousEmissions(inputYears.map((year) => getEmission(year, 0)))
        ).toEqual(expectedYears.map((year) => getEmission(year, 0)));
      }
    );
  });

  describe('getHistoricalEmissionsWithFillers', () => {
    it('should return an array of Emissions with any gaps filled with filler objects', () => {
      const gappyYears = [2014, 2015, 2017, 2019, 2020, 2021];
      const input = gappyYears.map((year) => ({
        id: `id-${year}`,
        year,
        scope1: 1234,
        scope2: 5678,
        scope3: 0,
        scope2Type: Scope2Type.LOCATION,
        offset: 0,
        examplePercentage: 0,
        headCount: null,
        verificationFile: null,
        type: CorporateEmissionType.ACTUAL,
        carbonIntensities: [],
      }));
      const gapYears = [2016, 2018];
      const actual = getHistoricalEmissionsWithFillers(input);

      const getExpectedFiller = (year: number) => ({
        scope1: 0,
        scope2: 0,
        scope3: 0,
        year,
      });

      gapYears.forEach((gapYear) => {
        const fillerObject = actual.find(({ year }) => year === gapYear);
        expect(fillerObject).toEqual(getExpectedFiller(gapYear));
      });
    });
  });
});
