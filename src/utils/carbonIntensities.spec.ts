import { CarbonIntensityMetricType } from 'types/globalTypes';
import { getIntensityEmission } from './carbonIntensities';

describe('carbonIntensities utils', () => {
  describe(getIntensityEmission.name, () => {
    const emission = {
      year: 2020,
      scope1: 100,
      scope2: 200,
      scope3: undefined,
      offset: undefined,
    };
    const intensity = {
      intensityMetric: CarbonIntensityMetricType.CUBIC_METRES,
      intensityValue: 10,
    };

    it('should return an intensity emission', () => {
      const result = getIntensityEmission({
        emission: { ...emission, scope3: 300, offset: 50 },
        intensity,
      });
      expect(result).toEqual({
        intensityMetric: 'CUBIC_METRES',
        netEmissions: 55,
        offset: 5,
        scope1: 10,
        scope2: 20,
        scope3: 30,
        year: 2020,
      });
    });

    describe('when scope 3 value is undefined', () => {
      it('should return scope 3 as null', () => {
        const result = getIntensityEmission({
          emission: { ...emission, scope3: undefined, offset: 50 },
          intensity,
        });
        expect(result.scope3).toBeNull();
      });
    });

    describe('when offset value is undefined', () => {
      it('should return scope 3 as null', () => {
        const result = getIntensityEmission({
          emission: { ...emission, scope3: 300, offset: undefined },
          intensity,
        });
        expect(result.offset).toBeNull();
      });
    });
  });
});
