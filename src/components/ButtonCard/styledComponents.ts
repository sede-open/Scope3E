import styled from 'styled-components';
import { Text } from 'components/Text';
import { Tundora, Scorpion, Alto, Botticelli, White } from 'styles/colours';

export const Container = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 264px;
  max-width: 100%;
  padding: 25px 32px 32px 32px;
  border: 1px solid ${Alto};
  background: ${White};
  cursor: pointer;

  &:hover {
    .icon-background {
      fill: ${Botticelli};
    }

    border: 1px solid ${Scorpion};
  }

  &:active {
    border: 1px solid ${Scorpion};
  }
`;

export const IconContainer = styled.div``;

export const Title = styled(Text).attrs({
  size: '14px',
  color: Tundora,
})`
  line-height: 20px;
  font-weight: 700;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const Subtitle = styled(Text).attrs({
  size: '14px',
  color: Scorpion,
})``;
