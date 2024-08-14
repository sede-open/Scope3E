import { getChartYearOptions } from '.';

describe('TargetChart', () => {
  describe('getChartYearOptions', () => {
    it('should return correct year values for less than 20 year gap', () => {
      const result = getChartYearOptions(2030, 2016);
      expect(result).toEqual([2016, 2019, 2022, 2025, 2030]);
    });
    it('should return correct year values for equal or more than 20 year gap', () => {
      const result = getChartYearOptions(2036, 2016);
      expect(result).toEqual([2016, 2021, 2026, 2031, 2036]);
    });
    it('should return correct year values for equal or more than 40 year gap', () => {
      const result = getChartYearOptions(2056, 2016);
      expect(result).toEqual([2016, 2026, 2036, 2046, 2056]);
    });
  });
});
