import { ReactChild } from 'react';
import * as StyledComponents from './styledComponents';

interface IProps {
  children: ReactChild;
  label: string;
  text: string;
}

export const GoalCard = ({ children, label, text }: IProps) => (
  <StyledComponents.IconContainer>
    <StyledComponents.SvgContainer>{children}</StyledComponents.SvgContainer>
    <StyledComponents.IconLabel>{label}</StyledComponents.IconLabel>
    <StyledComponents.IconLabelText>{text}</StyledComponents.IconLabelText>
  </StyledComponents.IconContainer>
);
