import Button from 'components/Button';
import { Label } from 'components/Form/Fields/InputFieldRedesign/styledComponents';
import styled from 'styled-components';

export const SubmitBtn = styled(Button).attrs({
  color: 'redesign-primary',
  width: 'auto',
})``;

export const Form = styled.form`
  max-width: 392px;
`;

export const RadioGroup = styled.div`
  margin-bottom: 16px;
`;

export const RadioLabel = styled(Label)`
  margin-bottom: 20px;
`;
