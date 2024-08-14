import { InputError } from 'components/InputError';
import { ReactNode } from 'react';
import * as StyledComponents from './styledComponents';

interface IProps {
  children: ReactNode;
  errorMessage?: string;
  hasError?: boolean;
  testIdPrefix: string;
}

export const FormField = ({
  children,
  errorMessage,
  hasError,
  testIdPrefix,
}: IProps) => (
  <StyledComponents.FormFieldContainer
    data-testid={`${testIdPrefix}-field-container`}
  >
    {children}

    {hasError && (
      <InputError data-testid={`${testIdPrefix}-error`}>
        {errorMessage}
      </InputError>
    )}
  </StyledComponents.FormFieldContainer>
);

FormField.defaultProps = {
  errorMessage: undefined,
  hasError: false,
};
