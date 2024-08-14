import { DependencyList, EffectCallback, useEffect } from 'react';

/**
 * Accepts a list of react refs, if a mousedown event is made on an element
 * that is not in the targetNodes list, then execute the callback.
 */
const useOnOuterClick = (
  callback: EffectCallback,
  targetNodes: React.MutableRefObject<any>[],
  dependencies: DependencyList = []
) => {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const isAnOuterClick = targetNodes
        .map((node) => node.current && !node.current.contains(e.target as Node))
        .every((value) => value);

      if (isAnOuterClick) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, dependencies);
};

export default useOnOuterClick;
