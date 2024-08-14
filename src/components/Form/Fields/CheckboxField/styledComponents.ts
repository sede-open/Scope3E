import { CheckboxInput } from 'components/Form/Inputs/Checkbox/styledComponents';
import styled, { css } from 'styled-components';

import { Scorpion, SilverChalice, Tundora, White } from 'styles/colours';

export const Label = styled.label<{
  isChecked: boolean;
  isDisabled: boolean;
}>`
  cursor: pointer;
  color: ${Tundora};
  display: block;
  font-size: 14px;
  line-height: 1.4;
  padding: 3px 0 0 2rem;
  position: relative;

  &::before {
    background: ${White} no-repeat 50% 50%;
    border: 1px solid ${SilverChalice};
    content: '';
    cursor: pointer;
    display: block;
    height: 1.5rem;
    left: 0;
    position: absolute;
    top: 0;
    transition: all 0.2s linear;
    width: 1.5rem;
  }

  ${CheckboxInput}:focus + &::before,
  ${CheckboxInput}:hover + &::before  {
    box-shadow: 0 0 0 1px ${Scorpion};
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      opacity: 0.65;
      pointer-events: none;
    `}

  ${({ isChecked }) =>
    isChecked &&
    css`
      &::before {
        background: ${White} url(/checkbox-tick.svg) no-repeat 50% 50%;
      }
    `}
`;
