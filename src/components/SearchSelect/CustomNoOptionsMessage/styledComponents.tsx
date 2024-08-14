import styled from 'styled-components';

import { Text } from 'components/Text';
import { Gray } from 'styles/colours';

export const NoResultsMessage = styled(Text).attrs({
  size: '14px',
  color: Gray,
})`
  line-height: 20px;
  padding: 12px 16px;
`;
