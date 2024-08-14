import groupBy from 'lodash/groupBy';
import { CarbonIntensityConfigQuery_carbonIntensityConfig as CarbonIntensityConfig } from 'types/CarbonIntensityConfigQuery';
import { CarbonIntensityValues, CARBON_INTENSITY_FIELD_KEYS } from '../types';

export const getCarbonIntensityMetricOptions = (
  carbonIntensityConfig: CarbonIntensityConfig[],
  t: any,
  carbonIntensities: CarbonIntensityValues[]
) => {
  const groupedConfig = groupBy(carbonIntensityConfig, 'group');

  return Object.keys(groupedConfig).map((optionGroup) => {
    const groupLabel = t(`carbonIntensity:${optionGroup}`);

    return {
      label: groupLabel,
      options: groupedConfig[optionGroup].map((option) => {
        const isDisabled = carbonIntensities.find(
          (e) => e[CARBON_INTENSITY_FIELD_KEYS.METRIC]?.value === option.type
        );

        return {
          label: t(`carbonIntensity:${option.type}`),
          value: option.type,
          isDisabled: Boolean(isDisabled),
        };
      }),
    };
  });
};
