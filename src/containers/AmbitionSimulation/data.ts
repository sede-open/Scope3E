export interface IElectricityLeverOption {
  name: string;
  unit: string;
  co2MTPerUnit: number;
}

export const COUNTRY_ELECTRIC_GRID = 'country-electric-grid';

// If the co2MTPerUnit value in the data below is equal to 0,
// the data value is gathered from the getFuelDataCo2MTPerUnit()
// function. This function will return the co2MTPerUnit value
// based on country specific kgCo2e/kWh

export const electricityFuels: IElectricityLeverOption[] = [
  {
    name: COUNTRY_ELECTRIC_GRID,
    unit: 'MWh',
    co2MTPerUnit: 0,
  },
  {
    name: 'solar-pv',
    unit: 'MWh',
    co2MTPerUnit: 0,
  },
  {
    name: 'wind',
    unit: 'MWh',
    co2MTPerUnit: 0,
  },
];

export interface IVehicleLeverOption {
  name: string;
  unit: string;
  co2MTPerUnit: number;
  co2KgPerUnit: number;
  fuelConsumption: number;
}

export const carCurrentFuels: IVehicleLeverOption[] = [
  {
    name: 'petrol-average-biofuel',
    unit: 'L',
    co2KgPerUnit: 2.76146,
    fuelConsumption: 8.04321,
    co2MTPerUnit: 0.00276146,
  },
  {
    name: 'petrol-mineral',
    unit: 'L',
    co2KgPerUnit: 2.91199,
    fuelConsumption: 7.91589,
    co2MTPerUnit: 0.00291199,
  },
  {
    name: 'diesel-average-biofuel',
    unit: 'L',
    co2KgPerUnit: 3.15618,
    fuelConsumption: 6.61971,
    co2MTPerUnit: 0.00315618,
  },
  {
    name: 'diesel-mineral',
    unit: 'L',
    co2KgPerUnit: 3.31398,
    fuelConsumption: 6.59491,
    co2MTPerUnit: 0.00331398,
  },
  {
    name: 'lpg',
    unit: 'L',
    co2KgPerUnit: 1.74555,
    fuelConsumption: 12.69915,
    co2MTPerUnit: 0.00174555,
  },
  {
    name: 'cng',
    unit: 'L',
    co2KgPerUnit: 0.52843,
    fuelConsumption: 39.69305,
    co2MTPerUnit: 0.00052843,
  },
  {
    name: 'bioethanol',
    unit: 'L',
    co2KgPerUnit: 0.53556,
    fuelConsumption: 12.20883,
    co2MTPerUnit: 0.00053556,
  },
  {
    name: 'biodiesel-b100',
    unit: 'L',
    co2KgPerUnit: 0.53961,
    fuelConsumption: 7.16771,
    co2MTPerUnit: 0.00053961,
  },
  {
    name: COUNTRY_ELECTRIC_GRID,
    unit: 'kWh',
    co2KgPerUnit: 0,
    fuelConsumption: 22.61938,
    co2MTPerUnit: 0,
  },
];

export const carSwapFuels: IVehicleLeverOption[] = [
  {
    name: 'bioethanol',
    unit: 'L',
    co2KgPerUnit: 0.53556,
    fuelConsumption: 12.20883,
    co2MTPerUnit: 0.00053556,
  },
  {
    name: 'biodiesel-b100',
    unit: 'L',
    co2KgPerUnit: 0.53961,
    fuelConsumption: 7.16771,
    co2MTPerUnit: 0.00053961,
  },
  {
    name: COUNTRY_ELECTRIC_GRID,
    unit: 'kWh',
    co2KgPerUnit: 0,
    fuelConsumption: 22.61938,
    co2MTPerUnit: 0,
  },
  {
    name: 'electric-green',
    unit: 'kWh',
    co2KgPerUnit: 0,
    fuelConsumption: 0,
    co2MTPerUnit: 0,
  },
  {
    name: 'hydrogen-green',
    unit: 'kg',
    co2KgPerUnit: 0,
    fuelConsumption: 0,
    co2MTPerUnit: 0,
  },
];

export const truckCurrentFuels: IVehicleLeverOption[] = [
  {
    name: 'diesel-mineral',
    unit: 'L',
    co2KgPerUnit: 3.31398,
    fuelConsumption: 0.074,
    co2MTPerUnit: 0.00331398,
  },
  {
    name: 'diesel-average-biofuel',
    unit: 'L',
    co2KgPerUnit: 3.15618,
    fuelConsumption: 0.074,
    co2MTPerUnit: 0.00315618,
  },
  {
    name: 'biodiesel-b100',
    unit: 'L',
    co2KgPerUnit: 0.53961,
    fuelConsumption: 0.074,
    co2MTPerUnit: 0.00053961,
  },
  {
    name: 'lpg',
    unit: 'L',
    co2KgPerUnit: 1.74555,
    fuelConsumption: 0.13439,
    co2MTPerUnit: 0.00174555,
  },
  {
    name: 'cng',
    unit: 'L',
    co2KgPerUnit: 0.52843,
    fuelConsumption: 0.41714,
    co2MTPerUnit: 0.00052843,
  },
  {
    name: 'lng',
    unit: 'L',
    co2KgPerUnit: 1.54729,
    fuelConsumption: 0.05606,
    co2MTPerUnit: 0.00154729,
  },
  {
    name: COUNTRY_ELECTRIC_GRID,
    unit: 'kWh',
    co2KgPerUnit: 0,
    fuelConsumption: 0.39,
    co2MTPerUnit: 0,
  },
];

