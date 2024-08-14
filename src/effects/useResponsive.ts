import { useEffect, useMemo, useState } from 'react';

export const useResponsive = () => {
  const [currentDisplaySize, setCurrentDisplaySize] = useState(
    window.innerWidth
  );

  useEffect(() => {
    const handler = () => setCurrentDisplaySize(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return useMemo(() => currentDisplaySize, [currentDisplaySize]);
};
