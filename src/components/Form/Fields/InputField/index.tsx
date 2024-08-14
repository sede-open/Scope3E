import { ReactNode } from 'react';
import { FormField } from 'components/Form/FormField';
import { InputLabel } from 'components/InputLabel';
import { Input, InputTypes } from 'components/Form/Inputs/Input';
import * as StyledComponents from './styledComponents';

interface IProps {
  dataTestId?: string;
  errorMessage?: string;
  id: string;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isOptional?: boolean;
  label: string;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: InputTypes;
  value: string;
  units?: string;
  renderAfterInput?: ReactNode;
}

export const InputField = ({
  dataTestId,
  errorMessage,
  id,
  isDisabled,
  isLabelHidden,
  isOptional,
  label,
  name,
  onChange,
  placeholder,
  type = 'text',
  value,
  units,
  renderAfterInput,
}: IProps) => {
  const isInvalid = !!errorMessage;

  return (
    <FormField
      errorMessage={errorMessage}
      hasError={isInvalid}
      testIdPrefix={dataTestId || id}
    >
      <>
        <InputLabel
          dataTestId={`${dataTestId}-label`}
          htmlFor={id}
          isDisabled={isDisabled}
          isHidden={isLabelHidden}
          isOptional={isOptional}
        >
          {label}
        </InputLabel>
        <StyledComponents.Units
          units={units}
          data-testid={`${dataTestId}-units`}
        >
          <Input
            dataTestId={`${dataTestId}-input`}
            onChange={onChange}
            id={id}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
            name={name}
            placeholder={placeholder}
            type={type}
            value={value}
          />
        </StyledComponents.Units>
        {renderAfterInput}
      </>
    </FormField>
  );
};

InputField.defaultProps = {
  dataTestId: undefined,
  errorMessage: undefined,
  isDisabled: false,
  isLabelHidden: false,
  isOptional: false,
  placeholder: undefined,
  type: 'text',
  units: undefined,
  renderAfterInput: undefined,
};
