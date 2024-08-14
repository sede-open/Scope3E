import * as browser from './browser';
import { getItem, setItem } from './sessionStorage';

const getItemMock = jest.fn();
const setItemMock = jest.fn();

Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: getItemMock,
    setItem: setItemMock,
  },
});

describe('sessionStorage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('setItem', () => {
    describe('when not in a browser context', () => {
      it('should return null', () => {
        jest.spyOn(browser, 'isBrowser').mockReturnValue(false);

        expect(setItem('someKey', 'someValue')).toBeNull();
      });
    });

    describe('when in a browser context', () => {
      it('should call sessionStorage.setItem with the key and value', () => {
        jest.spyOn(browser, 'isBrowser').mockReturnValue(true);
        const key = 'someKey';
        const value = 'someValue';

        setItem(key, value);

        expect(setItemMock).toHaveBeenCalledWith(key, value);
      });
    });
  });

  describe('getItem', () => {
    describe('when not in a browser context', () => {
      it('should return null', () => {
        jest.spyOn(browser, 'isBrowser').mockReturnValue(false);

        expect(getItem('someKey')).toBeNull();
      });
    });

    describe('when in a browser context', () => {
      it('should call sessionStorage.getItem with the key and value', () => {
        jest.spyOn(browser, 'isBrowser').mockReturnValue(true);
        const key = 'someKey';

        getItem(key);

        expect(getItemMock).toHaveBeenCalledWith(key);
      });

      it('should return sessionStorage.getItem value', () => {
        jest.spyOn(browser, 'isBrowser').mockReturnValue(true);
        const key = 'someKey';
        const expectedValue = 'someValue';

        getItemMock.mockReturnValue(expectedValue);

        expect(getItem(key)).toEqual(expectedValue);
      });
    });
  });
});
