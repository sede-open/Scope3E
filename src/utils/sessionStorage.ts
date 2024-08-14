import { isBrowser } from './browser';
import { captureException } from './logging';

export const setItem = (key: string, item: string): boolean | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    window.sessionStorage.setItem(key, item);
    return true;
  } catch (e) {
    captureException(e);
    return null;
  }
};

export const getItem = (key: string): string | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    return window.sessionStorage.getItem(key);
  } catch (e) {
    captureException(e);
    return null;
  }
};
