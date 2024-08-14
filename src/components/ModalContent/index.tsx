import { ReactNode } from 'react';

import CogSpinner from 'components/CogSpinner';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  children: ReactNode;
  dataTestId: string;
  isLoading?: boolean;
  isXl?: boolean;
  subtitle?: ReactNode;
  title: string;
}

export const ModalContent = ({
  children,
  dataTestId,
  isLoading,
  isXl,
  subtitle,
  title,
}: IProps) => (
  <StyledComponents.Wrapper data-testid={dataTestId} isXl={isXl}>
    {isLoading ? (
      <CogSpinner />
    ) : (
      <StyledComponents.Content
        data-testid={selectors.getContentSelector(dataTestId)}
      >
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

        {children}
      </StyledComponents.Content>
    )}
  </StyledComponents.Wrapper>
);

ModalContent.defaultProps = {
  isXl: false,
  subtitle: null,
  isLoading: false,
};
