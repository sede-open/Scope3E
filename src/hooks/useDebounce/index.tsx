import { useRef, useCallback, DependencyList } from 'react';

export const useDebounce = (deps: DependencyList = []) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const debounced = useCallback((callBack, milliseconds) => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      callBack();
    }, milliseconds);
  }, deps);
  return debounced;
};
