import styled from 'styled-components';

import { Text } from 'components/Text';
import { Card } from 'components/Card';

export const EmptyStateContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 494px;
  width: 100%;
  text-align: center;
`;

export const TextContainer = styled.div`
  margin-bottom: 1rem;
  max-width: 310px;
`;

export const EmptyStateHeading = styled(Text)`
  margin-top: 0.5rem;
  max-width: 295px;
`;

export const EmptyStateMessage = styled(Text)`
  text-align: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > :last-child {
    margin-left: 1rem;
  }
`;

export const Title = styled(Text)`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;
