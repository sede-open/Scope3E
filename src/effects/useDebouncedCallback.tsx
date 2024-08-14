import { useRef } from 'react';

const useDebouncedCallback = (
  callback: (...args: any[]) => any,
  delay: number
) => {
  const timeout = useRef() as React.MutableRefObject<
    ReturnType<typeof setTimeout>
  >;

  const debouncedCallback = (...args: any[]) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => callback(...args), delay);
  };

  return debouncedCallback;
};

export default useDebouncedCallback;
