import styled from 'styled-components';
import { Text } from 'components/Text';

export const ProgressInfo = styled.div`
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ProgressSubtitle = styled(Text)`
  margin-bottom: 8px;
  font-weight: bold;
`;
