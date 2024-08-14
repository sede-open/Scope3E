import * as StyledComponents from './styledComponents';

interface IProps {
  className?: string;
  dataTestId?: string;
  id: string;
  isChecked: boolean;
  isDisabled?: boolean;
  name: string;
  onChange: (value: boolean) => void;
}

export const CheckboxInput = ({
  className,
  dataTestId,
  id,
  isChecked,
  isDisabled,
  name,
  onChange,
}: IProps) => (
  <StyledComponents.CheckboxInput
    checked={isChecked}
    className={className}
    data-testid={dataTestId ? `${dataTestId}-input` : null}
    disabled={isDisabled}
    id={id}
    name={name}
    onChange={({ target: { checked } }) => onChange(checked)}
    type="checkbox"
  />
);

CheckboxInput.defaultProps = {
  className: undefined,
  dataTestId: undefined,
  isDisabled: false,
};
