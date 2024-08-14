import { InputError } from 'components/InputError';
import {
  DataPubliclyAvailable,
  EmissionPrivacyType,
} from 'containers/Modals/CorporateEmissionForm/DataPubliclyAvailable';
import { useUpdateCorporateEmission } from 'containers/Modals/CorporateEmissionForm/mutations';
import {
  StepSubheader,
  StepTitle,
} from 'containers/PrivacyUpdateWizard/styledComponents';
import { EmissionStepData } from 'containers/PrivacyUpdateWizard/types';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { CorporateEmissionAccessInput } from 'types/globalTypes';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import * as selectors from '../../selectors';
import * as StyledComponents from '../styledComponents';

interface IProps {
  step: EmissionStepData;
  onBackClick: () => void;
  onNextClick: () => void;
  isFirstStep: boolean;
  isFinalStep: boolean;
}

enum FIELD_KEYS {
  PRIVACY_TYPE = 'privacyType',
  TYPE_OF_DATA_PUBLICLY_AVAILABLE = 'typeOfDataPubliclyAvailable',
  TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2 = 'typeOfDataPubliclyAvailableScope1And2',
  TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3 = 'typeOfDataPubliclyAvailableScope3',
  TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET = 'typeOfDataPubliclyAvailableOffset',
  TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY = 'typeOfDataPubliclyAvailableIntensity',
  PUBLIC_LINK = 'publicLink',
}

interface FormValues {
  privacyType: EmissionPrivacyType | null;
  typeOfDataPubliclyAvailable: any;
  [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2]: boolean;
  [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3]: boolean;
  [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY]: boolean;
  [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET]: boolean;
  [FIELD_KEYS.PUBLIC_LINK]: string;
}

export const PrivacyUpdateEmissionStep = ({
  step,
  onBackClick,
  onNextClick,
  isFirstStep,
  isFinalStep,
}: IProps) => {
  const { t } = useTranslation();

  const getDefaultValues = () => ({
    [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_1_AND_2]: false,
    [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_SCOPE_3]: false,
    [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_OFFSET]: false,
    [FIELD_KEYS.TYPE_OF_DATA_PUBLICLY_AVAILABLE_INTENSITY]: false,
    [FIELD_KEYS.PUBLIC_LINK]: '',
    [FIELD_KEYS.PRIVACY_TYPE]: null,
  });

  const {
    handleSubmit,
    control,
    errors,
    reset,
    formState,
    getValues,
    ...methods
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: getDefaultValues(),
  });

  const [apiError, setApiError] = useState('');

  const [updateEmission, { loading }] = useUpdateCorporateEmission({
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

  const onSubmit = () => {
    const {
      typeOfDataPubliclyAvailableScope1And2 = false,
      typeOfDataPubliclyAvailableScope3 = false,
      typeOfDataPubliclyAvailableIntensity = false,
      typeOfDataPubliclyAvailableOffset = false,
      publicLink = null,
    } = getValues();

    const corporateEmissionAccess: CorporateEmissionAccessInput = {
      scope1And2: typeOfDataPubliclyAvailableScope1And2,
      scope3: typeOfDataPubliclyAvailableScope3,
      carbonIntensity: typeOfDataPubliclyAvailableIntensity,
      carbonOffsets: typeOfDataPubliclyAvailableOffset,
      publicLink,
    };

    const data = {
      variables: {
        input: {
          id: step.id,
          scope1: step.scope1,
          scope2: step.scope2,
          scope2Type: step.scope2Type,
          scope3: step.scope3,
          offset: step.offset,
          headCount: step.headCount,
          year: step.year,
          verificationFileId: step.verificationFile?.id,
          carbonIntensities: step.carbonIntensities,
          corporateEmissionAccess,
          type: step.type,
        },
      },
    };
    updateEmission(data);
  };

  return (
    <FormProvider
      {...{
        ...methods,
        handleSubmit,
        errors,
        control,
        formState,
        reset,
        getValues,
      }}
    >
      <StyledComponents.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledComponents.StepWindow>
          <StepTitle data-testid={selectors.stepTitle}>
            {t('dataPrivacyWizard:emission-step-header', { year: step.year })}
          </StepTitle>
          <StepSubheader data-testid={selectors.stepSubheader}>
            {t('dataPrivacyWizard:emission-step-subheader')}
          </StepSubheader>
          <StyledComponents.Columns>
            <DataPubliclyAvailable
              control={control}
              privacyError={errors?.privacyType}
              publicLinkError={errors?.publicLink}
              disabled={false}
            />
          </StyledComponents.Columns>
        </StyledComponents.StepWindow>
        <StyledComponents.ApiErrorWrapper>
          {apiError && <InputError>{apiError}</InputError>}
        </StyledComponents.ApiErrorWrapper>
        <StyledComponents.WizardButtons>
          <StyledComponents.LeftHandWizardButtons>
            {!isFirstStep && (
              <StyledComponents.BackButton
                data-testid={selectors.backButton}
                onClick={onBackClick}
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
