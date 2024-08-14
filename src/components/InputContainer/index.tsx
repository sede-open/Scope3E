import { ReactChild } from 'react';

import { InputError } from 'components/InputError';

import * as StyledComponents from './styledComponents';

interface IProps {
  children: ReactChild;
  errorMessage?: string;
  hasError?: boolean;
  testIdPrefix: string;
}

export const InputContainer = ({
  children,
  errorMessage,
  hasError,
  testIdPrefix,
}: IProps) => (
  <StyledComponents.Container>
    {children}

    {hasError && (
      <InputError data-testid={`${testIdPrefix}-error`}>
        {errorMessage}
      </InputError>
    )}
  </StyledComponents.Container>
);

InputContainer.defaultProps = {
  errorMessage: undefined,
  hasError: false,
};
