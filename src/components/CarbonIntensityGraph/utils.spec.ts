import { getCarbonIntensityEmissionMock } from 'mocks/carbonIntensity';
import { getIntensityTargetMock } from 'mocks/target';
import { IntensityEmission } from 'utils/carbonIntensities';
import { getCarbonIntensityMock } from 'mocks/carbonIntensities';
import { getCorporateEmission } from 'mocks/corporateEmissions';
import { CarbonIntensityMetricType } from 'types/globalTypes';
import {
  getYears,
  getActualIntensityGraphData,
  getYAxisHighestPoint,
  getIntensityEmissionsForMetric,
} from './utils';
import { CarbonIntensityChartKey } from './types';

describe('CarbonIntensityGraph utils', () => {
  const firstIntensityYear = 2018;
  const earlierTargetYear = 2030;
  const laterTargetYear = 2035;

  describe(getYears.name, () => {
    describe('when user has intensities', () => {
      const intensities: IntensityEmission[] = [
        getCarbonIntensityEmissionMock({ year: firstIntensityYear + 1 }),
        getCarbonIntensityEmissionMock({ year: firstIntensityYear }),
        getCarbonIntensityEmissionMock({ year: firstIntensityYear + 2 }),
      ];

      describe('when scope 1,2 target year is later than scope 3 target year', () => {
        it('should return all years starting with earliest actual emission, ending with scope 1,2 target year', () => {
          const target = getIntensityTargetMock({
            scope1And2Year: laterTargetYear,
            scope3Year: earlierTargetYear,
          });

          const result = getYears(intensities, target);

          expect(result).toHaveLength(laterTargetYear - firstIntensityYear + 1);
          expect(result[0]).toBe(firstIntensityYear);
          expect(result[result.length - 1]).toBe(laterTargetYear);
        });
      });

      describe('when scope 1,2 target year is sooner than scope 3 target year', () => {
        it('should return all years starting with earliest actual emission, ending with scope 3 target year', () => {
          const target = getIntensityTargetMock({
            scope1And2Year: earlierTargetYear,
            scope3Year: laterTargetYear,
          });

          const result = getYears(intensities, target);

          expect(result).toHaveLength(laterTargetYear - firstIntensityYear + 1);
          expect(result[0]).toBe(firstIntensityYear);
          expect(result[result.length - 1]).toBe(laterTargetYear);
        });
      });

      describe('when user only has scope 1,2 target', () => {
        it('should return all years starting with earliest actual emission, ending with scope 1,2 target year', () => {
          const target = getIntensityTargetMock({
            scope1And2Year: earlierTargetYear,
            scope3Year: null,
          });

          const result = getYears(intensities, target);

          expect(result).toHaveLength(
            earlierTargetYear - firstIntensityYear + 1
          );
          expect(result[0]).toBe(firstIntensityYear);
          expect(result[result.length - 1]).toBe(earlierTargetYear);
        });
      });
    });

    describe('when user has no intensities', () => {
      it('should return an empty array', () => {
        const intensities: IntensityEmission[] = [];
        const target = getIntensityTargetMock();
        const result = getYears(intensities, target);

        expect(result).toHaveLength(0);
      });
    });
  });

  describe(getActualIntensityGraphData.name, () => {
    const intensities: IntensityEmission[] = [
      getCarbonIntensityEmissionMock({ year: firstIntensityYear + 1 }),
      getCarbonIntensityEmissionMock({ year: firstIntensityYear }),
      getCarbonIntensityEmissionMock({ year: firstIntensityYear + 3 }),
      getCarbonIntensityEmissionMock({ year: firstIntensityYear + 2 }),
    ];

    it('should return data for the graph in ascending order', () => {
      const result = getActualIntensityGraphData(intensities);

      expect(result).toHaveLength(intensities.length);
      expect(result[0]).toEqual(
        expect.objectContaining({
          year: intensities[1].year,
          [CarbonIntensityChartKey.ACTUAL_INTENSITIES]:
            intensities[1].netEmissions,
        })
      );
      expect(result[1]).toEqual(
        expect.objectContaining({
          year: intensities[0].year,
          [CarbonIntensityChartKey.ACTUAL_INTENSITIES]:
            intensities[0].netEmissions,
        })
      );
      expect(result[2]).toEqual(
        expect.objectContaining({
          year: intensities[3].year,
          [CarbonIntensityChartKey.ACTUAL_INTENSITIES]:
            intensities[3].netEmissions,
        })
      );
      expect(result[3]).toEqual(
        expect.objectContaining({
          year: intensities[2].year,
          [CarbonIntensityChartKey.ACTUAL_INTENSITIES]:
            intensities[2].netEmissions,
        })
      );
    });
  });

  describe(getYAxisHighestPoint.name, () => {
    function getActualIntensityData(highestEmission: number) {
      return [
        {
          year: 2018,
          [CarbonIntensityChartKey.ACTUAL_INTENSITIES]: highestEmission - 100,
        },
        {
          year: 2019,
          [CarbonIntensityChartKey.ACTUAL_INTENSITIES]: highestEmission,
        },
        {
          year: 2020,
          [CarbonIntensityChartKey.ACTUAL_INTENSITIES]: highestEmission - 200,
        },
      ];
    }
    it('should return the highest actual carbon intensity value', () => {
      const highestActualIntensityEmission = 500;
      const result = getYAxisHighestPoint({
        actualIntensities: getActualIntensityData(
          highestActualIntensityEmission
        ),
      });

      expect(result).toEqual(highestActualIntensityEmission);
    });

    describe('the highest actual carbon intensity value is a float', () => {
      it('should return a rounded number', () => {
        const highestActualIntensityEmissionFloat = 500.23;
        const result = getYAxisHighestPoint({
          actualIntensities: getActualIntensityData(
            highestActualIntensityEmissionFloat
          ),
        });

        expect(result).toEqual(501);
      });
    });
  });
  describe(getIntensityEmissionsForMetric.name, () => {
    const baselineYear = 2018;
    const targetMetric = CarbonIntensityMetricType.CUBIC_METRES;

    const intensity = getCarbonIntensityMock({
      intensityMetric: targetMetric,
      intensityValue: 10,
    });

    const baseline = getCorporateEmission({
      year: baselineYear,
      scope1: 100,
      scope2: 200,
      scope3: 300,
      offset: 50,
      carbonIntensities: [intensity],
    });

    it('should return intensity emissions for a carbon intensity metric', () => {
      const emission = getCorporateEmission({
        year: baselineYear + 1,
        scope1: 200,
        scope2: 300,
        scope3: 400,
        offset: 100,
        carbonIntensities: [intensity],
      });

      const result = getIntensityEmissionsForMetric(
        [baseline, emission],
        baselineYear,
        targetMetric
      );

      expect(result).toHaveLength(2);
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            year: baselineYear,
            scope1: 10,
            scope2: 20,
            scope3: 30,
            offset: 5,
            netEmissions: 55,
          }),
          expect.objectContaining({
            year: baselineYear + 1,
            scope1: 20,
            scope2: 30,
            scope3: 40,
            offset: 10,
            netEmissions: 80,
          }),
        ])
      );
    });

    describe('when users has carbon intensities for emissions before baseline year', () => {
      it('should not return those carbon intensity emissions', () => {
        const emission = getCorporateEmission({
          year: baselineYear - 1,
          carbonIntensities: [intensity],
        });

        const result = getIntensityEmissionsForMetric(
          [baseline, emission],
          baselineYear,
          targetMetric
        );

        expect(result).toHaveLength(1);
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              year: baselineYear,
            }),
          ])
        );
      });
    });

    describe('when users has carbon intensities for other intensity metrics', () => {
      it('should not return those carbon intensity emissions', () => {
        const irrelevantIntensity = getCarbonIntensityMock({
          intensityMetric: CarbonIntensityMetricType.KWH,
          intensityValue: 10,
        });
        const emission = getCorporateEmission({
          year: baselineYear + 1,
          carbonIntensities: [irrelevantIntensity],
        });

        const result = getIntensityEmissionsForMetric(
          [baseline, emission],
          baselineYear,
          targetMetric
        );

        expect(result).toHaveLength(1);
        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              year: baselineYear,
            }),
          ])
        );
      });
    });
  });
});
