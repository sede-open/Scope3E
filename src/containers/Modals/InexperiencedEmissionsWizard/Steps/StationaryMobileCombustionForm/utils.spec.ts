import { FuelName } from '../../types';
import { getFuelOptions } from './utils';
import fuelsTranslations from '../../../../../../locales/en/fuels.json';

describe('StationaryMobileCombustionForm utils', () => {
  describe(getFuelOptions.name, () => {
    const t = jest.fn((term: string) => {
      const translationKey = term.split(':')[1];
      return (fuelsTranslations as { [key: string]: string })[translationKey];
    });

    it('should return an option for all fuels', () => {
      const result = getFuelOptions(t);
      expect(result.length).toBe(Object.keys(FuelName).length);
    });

    it('should order all options alphabetically in ascending order', () => {
      const result = getFuelOptions(t) as { label: string }[];

      expect.assertions(result.length - 1);
      result.forEach((_, index) => {
        if (index !== result.length - 1) {
          expect(result[index].label <= result[index + 1].label).toBe(true);
        }
      });
    });
  });
});
