import { useFieldArray, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

import { InputLabel } from 'components/InputLabel';
import { InputSubLabel } from 'components/InputSubLabel';
import { SingleSelect } from 'components/SingleSelect';
import { NumberInput } from 'components/NumberInput';
import { IconButton } from 'components/IconButton';
import { Button } from 'components/Button';
import { FormField } from 'components/Form/FormField';
import { CarbonIntensityMetricType } from 'types/globalTypes';
import { Validation } from 'utils/form';
import { useCarbonIntensityConfig } from 'effects/useCarbonIntensityConfig';

import * as StyledComponents from '../styledComponents';

import * as selectors from './selectors';
import {
  CarbonIntensityValues,
  FIELD_KEYS,
  CARBON_INTENSITY_FIELD_KEYS as ROW_FIELD_KEYS,
} from '../types';
import { IProps } from './types';
import { getErrorMessage, INITIAL_CARBON_INTENSITY_FIELD } from '../utils';
import { getCarbonIntensityMetricOptions } from './utils';
import { lessThanOrEqualToBillion, moreOrEqualTo } from '../rules';

export const CarbonIntensities = ({
  control,
  carbonIntensities,
  errors,
  isDisabled,
}: IProps) => {
  const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray<CarbonIntensityValues>({
    control,
    name: FIELD_KEYS.CARBON_INTENSITIES,
  });

  const carbonIntensityConfig = useCarbonIntensityConfig();

  const shouldDisplayAddMoreRows = fields.length < carbonIntensityConfig.length;

  return (
    <StyledComponents.InputContainer
      hasError={Boolean(errors[FIELD_KEYS.CARBON_INTENSITIES])}
    >
      <InputLabel
        dataTestId={selectors.carbonIntensityLabel}
        lrgSize
        isOptional
      >
        {t('corporateEmissionForm:carbon-intensity-label')}
      </InputLabel>
      <InputSubLabel dataTestId={selectors.carbonIntensitySublabel}>
        {t('corporateEmissionForm:carbon-intensity-sublabel')}
      </InputSubLabel>

      {fields.map((item, index) => {
        const isFirstRow = index === 0;
        const metricFieldName = `${FIELD_KEYS.CARBON_INTENSITIES}[${index}].${ROW_FIELD_KEYS.METRIC}`;
        const valueFieldName = `${FIELD_KEYS.CARBON_INTENSITIES}[${index}].${ROW_FIELD_KEYS.VALUE}`;

        const selectedMetricValue = carbonIntensities[index]?.[
          ROW_FIELD_KEYS.METRIC
        ]?.value as CarbonIntensityMetricType | undefined;
        const enteredValue = carbonIntensities[index]?.[ROW_FIELD_KEYS.VALUE];
        const selectedMetricConfig = carbonIntensityConfig.find(
          (e) => e.type === selectedMetricValue
        );

        const minValueAllowed = selectedMetricConfig?.minValue;
        const minValueRule = moreOrEqualTo(minValueAllowed);

        const carbonIntensityMetricOptions = getCarbonIntensityMetricOptions(
          carbonIntensityConfig,
          t,
          carbonIntensities
        );

        const metricFieldError =
          errors[FIELD_KEYS.CARBON_INTENSITIES]?.[index]?.[
            ROW_FIELD_KEYS.METRIC
          ];
        const valueFieldError =
          errors[FIELD_KEYS.CARBON_INTENSITIES]?.[index]?.[
            ROW_FIELD_KEYS.VALUE
          ];

        const metricError = getErrorMessage(
          t,
          metricFieldError,
          FIELD_KEYS.CARBON_INTENSITIES
        );

        return (
          <StyledComponents.CarbonIntensityRows
            key={item.id}
            data-testid={selectors.carbonIntensityRow}
          >
            <StyledComponents.FieldsRow>
              <InputLabel htmlFor={metricFieldName} isHidden>
                {t('carbonIntensity:metric-select-label')}
              </InputLabel>
              <FormField
                testIdPrefix={selectors.carbonIntensityMetricField}
                hasError={Boolean(metricError)}
                errorMessage={metricError}
              >
                <StyledComponents.CarbonIntensityMetricWrapper>
                  <Controller
                    control={control}
                    defaultValue={item[ROW_FIELD_KEYS.METRIC]}
                    name={metricFieldName}
                    rules={{
                      validate: {
                        [Validation.REQUIRED]: (metric) =>
                          !enteredValue || !!(enteredValue && metric?.value),
                      },
                    }}
                    render={({ value, onChange }) => (
                      <SingleSelect
                        inputId={metricFieldName}
                        isSearchable
                        maxMenuHeight={275}
                        name={metricFieldName}
                        onChange={onChange}
                        options={carbonIntensityMetricOptions}
                        placeholder="--"
                        value={value}
                        isClearable
                        hasError={Boolean(metricFieldError)}
                        isDisabled={isDisabled}
                      />
                    )}
                  />
                </StyledComponents.CarbonIntensityMetricWrapper>
              </FormField>

              <StyledComponents.CarbonIntensityValueWrapper>
                <Controller
                  control={control}
                  defaultValue={item[ROW_FIELD_KEYS.VALUE]}
                  name={valueFieldName}
                  rules={{
                    validate: {
                      [Validation.REQUIRED]: (value) =>
                        !selectedMetricValue ||
                        Boolean(
                          selectedMetricValue && typeof value === 'number'
                        ),
                      lessThanOrEqualToBillion,
                      [Validation.MINIMUM_VALUE_ERROR_NAME]: minValueRule,
                    },
                  }}
                  render={({ onChange, value, name }) => (
                    <NumberInput
                      dataTestId={selectors.carbonIntensityValueInput}
                      id={valueFieldName}
                      name={name}
                      onChange={onChange}
                      decimals={selectedMetricConfig?.numberOfDecimals ?? 0}
                      value={value}
                      errorMessage={getErrorMessage(
                        t,
                        valueFieldError,
                        FIELD_KEYS.CARBON_INTENSITIES,
                        { minValue: String(minValueAllowed) }
                      )}
                      disabled={isDisabled}
                    />
                  )}
                />
              </StyledComponents.CarbonIntensityValueWrapper>

              {!isFirstRow && (
                <IconButton
                  dataTestId={selectors.carbonIntensityRowDeleteBtn}
                  iconSrc="/trash.svg"
                  onClick={() => remove(index)}
                />
              )}
            </StyledComponents.FieldsRow>
          </StyledComponents.CarbonIntensityRows>
        );
      })}

      {shouldDisplayAddMoreRows && (
        <StyledComponents.CarbonIntensityAddButtonWrapper>
          <Button
            color="text-button"
            onClick={() => append(INITIAL_CARBON_INTENSITY_FIELD)}
            data-testid={selectors.carbonIntensityAddRowBtn}
          >
            {t('corporateEmissionForm:carbon-intensity-add-more')}
          </Button>
        </StyledComponents.CarbonIntensityAddButtonWrapper>
      )}
    </StyledComponents.InputContainer>
  );
};
