import { escapeNonPrintableChars } from '../../utils';
import * as StyledComponents from './styledComponents';

interface IProps {
  className?: string;
  dataTestId?: string;
  id: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  maxLength: number;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  value: string;
}

export const Textarea = ({
  className,
  dataTestId,
  id,
  isDisabled,
  isInvalid,
  maxLength,
  name,
  onChange,
  placeholder,
  rows,
  value,
}: IProps) => (
  <StyledComponents.Textarea
    className={className}
    data-testid={dataTestId}
    disabled={isDisabled}
    id={id}
    isInvalid={isInvalid}
    maxLength={maxLength}
    name={name}
    onChange={({ target: { value: newValue } }) =>
      onChange(escapeNonPrintableChars(newValue))
    }
    placeholder={placeholder}
    rows={rows}
    value={value}
  />
);

Textarea.defaultProps = {
  className: undefined,
  dataTestId: undefined,
  isDisabled: false,
  isInvalid: false,
  placeholder: undefined,
  rows: 4,
};
