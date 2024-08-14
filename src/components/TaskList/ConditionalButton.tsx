import { ReactNode } from 'react';
import * as StyledComponents from './styledComponents';

interface IProps {
  children: ReactNode;
  dataTestId: string;
  isClickable: boolean;
  onClick?: () => void;
}

export const ConditionalButton = ({
  children,
  dataTestId,
  isClickable,
  onClick,
}: IProps) =>
  onClick && isClickable ? (
    <StyledComponents.TaskButton data-testid={dataTestId} onClick={onClick}>
      {children}
    </StyledComponents.TaskButton>
  ) : (
    <>{children}</>
  );

ConditionalButton.defaultProps = {
  onClick: undefined,
};
