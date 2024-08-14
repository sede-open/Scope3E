import { RadioInputField } from 'components/Form/Fields/RadioInputField';
import { RadioInputGroup } from 'components/Form/RadioInputGroup';
import { InputError } from 'components/InputError';
import { InputLabel } from 'components/InputLabel';
import useTranslation from 'next-translate/useTranslation';
import {
  Control,
  Controller,
  FieldError,
  ValidationRules,
} from 'react-hook-form';
import { TargetPrivacyType } from 'types/globalTypes';
import * as StyledComponents from '../styledComponents';

interface ReductionPublicRadioProps {
  control: Control;
  fieldValue: string | null | undefined;
  name: string;
  error?: FieldError;
  label: string;
  disabled?: boolean;
  rules: ValidationRules;
}

export const ReductionPublicRadio: React.FC<ReductionPublicRadioProps> = ({
  control,
  fieldValue,
  name,
  error,
  label: inputLabel,
  disabled = false,
  rules,
}) => {
  const { t } = useTranslation();

  const options = [
    {
      value: TargetPrivacyType.PUBLIC,
      label: t('targetForm:shared-reduction-publicly-option-yes-external'),
    },
    {
      value: TargetPrivacyType.SCIENCE_BASED_INITIATIVE,
      label: t('targetForm:shared-reduction-publicly-option-yes-target'),
    },
    {
      value: TargetPrivacyType.PRIVATE,
      label: t('targetForm:shared-reduction-publicly-option-no'),
    },
  ];

  return (
    <StyledComponents.InputContainer>
      {inputLabel && (
        <StyledComponents.LabelContainer>
          <InputLabel>{inputLabel}</InputLabel>
        </StyledComponents.LabelContainer>
      )}
      <RadioInputGroup isVertical>
        {options.map(({ value: optionValue, label }, index) => {
          return (
            <div key={name + optionValue} style={{ marginBottom: '1rem' }}>
              <Controller
                rules={rules}
                control={control}
                render={({ onChange, name: optionName }) => (
                  <RadioInputField
                    isDisabled={disabled}
                    tabIndex={index + 1}
                    dataTestId={optionName + optionValue}
                    label={label}
                    name={optionName}
                    value={optionValue}
                    isVertical={false}
                    hasError={!!error}
                    id={optionName + optionValue}
                    onChange={({ target: { value } }) => {
                      onChange(value);
                    }}
                    isChecked={fieldValue === optionValue}
                  />
                )}
                name={name}
              />
            </div>
          );
        })}
      </RadioInputGroup>
      {error && (
        <StyledComponents.ErrorWrapper>
          <InputError data-testid="error-public-radio">
            {t('form:public-reduction-required')}
          </InputError>
        </StyledComponents.ErrorWrapper>
      )}
    </StyledComponents.InputContainer>
  );
};
