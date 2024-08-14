import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { Gray } from 'styles/colours';
import { ChartLegendJustification } from './types';

export const Container = styled.div<{ justifyItems: ChartLegendJustification }>`
  display: flex;
  justify-content: ${({ justifyItems }) => justifyItems};
  align-items: center;
  min-height: 20px;
  flex-wrap: wrap;
`;

export const Legend = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  margin-bottom: 14px;

  &:last-of-type {
    margin-right: 0;
  }
`;

export const LegendDot = styled.div<{ colour: string }>`
  height: 12px;
  width: 12px;
  margin-right: 6px;
  border-radius: 50%;
  background-color: ${({ colour }) => colour};
`;

export const LegendName = styled.p<{
  isClickable: boolean;
  isVisible?: boolean;
}>`
  color: ${Gray};
  line-height: 14px;
  font-size: 12px;
  text-decoration: ${ifProp({ isClickable: true }, 'underline', 'none')};
  cursor: ${ifProp({ isClickable: true }, 'pointer', 'default')};
`;
