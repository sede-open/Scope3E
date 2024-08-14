import { ChangeEventHandler } from 'react';

import * as StyledComponents from './styledComponents';

interface IProps {
  className?: string;
  dataTestId?: string;
  id: string;
  isChecked: boolean;
  isDisabled?: boolean;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  tabIndex: number;
}

export const RadioInput = ({
  className,
  dataTestId,
  id,
  isChecked,
  isDisabled,
  name,
  onChange,
  tabIndex,
  value,
}: IProps) => (
  <StyledComponents.RadioInput
    checked={isChecked}
    className={className}
    data-testid={dataTestId}
    disabled={isDisabled}
    id={id}
    name={name}
    onChange={onChange}
    type="radio"
    value={value}
    tabIndex={tabIndex}
  />
);

RadioInput.defaultProps = {
  className: undefined,
  dataTestId: undefined,
  isDisabled: false,
};
