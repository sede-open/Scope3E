import styled from 'styled-components';
import { Alto, Scorpion, Tundora, White } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

import { Text } from 'components/Text';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 50px 78px 50px;
  border: 1px solid ${Alto};
  background: ${White};
  max-width: 100%;
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  color: Tundora,
  size: '32px',
  family: exampleBold,
})`
  margin-bottom: 8px;
  line-height: 40px;
  font-weight: 700;
`;

export const Subtitle = styled(Text).attrs({
  color: Scorpion,
  size: '16px',
})`
  line-height: 32px;
`;
