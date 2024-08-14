import { MutableRefObject, useCallback, useEffect } from 'react';

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  '[tabindex="0"]',
];

export const getFocusableElements = (
  elementRef: MutableRefObject<HTMLElement | null>
): NodeListOf<HTMLElement> | null =>
  elementRef.current?.querySelectorAll<HTMLElement>(
    FOCUSABLE_ELEMENTS.join(', ')
  ) ?? null;

export const useFocusTrap = (
  elementRef: MutableRefObject<HTMLDivElement | null>,
  isEnabled: boolean
): void => {
  const handleForwardTab = useCallback(
    (event: KeyboardEvent, focusableElements: NodeListOf<HTMLElement>) => {
      if (
        document.activeElement ===
        focusableElements[focusableElements.length - 1]
      ) {
        event.preventDefault();
        focusableElements[0].focus();
      }
    },
    []
  );

  const handleBackwardTab = useCallback(
    (event: KeyboardEvent, focusableElements: NodeListOf<HTMLElement>) => {
      if (document.activeElement === focusableElements[0]) {
        event.preventDefault();
        focusableElements[focusableElements.length - 1].focus();
      }
    },
    []
  );

  const onTabClick = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !isEnabled) return;

      const focusableElements = getFocusableElements(elementRef);
      if (!focusableElements?.length) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey) {
        handleBackwardTab(event, focusableElements);
      } else {
        handleForwardTab(event, focusableElements);
      }
    },
    [handleBackwardTab, handleForwardTab, isEnabled, elementRef]
  );

  const onFocusOut = useCallback(
    (event: FocusEvent) => {
      const newTargetIsInsideModal = elementRef.current?.contains(
        event.relatedTarget as Node
      );
      if (!event.relatedTarget || newTargetIsInsideModal || !isEnabled) return;

      getFocusableElements(elementRef)?.[0]?.focus();
    },
    [isEnabled, elementRef]
  );

  useEffect(() => {
    document.addEventListener('keydown', onTabClick);
    document.addEventListener('focusout', onFocusOut);

    return () => {
      document.removeEventListener('keydown', onTabClick);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, [elementRef, onFocusOut, onTabClick]);
};
