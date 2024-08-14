import styled, { css } from 'styled-components';
import { Black, White, AthensGray } from 'styles/colours';
import { animated } from 'react-spring';

export const StyledOverlay = styled.div<{
  open: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  z-index: 999;
  background: ${White};
  color: ${Black};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

  max-width: 768px;
  width: 51%;
  transform: translateX(-100%);
  transition: all 0.5s ease-out;

  padding: 0px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 992px) {
    width: 100%;
  }

  ${(props) =>
    props.open &&
    css`
      transform: translateX(0%);
    `}
`;

export const OverylayBackground = styled(animated.div)<{ open: boolean }>`
  ${(props) =>
    props.open &&
    css`
      background-color: ${AthensGray};
      height: 100%;
      top: 0;
      left: 0;
      position: fixed;
      z-index: 7;
      width: 100%;
      transform: translateX(0%);
    `}
`;
