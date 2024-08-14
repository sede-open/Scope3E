import { useCallback, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useFieldArray, useForm, Controller } from 'react-hook-form';

import { CorporateEmissionType } from 'types/globalTypes';
import { WizardStepWithInfoLayout } from 'components/Wizard/WizardStepWithInfoLayout';
import { WizardControls } from 'components/Wizard/WizardControls';
import { SingleSelect } from 'components/SingleSelect';
import { NumberInput } from 'components/NumberInput';
import Button from 'components/Button';
import { IconButton } from 'components/IconButton';
import { InputLabel } from 'components/InputLabel';
import {
  Validation,
  getFormErrorMessage,
  moreThanOrEqualTo1,
  lessThanOrEqualToOneBillion,
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
  ProcessRefrigerantName,
  WizardState,
  SCOPE1_SOURCES_FORM_FIELD_KEYS as FIELD_KEYS,
  SCOPE1_SOURCE_FIELD_KEYS as ROW_FIELD_KEYS,
  Scope1SourceValues,
  InexperiencedFlowSteps,
} from '../../types';
import {
  getSortedProcessRefrigerantOptions,
  getSelectedFuelUnit,
  getTotalEmissions,
} from './utils';
import { StepEmissionsTotal } from '../../StepEmissionsTotal';

export type FormValues = {
  [FIELD_KEYS.EMISSION_SOURCES]: Scope1SourceValues[];
};

export interface IProps {
  closeModal: (update?: Partial<WizardState>) => void;
  emissionType: CorporateEmissionType | null;
  onBack: (update?: Partial<WizardState>) => void;
  onNext: (update?: Partial<WizardState>) => void;
  onSetExternalLinkDisclaimer: (
    url: string,
    update?: Partial<WizardState>
  ) => void;
  wizardState: WizardState;
}

const INITIAL_FIELD = { source: null, amount: '' };

const getDefaultValues = (initialSourcesState: Scope1SourceValues[]) => ({
  [FIELD_KEYS.EMISSION_SOURCES]:
    initialSourcesState.length > 0 ? initialSourcesState : [INITIAL_FIELD],
});

