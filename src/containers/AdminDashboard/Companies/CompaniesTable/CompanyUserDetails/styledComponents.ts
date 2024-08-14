import styled from 'styled-components';

import { Text } from 'components/Text';
import { Tundora } from 'styles/colours';

export const MultipleUserButton = styled.button`
  text-align: left;
  cursor: pointer;
`;

export const MultipleUserText = styled(Text).attrs({
  color: Tundora,
  size: '14px',
})`
  line-height: 20px;
  text-decoration: underline;
`;
