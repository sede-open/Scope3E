import { Request } from 'express';
import { getUserLocale } from '.';

describe('i18n utils', () => {
  describe('getUserLocale', () => {
    let languageGetter: jest.SpyInstance;

    beforeEach(() => {
      languageGetter = jest.spyOn(window.navigator, 'language', 'get');
    });

    it('should return the correct language if running on the server and supplied an express request object', () => {
      // ARRANGE
      const request = {
        headers: {
          'accept-language': 'fr',
        },
      } as Request;

      // ACT
      const locale = getUserLocale(request);

      // ASSERT
      expect(locale).toEqual('fr');
    });

    it('should return the correct language if running in the browser', () => {
      // ARRANGE
      languageGetter.mockReturnValue('de');

      // ACT
      const locale = getUserLocale();

      // ASSERT
      expect(locale).toEqual('de');
    });
  });
});
