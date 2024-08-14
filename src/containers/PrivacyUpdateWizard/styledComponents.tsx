import styled from 'styled-components';
import { Scorpion, Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';

export const CogSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100%;
`;

export const ProgressBarContainer = styled.div`
  margin-bottom: 4rem;
`;

export const WizardContainer = styled.div`
  margin: 0 10% 0 10%;
`;

export const HeaderContainer = styled.div`
  display: flex;
`;

export const CloseButtonContainer = styled.div`
  display: flex;
  width: 10%;
  height: 2.25rem;
  justify-content: right;
`;

export const CloseButton = styled.button`
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  height: 2.25rem;
`;

export const WizardBodyContainer = styled.div`
  display: flex;
  height: auto;
  margin-bottom: 3rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 66%;
  margin-right: 1.5rem;
`;

export const InfoBox = styled.div`
  display: flex;
  justify-content: center;
  width: 34%;
  height: 66%;
`;

export const StepTitle = styled.h2`
  color: ${Tundora};
  font-family: ${exampleBold};
  font-size: 1.5rem;
  font-weight: normal;
  line-height: 1.75rem;
  margin-bottom: 1rem;

  &:first-of-type {
    padding: 0;
  }
`;

export const StepSubheader = styled.p`
  display: flex;
  color: ${Scorpion};
  justify-content: flex-start;
  font-size: 0.875rem;
  line-height: 1rem;
  margin-bottom: 1.5rem;
`;
