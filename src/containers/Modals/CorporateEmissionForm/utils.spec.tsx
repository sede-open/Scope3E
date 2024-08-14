import { ModalContentType } from 'containers/types';
import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { CorporateEmissionType, Scope2Type } from 'types/globalTypes';
import { getEmissionYears, getYearOptions } from './utils';

const getEmission = (
  year: number,
  formType: CorporateEmissionType,
  type: Scope2Type
): Emission => ({
  id: `some-id-${year}`,
  year,
  scope1: 123234,
  scope2: 3423,
  scope3: null,
  offset: null,
  headCount: null,
  scope2Type: type,
  examplePercentage: null,
  type: formType,
  verificationFile: null,
  carbonIntensities: [],
});

const currentYear = new Date().getFullYear();

describe('getYearOptions()', () => {
  const existingEmissions = [
    getEmission(
      currentYear - 6,
      CorporateEmissionType.BASELINE,
      Scope2Type.MARKET
    ),
    getEmission(
      currentYear - 5,
      CorporateEmissionType.ACTUAL,
      Scope2Type.MARKET
    ),
    getEmission(
      currentYear - 4,
      CorporateEmissionType.ACTUAL,
      Scope2Type.MARKET
    ),
    getEmission(
      currentYear - 2,
      CorporateEmissionType.ACTUAL,
      Scope2Type.MARKET
    ),
  ] as Emission[];

  describe('ACTUAL Emissions', () => {
    describe('when adding new emission data', () => {
      it('should return default number of options', () => {
        const result = getYearOptions(
          ModalContentType.NEW_ACTUAL,
          existingEmissions
        );

        // 16 - current year
        const numberOfYearOptions = getEmissionYears();

        expect(numberOfYearOptions).toHaveLength(16);
        expect(result).toHaveLength(numberOfYearOptions.length);
      });

      it('should return disabled = true for existing emission year options', () => {
        const result = getYearOptions(
          ModalContentType.NEW_ACTUAL,
          existingEmissions
        );

        expect(result).toEqual([
          {
            value: currentYear,
            label: String(currentYear),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear
            ),
          },
          {
            value: currentYear - 1,
            label: String(currentYear - 1),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 1
            ),
          },
          {
            value: currentYear - 2,
            label: String(currentYear - 2),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 2
            ),
          },
          {
            value: currentYear - 3,
            label: String(currentYear - 3),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 3
            ),
          },
          {
            value: currentYear - 4,
            label: String(currentYear - 4),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 4
            ),
          },
          {
            value: currentYear - 5,
            label: String(currentYear - 5),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 5
            ),
          },
          {
            value: currentYear - 6,
            label: String(currentYear - 6),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 6
            ),
          },
          {
            value: currentYear - 7,
            label: String(currentYear - 7),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 7
            ),
          },
          {
            value: currentYear - 8,
            label: String(currentYear - 8),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 8
            ),
          },
          {
            value: currentYear - 9,
            label: String(currentYear - 9),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 9
            ),
          },
          {
            value: currentYear - 10,
            label: String(currentYear - 10),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 10
            ),
          },
          {
            value: currentYear - 11,
            label: String(currentYear - 11),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 11
            ),
          },
          {
            value: currentYear - 12,
            label: String(currentYear - 12),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 12
            ),
          },
          {
            value: currentYear - 13,
            label: String(currentYear - 13),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 13
            ),
          },
          {
            value: currentYear - 14,
            label: String(currentYear - 14),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 14
            ),
          },
          {
            value: currentYear - 15,
            label: String(currentYear - 15),
            isDisabled: !!existingEmissions.find(
              (item) => item.year === currentYear - 15
            ),
          },
        ]);
      });
    });

    describe('when editing existing emission data', () => {
      it('should return length of existing emission entries', () => {
        const result = getYearOptions(
          ModalContentType.EDIT_ACTUAL,
          existingEmissions
        );

        // emissions length - baseline year
        expect(result).toHaveLength(existingEmissions.length - 1);
      });

      it('should return existing emission years that are not disabled and no baseline year', () => {
        const result = getYearOptions(
          ModalContentType.EDIT_ACTUAL,
          existingEmissions
        );

        expect(result).toEqual([
          {
            value: currentYear - 5,
            label: String(currentYear - 5),
            isDisabled: false,
          },
          {
            value: currentYear - 4,
            label: String(currentYear - 4),
            isDisabled: false,
          },
          {
            value: currentYear - 2,
            label: String(currentYear - 2),
            isDisabled: false,
          },
        ]);
      });
    });
  });

  describe('BASELINE Emissions', () => {
    describe('when adding new baseline data', () => {
      it('should return default number of options', () => {
        const emptyEmissions: Emission[] = [];

        const result = getYearOptions(
          ModalContentType.NEW_BASELINE,
          emptyEmissions
        );

        // 16 - current year
        const numberOfYearOptions = getEmissionYears();

        expect(numberOfYearOptions).toHaveLength(16);
        expect(result).toHaveLength(numberOfYearOptions.length);
      });

      it('should return disabled = false for emission year options', () => {
        const emptyEmissions: Emission[] = [];

        const result = getYearOptions(
          ModalContentType.NEW_BASELINE,
          emptyEmissions
        );

        expect(result).toEqual([
          { value: currentYear, label: String(currentYear), isDisabled: false },
          {
            value: currentYear - 1,
            label: String(currentYear - 1),
            isDisabled: false,
          },
          {
            value: currentYear - 2,
            label: String(currentYear - 2),
            isDisabled: false,
          },
          {
            value: currentYear - 3,
            label: String(currentYear - 3),
            isDisabled: false,
          },
          {
            value: currentYear - 4,
            label: String(currentYear - 4),
            isDisabled: false,
          },
          {
            value: currentYear - 5,
            label: String(currentYear - 5),
            isDisabled: false,
          },
          {
            value: currentYear - 6,
            label: String(currentYear - 6),
            isDisabled: false,
          },
          {
            value: currentYear - 7,
            label: String(currentYear - 7),
            isDisabled: false,
          },
          {
            value: currentYear - 8,
            label: String(currentYear - 8),
            isDisabled: false,
          },
          {
            value: currentYear - 9,
            label: String(currentYear - 9),
            isDisabled: false,
          },
          {
            value: currentYear - 10,
            label: String(currentYear - 10),
            isDisabled: false,
          },
          {
            value: currentYear - 11,
            label: String(currentYear - 11),
            isDisabled: false,
          },
          {
            value: currentYear - 12,
            label: String(currentYear - 12),
            isDisabled: false,
          },
          {
            value: currentYear - 13,
            label: String(currentYear - 13),
            isDisabled: false,
          },
          {
            value: currentYear - 14,
            label: String(currentYear - 14),
            isDisabled: false,
          },
          {
            value: currentYear - 15,
            label: String(currentYear - 15),
            isDisabled: false,
          },
        ]);
      });
    });

    describe('when editing baseline emission data', () => {
      it('should return default number of options', () => {
        const result = getYearOptions(
          ModalContentType.EDIT_BASELINE,
          existingEmissions
        );

        // 16 - current year
        const numberOfYearOptions = getEmissionYears();

        expect(numberOfYearOptions).toHaveLength(16);
        expect(result).toHaveLength(numberOfYearOptions.length);
      });

      it('should return disabled = false for existing emission year options', () => {
        const result = getYearOptions(
          ModalContentType.EDIT_BASELINE,
          existingEmissions
        );

        expect(result).toEqual([
          { value: currentYear, label: String(currentYear), isDisabled: true },
          {
            value: currentYear - 1,
            label: String(currentYear - 1),
            isDisabled: true,
          },
          {
            value: currentYear - 2,
            label: String(currentYear - 2),
            isDisabled: false,
          },
          {
            value: currentYear - 3,
            label: String(currentYear - 3),
            isDisabled: true,
          },
          {
            value: currentYear - 4,
            label: String(currentYear - 4),
            isDisabled: false,
          },
          {
            value: currentYear - 5,
            label: String(currentYear - 5),
            isDisabled: false,
          },
          {
            value: currentYear - 6,
            label: String(currentYear - 6),
            isDisabled: false,
          },
          {
            value: currentYear - 7,
            label: String(currentYear - 7),
            isDisabled: true,
          },
          {
            value: currentYear - 8,
            label: String(currentYear - 8),
            isDisabled: true,
          },
          {
            value: currentYear - 9,
            label: String(currentYear - 9),
            isDisabled: true,
          },
          {
            value: currentYear - 10,
            label: String(currentYear - 10),
            isDisabled: true,
          },
          {
            value: currentYear - 11,
            label: String(currentYear - 11),
            isDisabled: true,
          },
          {
            value: currentYear - 12,
            label: String(currentYear - 12),
            isDisabled: true,
          },
          {
            value: currentYear - 13,
            label: String(currentYear - 13),
            isDisabled: true,
          },
          {
            value: currentYear - 14,
            label: String(currentYear - 14),
            isDisabled: true,
          },
          {
            value: currentYear - 15,
            label: String(currentYear - 15),
            isDisabled: true,
          },
        ]);
      });
    });
  });
});
