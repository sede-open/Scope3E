import { getUserLocale } from './i18n';

export const formatDecimal = (
  value: number | string,
  localeCode?: string,
  config = { maximumFractionDigits: 2, minimumFractionDigits: 2 }
) => {
  const number = Number(value);
  return Number.isNaN(number)
    ? ''
    : number.toLocaleString(localeCode || getUserLocale(), config);
};

export const formatOneDecimalPlace = (
  value: number | string,
  localeCode?: string,
  config = { maximumFractionDigits: 1, minimumFractionDigits: 1 }
) => {
  const number = Number(value);
  return Number.isNaN(number)
    ? ''
    : number.toLocaleString(localeCode || getUserLocale(), config);
};

export const formatInteger = (
  value: number | string,
  localeCode?: string,
  config = { maximumFractionDigits: 0 }
) => {
  const number = Number(value);
  return Number.isNaN(number)
    ? ''
    : number.toLocaleString(localeCode || getUserLocale(), config);
};

export const getSeparators = (localeCode: string) => {
  const defaultSeparators = [',', '.'];

  // Fallback to en locale if the browser does not support formatToParts (no polyfill available)
  if (typeof Intl.NumberFormat.prototype.formatToParts === 'undefined') {
    return defaultSeparators;
  }

  const parts = new Intl.NumberFormat(localeCode).formatToParts(99999.99);
  const decimalPart = parts.find((x) => x.type === 'decimal');
  const groupPart = parts.find((x) => x.type === 'group');

  // Fallback to en locale if one of the separators is missing
  if (!groupPart || !decimalPart) {
    return defaultSeparators;
  }

  return [groupPart.value, decimalPart.value];
};

const DEFAULT_LOCALE = 'en';
const ordinalSuffixes: { [key: string]: { [key: string]: string } } = {
  en: {
    one: 'st',
    two: 'nd',
    few: 'rd',
    other: 'th',
  },
};

export const getNumberWithOrdinal = (value: number, localeCode: string) => {
  const pr = new Intl.PluralRules(localeCode, {
    type: 'ordinal',
  });

  const suffix =
    ordinalSuffixes[localeCode]?.[pr.select(value)] ??
    ordinalSuffixes[DEFAULT_LOCALE]?.[pr.select(value)];

  return `${value}${suffix}`;
};

const DEFAULT_ROUNDING_FACTOR = 10;
export const round = (
  value?: number,
  roundingFactor = DEFAULT_ROUNDING_FACTOR
) => {
  if (typeof value === 'undefined') {
    return undefined;
  }
  return Math.round(value * roundingFactor) / roundingFactor;
};
