import styled from 'styled-components';
import { Text } from 'components/Text';
import { CongressBlue } from 'styles/colours';

export const InputHighlight = styled(Text).attrs({
  as: 'span',
  family: 'Arial',
  color: CongressBlue,
})<{ lrgSize?: boolean }>`
  font-size: ${({ lrgSize }) => (lrgSize ? '14px' : '12px')};
`;
