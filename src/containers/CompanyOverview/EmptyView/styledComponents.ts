import styled from 'styled-components';
import { White, Alto, Tundora } from 'styles/colours';
import { Text } from 'components/Text';
import Button from 'components/Button';

export const EmptyViewContainer = styled.div`
  background-color: ${White};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: 1px solid ${Alto};
  flex-grow: 1;
`;

export const EmptyIcon = styled.div`
  margin-bottom: 16px;
`;

export const EmptyTitle = styled.div`
  margin-bottom: 8px;
`;

export const EmptyDescriptionContainer = styled.div`
  max-width: min(70%, 550px);
`;

export const EmptyViewDescription = styled(Text).attrs({
  size: '0.875rem',
  color: Tundora,
})``;

export const ActionButton = styled(Button)`
  margin-top: 24px;
`;
