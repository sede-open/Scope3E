import { Request } from 'express';

import Locale from './types';

export const getUserLocale = (req?: Request) => {
  if (req) {
    return req.headers['accept-language'];
  }

  return navigator.language || (navigator as any).userLanguage; // IE11 Support
};

export const abcdLocaleToZendeskLocale: Record<Locale, string> = {
  en: 'en-gb',
  nl: 'nl',
  zh: 'zh-tw',
};

export * from './types';
