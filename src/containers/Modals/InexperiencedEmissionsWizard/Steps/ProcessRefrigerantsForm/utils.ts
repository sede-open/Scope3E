import { OptionType } from 'components/SingleSelect';
import { sortObjectsByKey } from 'utils/sortObjectsByKey';
import { FormValues } from '.';
import {
  ProcessRefrigerantName,
  SCOPE1_SOURCES_FORM_FIELD_KEYS as FIELD_KEYS,
  SCOPE1_SOURCE_FIELD_KEYS as ROW_FIELD_KEYS,
  Scope1SourceValues,
} from '../../types';
import { PROCESS_REFRIGERANT_EMISSIONS_PER_UNIT_IN_TCO2 } from '../../utils';

export const getSortedProcessRefrigerantOptions = (
  t: any,
  selectedFuels: Scope1SourceValues[] = []
): OptionType[] => {
  const selectedNames = selectedFuels.map((fuel) => fuel.source?.value);

  return Object.values(ProcessRefrigerantName)
    .reduce<OptionType[]>((acc, cur) => {
      if (typeof cur !== 'number' && selectedNames.indexOf(cur) === -1) {
        const name =
          ProcessRefrigerantName[(cur as unknown) as ProcessRefrigerantName];
        return [
          ...acc,
          {
            value: name,
            label: t(`processRefrigerants:${name}`),
          },
        ];
      }
      return acc;
    }, [])
    .sort(sortObjectsByKey('value'));
};

export const getSelectedFuelUnit = (selectedValue?: ProcessRefrigerantName) =>
  selectedValue
    ? PROCESS_REFRIGERANT_EMISSIONS_PER_UNIT_IN_TCO2[
        (ProcessRefrigerantName[
          selectedValue
        ] as unknown) as ProcessRefrigerantName
      ].unit
    : 'kg';

export const getTotalEmissions = (formValues: FormValues) =>
  formValues[FIELD_KEYS.EMISSION_SOURCES].reduce((acc, cur) => {
    const fuelValue = cur[ROW_FIELD_KEYS.SOURCE]?.value;
    const fuelAmount = cur.amount;

    if (fuelValue && typeof fuelAmount === 'number') {
      const { tco2PerUnit } = PROCESS_REFRIGERANT_EMISSIONS_PER_UNIT_IN_TCO2[
        (ProcessRefrigerantName[
          fuelValue as ProcessRefrigerantName
        ] as unknown) as ProcessRefrigerantName
      ];

      return acc + fuelAmount * tco2PerUnit;
    }
    return acc;
  }, 0);
