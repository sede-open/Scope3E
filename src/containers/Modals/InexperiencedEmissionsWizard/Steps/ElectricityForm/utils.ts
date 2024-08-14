import {
  ElectricityLocationGridNames,
  ELECTRICITY_COUNTRY_GRID_KGCO2_PER_KWH,
} from 'utils/electricityGrid';
import { formatDecimal } from 'utils/number';
import { OptionType } from 'components/SingleSelect';

import {
  ElectricityGridTypes,
  SCOPE2_SOURCES_FORM_FIELD_KEYS as FIELD_KEYS,
  SCOPE2_SOURCE_FIELD_KEYS as ROW_FIELD_KEYS,
  Scope2SourceValues,
} from '../../types';
import { FormValues } from './types';

export const getGridTypeOptions = (t: any): OptionType[] =>
  Object.values(ElectricityGridTypes).map((gridType) => ({
    label: t(`inexperiencedFlow:gridtype-electricity-${gridType}`),
    meta: t(`inexperiencedFlow:gridtype-electricity-meta-${gridType}`),
    value: gridType,
  }));

export const getGridLocationOptions = (
  t: any,
  selectedLocations: Scope2SourceValues[] = []
): OptionType[] => {
  const locations = Object.keys(
    ELECTRICITY_COUNTRY_GRID_KGCO2_PER_KWH
  ) as ElectricityLocationGridNames[];
  const selectedLocationNames = selectedLocations.map(
    (fuel) => fuel.gridLocation?.value
  );

  return locations.reduce<OptionType[]>((acc, cur) => {
    if (selectedLocationNames.indexOf(cur) === -1) {
      const factor = ELECTRICITY_COUNTRY_GRID_KGCO2_PER_KWH[cur].kgCO2ePerkWh;
      const factorDisplayValue = formatDecimal(factor);
      return [
        ...acc,
        {
          value: cur,
          label: t(`locations:${cur}`),
          meta: `${factorDisplayValue} ${t(`common:unit-kg-co2e-kwh`)}`,
        },
      ];
    }
    return acc;
  }, []);
};

export const getTotalEmissions = (formValues: FormValues) =>
  formValues[FIELD_KEYS.EMISSION_SOURCES].reduce((acc, cur) => {
    const gridType = cur[ROW_FIELD_KEYS.GRID_FACTOR_TYPE]?.value;

    if (gridType === ElectricityGridTypes.CUSTOM) {
      // Total emissions (tCO2e) =
      // custom grid factor (kgCO2e/kWh) * Purchased consumption / 1,000
      return (
        acc +
        (Number(cur[ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR] ?? 0) *
          Number(cur[ROW_FIELD_KEYS.AMOUNT] ?? 0)) /
          1_000
      );
    }

    const gridLocation = cur[ROW_FIELD_KEYS.GRID_LOCATION]
      ?.value as ElectricityLocationGridNames;
    if (gridLocation) {
      const gridFactor =
        ELECTRICITY_COUNTRY_GRID_KGCO2_PER_KWH[gridLocation].kgCO2ePerkWh;
      // Total emissions (tCO2e) =
      // Power Emission factor (for country) * Purchased consumption / 1,000
      return (
        acc + (gridFactor * Number(cur[ROW_FIELD_KEYS.AMOUNT] ?? 0)) / 1_000
      );
    }

    return acc;
  }, 0);

// This is a workaround for react-hook-form v6's unhelpful unregister behaviour
// Should be fixed by abcd-1246
const isCustomGridFactorEnabled = (value: ElectricityGridTypes) =>
  value === ElectricityGridTypes.CUSTOM;
export const unregisterRedundantGridField = ({
  unregister,
  value,
  customGridFactorFieldName,
  gridLocationFieldName,
}: {
  unregister: (name: string) => void;
  value: ElectricityGridTypes;
  customGridFactorFieldName: string;
  gridLocationFieldName: string;
}) => {
  const redundantFieldName = isCustomGridFactorEnabled(value)
    ? gridLocationFieldName
    : customGridFactorFieldName;

  unregister(redundantFieldName);
};

export const areAllRequiredRowFieldFilledOut = (formValues: FormValues) => {
  const invalidRows = formValues[FIELD_KEYS.EMISSION_SOURCES].filter((row) => {
    if (
      row[ROW_FIELD_KEYS.GRID_FACTOR_TYPE]?.value ===
        ElectricityGridTypes.CUSTOM &&
      row[ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR] === undefined
    ) {
      return true;
    }
    if (
      row[ROW_FIELD_KEYS.GRID_FACTOR_TYPE]?.value ===
        ElectricityGridTypes.LOCATION &&
      !row[ROW_FIELD_KEYS.GRID_LOCATION]
    ) {
      return true;
    }

    if (!row[ROW_FIELD_KEYS.GRID_FACTOR_TYPE]) {
      return true;
    }

    return false;
  });

  return invalidRows.length === 0;
};
