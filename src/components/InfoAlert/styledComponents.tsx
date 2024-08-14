import styled from 'styled-components';
import { Alto, Scorpion, CongressBlue, abcdGray } from 'styles/colours';
import { Text } from 'components/Text';

export const Alert = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${abcdGray};
  width: 100%;
  border: 1px solid ${Alto};
  padding: 1rem;
`;

export const AlertTitle = styled(Text).attrs({
  color: CongressBlue,
  size: '0.875rem',
})`
  display: flex;
  font-weight: bold;
  line-height: 20px;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

export const Paragraph = styled(Text).attrs({
  size: '0.75rem',
  color: Scorpion,
})`
  line-height: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const IconContainer = styled.div`
  margin: 0.5rem;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  width: 85%;
`;
