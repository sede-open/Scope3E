import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { getNetEmissions } from 'utils/emissions';
import { formatInteger } from 'utils/number';

export const getEmissionDisplayValue = ({
  emission,
  t,
}: {
  emission?: Emission;
  t: any;
}): { formattedValue: string | number; unit: string } => {
  if (!emission) {
    return { formattedValue: '-', unit: '' };
  }

  const netEmissions = getNetEmissions(emission);

  if (netEmissions >= 10000000) {
    const roundedValue = Math.round((netEmissions / 1000) * 100) / 100;

    return {
      formattedValue: formatInteger(roundedValue),
      unit: `${t('common:unit-kt-co2')}`,
    };
  }

  return {
    formattedValue: formatInteger(netEmissions),
    unit: `${t('common:unit-mt-co2')}`,
  };
};
