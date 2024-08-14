import { ChangeEventHandler, ReactNode } from 'react';

import { RadioInput } from 'components/Form/Inputs/Radio';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';

interface IProps {
  tabIndex: number;
  dataTestId?: string;
  hasError?: boolean;
  id: string;
  isChecked: boolean;
  isDisabled?: boolean;
  isVertical?: boolean;
  label: string | ReactNode;
  subLabel?: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}

export const RadioInputFieldRedesign = ({
  tabIndex,
  dataTestId,
  hasError,
  id,
  isChecked,
  isDisabled,
  isVertical,
  label,
  subLabel,
  name,
  onChange,
  value,
}: IProps) => (
  <>
    <RadioInput
      dataTestId={dataTestId && selectors.getInputSelector(dataTestId)}
      isChecked={isChecked}
      onChange={onChange}
      id={id}
      isDisabled={isDisabled}
      name={name}
      value={value}
      tabIndex={tabIndex}
    />
    <StyledComponents.Label
      data-testid={dataTestId && selectors.getLabelSelector(dataTestId)}
      hasError={hasError}
      htmlFor={id}
      isChecked={isChecked}
      isDisabled={isDisabled}
      isVertical={isVertical}
    >
      <div>
        <StyledComponents.LabelInner>{label}</StyledComponents.LabelInner>
        {subLabel && (
          <StyledComponents.SubLabel>{subLabel}</StyledComponents.SubLabel>
        )}
      </div>
    </StyledComponents.Label>
  </>
);
