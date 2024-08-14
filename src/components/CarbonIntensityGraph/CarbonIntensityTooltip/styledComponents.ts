import styled from 'styled-components';
import { Text } from 'components/Text';
import { Alto } from 'styles/colours';

export const ToolTipWrapper = styled.div`
  background: white;
  border: 1px solid ${Alto};
  padding: 1rem;
  box-shadow: 2px 8px 8px 2px rgba(0, 0, 0, 0.1);
`;

export const ToolTipContainer = styled.div`
  background: white;
  margin-left: 1rem;
`;

export const Title = styled(Text)`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 0.5rem;
`;

export const Value = styled(Text)`
  font-size: 12px;
  margin-bottom: 0.5rem;
`;
