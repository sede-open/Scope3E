import { OptionType } from 'components/SingleSelect';
import { ElectricityLocationGridNames } from 'utils/electricityGrid';

import {
  electricityFuels,
  carCurrentFuels,
  carSwapFuels,
  truckCurrentFuels,
  truckSwapFuels,
  travelCurrentFuels,
  travelSwapFuels,
  shippingCurrentFuels,
  shippingSwapFuels,
  dataCentreCurrentFuels,
  dataCentreSwapFuels,
  IVehicleLeverOption,
  ITravelLeverOption,
  COUNTRY_ELECTRIC_GRID,
} from './data';
import {
  getCountryElectricGridValueInMT,
  getVehicleEmissionFuelDataCo2MTPerUnit,
  getTravelEmissionFuelDataCo2MTPerUnit,
  getDataCenterEmissionFuelDataCo2MTPerUnit,
} from './utils';

export type SimulationLeverType =
  | 'mobilityLever'
  | 'roadFreightLever'
  | 'shippingLever'
  | 'electricityLever'
  | 'travelLever'
  | 'dataCentreLever';

export type LeverDataType = {
  selectedCurrentFuel?: OptionType;
  selectedSwapFuel?: OptionType;
  unitAmount?: number | string;
  percentageChange?: number;
  emissionChange?: number;
  emissionReduction?: number;
};

export const getElectrictyFuelOptions = (t: any) =>
  electricityFuels.map((fuel) => ({
    label: t(`common:${fuel.name}`),
    value: fuel.name,
  }));

export const getCarCurrentFuelOptions = (t: any) =>
  carCurrentFuels.map((fuel) => ({
    label: t(`common:${fuel.name}`),
    value: fuel.name,
  }));

export const getCarSwapFuelOptions = (t: any) =>
  carSwapFuels.map((fuel) => ({
    label: t(`common:${fuel.name}`),
    value: fuel.name,
  }));

export const getTruckCurrentFuelOptions = (t: any) =>
  truckCurrentFuels.map((fuel) => ({
    label: t(`common:${fuel.name}`),
    value: fuel.name,
  }));

export const getTruckSwapFuelOptions = (t: any) =>
  truckSwapFuels.map((fuel) => ({
    label: t(`common:${fuel.name}`),
    value: fuel.name,
  }));

export const getTravelCurrentFuelOptions = (t: any) =>
  travelCurrentFuels.map((fuel) => ({
    label: t(`common:${fuel.name}`),
    value: fuel.name,
  }));

export const getTravelSwapFuelOptions = (t: any) =>
  travelSwapFuels.map((fuel) => ({
    label: t(`common:${fuel.name}`),
    value: fuel.name,
  }));

export const getShippingCurrentFuelOptions = (t: any) =>
  shippingCurrentFuels.map((fuel) => ({
    label: t(`common:${fuel.name}`),
    value: fuel.name,
  }));

export const getShippingSwapFuelOptions = (t: any) =>
  shippingSwapFuels.map((fuel) => ({
    label: t(`common:${fuel.name}`),
    value: fuel.name,
  }));

export const getDataCentreCurrentFuelOptions = (t: any) =>
  dataCentreCurrentFuels.map((fuel) => ({
    label: t(`common:${fuel.name}`),
    value: fuel.name,
  }));

export const getDataCentreSwapFuelOptions = (t: any) =>
  dataCentreSwapFuels.map((fuel) => ({
    label: t(`common:${fuel.name}`),
    value: fuel.name,
  }));

export const getElectricityEmissionChange = (
  { unitAmount, selectedCurrentFuel, selectedSwapFuel }: LeverDataType,
  country: ElectricityLocationGridNames
) => {
  if (
    !unitAmount ||
    typeof selectedCurrentFuel === 'undefined' ||
    typeof selectedSwapFuel === 'undefined' ||
    typeof unitAmount !== 'number'
  ) {
    return {};
  }

  const currentFuelData = electricityFuels.find(
    (e) => e.name === selectedCurrentFuel.value
  );
  const swapFuelData = electricityFuels.find(
    (e) => e.name === selectedSwapFuel.value
  );

  if (!currentFuelData || !swapFuelData) {
    return {};
  }

  const currentCo2MTPerUnit =
    currentFuelData.name === COUNTRY_ELECTRIC_GRID
      ? getCountryElectricGridValueInMT(country)
      : currentFuelData.co2MTPerUnit;
  const emissionsFromCurrentFuel = unitAmount * currentCo2MTPerUnit;

  const reductionCo2MTPerUnit =
    swapFuelData.name === COUNTRY_ELECTRIC_GRID
      ? getCountryElectricGridValueInMT(country)
      : swapFuelData.co2MTPerUnit;
  const emissionReduction = unitAmount * reductionCo2MTPerUnit;

  const emissionChange = emissionReduction - emissionsFromCurrentFuel;
  return { emissionChange, emissionReduction };
};

