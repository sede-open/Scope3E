import styled from 'styled-components';
import { emailInputUnitWidth } from 'styles/variables';
import { abcdGray, Scorpion } from 'styles/colours';

export const Units = styled.div<{
  units?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  ${({ units }) =>
    units &&
    `::after { content: '${units}';
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            top: 0;
            bottom: 0;
            right: 0;
            width: ${emailInputUnitWidth};
            height: 100%;
            background: ${abcdGray};
            color: ${Scorpion};
            line-height: 20px; }`}
`;
