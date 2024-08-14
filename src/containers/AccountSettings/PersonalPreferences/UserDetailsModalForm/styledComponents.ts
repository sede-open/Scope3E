import styled from 'styled-components';
import { Scorpion } from 'styles/colours';
import { Text } from 'components/Text';

export const EmailExtra = styled(Text).attrs({
  color: Scorpion,
})`
  margin-top: 4px;
`;

export const FormContent = styled.div`
  margin-bottom: 10px;
`;
