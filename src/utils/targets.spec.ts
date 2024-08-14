import { getIntensityTargetMock } from 'mocks/target';

import { getIntensityTarget, getLastTargetYear } from './targets';

describe('targets utils', () => {
  describe(getIntensityTarget.name, () => {
    describe('when an intensity target exists', () => {
      it('should return the first intensity target in the list', () => {
        const intensityTarget = getIntensityTargetMock();
        const targetData = { absolute: [], intensity: [intensityTarget] };

        const result = getIntensityTarget(targetData);
        expect(result).toEqual(intensityTarget);
      });
    });

    describe('when user has not set any intensity targets', () => {
      it('should return undefined', () => {
        const targetData = { absolute: [], intensity: [] };

        const result = getIntensityTarget(targetData);
        expect(result).toBeUndefined();
      });
    });
  });

  describe(getLastTargetYear.name, () => {
    const earlierYear = 2030;
    const lastYear = 2035;

    describe('when an scope 1 and 2 target year is later than scope 3', () => {
      it('should return return scope 1 and 2 target year', () => {
        const target = getIntensityTargetMock({
          scope1And2Year: lastYear,
          scope3Year: earlierYear,
        });

        const result = getLastTargetYear(target);
        expect(result).toEqual(lastYear);
      });
    });

    describe('when an scope 1 and 2 target year is sooner than scope 3', () => {
      it('should return return scope 3 target year', () => {
        const target = getIntensityTargetMock({
          scope1And2Year: earlierYear,
          scope3Year: lastYear,
        });

        const result = getLastTargetYear(target);
        expect(result).toEqual(lastYear);
      });
    });
  });
});
