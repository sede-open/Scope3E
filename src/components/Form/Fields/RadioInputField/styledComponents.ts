import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { Text } from 'components/Text';

import {
  AlizarinCrimson,
  Alto,
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
  border: 1px solid ${ifProp(
    { hasError: false, isChecked: true },
    Scorpion,
    Alto
  )};
  color: ${({ isDisabled }) => (isDisabled ? Scorpion : Tundora)};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex: 1;
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  padding: 16px 16px 16px 46px;
  position: relative;
  transition: border-color 0.2s linear;

  &:hover,
  &:focus {
    ${({ isDisabled }) =>
      !isDisabled
        ? `border: 1px solid ${Scorpion}`
        : `border: 1px solid ${Alto}`}}

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
    font-weight: 700;

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
