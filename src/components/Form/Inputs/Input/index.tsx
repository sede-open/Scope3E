import * as StyledComponents from './styledComponents';

export type InputTypes = 'text' | 'password' | 'tel' | 'email';

interface IProps {
  className?: string;
  dataTestId?: string;
  id: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type: InputTypes;
  value: string;
}

export const Input = ({
  className,
  dataTestId,
  id,
  isDisabled,
  isInvalid,
  name,
  onChange,
  placeholder,
  type,
  value,
}: IProps) => (
  <StyledComponents.Input
    className={className}
    data-testid={dataTestId}
    disabled={isDisabled}
    id={id}
    isInvalid={isInvalid}
    name={name}
    onChange={({ target: { value: newValue } }) => onChange(newValue)}
    placeholder={placeholder}
    type={type}
    value={value}
  />
);

Input.defaultProps = {
  className: undefined,
  dataTestId: undefined,
  isDisabled: false,
  isInvalid: false,
  placeholder: undefined,
};
