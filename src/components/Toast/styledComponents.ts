import styled from 'styled-components';
import { Tundora, Scorpion } from 'styles/colours';
import { Text } from 'components/Text';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled(Text)`
  color: ${Tundora};
  font-weight: bold;
`;

export const Subtitle = styled(Text)`
  color: ${Scorpion};
`;

export const CtaWrapper = styled.div`
  margin-left: auto;
  padding: 0 1rem;
  white-space: nowrap;
`;
