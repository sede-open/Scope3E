import styled from 'styled-components';
import { Text } from 'components/Text';

import {
  AlizarinCrimson,
  abcdGray,
  Scorpion,
  SilverChalice,
  Tundora,
} from 'styles/colours';

export const Label = styled.label<{
  isDisabled?: boolean | undefined;
  isVertical?: boolean | undefined;
  hasError: boolean | undefined;
  isChecked?: boolean | undefined;
}>`
  align-items: start;
  color: ${({ isDisabled }) => (isDisabled ? Scorpion : Tundora)};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex: 1;
  font-size: 1.0625rem;
  margin: 0;
  padding: 0 16px 12px 46px;
  position: relative;
  transition: border-color 0.2s linear;

  &::before,
  &::after {
    border-radius: 50%;
    content: "";
    display: block;
    position: absolute;
  }

  &::before {
    border: 1px solid ${SilverChalice};
    height: 16px;
    left: 20px;
    margin-top: 2px;
    width: 16px;
  }

  &::after {
    background: transparent;
    margin-top: 6px;
    left: 24px;
    transition: all 0.2s linear;
    height: 8px;
    width: 8px;
  }

  &:last-of-type {
    margin: 0;
  }

  ${({ isChecked }) =>
    isChecked &&
    `
    border-color: ${Scorpion};

    &::after {
      background-color: ${Tundora};
    }
  `}

  ${({ hasError }) => (hasError ? `border: 1px solid ${AlizarinCrimson};` : '')}

  ${({ isVertical }) =>
    isVertical ? 'margin-bottom: 1rem;' : 'margin-right: 1rem;'}

  ${({ isDisabled }) =>
    isDisabled &&
    `
    background: ${abcdGray};
    cursor: default;
  `}
`;

export const LabelInner = styled.span`
  color: inherit;
  display: block;
`;

export const SubLabel = styled(Text).attrs({ color: Scorpion })``;
