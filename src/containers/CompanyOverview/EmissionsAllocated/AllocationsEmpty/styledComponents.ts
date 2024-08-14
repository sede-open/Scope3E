import styled from 'styled-components';
import { Text } from 'components/Text';
import { exampleBold, exampleMedium } from 'styles/fonts';
import { Tundora } from 'styles/colours';

export const Title = styled(Text).attrs({
  as: 'h4',
  size: '1rem',
  family: exampleBold,
  color: Tundora,
})`
  display: block;
  margin-bottom: 16px;
`;

export const SubTitle = styled(Text).attrs({
  size: '0.875rem',
  family: exampleMedium,
  color: Tundora,
})`
  display: block;
`;
