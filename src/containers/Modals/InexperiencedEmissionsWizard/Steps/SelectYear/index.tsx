import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm, Controller } from 'react-hook-form';
import { trackEvent } from 'utils/analytics';
import {
  INEXPERIENCED_FLOW_CANCEL,
  INEXPERIENCED_FLOW_NEXT,
} from 'utils/analyticsEvents';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { ModalForm } from 'components/ModalForm';
import { FormField } from 'components/Form/FormField';
import { InputLabel } from 'components/InputLabel';
import { SingleSelect } from 'components/SingleSelect';
import { WizardStepLayout } from 'components/Wizard/WizardStepLayout';
import { WizardControls } from 'components/Wizard/WizardControls';
import { companySectorsPrimarySectorName } from 'utils/companySectors';
import {
  getTitle,
  getSubTitle,
  getYearLabel,
  getYearSelectOptions,
  IProps,
  FormValues,
  YEAR_MENU_HEIGHT,
} from './utils';
import { useSelectYearStepQuery } from './queries';
import {
  EMISSION_YEAR_FIELD_KEYS as FIELD_KEYS,
  InexperiencedFlowSteps,
} from '../../types';

import * as selectors from '../../selectors';
import * as StyledComponents from './styledComponents';

export const SelectYear = ({
  closeModal,
  emissionType,
  onNext,
  wizardState,
  selectedEmissionYear,
}: IProps) => {
  const { company } = useAuthenticatedUser();
  const { t } = useTranslation();

  const { data: emissionsData, loading: isLoading } = useSelectYearStepQuery({
    companyId: company?.id || '',
  });

  const emissions = emissionsData?.corporateEmissions ?? [];
  const yearOptions = getYearSelectOptions(emissionType, emissions);
  const initialYear = wizardState[FIELD_KEYS.EMISSION_YEAR];
  const initialYearOption = initialYear
    ? { label: initialYear, value: initialYear }
    : undefined;
  const selectedEmissionYearOption = selectedEmissionYear
    ? { label: selectedEmissionYear, value: selectedEmissionYear }
    : undefined;
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      [String(FIELD_KEYS.EMISSION_YEAR)]:
        selectedEmissionYearOption ?? initialYearOption ?? '',
    },
    mode: 'onChange',
  });

  const onCancel = useCallback(() => {
    trackEvent(INEXPERIENCED_FLOW_CANCEL, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.SELECT_EMISSION_YEAR,
    });

    closeModal();
  }, []);

  const onSubmit = useCallback((data: FormValues) => {
    trackEvent(INEXPERIENCED_FLOW_NEXT, {
      companyName: company?.name,
      primarySector: companySectorsPrimarySectorName(company?.companySectors),
      emissionType,
      currentStep: InexperiencedFlowSteps.SELECT_EMISSION_YEAR,
    });

    onNext({
      [FIELD_KEYS.EMISSION_YEAR]: data.year.value as number,
    });
  }, []);

  return (
    <WizardStepLayout>
      <ModalForm
        isXl
        title={getTitle(t, emissionType)}
        subtitle={getSubTitle(t, emissionType)}
        dataTestId={selectors.emissionYearSelectForm}
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmit)}
      >
        <StyledComponents.BaselineSelectContainer>
          <Controller
            control={control}
            name={FIELD_KEYS.EMISSION_YEAR}
            rules={{ required: true }}
            render={({ value, onChange }) => (
              <FormField testIdPrefix={FIELD_KEYS.EMISSION_YEAR}>
                <>
                  <InputLabel htmlFor={FIELD_KEYS.EMISSION_YEAR}>
                    {getYearLabel(t, emissionType)}
                  </InputLabel>
                  {selectedEmissionYear ? (
                    <SingleSelect
                      dataTestId={selectors.emissionYearSelectInput}
                      inputId={FIELD_KEYS.EMISSION_YEAR}
                      name={FIELD_KEYS.EMISSION_YEAR}
                      options={yearOptions}
                      onChange={onChange}
                      placeholder={String(selectedEmissionYear)}
                      value={value}
                      maxMenuHeight={YEAR_MENU_HEIGHT}
                    />
                  ) : (
                    <SingleSelect
                      dataTestId={selectors.emissionYearSelectInput}
                      inputId={FIELD_KEYS.EMISSION_YEAR}
                      name={FIELD_KEYS.EMISSION_YEAR}
                      options={yearOptions}
                      onChange={onChange}
                      placeholder={t('common:form-placeholder')}
                      value={value}
                      maxMenuHeight={YEAR_MENU_HEIGHT}
                    />
                  )}
                </>
              </FormField>
            )}
          />
        </StyledComponents.BaselineSelectContainer>
        <WizardControls
          closeModal={onCancel}
          isValid={isValid}
          isSubmitting={isSubmitting}
        />
      </ModalForm>
    </WizardStepLayout>
  );
};
