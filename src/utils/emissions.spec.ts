import { TargetStrategyType } from 'types/globalTypes';
import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import {
  getNetEmissions,
  getEmissionYears,
  getReductionPercentage,
  getPercentileEmissions,
  getFutureYearOptions,
  getTargetData,
} from './emissions';

describe('emissions utils', () => {
  describe('getNetEmissions()', () => {
    it('should return net emissions for the entry', () => {
      const emission = ({
        scope1: 2,
        scope2: 3,
        scope3: 5,
        offset: 4,
      } as unknown) as Emission;
      const result = getNetEmissions(emission);

      expect(result).toBe(6);
    });

    it('should return 0 net emissions when undefined is passed in', () => {
      const result = getNetEmissions();
      expect(result).toBe(0);
    });
  });

  describe('getTargetData()', () => {
    const baselineData = {
      year: 2020,
      scope1: 10000,
      scope2: 10000,
      scope3: 50000,
      offset: 10000,
    };
    const targetData = {
      scope1And2Year: 2030,
      scope1And2Reduction: 50,
      scope3Year: 2035,
      scope3Reduction: 75,
      strategy: TargetStrategyType,
      includeCarbonOffset: false,
    };

    describe('when offsets are not included', () => {
      describe('when scope 1 and 2 and scope 3 targets have been defined', () => {
        it.each`
          strategyName
          ${TargetStrategyType.MODERATE}
          ${TargetStrategyType.PASSIVE}
          ${TargetStrategyType.AGGRESSIVE}
        `(
          'should return data for $strategyName strategy',
          ({ strategyName }: { strategyName: TargetStrategyType }) => {
            const result = getTargetData({
              baselineData,
              targetData: {
                ...targetData,
                strategy: strategyName,
                includeCarbonOffset: false,
              },
            });

            expect(result).toMatchSnapshot();
          }
        );
      });

      describe('when scope 3 target has not been set', () => {
        it.each`
          strategyName
          ${TargetStrategyType.MODERATE}
          ${TargetStrategyType.PASSIVE}
          ${TargetStrategyType.AGGRESSIVE}
        `(
          'should return data for $strategyName strategy',
          ({ strategyName }: { strategyName: TargetStrategyType }) => {
            const result = getTargetData({
              baselineData,
              targetData: {
                ...targetData,
                scope3Year: null,
                scope3Reduction: null,
                strategy: strategyName,
                includeCarbonOffset: false,
              },
            });

            expect(result).toMatchSnapshot();
          }
        );
      });

      describe('when scope 3 emission has not been defined', () => {
        it.each`
          strategyName
          ${TargetStrategyType.MODERATE}
          ${TargetStrategyType.PASSIVE}
          ${TargetStrategyType.AGGRESSIVE}
        `(
          'should return data for $strategyName strategy',
          ({ strategyName }: { strategyName: TargetStrategyType }) => {
            const result = getTargetData({
              baselineData: {
                ...baselineData,
                scope3: null,
              },
              targetData: {
                ...targetData,
                scope3Year: null,
                scope3Reduction: null,
                strategy: strategyName,
                includeCarbonOffset: false,
              },
            });

            expect(result).toMatchSnapshot();
          }
        );
      });
    });

    describe('when offsets are included', () => {
      describe('when scope 1 and 2 and scope 3 targets have been defined', () => {
        it.each`
          strategyName
          ${TargetStrategyType.MODERATE}
          ${TargetStrategyType.PASSIVE}
          ${TargetStrategyType.AGGRESSIVE}
        `(
          'should return data for $strategyName strategy',
          ({ strategyName }: { strategyName: TargetStrategyType }) => {
            const result = getTargetData({
              baselineData,
              targetData: {
                ...targetData,
                strategy: strategyName,
                includeCarbonOffset: true,
              },
            });

            expect(result).toMatchSnapshot();
          }
        );
      });

      describe('when scope 3 target has not been set', () => {
        it.each`
          strategyName
          ${TargetStrategyType.MODERATE}
          ${TargetStrategyType.PASSIVE}
          ${TargetStrategyType.AGGRESSIVE}
        `(
          'should return data for $strategyName strategy',
          ({ strategyName }: { strategyName: TargetStrategyType }) => {
            const result = getTargetData({
              baselineData,
              targetData: {
                ...targetData,
                scope3Year: null,
                scope3Reduction: null,
                strategy: strategyName,
                includeCarbonOffset: true,
              },
            });

            expect(result).toMatchSnapshot();
          }
        );
      });

      describe('when scope 3 emission has not been defined', () => {
        it.each`
          strategyName
          ${TargetStrategyType.MODERATE}
          ${TargetStrategyType.PASSIVE}
          ${TargetStrategyType.AGGRESSIVE}
        `(
          'should return data for $strategyName strategy',
          ({ strategyName }: { strategyName: TargetStrategyType }) => {
            const result = getTargetData({
              baselineData: {
                ...baselineData,
                scope3: null,
              },
              targetData: {
                ...targetData,
                scope3Year: null,
                scope3Reduction: null,
                strategy: strategyName,
                includeCarbonOffset: true,
              },
            });

            expect(result).toMatchSnapshot();
          }
        );
      });
    });
  });

  describe('getEmissionYears()', () => {
    it('should return current and past 15 years by default', () => {
      const result = getEmissionYears();
      expect(result).toHaveLength(16);
      expect(result[0]).toBe(new Date().getFullYear());
      expect(result[15]).toBe(new Date().getFullYear() - 15);
    });

    it('should return current and past years for specific period', () => {
      const result = getEmissionYears(25);
      expect(result).toHaveLength(25);
    });
  });

  describe('getFutureYearOptions()', () => {
    it('should return current and next 3 years by default', () => {
      const result = getFutureYearOptions();
      expect(result).toHaveLength(4);
      expect(result[0]).toBe(new Date().getFullYear());
      expect(result[3]).toBe(new Date().getFullYear() + 3);
    });

    it('should return future years for specific period', () => {
      const result = getFutureYearOptions(12);
      // current year is included in the list
      expect(result).toHaveLength(12);
    });
  });

  describe('getReductionPercentage()', () => {
    it('should return percentage of reductions given starting quatity and end quantity', () => {
      const result = getReductionPercentage(10000, 2000);
      expect(result).toBe(80);
    });
  });

  describe('getPercentileEmissions()', () => {
    it('should return quantity given a quantity and reduction percentage', () => {
      const result = getPercentileEmissions(10000, 10);
      expect(result).toBe(9000);
    });
  });
});
