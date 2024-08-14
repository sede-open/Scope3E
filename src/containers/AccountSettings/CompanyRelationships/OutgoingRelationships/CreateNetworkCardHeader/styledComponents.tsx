import { Text } from 'components/Text';
import styled from 'styled-components';
import { Tundora } from 'styles/colours';

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 48px;
  padding-right: 48px;
  padding-left: 48px;
  padding-bottom: 32px;
  flex-direction: column;
`;

export const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 42px;
  margin-top: 16px;
`;

export const Title = styled(Text).attrs({
  as: 'h2',
  size: '24px',
})`
  color: ${Tundora};
  margin-bottom: 0.25rem;
  font-weight: normal;
`;
