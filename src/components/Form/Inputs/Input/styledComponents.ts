import styled from 'styled-components';

import {
  AlizarinCrimson,
  Alto,
  Gallery,
  Scorpion,
  Tundora,
} from 'styles/colours';

export const Input = styled.input<{
  isInvalid?: boolean;
  hasUnits?: boolean;
}>`
  background: transparent;
  border: ${({ isInvalid }) =>
    `1px solid ${isInvalid ? AlizarinCrimson : Alto}`};
  color: ${Tundora};
  font-size: 14px;
  padding: 1rem;
  position: relative;
  transition: 0.2s linear border-color;
  width: 100%;
  z-index: 2;

  &:focus,
  &:hover {
    border-color: ${Scorpion};
    outline: none;
  }

  &:disabled {
    opacity: 0.65;
    background-color: ${Gallery};
    pointer-events: none;
  }
`;
