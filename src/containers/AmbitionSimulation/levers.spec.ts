import { ElectricityLocationGridNames } from 'utils/electricityGrid';
import {
  COUNTRY_ELECTRIC_GRID,
  IVehicleLeverOption,
  ITravelLeverOption,
} from './data';
import { getEmissionChangeData } from './levers';
import {
  getCountryElectricGridValueInMT,
  getTravelEmissionFuelDataCo2MTPerUnit,
  getVehicleEmissionFuelDataCo2MTPerUnit,
} from './utils';

const defaultCountry = ElectricityLocationGridNames.UNITED_KINGDOM;

describe('levers utils', () => {
  describe('getEmissionChangeData()', () => {
    describe('electricityLever', () => {
      describe.each`
        country                                        | absValue
        ${ElectricityLocationGridNames.UNITED_KINGDOM} | ${0.31234000000000003}
        ${ElectricityLocationGridNames.UNITED_STATES}  | ${0.50157501039999994}
        ${ElectricityLocationGridNames.NETHERLANDS}    | ${0.50340562217999997}
      `(
        'for $country country',
        ({
          absValue,
          country,
        }: {
          absValue: number;
          country: ElectricityLocationGridNames;
        }) => {
          it('should return change when emissions are reduced', () => {
            const result = getEmissionChangeData({
              type: 'electricityLever',
              lever: {
                unitAmount: 1000,
                selectedCurrentFuel: {
                  value: COUNTRY_ELECTRIC_GRID,
                  label: '',
                },
                selectedSwapFuel: { value: 'wind', label: '' },
              },
              country,
            });

            expect(result!.emissionChange).toBe(-absValue);
            expect(result!.emissionReduction).toBe(0);
          });

          it('should return change when emissions are increased', () => {
            const result = getEmissionChangeData({
              type: 'electricityLever',
              lever: {
                unitAmount: 1000,
                selectedCurrentFuel: { value: 'wind', label: '' },
                selectedSwapFuel: { value: COUNTRY_ELECTRIC_GRID, label: '' },
              },
              country,
            });

            expect(result!.emissionChange).toBe(absValue);
            expect(result!.emissionReduction).toBe(absValue);
          });

          it('should return change when emissions remain the same', () => {
            const result = getEmissionChangeData({
              type: 'electricityLever',
              lever: {
                unitAmount: 1000,
                selectedCurrentFuel: {
                  value: COUNTRY_ELECTRIC_GRID,
                  label: '',
                },
                selectedSwapFuel: { value: COUNTRY_ELECTRIC_GRID, label: '' },
              },
              country,
            });
            expect(result!.emissionChange).toBe(0);
            expect(result!.emissionReduction).toBe(absValue);
          });
        }
      );
    });

    describe('mobilityLever', () => {
      it('should return change when emissions are reduced', () => {
        const result = getEmissionChangeData({
          type: 'mobilityLever',
          lever: {
            unitAmount: 10000,
            selectedCurrentFuel: { value: 'biodiesel-b100', label: '' },
            selectedSwapFuel: { value: COUNTRY_ELECTRIC_GRID, label: '' },
          },
          country: defaultCountry,
        });

        expect(Math.round(result!.emissionChange! * 100) / 100).toBe(-2.9);
        expect(Math.round(result!.emissionReduction! * 100) / 100).toBe(2.5);
      });

      it('should return change when emissions are increased', () => {
        const result = getEmissionChangeData({
          type: 'mobilityLever',
          lever: {
            unitAmount: 10000,
            selectedCurrentFuel: {
              value: COUNTRY_ELECTRIC_GRID,
              label: '',
            },
            selectedSwapFuel: { value: 'biodiesel-b100', label: '' },
          },
          country: defaultCountry,
        });

        expect(Math.round(result!.emissionChange! * 100) / 100).toBe(0.92);
        expect(Math.round(result!.emissionReduction! * 100) / 100).toBe(1.71);
      });

      it('should return change when emissions remain the same', () => {
        const result = getEmissionChangeData({
          type: 'mobilityLever',
          lever: {
            unitAmount: 10000,
            selectedCurrentFuel: { value: 'biodiesel-b100', label: '' },
            selectedSwapFuel: { value: 'biodiesel-b100', label: '' },
          },
          country: defaultCountry,
        });
        expect(result!.emissionChange).toBe(0);
        expect(Math.round(result!.emissionReduction! * 100) / 100).toBe(5.4);
      });
    });

    describe('roadFreightLever', () => {
      it('should return change when emissions are increased', () => {
        const result = getEmissionChangeData({
          type: 'roadFreightLever',
          lever: {
            unitAmount: 10000,
            selectedCurrentFuel: { value: 'biodiesel-b100', label: '' },
            selectedSwapFuel: {
              value: COUNTRY_ELECTRIC_GRID,
              label: '',
            },
          },
          country: defaultCountry,
        });

        expect(Math.round(result!.emissionChange! * 100) / 100).toBe(-1.23);
        expect(Math.round(result!.emissionReduction! * 100) / 100).toBe(4.17);
      });

      it('should return change when emissions are reduced', () => {
        const result = getEmissionChangeData({
          type: 'roadFreightLever',
          lever: {
            unitAmount: 10000,
            selectedCurrentFuel: {
              value: COUNTRY_ELECTRIC_GRID,
              label: '',
            },
            selectedSwapFuel: { value: 'biodiesel-b100', label: '' },
          },
          country: defaultCountry,
        });

        expect(Math.round(result!.emissionChange! * 100) / 100).toBe(0.23);
        expect(Math.round(result!.emissionReduction! * 100) / 100).toBe(1.02);
      });

      it('should return change when emissions remain the same', () => {
        const result = getEmissionChangeData({
          type: 'roadFreightLever',
          lever: {
            unitAmount: 10000,
            selectedCurrentFuel: { value: 'biodiesel-b100', label: '' },
            selectedSwapFuel: { value: 'biodiesel-b100', label: '' },
          },
          country: defaultCountry,
        });
        expect(result!.emissionChange).toBe(0);
        expect(Math.round(result!.emissionReduction! * 100) / 100).toBe(5.4);
      });
    });

    describe('shippingLever', () => {
      it('should return change when emissions are reduced', () => {
        const result = getEmissionChangeData({
          type: 'shippingLever',
          lever: {
            unitAmount: 1000,
            selectedCurrentFuel: { value: 'bunker-fuel-hfo', label: '' },
            selectedSwapFuel: { value: 'lng', label: '' },
          },
          country: defaultCountry,
        });

        expect(Math.round(result!.emissionChange! * 100) / 100).toBe(-565.53);
        expect(Math.round(result!.emissionReduction! * 100) / 100).toBe(
          3204.67
        );
      });

      it('should return change when emissions are increased', () => {
        const result = getEmissionChangeData({
          type: 'shippingLever',
          lever: {
            unitAmount: 1000,
            selectedCurrentFuel: { value: 'lng', label: '' },
            selectedSwapFuel: {
              value: 'bunker-fuel-hfo',
              label: '',
            },
          },
          country: defaultCountry,
        });

        expect(Math.round(result!.emissionChange! * 100) / 100).toBe(665.33);
        expect(Math.round(result!.emissionReduction! * 100) / 100).toBe(
          4435.54
        );
      });
    });

    describe('dataCentreLever', () => {
      it('should return change when emissions are reduced', () => {
        const result = getEmissionChangeData({
          type: 'dataCentreLever',
          lever: {
            unitAmount: 1000,
            selectedCurrentFuel: { value: 'average-air-cooling', label: '' },
            selectedSwapFuel: { value: 'immersion-cooling', label: '' },
          },
          country: defaultCountry,
        });

        expect(Math.round(result!.emissionChange! * 100) / 100).toBe(-24.87);
        expect(Math.round(result!.emissionReduction! * 100) / 100).toBe(54.21);
      });
    });
  });

  describe('travelLever', () => {
    it('should return change when emissions are reduced', () => {
      const result = getEmissionChangeData({
        type: 'travelLever',
        lever: {
          unitAmount: 1000,
          selectedCurrentFuel: {
            value: 'air-regular-aviation-fuel',
            label: '',
          },
          selectedSwapFuel: { value: COUNTRY_ELECTRIC_GRID, label: '' },
        },
        country: defaultCountry,
      });

      expect(Math.round(result!.emissionChange! * 100) / 100).toBe(-0.09);
      expect(Math.round(result!.emissionReduction! * 100) / 100).toBe(0.03);
    });

    it('should return change when emissions are increased', () => {
      const result = getEmissionChangeData({
        type: 'travelLever',
        lever: {
          unitAmount: 1000,
          selectedCurrentFuel: {
            value: 'bus-coach',
            label: '',
          },
          selectedSwapFuel: { value: 'car-petrol', label: '' },
        },
        country: defaultCountry,
      });

      expect(Math.round(result!.emissionChange! * 100) / 100).toBe(0.04);
      expect(Math.round(result!.emissionReduction! * 100) / 100).toBe(0.07);
    });
  });

  describe('getCountryElectricGridValueInMT', () => {
    it('should return correct electricity country grid value / 1000 for selected country - Albania', () => {
      const country = ([
        ElectricityLocationGridNames.ALBANIA,
      ] as unknown) as ElectricityLocationGridNames;

      const result = getCountryElectricGridValueInMT(country);

      const expectedResult = 0.000050643219509999996;

      expect(result).toEqual(expectedResult);
    });

    it('should return correct electricity country grid value / 1000 for selected country - UK', () => {
      const country = ([
        ElectricityLocationGridNames.UNITED_KINGDOM,
      ] as unknown) as ElectricityLocationGridNames;

      const result = getCountryElectricGridValueInMT(country);

      const expectedResult = 0.00031234;

      expect(result).toEqual(expectedResult);
    });

    it('should return correct electricity country grid value / 1000 for selected country - Spain', () => {
      const country = ([
        ElectricityLocationGridNames.SPAIN,
      ] as unknown) as ElectricityLocationGridNames;

      const result = getCountryElectricGridValueInMT(country);

      const expectedResult = 0.00028264480214;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getVehicleEmissionFuelDataCo2MTPerUnit', () => {
    it('should check fuel data name for country and return correct Co2MTPerUnit value', () => {
      const fuelData = ([
        {
          name: COUNTRY_ELECTRIC_GRID,
          unit: 'kWh',
          co2KgPerUnit: 0,
          fuelConsumption: 22.61938,
          co2MTPerUnit: 0,
        },
      ] as unknown) as IVehicleLeverOption;

      const country = ([
        ElectricityLocationGridNames.ALBANIA,
      ] as unknown) as ElectricityLocationGridNames;

      const result = getVehicleEmissionFuelDataCo2MTPerUnit(
        fuelData,
        country,
        fuelData.name
      );

      const expectedResult = 0.0000128223567477369;

      expect(result).toEqual(expectedResult);
    });

    it('should check fuel data name for country and return correct Co2MTPerUnit value', () => {
      const fuelData = ([
        {
          name: COUNTRY_ELECTRIC_GRID,
          unit: 'kWh',
          co2KgPerUnit: 0,
          fuelConsumption: 22.61938,
          co2MTPerUnit: 0,
        },
      ] as unknown) as IVehicleLeverOption;

      const country = ([
        ElectricityLocationGridNames.UNITED_KINGDOM,
      ] as unknown) as ElectricityLocationGridNames;

      const result = getVehicleEmissionFuelDataCo2MTPerUnit(
        fuelData,
        country,
        fuelData.name
      );

      const expectedResult = 0.00007908136460000001;

      expect(result).toEqual(expectedResult);
    });

    it('should check fuel data name for country and return correct Co2MTPerUnit value', () => {
      const fuelData = ([
        {
          name: COUNTRY_ELECTRIC_GRID,
          unit: 'kWh',
          co2KgPerUnit: 0,
          fuelConsumption: 22.61938,
          co2MTPerUnit: 0,
        },
      ] as unknown) as IVehicleLeverOption;

      const country = ([
        ElectricityLocationGridNames.SPAIN,
      ] as unknown) as ElectricityLocationGridNames;

      const result = getVehicleEmissionFuelDataCo2MTPerUnit(
        fuelData,
        country,
        fuelData.name
      );

      const expectedResult = 0.00007156283745382661;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getTravelEmissionFuelDataCo2MTPerUnit', () => {
    it('should check fuel data name for country and return correct Co2MTPerUnit value', () => {
      const fuelData = ([
        {
          name: COUNTRY_ELECTRIC_GRID,
          unit: 'km',
          co2KmPerUnit: 0,
          co2MTPerUnit: 0,
        },
      ] as unknown) as ITravelLeverOption;

      const country = ([
        ElectricityLocationGridNames.ALBANIA,
      ] as unknown) as ElectricityLocationGridNames;

      const result = getTravelEmissionFuelDataCo2MTPerUnit(
        fuelData,
        country,
        fuelData.name
      );

      const expectedResult = 0.000004147426396604743;

      expect(result).toEqual(expectedResult);
    });

    it('should check fuel data name for country and return correct Co2MTPerUnit value', () => {
      const fuelData = ([
        {
          name: COUNTRY_ELECTRIC_GRID,
          unit: 'km',
          co2KmPerUnit: 0,
          co2MTPerUnit: 0,
        },
      ] as unknown) as ITravelLeverOption;

      const country = ([
        ElectricityLocationGridNames.UNITED_KINGDOM,
      ] as unknown) as ElectricityLocationGridNames;

      const result = getTravelEmissionFuelDataCo2MTPerUnit(
        fuelData,
        country,
        fuelData.name
      );

      const expectedResult = 0.000025579083898086985;

      expect(result).toEqual(expectedResult);
    });

    it('should check fuel data name for country and return correct Co2MTPerUnit value', () => {
      const fuelData = ([
        {
          name: COUNTRY_ELECTRIC_GRID,
          unit: 'km',
          co2KmPerUnit: 0,
          co2MTPerUnit: 0,
        },
      ] as unknown) as ITravelLeverOption;

      const country = ([
        ElectricityLocationGridNames.SPAIN,
      ] as unknown) as ElectricityLocationGridNames;

      const result = getTravelEmissionFuelDataCo2MTPerUnit(
        fuelData,
        country,
        fuelData.name
      );

      const expectedResult = 0.000023147195707553486;

      expect(result).toEqual(expectedResult);
    });
  });
});
