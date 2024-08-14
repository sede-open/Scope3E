import useTranslation from 'next-translate/useTranslation';
import { ReactChild, ReactChildren } from 'react';

import * as StyledComponents from './styledComponents';

interface IProps {
  children: ReactChild | ReactChildren;
  dataTestId?: string;
  htmlFor?: string;
  isDisabled?: boolean;
  isHidden?: boolean;
  isOptional?: boolean;
  width?: string;
  lrgSize?: boolean;
}

export const InputLabel = ({
  children,
  dataTestId,
  htmlFor,
  isDisabled,
  isHidden,
  isOptional,
  width,
  lrgSize,
}: IProps) => {
  const { t } = useTranslation();

  return (
    <StyledComponents.Label
      data-testid={dataTestId}
      htmlFor={htmlFor}
      isDisabled={isDisabled}
      isHidden={isHidden}
      width={width}
      lrgSize={lrgSize}
    >
      {children}
      {isOptional && (
        <StyledComponents.OptionalContainer
          data-testid={`${dataTestId}-optional`}
          lrgSize={lrgSize}
        >
          {t('common:label-optional')}
        </StyledComponents.OptionalContainer>
      )}
    </StyledComponents.Label>
  );
};

InputLabel.defaultProps = {
  dataTestId: undefined,
  htmlFor: undefined,
  isDisabled: false,
  isHidden: false,
  isOptional: false,
  width: undefined,
  lrgSize: false,
};
