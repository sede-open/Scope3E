import styled from 'styled-components';
import { ifProp } from 'styled-tools';

export const RadioInputGroup = styled.div<{ isVertical?: boolean }>`
  display: flex;
  flex-direction: ${ifProp('isVertical', 'column', 'row')};
  width: 100%;
`;
