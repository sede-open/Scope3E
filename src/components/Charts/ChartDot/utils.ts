import { CarbonIntensityChartKey } from 'components/CarbonIntensityGraph/types';
import { EmissionChartKeys } from 'components/EmissionsComposedChart/utils';
import {
  CongressBlue,
  MorningGlory,
  FunGreen,
  CannonPink,
} from 'styles/colours';

export type DotDataKeyType = EmissionChartKeys | CarbonIntensityChartKey;

export const getDotColour = (dataKey: DotDataKeyType) => {
  switch (dataKey) {
    case EmissionChartKeys.NET_EMISSION:
      return CongressBlue;
    case EmissionChartKeys.GROSS_EMISSION:
      return MorningGlory;
    case CarbonIntensityChartKey.ACTUAL_INTENSITIES:
      return CannonPink;
    default:
      return FunGreen;
  }
};
