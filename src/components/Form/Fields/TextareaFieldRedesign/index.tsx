import { FormField } from 'components/Form/FormField';
import { TEXTAREA_MAX_LENGTH } from 'containers/GetInTouch/GetInTouchForm/constants';
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
}

export const TextareaFieldRedesign = ({
  errorMessage,
  dataTestId,
  id,
  label,
  name,
  placeholder,
  onChange,
  value,
}: IProps) => {
  return (
    <FormField
      errorMessage={errorMessage}
      hasError={!!errorMessage}
      testIdPrefix={dataTestId || id}
    >
      <StyledComponents.Label htmlFor={name}>{label}</StyledComponents.Label>
      <StyledComponents.Textarea
        maxLength={TEXTAREA_MAX_LENGTH}
        name={name}
        placeholder={placeholder}
        onChange={({ target: { value: newValue } }) => onChange(newValue)}
        value={value}
        rows={4}
      />
    </FormField>
  );
};
