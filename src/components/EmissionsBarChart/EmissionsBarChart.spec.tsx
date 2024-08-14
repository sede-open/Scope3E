import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { TargetChartData } from 'utils/emissions';
import {
  EmissionsOverviewBarChartData,
  getBarChartEmissionsData,
  getBarSize,
  mergeEmissionsAndTargetData,
} from './utils';

describe('EmissionsBarChart', () => {
  describe('getBarChartEmissionsData', () => {
    it('should return correct values', () => {
      const emissions = ([
        {
          year: 2016,
          scope1: 1,
          scope2: 2,
          scope3: 4,
          offset: 1,
        },
        {
          year: 2017,
          scope1: 5,
          scope2: 6,
          scope3: 7,
          offset: 8,
        },
        {
          year: 2018,
          scope1: 1,
          scope2: 1,
          scope3: 0,
          offset: 2,
        },
      ] as unknown) as Emission[];

      const result = getBarChartEmissionsData(emissions);

      const expectedResult = [
        {
          year: 2016,
          scope1: 1,
          scope2: 2,
          scope3: 4,
          offset: -1,
        },
        {
          year: 2017,
          scope1: 5,
          scope2: 6,
          scope3: 7,
          offset: -8,
        },
        {
          year: 2018,
          scope1: 1,
          scope2: 1,
          scope3: 0,
          offset: -2,
        },
      ];

      expect(result).toEqual(expectedResult);
    });
  });

  describe('mergeEmissionsAndTargetData', () => {
    it('should return correct values', () => {
      const emissionsData = ([
        {
          year: 2016,
          scope1: 1,
          scope2: 2,
          scope3: 4,
          offset: -1,
        },
        {
          year: 2017,
          scope1: 5,
          scope2: 6,
          scope3: 7,
          offset: -8,
        },
        {
          year: 2018,
          scope1: 1,
          scope2: 1,
          scope3: 0,
          offset: -2,
        },
      ] as unknown) as EmissionsOverviewBarChartData[];

      const targetData = ([
        {
          year: 2016,
          scope1And2TargetEmission: 3,
          scope3TargetEmission: 2,
          totalTargetEmission: 5,
        },
        {
          year: 2017,
          scope1And2TargetEmission: 2,
          scope3TargetEmission: 2,
          totalTargetEmission: 4,
        },
        {
          year: 2018,
          scope1And2TargetEmission: 3,
          scope3TargetEmission: 3,
          totalTargetEmission: 6,
        },
      ] as unknown) as TargetChartData[];

      const result = mergeEmissionsAndTargetData(targetData, emissionsData);

      const expectedResult = [
        {
          year: 2016,
          scope1: 1,
          scope2: 2,
          scope3: 4,
          offset: -1,
          scope1And2TargetEmission: 3,
          scope3TargetEmission: 2,
          totalTargetEmission: 5,
        },
        {
          year: 2017,
          scope1: 5,
          scope2: 6,
          scope3: 7,
          offset: -8,
          scope1And2TargetEmission: 2,
          scope3TargetEmission: 2,
          totalTargetEmission: 4,
        },
        {
          year: 2018,
          scope1: 1,
          scope2: 1,
          scope3: 0,
          offset: -2,
          scope1And2TargetEmission: 3,
          scope3TargetEmission: 3,
          totalTargetEmission: 6,
        },
      ];

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getBarSize', () => {
    it('should return size 10 if difference is 20 to 30', () => {
      const yearDifference = 22;
      const result = getBarSize(yearDifference);
      expect(result).toBe(10);

      const anotherYearDifference = 30;
      const anotherResult = getBarSize(anotherYearDifference);
      expect(anotherResult).toBe(10);
    });

    it('should return size 7 if difference is greater than 36', () => {
      const yearDifference = 36;
      const result = getBarSize(yearDifference);
      expect(result).toBe(7);

      const anotherYearDifference = 58;
      const anotherResult = getBarSize(anotherYearDifference);
      expect(anotherResult).toBe(7);
    });

    it('should return size 12 if difference is less than 20', () => {
      const yearDifference = 17;
      const result = getBarSize(yearDifference);
      expect(result).toBe(12);

      const anotherYearDifference = 12;
      const anotherResult = getBarSize(anotherYearDifference);
      expect(anotherResult).toBe(12);
    });
  });
});
