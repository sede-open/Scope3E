import { CheckboxField } from 'components/Form/Fields/CheckboxField';
import { RadioInputField } from 'components/Form/Fields/RadioInputField';
import { GroupInput } from 'components/GroupInput/styledComponents';
import { Input } from 'components/Input';
import { InputError } from 'components/InputError';

import useTranslation from 'next-translate/useTranslation';
import {
  Control,
  Controller,
  FieldError,
  useFormContext,
} from 'react-hook-form';
import * as selectors from '../selectors';
import { FIELD_KEYS, FormValues } from '../types';
import {
  CheckboxContainer,
  PublicRadioInputGroup,
  SubLabel,
} from './styledComponents';

export enum EmissionPrivacyType {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export interface DataPubliclyAvailableProps {
  control: Control;
  privacyError?: FieldError;
  publicLinkError?: FieldError;
  disabled?: boolean;
}

export const DataPubliclyAvailable = ({
  privacyError,
  publicLinkError,
  control,
  disabled = false,
}: DataPubliclyAvailableProps) => {
  const {
    clearErrors,
    errors,
    watch,
    formState: { isSubmitted },
  } = useFormContext<FormValues>();
  const { t } = useTranslation();

  const {
    typeOfDataPubliclyAvailableIntensity,
    typeOfDataPubliclyAvailableScope1And2,
    typeOfDataPubliclyAvailableOffset,
    typeOfDataPubliclyAvailableScope3,
    privacyType,
  } = watch([
    FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY,
    FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET,
    FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2,
    FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3,
    FIELD_KEYS.PRIVACY_TYPE,
  ]);

  const privacyTypeOptions = [
    {
      isChecked: privacyType === EmissionPrivacyType.Public,
      value: EmissionPrivacyType.Public,
      label: t('corporateEmissionForm:privacy-type-option-yes'),
    },
    {
      isChecked: privacyType === EmissionPrivacyType.Private,
      value: EmissionPrivacyType.Private,
      label: t('corporateEmissionForm:privacy-type-option-no'),
    },
  ];

  const publicDataTypeOptions = [
    {
      label: t(
        'corporateEmissionForm:type-of-data-publicly-available-option-scope1-2'
      ),
      name: FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2,
      dataTestId:
        selectors.typeOfDataPubliclyAvailable +
        FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2,
    },
    {
      label: t(
        'corporateEmissionForm:type-of-data-publicly-available-option-scope3'
      ),
      name: FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3,
      dataTestId:
        selectors.typeOfDataPubliclyAvailable +
        FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3,
    },
    {
      label: t(
        'corporateEmissionForm:type-of-data-publicly-available-option-offset'
      ),
      name: FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET,
      dataTestId:
        selectors.typeOfDataPubliclyAvailable +
        FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET,
    },
    {
      label: t(
        'corporateEmissionForm:type-of-data-publicly-available-option-intensity'
      ),
      name: FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY,
      dataTestId:
        selectors.typeOfDataPubliclyAvailable +
        FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY,
    },
  ];

  let required: string | undefined;
  if (
    typeOfDataPubliclyAvailableIntensity === false &&
    typeOfDataPubliclyAvailableScope1And2 === false &&
    typeOfDataPubliclyAvailableOffset === false &&
    typeOfDataPubliclyAvailableScope3 === false &&
    isSubmitted
  ) {
    required = 'Select at least one option';
  } else {
    if (errors[FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY]) {
      clearErrors(FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY);
    }
    if (errors[FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET]) {
      clearErrors(FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET);
    }
    if (errors[FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2]) {
      clearErrors(FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2);
    }
    if (errors[FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3]) {
      clearErrors(FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3);
    }
  }

  const hasPublicAvailableError = control.formState.isSubmitted && required;

  return (
    <>
      <PublicRadioInputGroup isVertical>
        {privacyTypeOptions.map((option) => (
          <div key={option.value}>
            <Controller
              control={control}
              name={FIELD_KEYS.PRIVACY_TYPE}
              rules={{
                required: t('corporateEmissionForm:privacy-type-error'),
              }}
              render={({ onChange }) => (
                <RadioInputField
                  tabIndex={0}
                  dataTestId={`${
                    selectors.privacyTypeInputContainer
                  }-${option.value.toLowerCase()}`}
                  id={option.value}
                  isChecked={option.isChecked}
                  label={option.label}
                  name={FIELD_KEYS.PRIVACY_TYPE}
                  onChange={() => onChange(option.value)}
                  value={option.value}
                  isDisabled={disabled}
                />
              )}
            />
          </div>
        ))}
      </PublicRadioInputGroup>
      {privacyError && (
        <InputError marginTop="10px">{privacyError.message}</InputError>
      )}
      {privacyType === EmissionPrivacyType.Public && (
        <>
          <SubLabel>
            {t('corporateEmissionForm:type-of-data-publicly-available-label')}
          </SubLabel>
          <CheckboxContainer hasError={Boolean(hasPublicAvailableError)}>
            {publicDataTypeOptions.map((option) => (
              <Controller
                key={option.label}
                control={control}
                rules={{
                  required,
                }}
                name={option.name}
                render={({ value, onChange }) => {
                  return (
                    <CheckboxField
                      dataTestId={option.dataTestId}
                      id={option.name}
                      label={option.label}
                      isChecked={value}
                      onChange={onChange}
                      isDisabled={disabled}
                    />
                  );
                }}
              />
            ))}
          </CheckboxContainer>
          {hasPublicAvailableError && (
            <InputError marginTop="10px">{required}</InputError>
          )}
          <SubLabel marginBottom="10px">
            {t('corporateEmissionForm:public-link-label')}
          </SubLabel>
          <Controller
            control={control}
            name={FIELD_KEYS.PUBLIC_LINK}
            rules={{
              required: t('corporateEmissionForm:public-link-error'),
            }}
            render={({ onChange, value }) => (
              <GroupInput prefix="http://" disabled={false} size="large">
                <Input
                  onChange={(event) => {
                    onChange(event.target.value);
                  }}
                  hasPrefix
                  value={value}
                  disabled={disabled}
                />
              </GroupInput>
            )}
          />
          {publicLinkError && (
            <InputError marginTop="10px">{publicLinkError.message}</InputError>
          )}
        </>
      )}
    </>
  );
};
