import { OptionType } from 'components/SingleSelect';
import { FormValues } from '.';
import { DEFRA_GRID_FACTOR } from '../../constants';
import {
  HeatCoolingGridTypes,
  SCOPE2_SOURCES_FORM_FIELD_KEYS as FIELD_KEYS,
  SCOPE2_SOURCE_FIELD_KEYS as ROW_FIELD_KEYS,
} from '../../types';

export const getGridTypeOptions = (t: any): OptionType[] =>
  Object.values(HeatCoolingGridTypes).map((gridType) => ({
    label: t(`inexperiencedFlow:gridtype-heat-cooling-${gridType}`),
    meta: t(`inexperiencedFlow:gridtype-heat-cooling-meta-${gridType}`),
    value: gridType,
  }));

export const getTotalEmissions = (formValues: FormValues) =>
  formValues[FIELD_KEYS.EMISSION_SOURCES].reduce((acc, cur) => {
    const amount = Number(cur[ROW_FIELD_KEYS.AMOUNT] ?? 0);
    const customGridFactor = Number(
      cur[ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR] ?? 0
    );
    const gridType = cur[ROW_FIELD_KEYS.GRID_FACTOR_TYPE]?.value;

    if (gridType === HeatCoolingGridTypes.CUSTOM) {
      // Total emissions (tCO2e) =
      // custom grid factor (kgCO2e/kWh) * Purchased consumption / 1,000
      return acc + (customGridFactor * amount) / 1_000;
    }

    // Total emissions (tCO2e) =
    // DEFRA emissions factor (kgCO2e/kWh) / 1000 * Purchased consumption / 1,000
    return acc + (DEFRA_GRID_FACTOR * amount) / 1_000;
  }, 0);
