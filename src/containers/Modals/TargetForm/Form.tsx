import { useEffect, CSSProperties } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ArrayField, Controller, UseFormMethods } from 'react-hook-form';
import _ from 'lodash';
import { NumberInput } from 'components/NumberInput';
import { InputLabel } from 'components/InputLabel';
import { InputError } from 'components/InputError';
import { SingleSelect } from 'components/SingleSelect';
import { RadioInputField } from 'components/Form/Fields/RadioInputField';
import { TargetStrategyType } from 'types/globalTypes';
import { AlertIconBlue } from 'components/Glyphs/AlertIconBlue';
import { TargetFormDataQuery_corporateEmissions as CorporateEmissions } from 'types/TargetFormDataQuery';
import { RadioInputGroup } from 'components/Form/RadioInputGroup';
import { lessThanOrEqualToHundred, Validation } from 'utils/form';
import { INPUT_DEFAULT_PLACEHOLDER } from '../../../constants';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import {
  FIELD_KEYS,
  FormValues,
  IncludeCarbonOffsetStatus,
  IntensityFormValues,
  AbsoluteFormValues,
  FormTargetType,
} from './types';
import { getErrorMessage, getTargetYearOptions } from './utils';
import { ReductionPublicRadio } from './ReductionPublicRadio';

interface IProps {
  baseline: CorporateEmissions | undefined;
  form: UseFormMethods<FormValues>;
  formKey: keyof FormValues;
  field: Partial<ArrayField<AbsoluteFormValues | IntensityFormValues, 'id'>>;
  fieldIndex: number;
}

