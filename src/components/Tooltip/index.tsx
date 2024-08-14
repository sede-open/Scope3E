import styled from 'styled-components';

import { Alto } from 'styles/colours';
import { Text } from 'components/Text';

export const TooltipWrapper = styled.div`
  background: white;
  border: 1px solid ${Alto};
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 2px 8px 8px 2px rgba(0, 0, 0, 0.1);
`;

export const TooltipTitle = styled(Text)`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 0.5rem;
  margin-left: 1rem;
`;
