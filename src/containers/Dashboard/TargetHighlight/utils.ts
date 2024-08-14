import {
  DashboardDataQuery_corporateEmissions as Emission,
  DashboardDataQuery_target as Target,
} from 'types/DashboardDataQuery';
import { getTargetReductionForYear } from 'utils/emissions';
import { formatInteger } from 'utils/number';

const TARGET_ROUND_TO = 10;
const DEFAULT_TARGET_DISPLAY = { formattedValue: '-', value: 0, unit: '' };

export const getTargetDisplayValues = ({
  baseline,
  target,
  targetYear,
  t,
}: {
  baseline: Emission;
  target?: Target | null;
  targetYear?: number;
  t: any;
}): { formattedValue: string; value: string | number; unit: string } => {
  if (!target || !targetYear) {
    return DEFAULT_TARGET_DISPLAY;
  }

  const targetEmission = getTargetReductionForYear({
    baselineData: {
      year: baseline.year,
      scope1: baseline.scope1,
      scope2: baseline.scope2,
      scope3: baseline.scope3,
      offset: baseline.offset,
    },
    targetData: target,
    comparisonYear: targetYear,
  });

  if (
    !targetEmission ||
    typeof targetEmission?.totalTargetEmission === 'undefined'
  ) {
    return DEFAULT_TARGET_DISPLAY;
  }

  const roundedTargetEmission =
    Math.round(targetEmission.totalTargetEmission * TARGET_ROUND_TO) /
    TARGET_ROUND_TO;

  if (roundedTargetEmission >= 10000000) {
    const roundedTargetEmissionInKT =
      Math.round((roundedTargetEmission / 1000) * TARGET_ROUND_TO) /
      TARGET_ROUND_TO;
    return {
      formattedValue: formatInteger(roundedTargetEmissionInKT),
      value: roundedTargetEmission,
      unit: `${t('common:unit-kt-co2')}`,
    };
  }

  return {
    formattedValue: formatInteger(targetEmission.totalTargetEmission),
    value: roundedTargetEmission,
    unit: `${t('common:unit-mt-co2')}`,
  };
};
