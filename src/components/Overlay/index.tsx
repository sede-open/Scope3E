import { ReactNode, useRef } from 'react';

import { useFocusTrap } from 'utils/focusTrap';
import { ScrollPrevention } from 'components/ScrollPrevention';
import * as StyledComponents from './styledComponents';

interface IProps {
  open: boolean;
  children?: ReactNode;
}

export const Overlay = ({ open, children }: IProps) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap(overlayRef, open);

  return (
    <>
      <StyledComponents.OverylayBackground open={open}>
        <ScrollPrevention prevent={open} />
        <StyledComponents.StyledOverlay
          open={open}
          ref={overlayRef}
          data-testid="overlay"
        >
          {children}
        </StyledComponents.StyledOverlay>
      </StyledComponents.OverylayBackground>
    </>
  );
};

Overlay.defaultProps = {
  children: undefined,
};