export const ProcessRefrigerantsForm = ({
  closeModal,
  emissionType,
  onBack,
  onNext,
  onSetExternalLinkDisclaimer,
  wizardState,
}: IProps) => {
  const { company } = useAuthenticatedUser();
  const { t } = useTranslation();

  const [totalEmissions, setTotalEmissions] = useState(0);

  const initialSourcesState = wizardState.processRefrigerantsSources;

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

  const { fields, append, remove } = useFieldArray<Scope1SourceValues>({
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
        currentStep: InexperiencedFlowSteps.PROCESS_REFRIGERANT_FORM,
      });
      onNext({
        processRefrigerantsTotal: totalEmissions,
        processRefrigerantsSources: data[FIELD_KEYS.EMISSION_SOURCES],
      });
    },
    [totalEmissions]
  );

  const onBackClick = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_BACK, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.PROCESS_REFRIGERANT_FORM,
    });
    onBack({
      processRefrigerantsTotal: totalEmissions,
      processRefrigerantsSources: formValues[FIELD_KEYS.EMISSION_SOURCES],
    });
  }, [formValues, totalEmissions]);

  const onCancel = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_CANCEL, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.PROCESS_REFRIGERANT_FORM,
    });
    closeModal({
      processRefrigerantsTotal: totalEmissions,
      processRefrigerantsSources: formValues[FIELD_KEYS.EMISSION_SOURCES],
    });
  }, [formValues, totalEmissions]);

  useEffect(() => {
    const newTotal = getTotalEmissions(formValues);
    setTotalEmissions(newTotal);
  }, [formValues]);

  const shouldDisplayAddMoreRows =
    formValues[FIELD_KEYS.EMISSION_SOURCES].length <
    Object.keys(ProcessRefrigerantName).length;

  const onOpenLinkDisclaimerModal = useCallback(
    (url: string) => {
      onSetExternalLinkDisclaimer(url, {
        processRefrigerantsTotal: totalEmissions,
        processRefrigerantsSources: formValues[FIELD_KEYS.EMISSION_SOURCES],
      });
    },
    [formValues, totalEmissions]
  );

  return (
    <WizardStepWithInfoLayout
      dataTestId={selectors.processRefrigerantsForm}
      title={t('inexperiencedFlow:process-refrigerant-title')}
      subtitle={t('inexperiencedFlow:process-refrigerant-subtitle')}
      leftContent={
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledComponents.FieldRowsContainer>
            {fields.map((item, index) => {
              const amountField = `${FIELD_KEYS.EMISSION_SOURCES}[${index}].${ROW_FIELD_KEYS.AMOUNT}`;
              const isFirstRow = index === 0;
              const fuelOptions = getSortedProcessRefrigerantOptions(
                t,
                formValues[FIELD_KEYS.EMISSION_SOURCES]
              );
              const selectedFuelValue = formValues[FIELD_KEYS.EMISSION_SOURCES][
                index
              ]?.[ROW_FIELD_KEYS.SOURCE]?.value as
                | ProcessRefrigerantName
                | undefined;

              const fuelUnit = getSelectedFuelUnit(selectedFuelValue);

              return (
                <StyledComponents.FieldsRow
                  key={item.id}
                  data-testid={selectors.processRefrigerantsFieldRow}
                >
                  <StyledComponents.FieldsRowFuelContainer>
                    {isFirstRow && (
                      <InputLabel>
                        {t('inexperiencedFlow:type-of-gas')}
                      </InputLabel>
                    )}

                    <InputLabel
                      htmlFor={`${FIELD_KEYS.EMISSION_SOURCES}[${index}].${ROW_FIELD_KEYS.SOURCE}`}
                      isHidden
                    >
                      {`${FIELD_KEYS.EMISSION_SOURCES}[${index}].${ROW_FIELD_KEYS.SOURCE}`}
                    </InputLabel>
                    <Controller
                      control={control}
                      defaultValue={item[ROW_FIELD_KEYS.SOURCE]}
                      name={`${FIELD_KEYS.EMISSION_SOURCES}[${index}].${ROW_FIELD_KEYS.SOURCE}`}
                      rules={{ required: true }}
                      render={({ value, onChange }) => (
                        <SingleSelect
                          dataTestId={selectors.emissionsSource}
                          inputId={`${FIELD_KEYS.EMISSION_SOURCES}[${index}].${ROW_FIELD_KEYS.SOURCE}`}
                          isSearchable
                          maxMenuHeight={125}
                          name={`${FIELD_KEYS.EMISSION_SOURCES}[${index}].${ROW_FIELD_KEYS.SOURCE}`}
                          onChange={onChange}
                          options={fuelOptions}
                          placeholder="--"
                          value={value}
                        />
                      )}
                    />
                  </StyledComponents.FieldsRowFuelContainer>

                  <StyledComponents.FieldsRowAmountContainer>
                    {isFirstRow && (
                      <InputLabel>{t('inexperiencedFlow:amount')}</InputLabel>
                    )}
                    <Controller
                      control={control}
                      defaultValue={item[ROW_FIELD_KEYS.AMOUNT]}
                      name={amountField}
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
                          id={amountField}
                          name={name}
                          onChange={onChange}
                          decimals={0}
                          units={t(`common:${fuelUnit}`)}
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

          {shouldDisplayAddMoreRows && (
            <Button
              color="text-button"
              onClick={() => append(INITIAL_FIELD)}
              data-testid={selectors.addMoreRows}
            >
              {t('inexperiencedFlow:add-emission-type')}
            </Button>
          )}

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
          description={t(
            'inexperiencedFlow:process-refrigerant-total-description'
          )}
          openLinkDisclaimerModal={onOpenLinkDisclaimerModal}
          readMoreLink={{
            url: t(
              'inexperiencedFlow:process-refrigerant-total-read-more-link-url'
            ),
            text: t(
              'inexperiencedFlow:process-refrigerant-total-read-more-link-text'
            ),
          }}
          total={totalEmissions}
          totalName={t('inexperiencedFlow:process-refrigerant-total-name')}
        />
      }
    />
  );
};
