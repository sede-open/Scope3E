import { isBrowser } from './browser';

export enum LocalStorageKeys {
  DATA_PRIVACY_MODAL_SNOOZED_ON = 'DATA_PRIVACY_MODAL_SNOOZED_ON',
}

export const setItem = (
  key: LocalStorageKeys,
  item: string
): boolean | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    window.localStorage.setItem(key, item);
    return true;
  } catch (e) {
    return null;
  }
};

export const getItem = (key: LocalStorageKeys): string | null =>
  isBrowser() ? window.localStorage.getItem(key) : null;
