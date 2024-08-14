import styled from 'styled-components';

import { Text } from 'components/Text';
import Button from 'components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 100%;
  width: 100%;
  text-align: center;
`;

export const Title = styled(Text)`
  margin-top: 1rem;
`;

export const Message = styled(Text)`
  margin-top: 0.5rem;
  max-width: 295px;
`;

export const StyledButton = styled(Button)`
  margin-top: 1rem;
`;
