import { linkStyles } from 'components/Link';
import styled, { css } from 'styled-components';
import { switchProp } from 'styled-tools';
import {
  BrightSun,
  DisabledGray,
  Festival,
  FunGreen,
  abcdGray,
  Gray,
  Scorpion,
  SilverChalice,
  Supernova,
  Tundora,
  White,
} from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export type ButtonColour =
  | 'primary'
  | 'secondary'
  | 'text-button'
  | 'secondary-borderless'
  | 'dark'
  | 'redesign-primary'
  | 'redesign-secondary'
  | 'redesign-secondary-borderless'
  | 'redesign-primary-outline';
export type ButtonType = 'button' | 'submit';

interface IProps {
  color?: ButtonColour;
  height?: string;
  maxHeight?: string;
  width?: string;
  type?: ButtonType;
  size?: 'small' | 'regular';
}

export const Button = styled.button<IProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ height }) => (height ? `min-height: ${height};` : '')}
  ${({ maxHeight }) => (maxHeight ? `max-height: ${maxHeight};` : '')}
  min-width: ${({ width }) => width};
  padding: ${({ size }) =>
    size === 'regular' ? '1rem' : '0.5625rem 0.375rem'};
  font-size: 1rem;
  font-weight: bold;
  line-height: 100%;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  :disabled {
    background-color: ${abcdGray};
    color: ${Gray};
    cursor: default;
    :hover {
      background-color: ${abcdGray};
    }
  }
  ${switchProp('color', {
    primary: css`
      background-color: ${Supernova};
      color: ${Tundora};
      border: none;
      &:hover {
        background-color: ${Festival};
      }
      &:active {
        background-color: ${BrightSun};
      }
    `,
    secondary: css`
      background-color: ${White};
      color: ${Tundora};
      border: 1px solid ${SilverChalice};
      &:focus,
      &:hover,
      &:active {
        border: 1px solid ${Scorpion};
      }
    `,
    'secondary-borderless': css`
      background-color: ${White};
      color: ${Tundora};
      border: none;
    `,
    'text-button': css`
      ${linkStyles}
      background-color: transparent;
      border: none;
      font-weight: normal;
      text-align: left;
      justify-content: flex-start;
      padding: 0;
      min-height: auto;
      min-width: auto;
    `,
    dark: css`
      background-color: ${Tundora};
      color: ${White};
      border: none;
      &:focus,
      &:hover {
        background-color: ${Tundora};
      }
      &:active {
        background-color: ${Tundora};
      }
    `,
    'redesign-primary': css`
      background-color: ${FunGreen};
      font-family: ${exampleBold};
      border-radius: 86px;
      font-weight: 550;
      color: ${White};
      border: 3px solid transparent;
      text-align: center;

      &:enabled:focus,
      &:enabled:hover,
      &:enabled:active {
        color: ${Tundora};
        background-color: ${White};
        border: 3px solid ${FunGreen};
      }
      &:disabled {
        background-color: ${DisabledGray};
        color: ${White};
      }
      &:disabled:hover {
        background-color: ${DisabledGray};
        color: ${White};
      }
    `,
    'redesign-secondary': css`
      background-color: ${White};
      font-family: ${exampleBold};
      color: ${Tundora};
      border-radius: 86px;
      font-weight: 550;
      border: 1px solid ${Tundora};
      text-align: center;
      &:focus,
      &:hover,
      &:active {
        border: 3px solid ${Tundora};
      }
    `,
    'redesign-secondary-borderless': css`
      text-align: center;
      background-color: ${White};
      font-family: ${exampleBold};
      color: ${FunGreen};
      font-weight: 550;
      border: none;
      border-radius: 86px;
    `,
    'redesign-primary-outline': css`
      text-align: center;
      background-color: ${FunGreen};
      font-family: ${exampleBold};
      font-weight: 550;
      border-radius: 86px;
      color: ${White};
      border: 3px solid ${White};

      &:focus,
      &:hover,
      &:active {
        color: ${FunGreen};
        border: 3px solid ${FunGreen};
        background-color: ${White};
      }
    `,
  })}
`;

Button.defaultProps = {
  color: 'primary',
  height: '3',
  width: '5.7rem',
  type: 'button',
  size: 'regular',
  onClick: undefined,
  disabled: false,
};

export default Button;
