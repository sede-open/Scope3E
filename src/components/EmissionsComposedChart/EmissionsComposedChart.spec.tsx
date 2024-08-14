import { CorporateEmissionType } from 'types/globalTypes';
import {
  DashboardDataQuery_corporateEmissions as Emission,
  DashboardDataQuery_target as Target,
} from 'types/DashboardDataQuery';

import { example_TARGET_YEAR } from '../../constants';
import {
  getYears,
  getEmissionsData,
  getexampleTargetLineValues,
  formatTick,
} from './utils';

describe('EmissionsComposedChart', () => {
  describe('getYears', () => {
    it('should return all years between the lowest year in emissions and 2040', () => {
      const result = getYears([({ year: 2035 } as unknown) as Emission]);
      expect(result).toEqual([2035, 2036, 2037, 2038, 2039, 2040]);
    });
    it('should return all years between the lowest year and the highest in emissions if more than 2040', () => {
      const result = getYears(([
        { year: 2035 },
        { year: 2042 },
      ] as unknown) as Emission[]);
      expect(result).toEqual([2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042]);
    });
    it('should return all years between the lowest year and scope 1 and 2 target year if that is bigger than 2040', () => {
      const result = getYears(
        ([{ year: 2035 }, { year: 2042 }] as unknown) as Emission[],
        ({ scope1And2Year: 2045, scope3Year: 2035 } as unknown) as Target
      );
      expect(result).toEqual([
        2035,
        2036,
        2037,
        2038,
        2039,
        2040,
        2041,
        2042,
        2043,
        2044,
        2045,
      ]);
    });
    it('should return all years between the lowest year and scope 3 target year if that is bigger than 2040', () => {
      const result = getYears(
        ([{ year: 2035 }, { year: 2042 }] as unknown) as Emission[],
        ({ scope1And2Year: 2035, scope3Year: 2045 } as unknown) as Target
      );
      expect(result).toEqual([
        2035,
        2036,
        2037,
        2038,
        2039,
        2040,
        2041,
        2042,
        2043,
        2044,
        2045,
      ]);
    });
  });

  describe('getEmissionsData', () => {
    it('should sort emissions by year and return correct values', () => {
      const emissions = ([
        {
          year: 2016,
          scope1: 1,
          scope2: 2,
          scope3: 4,
          offset: 1,
          examplePercentage: 10,
          type: CorporateEmissionType.BASELINE,
        },
        {
          year: 2018,
          scope1: 5,
          scope2: 6,
          scope3: 7,
          offset: 8,
          examplePercentage: 20,
          type: CorporateEmissionType.ACTUAL,
        },
        {
          year: 2017,
          scope1: 1,
          scope2: 1,
          scope3: 0,
          offset: 1,
          examplePercentage: 50,
          type: CorporateEmissionType.ACTUAL,
        },
      ] as unknown) as Emission[];

      const result = getEmissionsData(emissions);

      expect(result[0].year).toBe(2016);
      expect(result[0].netEmissions).toBe(6);
      expect(result[0].grossEmissions).toBe(7);
      expect(result[0].exampleShare).toBe(0.6);
      expect(result[0].type).toBe(CorporateEmissionType.BASELINE);

      expect(result[1].year).toBe(2017);
      expect(result[1].netEmissions).toBe(1);
      expect(result[1].grossEmissions).toBe(2);
      expect(result[1].exampleShare).toBe(0.5);
      expect(result[1].type).toBe(CorporateEmissionType.ACTUAL);

      expect(result[2].year).toBe(2018);
      expect(result[2].netEmissions).toBe(10);
      expect(result[2].grossEmissions).toBe(18);
      expect(result[2].exampleShare).toBe(2);
      expect(result[2].type).toBe(CorporateEmissionType.ACTUAL);
    });
  });

  describe('getexampleTargetLineValues()', () => {
    it('should return line point for example_TARGET_YEAR', () => {
      const result = getexampleTargetLineValues();

      expect(result).toEqual([
        { year: 2034.5, value: 0 },
        { year: 2035.5, value: 0 },
      ]);
    });
  });

  describe('formatTick()', () => {
    it('should retun a formatted year value', () => {
      const result = formatTick(2065);
      expect(result).toBe("'65");
    });

    it('should star example_TARGET_YEAR year', () => {
      const result = formatTick(example_TARGET_YEAR);
      expect(result).toContain('*');
    });
  });
});