const getVehicleEmissionChange = ({
  lever: { selectedCurrentFuel, selectedSwapFuel, unitAmount },
  country,
  fuelData,
}: {
  lever: LeverDataType;
  type: SimulationLeverType;
  country: ElectricityLocationGridNames;
  fuelData: IVehicleLeverOption[];
}) => {
  if (
    !unitAmount ||
    typeof selectedCurrentFuel === 'undefined' ||
    typeof selectedSwapFuel === 'undefined' ||
    typeof unitAmount !== 'number'
  ) {
    return {};
  }
  const currentFuelData = fuelData.find(
    (e) => e.name === selectedCurrentFuel.value
  );
  const swapFuelData = fuelData.find((e) => e.name === selectedSwapFuel.value);

  if (!currentFuelData || !swapFuelData) {
    return {};
  }

  const litersPerEfficiencyFactor =
    unitAmount / currentFuelData.fuelConsumption;

  const unitsOfReplacementFuel =
    swapFuelData.fuelConsumption === 0
      ? 0
      : litersPerEfficiencyFactor * swapFuelData.fuelConsumption;

  const currentCo2MTPerUnit = getVehicleEmissionFuelDataCo2MTPerUnit(
    currentFuelData,
    country,
    COUNTRY_ELECTRIC_GRID
  );

  const emissionsFromCurrentFuel = unitAmount * currentCo2MTPerUnit;

  const swapCo2MTPerUnit = getVehicleEmissionFuelDataCo2MTPerUnit(
    swapFuelData,
    country,
    COUNTRY_ELECTRIC_GRID
  );

  const emissionReduction = unitsOfReplacementFuel * swapCo2MTPerUnit;

  const emissionChange = emissionReduction - emissionsFromCurrentFuel;

  return { emissionChange, emissionReduction };
};

const getDataCentreEmissionChange = ({
  lever: { selectedCurrentFuel, selectedSwapFuel, unitAmount },
  country,
  fuelData,
}: {
  lever: LeverDataType;
  country: ElectricityLocationGridNames;
  fuelData: IVehicleLeverOption[];
}) => {
  if (
    !unitAmount ||
    typeof selectedCurrentFuel === 'undefined' ||
    typeof selectedSwapFuel === 'undefined' ||
    typeof unitAmount !== 'number'
  ) {
    return {};
  }
  const currentFuelData = fuelData.find(
    (e) => e.name === selectedCurrentFuel.value
  );
  const swapFuelData = fuelData.find((e) => e.name === selectedSwapFuel.value);

  if (!currentFuelData || !swapFuelData) {
    return {};
  }

  const unitsOfReplacementFuel =
    swapFuelData.fuelConsumption === 0
      ? 0
      : unitAmount * swapFuelData.fuelConsumption;

  const co2MTPerUnit = getDataCenterEmissionFuelDataCo2MTPerUnit(
    currentFuelData,
    country
  );

  const emissionsFromCurrentFuel = unitAmount * co2MTPerUnit;
  const emissionReduction = unitsOfReplacementFuel * co2MTPerUnit;
  const emissionChange = emissionReduction - emissionsFromCurrentFuel;
  return { emissionChange, emissionReduction };
};

const getTravelEmissionChange = ({
  lever: { selectedCurrentFuel, selectedSwapFuel, unitAmount },
  country,
  fuelData,
}: {
  lever: LeverDataType;
  country: ElectricityLocationGridNames;
  fuelData: ITravelLeverOption[];
}) => {
  if (
    !unitAmount ||
    typeof selectedCurrentFuel === 'undefined' ||
    typeof selectedSwapFuel === 'undefined' ||
    typeof unitAmount !== 'number'
  ) {
    return {};
  }
  const currentFuelData = fuelData.find(
    (e) => e.name === selectedCurrentFuel.value
  );
  const swapFuelData = fuelData.find((e) => e.name === selectedSwapFuel.value);

  if (!currentFuelData || !swapFuelData) {
    return {};
  }

  const currentCo2MTPerUnit = getTravelEmissionFuelDataCo2MTPerUnit(
    currentFuelData,
    country,
    COUNTRY_ELECTRIC_GRID
  );
  const emissionsFromCurrentFuel = unitAmount * currentCo2MTPerUnit;

  const swapCo2MTPerUnit = getTravelEmissionFuelDataCo2MTPerUnit(
    swapFuelData,
    country,
    COUNTRY_ELECTRIC_GRID
  );
  const emissionReduction = unitAmount * swapCo2MTPerUnit;

  const emissionChange = emissionReduction - emissionsFromCurrentFuel;
  return { emissionChange, emissionReduction };
};

export const getEmissionChangeData = ({
  type,
  lever,
  country,
}: {
  type: SimulationLeverType;
  lever?: LeverDataType;
  country: ElectricityLocationGridNames;
}): {
  emissionChange?: number;
  emissionReduction?: number;
} => {
  if (!lever) {
    return {};
  }
  switch (type) {
    case 'electricityLever':
      return getElectricityEmissionChange(lever, country);
    case 'mobilityLever':
      return getVehicleEmissionChange({
        lever,
        type,
        country,
        fuelData: [...carCurrentFuels, ...carSwapFuels],
      });
    case 'roadFreightLever':
      return getVehicleEmissionChange({
        lever,
        type,
        country,
        fuelData: [...truckCurrentFuels, ...truckSwapFuels],
      });
    case 'travelLever':
      return getTravelEmissionChange({
        lever,
        country,
        fuelData: [...travelCurrentFuels, ...travelSwapFuels],
      });
    case 'shippingLever':
      return getVehicleEmissionChange({
        lever,
        type,
        country,
        fuelData: [...shippingCurrentFuels, ...shippingSwapFuels],
      });
    case 'dataCentreLever':
      return getDataCentreEmissionChange({
        lever,
        country,
        fuelData: [...dataCentreCurrentFuels, ...dataCentreSwapFuels],
      });
    default:
      return {};
  }
};

export const getFuelUnit = (fuelName?: string) => {
  const fuels = [
    ...electricityFuels,
    ...carCurrentFuels,
    ...carSwapFuels,
    ...truckCurrentFuels,
    ...truckSwapFuels,
    ...travelCurrentFuels,
    ...travelSwapFuels,
    ...shippingCurrentFuels,
    ...shippingSwapFuels,
    ...dataCentreCurrentFuels,
    ...dataCentreSwapFuels,
  ];
  const fuel = fuels.find((e) => e.name === fuelName);
  return fuel?.unit ?? '';
};
