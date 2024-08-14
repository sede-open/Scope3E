import { FormEvent, ReactNode } from 'react';

import CogSpinner from 'components/CogSpinner';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  children: ReactNode;
  dataTestId: string;
  isLoading: boolean;
  isXl?: boolean;
  onSubmit: () => void;
  subtitle?: ReactNode;
  title: string;
}

export const ModalForm = ({
  children,
  dataTestId,
  isLoading,
  isXl,
  onSubmit,
  subtitle,
  title,
}: IProps) => {
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <StyledComponents.Wrapper data-testid={dataTestId} isXl={isXl}>
      {isLoading ? (
        <CogSpinner />
      ) : (
        <StyledComponents.Form
          data-testid={selectors.getFormSelector(dataTestId)}
          onSubmit={submitHandler}
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
        </StyledComponents.Form>
      )}
    </StyledComponents.Wrapper>
  );
};

ModalForm.defaultProps = {
  isXl: false,
  subtitle: null,
};
