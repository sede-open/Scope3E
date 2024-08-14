import styled from 'styled-components';

import { AlizarinCrimson, Alto, Scorpion, Tundora } from 'styles/colours';

export const Textarea = styled.textarea<{
  isInvalid?: boolean;
  hasUnits?: boolean;
}>`
  background: transparent;
  border: ${({ isInvalid }) =>
    `1px solid ${isInvalid ? AlizarinCrimson : Alto}`};
  color: ${Tundora};
  font-family: Arial, sans-serif;
  font-size: 14px;
  padding: 1rem;
  position: relative;
  resize: none;
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
    pointer-events: none;
  }
`;