export const Form = ({
  baseline,
  form: { control, errors, trigger },
  field,
  fieldIndex,
  formKey,
}: IProps) => {
  const { t } = useTranslation();
  const baselineOption = { value: baseline?.year, label: baseline?.year };

  const getFieldPath = (
    key: keyof AbsoluteFormValues | keyof IntensityFormValues | string
  ) => `${formKey}[${fieldIndex}].${key}`;

  const getFieldError = (
    key: keyof AbsoluteFormValues | keyof IntensityFormValues
  ) => _.get(errors, getFieldPath(key));

  const hasSetScope3Reduction =
    String(field?.scope3Reduction) !== '' && field?.scope3Reduction !== null;

  const hasSetScope3Year = Boolean(field?.scope3Year?.value);

  const yearOptions = getTargetYearOptions();

  const hasHistoricalScope3Emissions = baseline?.scope3 !== null;

  const getStrategyChecked = (strategy: TargetStrategyType) =>
    field?.strategy === strategy;

  // re-validate scope 3 reduction and year
  // when values are cleared to update their errors
  useEffect(() => {
    if (!hasSetScope3Year && !hasSetScope3Reduction) {
      trigger(getFieldPath(FIELD_KEYS.SCOPE_3_REDUCTION));
      trigger(getFieldPath(FIELD_KEYS.SCOPE_3_YEAR));
    }
  }, [hasSetScope3Year, hasSetScope3Reduction]);

  const isIncludeCarbonOffsetStatusChecked =
    field?.includeCarbonOffset === IncludeCarbonOffsetStatus.INCLUDED;
  const isExcludeCarbonOffsetStatusChecked =
    field?.includeCarbonOffset === IncludeCarbonOffsetStatus.EXCLUDED;

  const selectStyles = {
    control: (base: CSSProperties) => ({
      ...base,
      height: '48px',
    }),
  };

  const carbonIntensityOptions =
    baseline?.carbonIntensities.map(({ intensityMetric, intensityValue }) => ({
      label: t(`carbonIntensity:${intensityMetric}`),
      value: intensityMetric,
      intensityValue,
    })) || [];

  return (
    <StyledComponents.FormContainer>
      {formKey === FormTargetType.INTENSITY && (
        <StyledComponents.IntensityMeasureContainer>
          <StyledComponents.LabelContainer>
            <InputLabel
              dataTestId={selectors.intensityMetricLabel}
              htmlFor={getFieldPath(FIELD_KEYS.INTENSITY_METRIC)}
            >
              {t('targetForm:intensity-measure-label')}
            </InputLabel>
          </StyledComponents.LabelContainer>
          <Controller
            control={control}
            name={getFieldPath(FIELD_KEYS.INTENSITY_METRIC)}
            rules={{ required: true }}
            render={({ value, onChange, name }) => (
              <SingleSelect
                value={value}
                inputId={getFieldPath(FIELD_KEYS.INTENSITY_METRIC)}
                onChange={onChange}
                isClearable={false}
                name={name}
                options={carbonIntensityOptions}
                styles={selectStyles}
              />
            )}
          />
          {getFieldError(FIELD_KEYS.STRATEGY) && (
            <InputError data-testid={selectors.intensityMetricError}>
              {getErrorMessage(t, getFieldError(FIELD_KEYS.INTENSITY_METRIC))}
            </InputError>
          )}
        </StyledComponents.IntensityMeasureContainer>
      )}
      <StyledComponents.InputContainer>
        <StyledComponents.LabelContainer>
          <InputLabel dataTestId={selectors.strategyLabel}>
            {t('targetForm:strategy-label')}
          </InputLabel>
        </StyledComponents.LabelContainer>
        <RadioInputGroup>
          {[
            {
              strategy: TargetStrategyType.PASSIVE,
              selector: selectors.passiveStrategy,
            },
            {
              strategy: TargetStrategyType.MODERATE,
              selector: selectors.moderateStrategy,
            },
            {
              strategy: TargetStrategyType.AGGRESSIVE,
              selector: selectors.aggressiveStrategy,
            },
          ].map(({ strategy, selector }) => (
            <Controller
              key={getFieldPath(strategy)}
              control={control}
              name={getFieldPath(FIELD_KEYS.STRATEGY)}
              rules={{ required: true }}
              render={({ onChange, name }) => (
                <RadioInputField
                  tabIndex={0}
                  id={getFieldPath(strategy)}
                  dataTestId={selector}
                  isChecked={getStrategyChecked(strategy)}
                  hasError={getFieldError(FIELD_KEYS.STRATEGY) !== undefined}
                  label={t(
                    `targetForm:strategy-type-${strategy.toLowerCase()}`
                  )}
                  subLabel={t(
                    `targetForm:${strategy.toLowerCase()}-strategy-description`
                  )}
                  name={name}
                  onChange={({ target: { value } }) => onChange(value)}
                  value={strategy}
                />
              )}
            />
          ))}
        </RadioInputGroup>
        {getFieldError(FIELD_KEYS.STRATEGY) && (
          <InputError data-testid={selectors.strategyError}>
            {getErrorMessage(t, getFieldError(FIELD_KEYS.STRATEGY))}
          </InputError>
        )}
      </StyledComponents.InputContainer>
      <StyledComponents.InputContainer>
        <StyledComponents.LabelContainer>
          <InputLabel>
            {t('targetForm:scope-one-and-two-reduction-label')}
          </InputLabel>
        </StyledComponents.LabelContainer>
        <StyledComponents.InputGroup>
          <StyledComponents.DateRangeSelect>
            <StyledComponents.DateRangeLabel
              htmlFor={getFieldPath(FIELD_KEYS.BASELINE_SCOPE_1_AND_2)}
            >
              {t('targetForm:baseline-scope-one-and-two')}
            </StyledComponents.DateRangeLabel>
            <Controller
              control={control}
              name={getFieldPath(FIELD_KEYS.BASELINE_SCOPE_1_AND_2)}
              render={({ value, onChange, name }) => (
                <SingleSelect
                  value={value}
                  inputId={FIELD_KEYS.BASELINE_SCOPE_1_AND_2}
                  onChange={onChange}
                  isDisabled
                  isClearable={false}
                  name={name}
                  selectedPrefix={t('form:year-select-from-prefix')}
                  options={[baselineOption]}
                  styles={selectStyles}
                />
              )}
            />
          </StyledComponents.DateRangeSelect>

          <StyledComponents.DateRangeSelect>
            <StyledComponents.DateRangeLabel
              htmlFor={getFieldPath(FIELD_KEYS.SCOPE_1_AND_2_YEAR)}
            >
              {t('targetForm:scope-one-and-two-year-label')}
            </StyledComponents.DateRangeLabel>
            <Controller
              control={control}
              name={getFieldPath(FIELD_KEYS.SCOPE_1_AND_2_YEAR)}
              rules={{ required: true }}
              render={({ value, onChange, name }) => (
                <SingleSelect
                  inputId={getFieldPath(FIELD_KEYS.SCOPE_1_AND_2_YEAR)}
                  value={value}
                  onChange={onChange}
                  isClearable={false}
                  name={name}
                  placeholder={`${t(
                    'form:year-select-to-prefix'
                  )} ${INPUT_DEFAULT_PLACEHOLDER}`}
                  selectedPrefix={t('form:year-select-to-prefix')}
                  options={yearOptions}
                  hasError={
                    getFieldError(FIELD_KEYS.SCOPE_1_AND_2_YEAR) !== undefined
                  }
                  styles={selectStyles}
                />
              )}
            />
            {getFieldError(FIELD_KEYS.SCOPE_1_AND_2_YEAR) && (
              <StyledComponents.ErrorWrapper>
                <InputError data-testid={selectors.scopeOneAndTwoYearError}>
                  {getErrorMessage(
                    t,
                    getFieldError(FIELD_KEYS.SCOPE_1_AND_2_YEAR)
                  )}
                </InputError>
              </StyledComponents.ErrorWrapper>
            )}
          </StyledComponents.DateRangeSelect>
          <StyledComponents.Percentage>
            <Controller
              control={control}
              name={getFieldPath(FIELD_KEYS.SCOPE_1_AND_2_REDUCTION)}
              rules={{
                required: true,
                validate: {
                  [Validation.MAX_PERCENTAGE]: lessThanOrEqualToHundred,
                },
              }}
              render={({ onChange, value, name }) => (
                <NumberInput
                  dataTestId={selectors.scopeOneAndTwoReductionInput}
                  id={FIELD_KEYS.SCOPE_1_AND_2_REDUCTION}
                  name={name}
                  onChange={onChange}
                  decimals={0}
                  units="%"
                  errorMessage={getErrorMessage(
                    t,
                    getFieldError(FIELD_KEYS.SCOPE_1_AND_2_REDUCTION)
                  )}
                  value={value}
                  isRequired
                  size="regular"
                  customInput={StyledComponents.CustomInput}
                />
              )}
            />
          </StyledComponents.Percentage>
        </StyledComponents.InputGroup>
      </StyledComponents.InputContainer>

      <ReductionPublicRadio
        control={control}
        rules={{ required: true }}
        label={t('targetForm:scope-one-and-two-shared-reduction-publicly')}
        fieldValue={field.scope1And2PrivacyType}
        name={getFieldPath(FIELD_KEYS.SCOPE_1_AND_2_PRIVACY_TYPE)}
        error={getFieldError(FIELD_KEYS.SCOPE_1_AND_2_PRIVACY_TYPE)}
      />

      {hasHistoricalScope3Emissions && (
        <StyledComponents.InputContainer $marginBottom="30px">
          <StyledComponents.LabelContainer>
            <InputLabel isOptional>
              {t('targetForm:scope-three-reduction-label')}
            </InputLabel>
          </StyledComponents.LabelContainer>
          <StyledComponents.InputGroup>
            <StyledComponents.DateRangeSelect>
              <StyledComponents.DateRangeLabel
                htmlFor={getFieldPath(FIELD_KEYS.BASELINE_SCOPE_3)}
              >
                {t('targetForm:baseline-scope-three')}
              </StyledComponents.DateRangeLabel>
              <Controller
                control={control}
                name={getFieldPath(FIELD_KEYS.BASELINE_SCOPE_3)}
                render={({ value, onChange, name }) => (
                  <SingleSelect
                    value={value}
                    inputId={FIELD_KEYS.BASELINE_SCOPE_3}
                    onChange={onChange}
                    isDisabled
                    isClearable={false}
                    name={name}
                    selectedPrefix={t('form:year-select-from-prefix')}
                    options={[baselineOption]}
                    styles={selectStyles}
                  />
                )}
              />
            </StyledComponents.DateRangeSelect>

            <StyledComponents.DateRangeSelect>
              <StyledComponents.DateRangeLabel
                htmlFor={getFieldPath(FIELD_KEYS.SCOPE_3_YEAR)}
              >
                {t('targetForm:scope-three-year-label')}
              </StyledComponents.DateRangeLabel>
              <Controller
                control={control}
                name={getFieldPath(FIELD_KEYS.SCOPE_3_YEAR)}
                rules={{
                  validate: {
                    scope3HasBeenSet: (value) =>
                      !hasSetScope3Reduction ||
                      (hasSetScope3Reduction && value !== '' && value != null),
                  },
                }}
                render={({ value, onChange }) => (
                  <SingleSelect
                    inputId={getFieldPath(FIELD_KEYS.SCOPE_3_YEAR)}
                    value={value}
                    onChange={onChange}
                    isClearable
                    name={FIELD_KEYS.SCOPE_3_YEAR}
                    placeholder={`${t(
                      'form:year-select-to-prefix'
                    )} ${INPUT_DEFAULT_PLACEHOLDER}`}
                    selectedPrefix={t('form:year-select-to-prefix')}
                    options={yearOptions}
                    hasError={
                      getFieldError(FIELD_KEYS.SCOPE_3_YEAR) !== undefined
                    }
                    styles={selectStyles}
                  />
                )}
              />
              {getFieldError(FIELD_KEYS.SCOPE_3_YEAR) && (
                <StyledComponents.ErrorWrapper>
                  <InputError data-testid={selectors.scopeThreeYearError}>
                    {getErrorMessage(t, getFieldError(FIELD_KEYS.SCOPE_3_YEAR))}
                  </InputError>
                </StyledComponents.ErrorWrapper>
              )}
            </StyledComponents.DateRangeSelect>

            <Controller
              control={control}
              name={getFieldPath(FIELD_KEYS.SCOPE_3_REDUCTION)}
              rules={{
                validate: {
                  [Validation.MAX_PERCENTAGE]: lessThanOrEqualToHundred,
                  scope3HasBeenSet: (value) =>
                    !hasSetScope3Year ||
                    (hasSetScope3Year && value !== '' && value != null),
                },
              }}
              render={({ onChange, value, name }) => (
                <NumberInput
                  dataTestId={selectors.scopeThreeReductionInput}
                  id={FIELD_KEYS.SCOPE_3_REDUCTION}
                  name={name}
                  onChange={onChange}
                  decimals={0}
                  units="%"
                  errorMessage={getErrorMessage(
                    t,
                    getFieldError(FIELD_KEYS.SCOPE_3_REDUCTION)
                  )}
                  value={value}
                  size="regular"
                  errorNoWrap
                  customInput={StyledComponents.CustomInput}
                />
              )}
            />
          </StyledComponents.InputGroup>
        </StyledComponents.InputContainer>
      )}

      {hasHistoricalScope3Emissions && (
        <ReductionPublicRadio
          control={control}
          rules={{ required: hasSetScope3Reduction && hasSetScope3Year }}
          disabled={!hasSetScope3Reduction || !hasSetScope3Year}
          label={t('targetForm:scope-three-shared-reduction-publicly')}
          fieldValue={field.scope3PrivacyType}
          name={getFieldPath(FIELD_KEYS.SCOPE_3_PRIVACY_TYPE)}
          error={getFieldError(FIELD_KEYS.SCOPE_3_PRIVACY_TYPE)}
        />
      )}

      <StyledComponents.LabelContainer>
        <InputLabel dataTestId={selectors.carbonOffsetRadioLabel}>
          {t('targetForm:carbon-offset-radio-label')}
        </InputLabel>
      </StyledComponents.LabelContainer>
      <StyledComponents.CustomRadioInputGroup>
        <Controller
          control={control}
          name={getFieldPath(FIELD_KEYS.INCLUDE_CARBON_OFFSET)}
          rules={{ required: true }}
          render={({ onChange, name }) => (
            <RadioInputField
              tabIndex={0}
              dataTestId={selectors.carbonOffsetIncludedBtn}
              hasError={
                getFieldError(FIELD_KEYS.INCLUDE_CARBON_OFFSET) !== undefined
              }
              id={getFieldPath('carbon-offsets-data-inclusion')}
              isChecked={isIncludeCarbonOffsetStatusChecked}
              label={t('targetForm:carbon-offsets-data-inclusion')}
              name={name}
              onChange={({ target: { value } }) => onChange(value)}
              value={IncludeCarbonOffsetStatus.INCLUDED}
            />
          )}
        />

        <Controller
          control={control}
          name={getFieldPath(FIELD_KEYS.INCLUDE_CARBON_OFFSET)}
          rules={{ required: true }}
          render={({ onChange, name }) => (
            <RadioInputField
              tabIndex={-1}
              dataTestId={selectors.carbonOffsetExcludedBtn}
              hasError={
                getFieldError(FIELD_KEYS.INCLUDE_CARBON_OFFSET) !== undefined
              }
              id={getFieldPath('carbon-offsets-data-exclusion')}
              isChecked={isExcludeCarbonOffsetStatusChecked}
              label={t('targetForm:carbon-offsets-data-exclusion')}
              name={name}
              onChange={({ target: { value } }) => onChange(value)}
              value={IncludeCarbonOffsetStatus.EXCLUDED}
            />
          )}
        />
      </StyledComponents.CustomRadioInputGroup>
      {getFieldError(FIELD_KEYS.INCLUDE_CARBON_OFFSET) && (
        <InputError data-testid={selectors.includeCarbonOffsetError}>
          {getErrorMessage(t, getFieldError(FIELD_KEYS.INCLUDE_CARBON_OFFSET))}
        </InputError>
      )}

      {!hasHistoricalScope3Emissions && (
        <StyledComponents.Alert $marginTop="42px">
          <StyledComponents.IconContainer>
            <AlertIconBlue title="Information icon" />
          </StyledComponents.IconContainer>
          <StyledComponents.TextContainer>
            <StyledComponents.AlertTitle data-testid={selectors.alertTitle}>
              {t('targetForm:alert-title')}
            </StyledComponents.AlertTitle>
            <StyledComponents.AlertContent $maxWidth="492px">
              {t('targetForm:alert-content')}
            </StyledComponents.AlertContent>
          </StyledComponents.TextContainer>
        </StyledComponents.Alert>
      )}
    </StyledComponents.FormContainer>
  );
};
