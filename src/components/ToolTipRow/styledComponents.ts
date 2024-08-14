import styled from 'styled-components';

import { Scorpion } from 'styles/colours';
import { Text } from 'components/Text';

export const Dot = styled.div<{ background: string; borderBackground: string }>`
  width: 8px;
  height: 8px;
  border-radius: 35px;
  border: 1.5px solid ${({ borderBackground }) => borderBackground};
  background: ${({ background }) => background};
  justify-content: flex-center;
  margin-top: 0.3rem;
  margin-right: 0.5rem;
`;

export const Value = styled(Text)`
  font-size: 12px;
  color: ${Scorpion};
  margin-bottom: 0.5rem;
  margin-left: 1rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
