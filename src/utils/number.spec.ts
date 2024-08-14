/**
 * @jest-environment jsdom
 */

import each from 'jest-each';
import {
  formatDecimal,
  formatOneDecimalPlace,
  formatInteger,
  getNumberWithOrdinal,
  getSeparators,
  round,
} from './number';

describe('number', () => {
  describe('formatDecimal', () => {
    const { language } = navigator;

    afterEach(() => {
      Object.defineProperty(navigator, 'language', {
        value: language,
        writable: true,
      });
      Object.defineProperty(navigator, 'userLanguage', {
        value: language,
        writable: true,
      });
    });

    it('should correctly add thousand separators and decimal places to an integer', () => {
      expect(formatDecimal(1000000)).toEqual('1,000,000.00');
      expect(formatDecimal('1000000')).toEqual('1,000,000.00');
    });

    it('should not add thousand separators to numbers lower than 1000', () => {
      expect(formatDecimal(1)).toEqual('1.00');
      expect(formatDecimal('1')).toEqual('1.00');
      expect(formatDecimal(53)).toEqual('53.00');
      expect(formatDecimal('53')).toEqual('53.00');
      expect(formatDecimal(999)).toEqual('999.00');
      expect(formatDecimal('999')).toEqual('999.00');
    });

    it('should correctly add thousand separators and two decimal places for floating point numbers', () => {
      expect(formatDecimal(12345.5)).toEqual('12,345.50');
      expect(formatDecimal('12345.5')).toEqual('12,345.50');
      expect(formatDecimal(12345.12345)).toEqual('12,345.12');
      expect(formatDecimal('12345.12345')).toEqual('12,345.12');
    });

    it('should not add thousand separators to floating point numbers lower than 1000', () => {
      expect(formatDecimal(1.5)).toEqual('1.50');
      expect(formatDecimal('1.5')).toEqual('1.50');
      expect(formatDecimal(53.232222222)).toEqual('53.23');
      expect(formatDecimal('53.232222222')).toEqual('53.23');
      expect(formatDecimal(999.681)).toEqual('999.68');
      expect(formatDecimal('999.681')).toEqual('999.68');
    });

    it('should apply standard rounding to floating point numbers', () => {
      expect(formatDecimal(9999.00001)).toEqual('9,999.00');
      expect(formatDecimal(9999.99)).toEqual('9,999.99');
      expect(formatDecimal(9999.99999)).toEqual('10,000.00');
      expect(formatDecimal('9999.00001')).toEqual('9,999.00');
      expect(formatDecimal('9999.99')).toEqual('9,999.99');
      expect(formatDecimal('9999.99999')).toEqual('10,000.00');
    });

    it('should return 0.00 if zero values are supplied', () => {
      expect(formatDecimal(0)).toEqual('0.00');
      expect(formatDecimal(0.0)).toEqual('0.00');
      expect(formatDecimal('0')).toEqual('0.00');
      expect(formatDecimal('0.0')).toEqual('0.00');
    });

    it('should support different user locales', () => {
      expect(formatDecimal(99999.99, 'en')).toEqual('99,999.99');
      expect(formatDecimal(99999.99, 'fr')).toEqual('99 999,99');
      expect(formatDecimal(99999.99, 'it')).toEqual('99.999,99');
    });

    it('should fallback to the browser locale if no locale code is specified', () => {
      // ARRANGE
      Object.defineProperty(navigator, 'language', {
        value: 'fr',
        writable: true,
      });
      Object.defineProperty(navigator, 'userLanguage', {
        value: 'fr',
        writable: true,
      });

      // ACT
      const actual = formatDecimal(99999.99);

      // ASSERT
      expect(actual).toEqual('99 999,99');
    });
  });

  describe('formatOneDecimalPlace', () => {
    const { language } = navigator;

    afterEach(() => {
      Object.defineProperty(navigator, 'language', {
        value: language,
        writable: true,
      });
      Object.defineProperty(navigator, 'userLanguage', {
        value: language,
        writable: true,
      });
    });

    it('should correctly add thousand separators and ONE decimal place to an integer', () => {
      expect(formatOneDecimalPlace(1000000)).toEqual('1,000,000.0');
      expect(formatOneDecimalPlace('1000000')).toEqual('1,000,000.0');
    });

    it('should not add thousand separators to numbers lower than 1000 and format to ONE decimal place', () => {
      expect(formatOneDecimalPlace(1)).toEqual('1.0');
      expect(formatOneDecimalPlace('1')).toEqual('1.0');
      expect(formatOneDecimalPlace(53)).toEqual('53.0');
      expect(formatOneDecimalPlace('53')).toEqual('53.0');
      expect(formatOneDecimalPlace(999)).toEqual('999.0');
      expect(formatOneDecimalPlace('999')).toEqual('999.0');
    });

    it('should correctly add thousand separators and ONE decimal places for floating point numbers', () => {
      expect(formatOneDecimalPlace(12345.5)).toEqual('12,345.5');
      expect(formatOneDecimalPlace('12345.5')).toEqual('12,345.5');
      expect(formatOneDecimalPlace(12345.12345)).toEqual('12,345.1');
      expect(formatOneDecimalPlace('12345.12345')).toEqual('12,345.1');
    });

    it('should not add thousand separators to floating point numbers lower than 1000 and format to ONE decimal place', () => {
      expect(formatOneDecimalPlace(1.5)).toEqual('1.5');
      expect(formatOneDecimalPlace('1.5')).toEqual('1.5');
      expect(formatOneDecimalPlace(53.232222222)).toEqual('53.2');
      expect(formatOneDecimalPlace('53.232222222')).toEqual('53.2');
      expect(formatOneDecimalPlace(999.681)).toEqual('999.7');
      expect(formatOneDecimalPlace('999.681')).toEqual('999.7');
    });

    it('should return format to ONE decimal place "0.0" if zero values are supplied', () => {
      expect(formatOneDecimalPlace(0)).toEqual('0.0');
      expect(formatOneDecimalPlace(0.0)).toEqual('0.0');
      expect(formatOneDecimalPlace('0')).toEqual('0.0');
      expect(formatOneDecimalPlace('0.0')).toEqual('0.0');
    });
  });

  describe('formatInteger', () => {
    it('should correctly add thousand separators to an integer', () => {
      expect(formatInteger(1000000)).toEqual('1,000,000');
      expect(formatInteger('1000000')).toEqual('1,000,000');
    });

    it('should not add thousand separators to numbers lower than 1000', () => {
      expect(formatInteger(1)).toEqual('1');
      expect(formatInteger('1')).toEqual('1');
      expect(formatInteger(53)).toEqual('53');
      expect(formatInteger('53')).toEqual('53');
      expect(formatInteger(999)).toEqual('999');
      expect(formatInteger('999')).toEqual('999');
    });

    it('should correctly add thousand separators to floating point numbers and remove decimals', () => {
      expect(formatInteger(12345.4)).toEqual('12,345');
      expect(formatInteger('12345.4')).toEqual('12,345');
      expect(formatInteger(12345.12345)).toEqual('12,345');
      expect(formatInteger('12345.12345')).toEqual('12,345');
    });

    it('should not add thousand separators to floating point numbers lower than 1000', () => {
      expect(formatInteger(1.4)).toEqual('1');
      expect(formatInteger('1.4')).toEqual('1');
      expect(formatInteger(53.232222222)).toEqual('53');
      expect(formatInteger('53.232222222')).toEqual('53');
      expect(formatInteger(999.222)).toEqual('999');
      expect(formatInteger('999.222')).toEqual('999');
    });

    it('should apply standard rounding to floating point numbers', () => {
      expect(formatInteger(9999.00001)).toEqual('9,999');
      expect(formatInteger(9999.99)).toEqual('10,000');
      expect(formatInteger(9999.99999)).toEqual('10,000');
      expect(formatInteger('9999.00001')).toEqual('9,999');
      expect(formatInteger('9999.99')).toEqual('10,000');
      expect(formatInteger('9999.99999')).toEqual('10,000');
    });

    it('should return 0 if zero values are supplied', () => {
      expect(formatInteger(0)).toEqual('0');
      expect(formatInteger(0.0)).toEqual('0');
      expect(formatInteger(0.0)).toEqual('0');
      expect(formatInteger('0')).toEqual('0');
      expect(formatInteger('0.0')).toEqual('0');
      expect(formatInteger('0.00000000')).toEqual('0');
    });

    it('should support different user locales', () => {
      expect(formatInteger(99999.99, 'en')).toEqual('100,000');
      expect(formatInteger(99999.99, 'fr')).toEqual('100 000');
      expect(formatInteger(99999.99, 'it')).toEqual('100.000');
    });

    it('should fallback to the browser locale if no locale code is specified', () => {
      // ARRANGE
      Object.defineProperty(navigator, 'language', {
        value: 'fr',
        writable: true,
      });
      Object.defineProperty(navigator, 'userLanguage', {
        value: 'fr',
        writable: true,
      });

      // ACT
      const actual = formatInteger(99999.99);

      // ASSERT
      expect(actual).toEqual('100 000');
    });
  });

  describe('getSeparators', () => {
    // Localisation specific tests require node
    // to be executed with all languages enabled (full-icu package)
    each([
      ['en', [',', '.']],
      ['en-US', [',', '.']],
      ['en-CA', [',', '.']],
      ['fr', [' ', ',']],
      ['fr-CA', [' ', ',']],
      ['de', ['.', ',']],
      ['es', ['.', ',']],
      ['it', ['.', ',']],
      ['ru', [' ', ',']],
      ['pt', ['.', ',']],
      ['sv', [' ', ',']],
    ]).it(
      'should return correct number separators for locale: %s (%o)',
      (locale, expected) => {
        expect(getSeparators(locale)).toEqual(expected);
      }
    );

    describe('without browser support for determining number separators', () => {
      const originalFormatToParts = Intl.NumberFormat.prototype.formatToParts;

      afterEach(() => {
        Intl.NumberFormat.prototype.formatToParts = originalFormatToParts;
      });

      it('should fallback to en locale separators', () => {
        Intl.NumberFormat.prototype.formatToParts = undefined;
        expect(getSeparators('pt')).toEqual([',', '.']);
      });
    });
  });

  describe('getNumberWithOrdinal', () => {
    it.each`
      value  | expected
      ${1}   | ${'1st'}
      ${2}   | ${'2nd'}
      ${3}   | ${'3rd'}
      ${4}   | ${'4th'}
      ${5}   | ${'5th'}
      ${6}   | ${'6th'}
      ${11}  | ${'11th'}
      ${12}  | ${'12th'}
      ${13}  | ${'13th'}
      ${21}  | ${'21st'}
      ${22}  | ${'22nd'}
      ${23}  | ${'23rd'}
      ${24}  | ${'24th'}
      ${25}  | ${'25th'}
      ${101} | ${'101st'}
      ${102} | ${'102nd'}
      ${103} | ${'103rd'}
      ${104} | ${'104th'}
    `(
      'should decode and encode vakey: "$vakey" for level: "$level"',
      ({ value, expected }: { value: number; expected: string }) => {
        const locale = 'en';
        const result = getNumberWithOrdinal(value, locale);
        expect(result).toEqual(expected);
      }
    );
  });

  describe('round()', () => {
    it('should round down by one decimal by default', () => {
      const result = round(12.345);
      expect(result).toBe(12.3);
    });

    it('should round up by one decimal by default', () => {
      const result = round(12.355);
      expect(result).toBe(12.4);
    });

    it('should round by given rounding factor', () => {
      const result = round(12.355, 100);
      expect(result).toBe(12.36);
    });
  });
});
