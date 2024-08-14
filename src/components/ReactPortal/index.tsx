import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const ReactPortal = ({ targetNode, children }: any) => {
  const [isDomReady, setIsDomReady] = useState(false);

  useEffect(() => {
    setIsDomReady(true);
  }, []);

  return isDomReady ? createPortal(children, targetNode) : null;
};
