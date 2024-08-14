import { ReactChild } from 'react';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  dataTestId: string;
  title: string;
  subtitle: string;
  rightContent: ReactChild;
  leftContent: ReactChild;
}

export const WizardStepWithInfoLayout = ({
  dataTestId,
  title,
  subtitle,
  rightContent,
  leftContent,
}: IProps) => (
  <StyledComponents.StepWithInfoContainer data-testid={dataTestId}>
    <StyledComponents.StepWithInfoLeft>
      <StyledComponents.TitleContainer>
        <StyledComponents.Title
          data-testid={selectors.getTitleSelector(dataTestId)}
        >
          {title}
        </StyledComponents.Title>
        {subtitle && (
          <StyledComponents.Subtitle>{subtitle}</StyledComponents.Subtitle>
        )}
      </StyledComponents.TitleContainer>
      {leftContent}
    </StyledComponents.StepWithInfoLeft>
    <StyledComponents.StepWithInfoRight>
      {rightContent}
    </StyledComponents.StepWithInfoRight>
  </StyledComponents.StepWithInfoContainer>
);
