import Button from 'components/Button';
import styled from 'styled-components';
import { White, Alto } from 'styles/colours';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Columns = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

export const WizardButtons = styled.div`
  display: flex;
  justify-content: space-between;

  > button {
    margin-left: 1.5rem;
  }
`;

export const RightHandWizardButtons = styled.div`
  display: flex;

  > button {
    margin-left: 1.5rem;
  }
`;

export const LeftHandWizardButtons = styled.div`
  display: flex;
`;

export const BackButton = styled(Button).attrs({
  color: 'text-button',
})`
  margin-right: auto;
`;

export const CancelButton = styled(Button).attrs({ color: 'secondary' })``;

export const NextButton = styled(Button)``;

export const StepWindow = styled.div`
  display: flex;
  flex-direction: column;
  background: ${White};
  padding: 2rem 3rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${Alto};
`;

export const ApiErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  height: 1.5rem;
`;
