import { getNetEmissions } from 'containers/Modals/CorporateEmissionForm/SummaryCard/utils';
import { CarbonIntensityMetricType } from 'types/globalTypes';

export type IntensityEmission = {
  year: number;
  intensityMetric: CarbonIntensityMetricType;
  netEmissions: number;
  scope1: number;
  scope2: number;
  scope3: number | null;
  offset: number | null;
};

export const getIntensityEmission = ({
  emission: { year, scope1, scope2, scope3, offset },
  intensity: { intensityMetric, intensityValue },
}: {
  emission: {
    year: number;
    scope1: number;
    scope2: number;
    scope3?: number | null;
    offset?: number | null;
  };
  intensity: {
    intensityMetric: CarbonIntensityMetricType;
    intensityValue: number;
  };
}): IntensityEmission => {
  const intensityScope1 = scope1 / intensityValue;
  const intensityScope2 = scope2 / intensityValue;
  const intensityScope3 = scope3 ? scope3 / intensityValue : null;
  const intensityOffset = offset ? offset / intensityValue : null;

  const netEmissions = getNetEmissions({
    scope1: intensityScope1,
    scope2: intensityScope2,
    scope3: intensityScope3,
    offset: intensityOffset,
  });

  return {
    year,
    intensityMetric,
    netEmissions,
    scope1: intensityScope1,
    scope2: intensityScope2,
    scope3: intensityScope3,
    offset: intensityOffset,
  };
};
