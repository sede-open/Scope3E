import styled from 'styled-components';
import { Text } from 'components/Text';
import { Scorpion } from 'styles/colours';

export const InputDescription = styled(Text).attrs({
  as: 'div',
  family: 'Arial',
  color: Scorpion,
})<{ lrgSize?: boolean }>`
  font-size: ${({ lrgSize }) => (lrgSize ? '14px' : '12px')};
`;

export const InputDescriptionLink = styled(Text).attrs({
  as: 'span',
  family: 'Arial',
  color: Scorpion,
})<{ lrgSize?: boolean }>`
  text-decoration: underline;
  font-size: ${({ lrgSize }) => (lrgSize ? '14px' : '12px')};
`;
