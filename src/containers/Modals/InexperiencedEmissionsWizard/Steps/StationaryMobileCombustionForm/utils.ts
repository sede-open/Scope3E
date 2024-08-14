import { OptionType } from 'components/SingleSelect';
import { sortObjectsByKey } from 'utils/sortObjectsByKey';
import { FormValues } from '.';
import {
  FuelName,
  SCOPE1_SOURCES_FORM_FIELD_KEYS as FIELD_KEYS,
  SCOPE1_SOURCE_FIELD_KEYS as ROW_FIELD_KEYS,
  Scope1SourceValues,
} from '../../types';
import { FUEL_EMISSIONS_PER_UNIT_IN_TCO2 } from '../../utils';

export const getFuelOptions = (
  t: any,
  selectedFuels: Scope1SourceValues[] = []
): OptionType[] => {
  const selectedFuelNames = selectedFuels.map((fuel) => fuel.source?.value);

  return Object.values(FuelName)
    .reduce<OptionType[]>((acc, cur) => {
      if (typeof cur !== 'number' && selectedFuelNames.indexOf(cur) === -1) {
        const fuelName = FuelName[(cur as unknown) as FuelName];
        return [
          ...acc,
          {
            value: fuelName,
            label: t(`fuels:${fuelName}`),
          },
        ];
      }
      return acc;
    }, [])
    .sort(sortObjectsByKey('label'));
};

export const getSelectedFuelUnit = (selectedValue?: FuelName) =>
  selectedValue
    ? FUEL_EMISSIONS_PER_UNIT_IN_TCO2[
        (FuelName[selectedValue] as unknown) as FuelName
      ].unit
    : 'L';

export const getTotalEmissions = (formValues: FormValues) =>
  formValues[FIELD_KEYS.EMISSION_SOURCES].reduce((acc, cur) => {
    const fuelValue = cur[ROW_FIELD_KEYS.SOURCE]?.value;
    const fuelAmount = cur.amount;

    if (fuelValue && typeof fuelAmount === 'number') {
      const { tco2PerUnit } = FUEL_EMISSIONS_PER_UNIT_IN_TCO2[
        (FuelName[fuelValue as FuelName] as unknown) as FuelName
      ];

      return acc + fuelAmount * tco2PerUnit;
    }
    return acc;
  }, 0);
