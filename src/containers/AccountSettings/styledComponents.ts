import Button from 'components/Button';
import { Text } from 'components/Text';
import styled from 'styled-components';

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 0.5rem;
`;

export const Title = styled(Text)`
  line-height: 28px;
  margin: 2.5rem 0rem 1.5rem 0rem;
`;

export const Columns = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BackButton = styled(Button)`
  margin-right: auto;
`;
