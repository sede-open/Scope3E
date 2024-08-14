import { ReactChild } from 'react';

import { FormField } from 'components/Form/FormField';
import { CheckboxInput } from 'components/Form/Inputs/Checkbox';

import * as StyledComponents from './styledComponents';

interface IProps {
  dataTestId?: string;
  id: string;
  isChecked: boolean;
  isDisabled?: boolean;
  label: string | ReactChild;
  onChange: (value: boolean) => void;
}

export const CheckboxFieldRedesign = ({
  dataTestId,
  id,
  isChecked,
  isDisabled = false,
  label,
  onChange,
}: IProps) => (
  <FormField testIdPrefix={dataTestId || id}>
    <>
      <CheckboxInput
        dataTestId={`${dataTestId}-input`}
        isChecked={isChecked}
        onChange={onChange}
        id={id}
        isDisabled={isDisabled}
        name={id}
      />
      <StyledComponents.Label
        data-testid={`${dataTestId}-label`}
        htmlFor={id}
        isChecked={isChecked}
        isDisabled={isDisabled}
      >
        {label}
      </StyledComponents.Label>
    </>
  </FormField>
);
