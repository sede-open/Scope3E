import styled from 'styled-components';

import { Alto, Tundora, AlizarinCrimson } from 'styles/colours';
import { inputUnitWidth } from 'styles/variables';

interface IProps {
  units?: string;
  hasError?: boolean;
  hasPrefix?: boolean;
}

export const Input = styled.input<IProps>`
  position: relative;
  width: 100%;
  border: 1px solid ${Alto};
  padding: 1rem;
  color: ${Tundora};
  font-size: 14px;
  z-index: 2;
  background: transparent;

  ${({ units }) => (units ? `padding-right: ${inputUnitWidth};` : '')}
  ${({ hasError }) => (hasError ? `border: 1px solid ${AlizarinCrimson};` : '')}
  ${({ hasPrefix }) => (hasPrefix ? `padding-left: 103px;` : '')}
`;
