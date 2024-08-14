import styled from 'styled-components';

import { Scorpion, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { Text } from 'components/Text';
import Button from 'components/Button';

export const Container = styled.div`
  padding: 0 24px;
`;

export const Total = styled(Text).attrs({
  as: 'h2',
  size: '24px',
  color: Tundora,
  family: exampleBold,
})`
  line-height: 28px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const TotalName = styled(Text).attrs({
  size: '14px',
  color: Tundora,
})`
  line-height: 20px;
  font-weight: bold;
  margin-bottom: 14px;
`;

export const TotalDescription = styled(Text).attrs({
  size: '14px',
  color: Scorpion,
})`
  line-height: 20px;
  margin-bottom: 14px;
`;

export const ReadMoreButton = styled(Button)`
  line-height: inherit;
`;
