import { OptionType } from 'components/SingleSelect';
import {
  ElectricityLocationGridNames,
  ELECTRICITY_COUNTRY_GRID_KGCO2_PER_KWH,
} from 'utils/electricityGrid';
import { ITravelLeverOption, IVehicleLeverOption } from './data';

const DEFRA_FACTOR_VALUE = 0.23314;
const ELECTRIC_VEHICLE_UK_FUEL_MIX_STATIC_VALUE = 0.25319;
const EXISTING_UK_FUEL_MIX_VALUE = 0.019093;

export const getGridLocationOptions = (t: any): OptionType[] => {
  const locations = Object.keys(
    ELECTRICITY_COUNTRY_GRID_KGCO2_PER_KWH
  ) as ElectricityLocationGridNames[];

  return locations.map((location) => ({
    value: location,
    label: t(`locations:${location}`),
  }));
};

export const getCountryElectricGridValueInMT = (
  country: ElectricityLocationGridNames
) => ELECTRICITY_COUNTRY_GRID_KGCO2_PER_KWH[country].kgCO2ePerkWh / 1000;

export const getVehicleEmissionFuelDataCo2MTPerUnit = (
  fuelData: IVehicleLeverOption,
  country: ElectricityLocationGridNames,
  optionName: string
) =>
  fuelData.name === optionName
    ? getCountryElectricGridValueInMT(country) *
      ELECTRIC_VEHICLE_UK_FUEL_MIX_STATIC_VALUE
    : fuelData.co2MTPerUnit;

export const getTravelEmissionFuelDataCo2MTPerUnit = (
  fuelData: ITravelLeverOption,
  country: ElectricityLocationGridNames,
  optionName: string
) =>
  fuelData.name === optionName
    ? (EXISTING_UK_FUEL_MIX_VALUE / DEFRA_FACTOR_VALUE) *
      getCountryElectricGridValueInMT(country)
    : fuelData.co2MTPerUnit;

export const getDataCenterEmissionFuelDataCo2MTPerUnit = (
  fuelData: IVehicleLeverOption,
  country: ElectricityLocationGridNames
) => fuelData.co2KgPerUnit * getCountryElectricGridValueInMT(country);
