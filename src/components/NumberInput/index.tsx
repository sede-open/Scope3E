import { ReactChild, ComponentType } from 'react';
import NumberFormat from 'react-number-format';
import { getUserLocale } from 'utils/i18n';
import { getSeparators } from 'utils/number';
import { Input } from 'components/Input';
import { InputLabel } from 'components/InputLabel';
import { InputSubLabel } from 'components/InputSubLabel';
import { InputError } from 'components/InputError';

import * as StyledComponents from './styledComponents';

interface IProps {
  allowNegative?: boolean;
  dataTestId?: string;
  decimals?: number;
  disabled?: boolean;
  errorMessage?: string;
  id: string;
  isAllowed?: (values: { floatValue: number | undefined }) => boolean;
  isRequired?: boolean;
  label?: string;
  subLabel?: string | ReactChild;
  name: string;
  onChange: (value?: number | string) => void;
  placeholder?: string;
  size?: 'small' | 'regular';
  units?: string;
  value: number | string;
  errorNoWrap?: boolean;
  lrgLabelSize?: boolean;
  maxLength?: number;
  customInput?: ComponentType;
}

export const NumberInput = ({
  allowNegative,
  dataTestId,
  decimals,
  disabled = false,
  errorMessage,
  id,
  isAllowed,
  isRequired,
  label,
  subLabel,
  name,
  onChange,
  placeholder,
  size,
  units,
  value,
  errorNoWrap,
  lrgLabelSize,
  maxLength,
  customInput,
}: IProps) => {
  const locale = getUserLocale();
  const [groupSeparator, decimalSeparator] = getSeparators(locale);
  const hasError = Boolean(errorMessage);

  return (
    <StyledComponents.NumberInputContainer
      data-testid={`${dataTestId}-wrapper`}
    >
      {label && (
        <InputLabel
          dataTestId={`${dataTestId}-label`}
          htmlFor={id}
          isOptional={!isRequired}
          lrgSize={lrgLabelSize}
        >
          <>{label} </>
        </InputLabel>
      )}
      {subLabel && (
        <InputSubLabel dataTestId={`${dataTestId}-sublabel`}>
          <>{subLabel} </>
        </InputSubLabel>
      )}
      <StyledComponents.InputContainer
        data-testid={`${dataTestId}-units`}
        units={units}
        disabled={disabled}
        size={size}
      >
        <NumberFormat
          allowedDecimalSeparators={[decimalSeparator]}
          allowNegative={allowNegative}
          autoComplete="off"
          customInput={customInput}
          data-testid={dataTestId}
          decimalScale={decimals}
          decimalSeparator={decimalSeparator}
          disabled={disabled}
          fixedDecimalScale
          hasError={hasError}
          id={id}
          isAllowed={isAllowed}
          name={name}
          onValueChange={({ floatValue }) => onChange(floatValue ?? '')}
          placeholder={placeholder}
          thousandSeparator={groupSeparator}
          units={units}
          value={value}
          maxLength={maxLength}
        />
      </StyledComponents.InputContainer>
      {errorMessage && (
        <InputError noWrap={errorNoWrap} data-testid={`${dataTestId}-error`}>
          {errorMessage}
        </InputError>
      )}
    </StyledComponents.NumberInputContainer>
  );
};

NumberInput.defaultProps = {
  allowNegative: false,
  dataTestId: undefined,
  decimals: 2,
  disabled: false,
  errorMessage: '',
  isAllowed: undefined,
  isRequired: false,
  label: undefined,
  subLabel: undefined,
  placeholder: '--',
  size: 'regular',
  units: undefined,
  errorNoWrap: false,
  lrgLabelSize: false,
  maxLength: undefined,
  customInput: Input,
};
