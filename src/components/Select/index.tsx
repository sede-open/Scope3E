import styled from 'styled-components';
import { Alto, Tundora, AlizarinCrimson, Scorpion } from 'styles/colours';

interface IProps {
  width?: string;
  hasError?: boolean;
}

export const Select = styled.select<IProps>`
  font-size: 14px;
  border-radius: 0;
  border: 1px solid ${({ hasError }) => (hasError ? AlizarinCrimson : Alto)};
  padding: 1rem;
  color: ${Tundora};
  background-image: url('/chevron.svg');
  background-size: 25px;
  background-position: calc(100% - 0.5rem);
  background-repeat: no-repeat;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  ${({ width }) => (width ? `width: ${width};` : '')}

  &:focus,
  &:hover {
    outline: none;
    border-color: ${Scorpion};
  }
`;

Select.defaultProps = {
  width: '',
};
