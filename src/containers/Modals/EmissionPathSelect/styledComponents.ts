import styled from 'styled-components';

import { Scorpion, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { Text } from 'components/Text';

export const Container = styled.div`
  height: 470px;
  width: 800px;
`;

export const Title = styled(Text).attrs({
  color: Tundora,
  family: exampleBold,
  size: '32px',
  as: 'h1',
})`
  margin-bottom: 8px;
  line-height: 40px;
`;

export const Subtitle = styled(Text).attrs({
  color: Scorpion,
  size: '16px',
})`
  line-height: 32px;
`;
