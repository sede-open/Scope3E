import { ReactChild, ReactChildren } from 'react';
import * as StyledComponents from './styledComponents';

interface IProps {
  children: ReactChild | ReactChildren;
  dataTestId?: string;
}

export const InputSubLabel = ({ children, dataTestId }: IProps) => (
  <StyledComponents.SubLabel data-testid={dataTestId}>
    {children}
  </StyledComponents.SubLabel>
);

InputSubLabel.defaultProps = {
  dataTestId: undefined,
};
