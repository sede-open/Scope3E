import styled from 'styled-components';
import { Tundora, Scorpion } from 'styles/colours';
import { Text } from 'components/Text';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 115px;
`;

export const Title = styled(Text).attrs({
  as: 'h4',
  size: '16px',
  color: Tundora,
})`
  line-height: 24px;
  font-weight: bold;
  text-align: center;
`;

export const Subtext = styled(Text).attrs({
  color: Scorpion,
})`
  line-height: 20px;
  text-align: center;
  max-width: 410px;
  margin-top: 8px;
`;

export const EmptyStateCtaContainer = styled.div`
  padding-top: 16px;
`;
