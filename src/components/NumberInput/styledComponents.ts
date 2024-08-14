import styled from 'styled-components';

import { inputUnitWidth } from 'styles/variables';
import { abcdGray, Gray, Scorpion, White, Alto } from 'styles/colours';

export const NumberInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: ${Gray};
  font-size: 14px;
`;

export const InputContainer = styled.div<{
  units?: string;
  disabled: boolean;
  size: string | undefined;
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  max-width: ${({ size }) => (size === 'small' ? '200px' : '100%')};
  *:focus,
  *:hover {
    outline: none;
    border-color: ${({ disabled }) => (disabled ? Alto : Scorpion)};
  }
  background: ${({ disabled }) => (disabled ? abcdGray : White)};

  ${({ units }) => {
    if (units) {
      return `
        ::after {
          content: '${units}';
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          bottom: 0;
          right: 0;
          width: ${inputUnitWidth};
          height: 100%;
          background: ${abcdGray};
          color: ${Scorpion};
        }
      `;
    }

    return '';
  }}
`;