export const truckSwapFuels: IVehicleLeverOption[] = [
  {
    name: 'biodiesel-b100',
    unit: 'L',
    co2KgPerUnit: 0.53961,
    fuelConsumption: 0.074,
    co2MTPerUnit: 0.00053961,
  },
  {
    name: 'lng',
    unit: 'L',
    co2KgPerUnit: 1.54729,
    fuelConsumption: 0.05606,
    co2MTPerUnit: 0.00154729,
  },
  {
    name: COUNTRY_ELECTRIC_GRID,
    unit: 'kWh',
    co2KgPerUnit: 0,
    fuelConsumption: 0.39,
    co2MTPerUnit: 0,
  },
  {
    name: 'electric-green',
    unit: 'kWh',
    co2KgPerUnit: 0,
    fuelConsumption: 0,
    co2MTPerUnit: 0,
  },
  {
    name: 'hydrogen-green',
    unit: 'kg',
    co2KgPerUnit: 0,
    fuelConsumption: 0,
    co2MTPerUnit: 0,
  },
  {
    name: 'bio-LNG',
    unit: 'L',
    co2KgPerUnit: 0,
    fuelConsumption: 0,
    co2MTPerUnit: 0,
  },
];

export const shippingCurrentFuels: IVehicleLeverOption[] = [
  {
    name: 'bunker-fuel-hfo',
    unit: 'ton',
    co2KgPerUnit: 3770.20544,
    fuelConsumption: 0.0039,
    co2MTPerUnit: 3.77020544,
  },
  {
    name: 'marine-gas-oil',
    unit: 'ton',
    co2KgPerUnit: 3990.68721,
    fuelConsumption: 0.0037,
    co2MTPerUnit: 3.99068721,
  },
];

export const shippingSwapFuels: IVehicleLeverOption[] = [
  {
    name: 'lng',
    unit: 'ton',
    co2KgPerUnit: 3770.20544,
    fuelConsumption: 0.003315,
    co2MTPerUnit: 3.77020544,
  },
  {
    name: 'bunker-fuel-with-JAWS-software',
    unit: 'ton',
    co2KgPerUnit: 3770.20544,
    fuelConsumption: 0.003627,
    co2MTPerUnit: 3.77020544,
  },
  {
    name: 'bunker-fuel-with-battery-on-board-technology',
    unit: 'ton',
    co2KgPerUnit: 3770.20544,
    fuelConsumption: 0.003393,
    co2MTPerUnit: 3.77020544,
  },
];

export const dataCentreCurrentFuels: IVehicleLeverOption[] = [
  {
    name: 'average-air-cooling',
    unit: 'MWh',
    co2KgPerUnit: 253.19,
    fuelConsumption: 1.0,
    co2MTPerUnit: 0.25319,
  },
];

export const dataCentreSwapFuels: IVehicleLeverOption[] = [
  {
    name: 'immersion-cooling',
    unit: 'MWh',
    co2KgPerUnit: 253.19,
    fuelConsumption: 0.685534591195,
    co2MTPerUnit: 0.25319,
  },
  {
    name: 'immersion-cooling+reused-heat',
    unit: 'MWh',
    co2KgPerUnit: 253.19,
    fuelConsumption: 0.3710691823899,
    co2MTPerUnit: 0.25319,
  },
];

export interface ITravelLeverOption {
  name: string;
  unit: string;
  co2KmPerUnit: number;
  co2MTPerUnit: number;
}
export const travelCurrentFuels: ITravelLeverOption[] = [
  {
    name: 'air-regular-aviation-fuel',
    unit: 'km',
    co2KmPerUnit: 0.11603,
    co2MTPerUnit: 0.00011603,
  },
  {
    name: 'car-petrol',
    unit: 'km',
    co2KmPerUnit: 0.074037,
    co2MTPerUnit: 0.000074037,
  },
  {
    name: COUNTRY_ELECTRIC_GRID,
    unit: 'km',
    co2KmPerUnit: 0,
    co2MTPerUnit: 0,
  },
  {
    name: 'rail',
    unit: 'km',
    co2KmPerUnit: 0.00566,
    co2MTPerUnit: 0.00000566,
  },
  {
    name: 'bus-coach',
    unit: 'km',
    co2KmPerUnit: 0.03381,
    co2MTPerUnit: 0.00003381,
  },
];

export const travelSwapFuels: ITravelLeverOption[] = [
  {
    name: 'air-sustainable-aviation-fuel',
    unit: 'km',
    co2KmPerUnit: 0.023206,
    co2MTPerUnit: 0.000023206,
  },
  {
    name: 'car-petrol',
    unit: 'km',
    co2KmPerUnit: 0.074037,
    co2MTPerUnit: 0.000074037,
  },
  {
    name: COUNTRY_ELECTRIC_GRID,
    unit: 'km',
    co2KmPerUnit: 0,
    co2MTPerUnit: 0,
  },
  {
    name: 'electric-car-renewable-energy',
    unit: 'km',
    co2KmPerUnit: 0.0,
    co2MTPerUnit: 0.0,
  },
  {
    name: 'rail',
    unit: 'km',
    co2KmPerUnit: 0.00566,
    co2MTPerUnit: 0.00000566,
  },
  {
    name: 'bus-coach',
    unit: 'km',
    co2KmPerUnit: 0.03381,
    co2MTPerUnit: 0.00003381,
  },
];
