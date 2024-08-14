import * as carbonIntensityMocks from 'mocks/carbonIntensity';
import { CarbonIntensityGroupType } from 'types/globalTypes';
import { CARBON_INTENSITY_FIELD_KEYS } from '../types';

import { getCarbonIntensityMetricOptions } from './utils';

describe('CarbonIntensities - utils', () => {
  const { carbonIntensityConfig } = carbonIntensityMocks;

  describe(getCarbonIntensityMetricOptions.name, () => {
    it('should group carbon intensities', () => {
      const result = getCarbonIntensityMetricOptions(
        carbonIntensityConfig,
        jest.fn(),
        []
      );

      const commonCarbonIntensities = carbonIntensityConfig.filter(
        (e) => e.group === CarbonIntensityGroupType.COMMON
      );

      expect(result[0].options).toHaveLength(commonCarbonIntensities.length);
      expect(result[1].options).toHaveLength(
        carbonIntensityConfig.length - commonCarbonIntensities.length
      );
    });

    describe('when an option is already selected', () => {
      it('should make the option disabled', () => {
        const selectedCarbonIntensityIndex = 2;
        const selectedCarbonIntensity =
          carbonIntensityConfig[selectedCarbonIntensityIndex];

        const selectedOption = {
          [CARBON_INTENSITY_FIELD_KEYS.METRIC]: {
            label: selectedCarbonIntensity.type,
            value: selectedCarbonIntensity.type,
          },
          [CARBON_INTENSITY_FIELD_KEYS.VALUE]: 1,
        };

        const result = getCarbonIntensityMetricOptions(
          carbonIntensityConfig,
          jest.fn(),
          [selectedOption]
        );

        result[0].options.forEach((commonOption, index) => {
          if (index === selectedCarbonIntensityIndex) {
            expect(commonOption.isDisabled).toBe(true);
          } else {
            expect(commonOption.isDisabled).toBe(false);
          }
        });
      });
    });
  });
});
