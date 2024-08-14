import styled from 'styled-components';
import { AlizarinCrimson, Tundora } from 'styles/colours';
import { AvenirNextBold } from 'styles/fonts';
import { Text } from 'components/Text';

export const RemoveEmissionContainer = styled.div`
  width: 840px;
  max-width: 100%;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled(Text).attrs({
  as: 'h1',
  size: '32px',
  family: AvenirNextBold,
  color: Tundora,
})``;

export const Subtitle = styled(Text).attrs({
  size: '16px',
  color: AlizarinCrimson,
})`
  margin-top: 8px;
`;

export const Form = styled.form`
  margin-top: 48px;
`;

export const FormColumns = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;
`;

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  &:first-child {
    margin-right: 26px;
  }
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  direction: rtl;
`;
