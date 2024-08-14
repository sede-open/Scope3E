import { FormField } from 'components/Form/FormField';
import * as StyledComponents from './styledComponents';

interface IProps {
  id: string;
  dataTestId?: string;
  errorMessage?: string;
  label: string;
  name: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  type?: string;
}

export const InputFieldRedesign = ({
  errorMessage,
  dataTestId,
  id,
  label,
  name,
  placeholder,
  onChange,
  value,
  type = 'text',
}: IProps) => {
  return (
    <FormField
      errorMessage={errorMessage}
      hasError={!!errorMessage}
      testIdPrefix={dataTestId || id}
    >
      <StyledComponents.Label htmlFor={name}>{label}</StyledComponents.Label>
      <StyledComponents.Input
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={({ target: { value: newValue } }) => onChange(newValue)}
        value={value}
      />
    </FormField>
  );
};
