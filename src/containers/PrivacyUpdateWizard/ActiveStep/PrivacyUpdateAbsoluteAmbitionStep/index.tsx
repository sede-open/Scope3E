import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { useSaveTargets } from 'containers/Modals/TargetForm/mutations';
import { ReductionPublicRadio } from 'containers/Modals/TargetForm/ReductionPublicRadio';
import {
  StepTitle,
  StepSubheader,
} from 'containers/PrivacyUpdateWizard/styledComponents';
import { AbsoluteStepData } from 'containers/PrivacyUpdateWizard/types';
import useTranslation from 'next-translate/useTranslation';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { TargetPrivacyType } from 'types/globalTypes';
import { useState } from 'react';
import { InputError } from 'components/InputError';
import * as StyledComponents from '../styledComponents';
import * as selectors from '../../selectors';

interface IProps {
  companyId: string;
  step: AbsoluteStepData;
  onBackClick: () => void;
  onNextClick: () => void;
  isFirstStep: boolean;
  isFinalStep: boolean;
}

enum FIELD_KEYS {
  SCOPE_1_AND_2_PRIVACY_TYPE = 'scope1And2PrivacyType',
  SCOPE_3_PRIVACY_TYPE = 'scope3PrivacyType',
}

interface FormValues {
  scope1And2PrivacyType: TargetPrivacyType | null;
  scope3PrivacyType: TargetPrivacyType | null;
}

export const PrivacyUpdateAbsoluteAmbitionStep = ({
  companyId,
  step,
  onBackClick,
  onNextClick,
  isFirstStep,
  isFinalStep,
}: IProps) => {
  const getDefaultValues = () => ({
    [FIELD_KEYS.SCOPE_1_AND_2_PRIVACY_TYPE]: null,
    [FIELD_KEYS.SCOPE_3_PRIVACY_TYPE]: null,
  });

  const [apiError, setApiError] = useState('');

  const { t } = useTranslation();
  const {
    reset,
    handleSubmit,
    watch,
    control,
    formState,
    errors,
    ...methods
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: getDefaultValues(),
  });

  const [saveTargets, { loading }] = useSaveTargets({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:save-toast-error'),
      });
    },
    onCompleted: () => {
      onNextClick();
      reset(getDefaultValues());
      if (isFinalStep) {
        displaySuccessMessage({
          title: t('common:save-toast-success'),
          options: { autoClose: 2000 },
        });
      }
    },
  });

  const onSubmit = ({
    scope1And2PrivacyType,
    scope3PrivacyType,
  }: {
    scope1And2PrivacyType: TargetPrivacyType;
    scope3PrivacyType: TargetPrivacyType;
  }) => {
    saveTargets({
      variables: {
        input: {
          companyId,
          toSave: [
            {
              strategy: step.strategy,
              includeCarbonOffset: step.includeCarbonOffset,
              scope1And2Year: step.scope1And2Year,
              scope1And2Reduction: step.scope1And2Reduction,
              scope3Year: step.scope3Year,
              scope3Reduction: step.scope3Reduction,
              targetType: step.targetType,
              scope1And2PrivacyType,
              scope3PrivacyType,
            },
          ],
        },
      },
    });
  };

  const { scope1And2PrivacyType, scope3PrivacyType } = watch([
    FIELD_KEYS.SCOPE_1_AND_2_PRIVACY_TYPE,
    FIELD_KEYS.SCOPE_3_PRIVACY_TYPE,
  ]);

  const hasScope3 = step.scope3Year && step.scope3Reduction;

  return (
    <FormProvider
      {...{
        ...methods,
        reset,
        handleSubmit,
        formState,
        errors,
        control,
        watch,
      }}
    >
      <StyledComponents.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledComponents.StepWindow>
          <StepTitle data-testid={selectors.stepTitle}>
            {t('dataPrivacyWizard:absolute-step-header')}
          </StepTitle>
          <StepSubheader data-testid={selectors.stepSubheader}>
            {t('dataPrivacyWizard:absolute-step-subheader')}
          </StepSubheader>
          <StyledComponents.Columns>
            <ReductionPublicRadio
              control={control}
              rules={{ required: true }}
              label={t(
                'dataPrivacyWizard:scope-one-and-two-shared-reduction-publicly'
              )}
              fieldValue={scope1And2PrivacyType}
              name={FIELD_KEYS.SCOPE_1_AND_2_PRIVACY_TYPE}
              error={errors[FIELD_KEYS.SCOPE_1_AND_2_PRIVACY_TYPE]}
            />
            {hasScope3 && (
              <ReductionPublicRadio
                control={control}
                rules={{ required: true }}
                label={t(
                  'dataPrivacyWizard:scope-three-shared-reduction-publicly'
                )}
                fieldValue={scope3PrivacyType}
                name={FIELD_KEYS.SCOPE_3_PRIVACY_TYPE}
                error={errors[FIELD_KEYS.SCOPE_3_PRIVACY_TYPE]}
              />
            )}
          </StyledComponents.Columns>
        </StyledComponents.StepWindow>
        <StyledComponents.ApiErrorWrapper>
          {apiError && <InputError>{apiError}</InputError>}
        </StyledComponents.ApiErrorWrapper>
        <StyledComponents.WizardButtons>
          <StyledComponents.LeftHandWizardButtons>
            {!isFirstStep && (
              <StyledComponents.BackButton
                onClick={onBackClick}
                data-testid={selectors.backButton}
              >
                {t('dataPrivacyWizard:back')}
              </StyledComponents.BackButton>
            )}
          </StyledComponents.LeftHandWizardButtons>
          <StyledComponents.RightHandWizardButtons>
            <Link href="/dashboard" passHref>
              <StyledComponents.CancelButton
                data-testid={selectors.cancelButton}
                type="button"
                as="a"
              >
                {t('dataPrivacyWizard:cancel')}
              </StyledComponents.CancelButton>
            </Link>
            <StyledComponents.NextButton
              data-testid={selectors.nextButton}
              disabled={loading}
              type="submit"
            >
              {isFinalStep
                ? t('dataPrivacyWizard:next-and-exit')
                : t('dataPrivacyWizard:next')}
            </StyledComponents.NextButton>
          </StyledComponents.RightHandWizardButtons>
        </StyledComponents.WizardButtons>
      </StyledComponents.Form>
    </FormProvider>
  );
};
