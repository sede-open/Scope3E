import styled, { css, keyframes } from 'styled-components';

import { Svg } from '..';

export const TransitionPath = styled.path`
  transition: fill 0.2s linear;
  transform-origin: 50% 50%;
  position: relative;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

export const StyledSvg = styled(Svg)<{ isChecked: boolean }>`
  transform: scale(1);

  ${({ isChecked }) =>
    isChecked &&
    css`
      animation: ${pulse} 0.5s ease-in-out;
    `}
`;
