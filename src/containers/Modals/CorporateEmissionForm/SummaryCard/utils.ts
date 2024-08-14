import { formatDecimal } from 'utils/number';
import { ONE_MILLION } from '../../../../constants';

export type SummaryType = {
  scope1?: number;
  scope2?: number;
  scope3?: number | null;
  offset?: number | null;
};

export const isFieldPopulated = (fieldValue: number | null | undefined) =>
  Boolean(fieldValue ?? '') || fieldValue === 0;

export const getNetEmissions = (value: SummaryType) =>
  (value?.scope1 ?? 0) +
  (value?.scope2 ?? 0) +
  (value?.scope3 ?? 0) -
  (value?.offset ?? 0);

export const getEmissionDisplayValue = ({
  value,
  t,
  isFormActive,
}: {
  value?: SummaryType;
  t: any;
  isFormActive?: boolean;
}): { formattedValue: string | number; unit: string } => {
  if (!value) {
    return { formattedValue: '-', unit: '' };
  }

  if (!isFormActive) {
    return {
      formattedValue: '-',
      unit: `${t('common:unit-mt-co2')}`,
    };
  }

  const netEmissions = getNetEmissions(value);

  if (netEmissions >= ONE_MILLION) {
    const roundedValue = Math.round((netEmissions / ONE_MILLION) * 100) / 100;

    return {
      formattedValue: formatDecimal(roundedValue),
      unit: `${t('common:unit-megatonne-co2')}`,
    };
  }

  return {
    formattedValue: formatDecimal(netEmissions),
    unit: `${t('common:unit-mt-co2')}`,
  };
};

export const getFormattedFieldValue = (
  value: number | undefined | null,
  isTruthyFieldValue: boolean
) => (isTruthyFieldValue ? formatDecimal(Number(value)) : '-');
