import { FormField } from 'components/Form/FormField';
import { InputLabel } from 'components/InputLabel';
import { Textarea } from 'components/Form/Inputs/Textarea';
import CharacterCounter from 'components/CharacterCounter';

import * as StyledComponents from './styledComponents';

interface IProps {
  dataTestId?: string;
  errorMessage?: string;
  hasCharacterCount?: boolean;
  id: string;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isOptional?: boolean;
  label: string;
  maxLength: number;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  value: string;
}

export const TextareaField = ({
  dataTestId,
  errorMessage,
  hasCharacterCount,
  id,
  isDisabled,
  isLabelHidden,
  isOptional,
  label,
  maxLength,
  name,
  onChange,
  placeholder,
  rows,
  value,
}: IProps) => {
  const isInvalid = !!errorMessage;
  const characterCount = value.length ?? 0;

  return (
    <FormField
      errorMessage={errorMessage}
      hasError={isInvalid}
      testIdPrefix={dataTestId || id}
    >
      <>
        <StyledComponents.LabelContainer>
          <InputLabel
            dataTestId={`${dataTestId}-label`}
            htmlFor={id}
            isDisabled={isDisabled}
            isHidden={isLabelHidden}
            isOptional={isOptional}
          >
            {label}
          </InputLabel>
          {hasCharacterCount && (
            <StyledComponents.CharacterCountContainer>
              <CharacterCounter max={maxLength} value={characterCount} />
            </StyledComponents.CharacterCountContainer>
          )}
        </StyledComponents.LabelContainer>
        <Textarea
          dataTestId={`${dataTestId}-input`}
          onChange={onChange}
          id={id}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          maxLength={maxLength}
          name={name}
          placeholder={placeholder}
          rows={rows}
          value={value}
        />
      </>
    </FormField>
  );
};

TextareaField.defaultProps = {
  dataTestId: undefined,
  errorMessage: undefined,
  hasCharacterCount: false,
  isDisabled: false,
  isLabelHidden: false,
  isOptional: false,
  placeholder: undefined,
  rows: undefined,
};
