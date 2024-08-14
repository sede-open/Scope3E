import { useCallback, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useForm, Controller } from 'react-hook-form';

import { CorporateEmissionType } from 'types/globalTypes';
import { WizardStepWithInfoLayout } from 'components/Wizard/WizardStepWithInfoLayout';
import { WizardControls } from 'components/Wizard/WizardControls';
import {
  SingleSelect,
  SingleSelectClassNamePrefix,
} from 'components/SingleSelect';
import { NumberInput } from 'components/NumberInput';
import Button from 'components/Button';
import { IconButton } from 'components/IconButton';
import { InputLabel } from 'components/InputLabel';
import { OptionWithMeta } from 'components/SingleSelect/OptionWithMeta';
import {
  Validation,
  getFormErrorMessage,
  moreThanOrEqualTo1,
  lessThanOrEqualToOneBillion,
  lessThanOrEqualToHundred,
} from 'utils/form';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { trackEvent } from 'utils/analytics';
import {
  INEXPERIENCED_FLOW_BACK,
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';
import { companySectorsPrimarySectorName } from 'utils/companySectors';

import * as StyledComponents from '../../styledComponents';
import * as selectors from '../../selectors';
import {
  WizardState,
  SCOPE2_SOURCES_FORM_FIELD_KEYS as FIELD_KEYS,
  SCOPE2_SOURCE_FIELD_KEYS as ROW_FIELD_KEYS,
  Scope2SourceValues,
  HeatCoolingGridTypes,
  InexperiencedFlowSteps,
} from '../../types';
import { getGridTypeOptions, getTotalEmissions } from './utils';
import { StepEmissionsTotal } from '../../StepEmissionsTotal';
import { DEFRA_GRID_FACTOR } from '../../constants';

export type FormValues = {
  [FIELD_KEYS.EMISSION_SOURCES]: Scope2SourceValues[];
};

export interface IProps {
  closeModal: (update?: Partial<WizardState>) => void;
  emissionType: CorporateEmissionType | null;
  onBack: (update?: Partial<WizardState>) => void;
  onNext: (update?: Partial<WizardState>) => void;
  wizardState: WizardState;
}

const INITIAL_FIELD = {
  [ROW_FIELD_KEYS.GRID_FACTOR_TYPE]: null,
  [ROW_FIELD_KEYS.AMOUNT]: '',
  [ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]: '',
};

const getDefaultValues = (initialSourcesState: Scope2SourceValues[]) => ({
  [FIELD_KEYS.EMISSION_SOURCES]:
    initialSourcesState.length > 0 ? initialSourcesState : [INITIAL_FIELD],
});

export const HeatCoolingForm = ({
  closeModal,
  emissionType,
  onBack,
  onNext,
  wizardState,
}: IProps) => {
  const { company } = useAuthenticatedUser();
  const { t } = useTranslation();

  const [totalEmissions, setTotalEmissions] = useState(0);

  const initialSourcesState = wizardState.heatCoolingSources;

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    watch,
    control,
    errors,
    reset,
    trigger,
  } = useForm<FormValues>({
    mode: 'onChange',
    shouldUnregister: true,
    defaultValues: getDefaultValues(initialSourcesState),
  });

  useEffect(() => {
    // NOTE :: need to trigger validation manually if a user is coming to this step
    // previously having clicked the back button
    if (initialSourcesState.length > 0) {
      trigger();
    }
  }, [initialSourcesState]);

  // NOTE :: this is needed so a re-render is triggered
  // with the correct initial validation for when sources have been previously selected
  useEffect(() => {
    reset(getDefaultValues(initialSourcesState));
  }, [initialSourcesState]);

  const { fields, append, remove } = useFieldArray<Scope2SourceValues>({
    control,
    name: FIELD_KEYS.EMISSION_SOURCES,
  });

  const formValues = watch();

  const onSubmit = useCallback(
    (data: FormValues) => {
      trackEvent(INEXPERIENCED_FLOW_NEXT, {
        companyName: company?.name,
        primarySector: companySectorsPrimarySectorName(company?.companySectors),
        emissionType,
        currentStep: InexperiencedFlowSteps.HEAT_COOLING_FORM,
      });
      onNext({
        heatCoolingTotal: totalEmissions,
        heatCoolingSources: data[FIELD_KEYS.EMISSION_SOURCES],
      });
    },
    [totalEmissions]
  );

  const onBackClick = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_BACK, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.HEAT_COOLING_FORM,
    });
    onBack({
      heatCoolingTotal: totalEmissions,
      heatCoolingSources: formValues[FIELD_KEYS.EMISSION_SOURCES],
    });
  }, [formValues, totalEmissions]);

  const onCancel = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_CANCEL, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.HEAT_COOLING_FORM,
    });
    closeModal({
      heatCoolingTotal: totalEmissions,
      heatCoolingSources: formValues[FIELD_KEYS.EMISSION_SOURCES],
    });
  }, [formValues, totalEmissions]);

  useEffect(() => {
    const newTotal = getTotalEmissions(formValues);
    setTotalEmissions(newTotal);
  }, [formValues]);

  return (
    <WizardStepWithInfoLayout
      dataTestId={selectors.heatCoolingForm}
      title={t('inexperiencedFlow:heat-cooling-title')}
      subtitle={t('inexperiencedFlow:heat-cooling-subtitle')}
      leftContent={
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledComponents.FieldRowsContainer>
            {fields.map((item, index) => {
              const gridFactorTypeOptions = getGridTypeOptions(t);

              const amountFieldName = `${FIELD_KEYS.EMISSION_SOURCES}[${index}].${ROW_FIELD_KEYS.AMOUNT}`;
              const customGridFactorFieldName = `${FIELD_KEYS.EMISSION_SOURCES}[${index}].${ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR}`;
              const gridFactorTypeFieldName = `${FIELD_KEYS.EMISSION_SOURCES}[${index}].${ROW_FIELD_KEYS.GRID_FACTOR_TYPE}`;

              const isFirstRow = index === 0;

              const isDefraSelected =
                formValues[FIELD_KEYS.EMISSION_SOURCES][index]?.[
                  ROW_FIELD_KEYS.GRID_FACTOR_TYPE
                ]?.value === HeatCoolingGridTypes.DEFRA;

              const isGridFactorInputDisabled =
                isDefraSelected ||
                !formValues[FIELD_KEYS.EMISSION_SOURCES][index]?.[
                  ROW_FIELD_KEYS.GRID_FACTOR_TYPE
                ]?.value;

              return (
                <StyledComponents.FieldsRow
                  key={item.id}
                  data-testid={selectors.heatCoolingFieldRow}
                >
                  <StyledComponents.FieldsRowFuelContainer>
                    {isFirstRow && (
                      <InputLabel>
                        {t('inexperiencedFlow:grid-factor')}
                      </InputLabel>
                    )}

                    <StyledComponents.GridSelectionContainer>
                      <InputLabel htmlFor={gridFactorTypeFieldName} isHidden>
                        {gridFactorTypeFieldName}
                      </InputLabel>
                      <Controller
                        control={control}
                        defaultValue={item[ROW_FIELD_KEYS.GRID_FACTOR_TYPE]}
                        name={gridFactorTypeFieldName}
                        rules={{ required: true }}
                        render={({ value, onChange }) => (
                          <SingleSelect
                            classNamePrefix={
                              SingleSelectClassNamePrefix.SINGLE_WIDE
                            }
                            dataTestId={selectors.sourceGridType}
                            inputId={gridFactorTypeFieldName}
                            isSearchable
                            maxMenuHeight={175}
                            name={gridFactorTypeFieldName}
                            onChange={onChange}
                            options={gridFactorTypeOptions}
                            placeholder="--"
                            value={value}
                            components={{
                              Option: OptionWithMeta,
                            }}
                          />
                        )}
                      />

                      <StyledComponents.GridInfoContainer>
                        <Controller
                          control={control}
                          defaultValue={item[ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR]}
                          name={customGridFactorFieldName}
                          rules={{
                            required: true,
                            validate: {
                              [Validation.LESS_THAN_OR_EQUAL_TO_HUNDRED]: lessThanOrEqualToHundred,
                            },
                          }}
                          render={({ onChange, value, name }) => (
                            <NumberInput
                              dataTestId={selectors.sourceCustomGridFactor}
                              id={customGridFactorFieldName}
                              name={name}
                              onChange={onChange}
                              decimals={5}
                              units={t('common:kgCO2e')}
                              disabled={isGridFactorInputDisabled}
                              errorMessage={getFormErrorMessage(
                                t,
                                errors[FIELD_KEYS.EMISSION_SOURCES]?.[index]?.[
                                  ROW_FIELD_KEYS.CUSTOM_GRID_FACTOR
                                ]
                              )}
                              value={
                                isDefraSelected ? DEFRA_GRID_FACTOR : value
                              }
                            />
                          )}
                        />
                      </StyledComponents.GridInfoContainer>
                    </StyledComponents.GridSelectionContainer>
                  </StyledComponents.FieldsRowFuelContainer>

                  <StyledComponents.FieldsRowAmountContainer>
                    {isFirstRow && (
                      <InputLabel>{t('inexperiencedFlow:amount')}</InputLabel>
                    )}
                    <Controller
                      control={control}
                      defaultValue={item[ROW_FIELD_KEYS.AMOUNT]}
                      name={amountFieldName}
                      rules={{
                        required: true,
                        validate: {
                          [Validation.MORE_THAN_OR_EQUAL_TO_ONE]: moreThanOrEqualTo1,
                          [Validation.LESS_THAN_OR_EQUAL_TO_BILLION]: lessThanOrEqualToOneBillion,
                        },
                      }}
                      render={({ onChange, value, name }) => (
                        <NumberInput
                          dataTestId={selectors.sourceAmount}
                          id={amountFieldName}
                          name={name}
                          onChange={onChange}
                          decimals={0}
                          units={t('common:kWh')}
                          errorMessage={getFormErrorMessage(
                            t,
                            errors[FIELD_KEYS.EMISSION_SOURCES]?.[index]?.[
                              ROW_FIELD_KEYS.AMOUNT
                            ]
                          )}
                          value={value}
                        />
                      )}
                    />
                  </StyledComponents.FieldsRowAmountContainer>

                  {!isFirstRow && (
                    <IconButton
                      dataTestId={selectors.deleteSource}
                      iconSrc="/trash.svg"
                      onClick={() => remove(index)}
                    />
                  )}
                </StyledComponents.FieldsRow>
              );
            })}
          </StyledComponents.FieldRowsContainer>

          <Button
            color="text-button"
            onClick={() => append(INITIAL_FIELD)}
            data-testid={selectors.addMoreRows}
          >
            {t('inexperiencedFlow:add-emission-type')}
          </Button>

          <WizardControls
            closeModal={onCancel}
            onBack={onBackClick}
            isValid={isValid}
            isSubmitting={isSubmitting}
          />
        </form>
      }
      rightContent={
        <StepEmissionsTotal
          total={totalEmissions}
          totalName={t('inexperiencedFlow:heat-cooling-total-name')}
          description={t('inexperiencedFlow:heat-cooling-total-description')}
        />
      }
    />
  );
};
