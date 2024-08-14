import Button from 'components/Button';
import { ButtonSpacer } from 'components/ButtonSpacer';
import { ExternalLink } from 'components/ExternalLink';
import { RadioInputField } from 'components/Form/Fields/RadioInputField';
import { FormField } from 'components/Form/FormField';
import Icon from 'components/Icon';
import { InputDescriptionLink } from 'components/InputDescription';
import { InputError } from 'components/InputError';
import { InputFile } from 'components/InputFile';
import { InputHighlight } from 'components/InputHighlight';
import { InputLabel } from 'components/InputLabel';
import { InputSubLabel } from 'components/InputSubLabel';
import { NumberInput } from 'components/NumberInput';
import { SingleSelect } from 'components/SingleSelect';
import { ModalContentType } from 'containers/types';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useFileUpload } from 'effects/useFileUpload';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import {
  DashboardDataQuery_corporateEmissions as Emission,
  DashboardDataQuery_corporateEmissions_verificationFile as VerificationFile,
} from 'types/DashboardDataQuery';
import {
  CarbonIntensityMetricType,
  CorporateEmissionAccessInput,
  CorporateEmissionType,
  CreateCarbonIntensityData,
  CreateCorporateEmissionInput,
  Scope2Type,
  UpdateCorporateEmissionInput,
} from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import {
  EMISSION_CREATED_EVENT,
  SAVE_BASELINE_EXPERIENCED_FLOW,
} from 'utils/analyticsEvents';
import { formatInteger } from 'utils/number';
import { scrollToElementId, scrollToFieldError } from 'utils/scrollToError';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { CarbonIntensities } from './CarbonIntensities';
import {
  DataPubliclyAvailable,
  EmissionPrivacyType,
} from './DataPubliclyAvailable';
import {
  useCreateCorporateEmission,
  useUpdateCorporateEmission,
} from './mutations';
import {
  getNotLessThanEmissionAllocations,
  lessThanOrEqualToBillion,
  lessThanOrEqualToTrillion,
  maxPDFSize,
  notPDFMimetype,
} from './rules';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import { SummaryCard } from './SummaryCard';
import { CarbonIntensityValues, FIELD_KEYS, FormValues, IProps } from './types';
import {
  API_FILE_NOT_DELETED,
  API_NO_FILE_ERROR,
  defaultYearValue,
  getCarbonIntensityValidationUpdates,
  getDefaultFormValues,
  getDefaultVerificationFile,
  getEmissionAllocationsForYear,
  getEmissionType,
  getErrorMessage,
  getSaveButtonText,
  getYearLabel,
  getYearOptions,
  MAX_INPUT_CHARACTER_LENGTH,
  VALUE_CHAIN_SUPPLIERS_TAB_ROUTE,
} from './utils';

export const CorporateEmissionForm = ({
  closeModal,
  emissionsFormData,
  formType,
  onNewActualSuccess,
  onNewBaselineSuccess,
  selectedEmissionYear,
}: IProps) => {
  const [apiError, setApiError] = useState('');
  const { company } = useAuthenticatedUser();
  const { t } = useTranslation();
  const YEAR_MENU_HEIGHT = 180;
  const [uploadFile, uploadedFile, resetFileUpload] = useFileUpload(
    '/api/files/emission-verification',
    {
      onError: (err) => {
        setApiError(err.message);
        console.debug({ err });
        scrollToElementId(selectors.apiErrorFile);
        displayErrorMessage({
          title: t('common:upload-file-toast-error'),
        });
      },
    }
  );

  const emissionAllocations = emissionsFormData?.emissionAllocations || [];
  const emissions = emissionsFormData?.corporateEmissions ?? [];
  const defaultValues = getDefaultFormValues(
    formType,
    emissions,
    t,
    selectedEmissionYear
  );
  const defaultVerificationFile = getDefaultVerificationFile(
    formType,
    emissions,
    selectedEmissionYear
  );
  const [existingVerificationFile, setExistingVerificationFile] = useState<
    VerificationFile | null | undefined
  >(defaultVerificationFile);
  const {
    register,
    handleSubmit,
    errors,
    formState,
    control,
    watch,
    setValue,
    trigger,
    clearErrors,
    reset,
    ...methods
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
  });

  const { isSubmitting } = formState;

  const clearFileValue = useCallback(
    (e: SyntheticEvent<HTMLSpanElement>) => {
      e.preventDefault();
      if (existingVerificationFile) {
        setExistingVerificationFile(null);
      }
      setValue('verificationFile', null);
      resetFileUpload();
    },
    [existingVerificationFile]
  );

  const initialEmission =
    formType === ModalContentType.EDIT_BASELINE
      ? emissions.find((e) => e.type === CorporateEmissionType.BASELINE)
      : undefined;

  const [emission, setEmission] = useState<Emission | undefined>(
    initialEmission
  );

  const { year: yearValue, verificationFile } = watch([
    FIELD_KEYS.YEAR,
    FIELD_KEYS.VERIFICATION_FILE,
    FIELD_KEYS.PRIVACY_TYPE,
  ]);

  const years = getYearOptions(formType, emissions);

  const valuesForNetEmissions = watch([
    FIELD_KEYS.SCOPE_1,
    FIELD_KEYS.SCOPE_2,
    FIELD_KEYS.SCOPE_2_TYPE,
    FIELD_KEYS.SCOPE_3,
    FIELD_KEYS.OFFSET,
    FIELD_KEYS.HEADCOUNT,
    FIELD_KEYS.PRIVACY_TYPE,
  ]);

  const { carbonIntensities } = watch([FIELD_KEYS.CARBON_INTENSITIES]);

  // NOTE :: As the validation of required value and metric fields
  // in carbon intensities are dependent on each other,
  // need to trigger and clean up required errors manually
  useEffect(() => {
    const {
      areCarbonIntensitiesInvalid,
      carbonIntensityErrorsToClear,
    } = getCarbonIntensityValidationUpdates({
      carbonIntensities,
      errors,
    });

    if (areCarbonIntensitiesInvalid) {
      trigger(FIELD_KEYS.CARBON_INTENSITIES);
    }

    if (carbonIntensityErrorsToClear.length > 0) {
      clearErrors(carbonIntensityErrorsToClear);
    }
  }, [carbonIntensities, errors[FIELD_KEYS.CARBON_INTENSITIES], trigger]);

  useEffect(() => {
    if (
      (formType === ModalContentType.EDIT_ACTUAL ||
        formType === ModalContentType.EDIT_BASELINE) &&
      yearValue?.value
    ) {
      const selectedEmission = emissions.find(
        ({ year }) => year === Number(yearValue?.value)
      );

      reset(getDefaultFormValues(formType, emissions, t, yearValue?.value));
      setExistingVerificationFile(selectedEmission?.verificationFile);
      setEmission(selectedEmission);
    }
  }, [yearValue?.value]);

  const [createEmission] = useCreateCorporateEmission({
    onError: (err) => {
      setApiError(err.message);
      console.debug({ err });
      scrollToElementId(selectors.apiErrorYear);
      displayErrorMessage({
        title: t('common:save-toast-error'),
      });
    },

    onCompleted: () => {
      if (formType === ModalContentType.NEW_BASELINE) {
        onNewBaselineSuccess();
        trackEvent(SAVE_BASELINE_EXPERIENCED_FLOW, {
          companyId: company?.id,
          companyName: company?.name,
          emissionType: CorporateEmissionType.BASELINE,
        });
      } else if (formType === ModalContentType.NEW_ACTUAL) {
        if (onNewActualSuccess) {
          onNewActualSuccess();
        }

        displaySuccessMessage({
          title: t('common:save-toast-success'),
        });
        trackEvent(EMISSION_CREATED_EVENT, {
          year: yearValue?.value,
          scope3: !valuesForNetEmissions.scope3 ? 'undefined' : 'submitted',
          offset: !valuesForNetEmissions.offset ? 'undefined' : 'submitted',
          headCount: !valuesForNetEmissions.headCount
            ? 'undefined'
            : 'submitted',
          emissionType: CorporateEmissionType.ACTUAL,
          companyId: company?.id,
          companyName: company?.name,
        });
        closeModal();
      }
    },
  });
  const [updateEmission] = useUpdateCorporateEmission({
    onError: (err) => {
      setApiError(err.message);
      console.debug({ err });
      scrollToElementId(selectors.apiErrorYear);
      displayErrorMessage({
        title: t('common:save-toast-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:save-toast-success'),
      });
      closeModal();
    },
  });

  const onSubmit = useCallback(
    async (data: ReturnType<typeof getDefaultFormValues>) => {
      setApiError('');

      // if the form errored on emission creation/update
      // but there is an uploaded file, do not re-upload it
      let newVerificationFile = uploadedFile;
      const verificationFiles:
        | null
        | any[] = (data.verificationFile as unknown) as any;
      if (
        !newVerificationFile &&
        verificationFiles !== null &&
        verificationFiles.length > 0
      ) {
        newVerificationFile = await uploadFile(verificationFiles[0]);

        if (!newVerificationFile) {
          // do not proceed with emission mutation if the file was not created
          return;
        }
      }
      const verificationFileId =
        newVerificationFile?.id ?? existingVerificationFile?.id ?? null;

      const carbonIntensitiesData: CreateCarbonIntensityData[] =
        data.carbonIntensities
          ?.filter((e: CarbonIntensityValues) => !!e.type?.value)
          .map((e: CarbonIntensityValues) => ({
            value: e.value as number,
            type: e.type?.value as CarbonIntensityMetricType,
          })) ?? [];

      const { privacyType } = methods.getValues();
      const corporateEmissionAccess: CorporateEmissionAccessInput = {
        scope1And2:
          privacyType === EmissionPrivacyType.Public
            ? data.typeOfDataPubliclyAvailableScope1And2
            : false,
        scope3:
          privacyType === EmissionPrivacyType.Public
            ? data.typeOfDataPubliclyAvailableScope3
            : false,
        carbonIntensity:
          privacyType === EmissionPrivacyType.Public
            ? data.typeOfDataPubliclyAvailableIntensity
            : false,
        carbonOffsets:
          privacyType === EmissionPrivacyType.Public
            ? data.typeOfDataPubliclyAvailableOffset
            : false,
        publicLink:
          privacyType === EmissionPrivacyType.Public ? data.publicLink : null,
      };
      if (emission) {
        const type = getEmissionType(formType);
        const input: UpdateCorporateEmissionInput = {
          scope1: data.scope1!,
          scope2: data.scope2!,
          scope2Type: data.scope2Type,
          scope3: data.scope3 || null,
          offset: data.offset || null,
          headCount: data.headCount || null,
          year: Number(data.year!.value),
          verificationFileId,
          id: emission.id,
          carbonIntensities: carbonIntensitiesData,
          corporateEmissionAccess,
          type,
        };
        await updateEmission({
          variables: {
            input,
          },
        });
      } else {
        const companyId = company?.id;
        const type = getEmissionType(formType);
        if (!companyId || !type) {
          return;
        }

        const input: CreateCorporateEmissionInput = {
          companyId,
          type,
          scope1: data.scope1!,
          scope2: data.scope2!,
          scope2Type: data.scope2Type,
          scope3: data.scope3 || null,
          offset: data.offset || null,
          headCount: data.headCount || null,
          verificationFileId,
          year: Number(data.year!.value),
          carbonIntensities: carbonIntensitiesData,
          corporateEmissionAccess,
        };

        await createEmission({
          variables: {
            input,
          },
        });
      }
    },
    [emission, existingVerificationFile, uploadedFile]
  );

  const emissionAllocationsForYear = getEmissionAllocationsForYear({
    emissionAllocations,
    year: yearValue?.value,
  });
  const yearHasEmissionAllocations = emissionAllocationsForYear > 0;
  const notLessThanEmissionAllocations = getNotLessThanEmissionAllocations(
    emissionAllocationsForYear
  );

  const hasYearBeenSelected = Boolean(yearValue?.value);
  const isScope2LocationTypeChecked =
    valuesForNetEmissions.scope2Type === Scope2Type.LOCATION;
  const isScope2MarketTypeChecked =
    valuesForNetEmissions.scope2Type === Scope2Type.MARKET;
  const isEditingDisabled =
    formType === ModalContentType.EDIT_ACTUAL && !hasYearBeenSelected;
  const isFileApiError =
    apiError && apiError === (API_NO_FILE_ERROR || API_FILE_NOT_DELETED);
  const hasYearFieldError =
    Boolean(errors.year) || Boolean(apiError && !isFileApiError);
  const hasFileFieldError =
    Boolean(errors.verificationFile) || Boolean(apiError && isFileApiError);

  scrollToFieldError(errors);

  return (
    <FormProvider
      {...{
        ...methods,
        register,
        handleSubmit,
        errors,
        control,
        watch,
        formState,
        setValue,
        trigger,
        clearErrors,
        reset,
      }}
    >
      <StyledComponents.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledComponents.Columns>
          <StyledComponents.Column>
            <StyledComponents.InputContainer
              data-testid={selectors.yearInputContainer}
              hasError={hasYearFieldError}
            >
              <InputLabel
                dataTestId={selectors.yearLabel}
                htmlFor={FIELD_KEYS.YEAR}
                lrgSize
              >
                {getYearLabel(t, formType)}
              </InputLabel>
              <StyledComponents.SelectWrapper>
                <Controller
                  control={control}
                  defaultValue={defaultYearValue}
                  name={FIELD_KEYS.YEAR}
                  rules={{
                    required: true,
                  }}
                  render={({ value, onChange }) => (
                    <FormField
                      testIdPrefix={FIELD_KEYS.YEAR}
                      errorMessage={getErrorMessage(t, errors.year?.value)}
                    >
                      <SingleSelect
                        dataTestId={selectors.yearSelect}
                        inputId={FIELD_KEYS.YEAR}
                        name={FIELD_KEYS.YEAR}
                        options={years}
                        hasError={hasYearFieldError}
                        onChange={onChange}
                        placeholder={t('common:form-placeholder')}
                        value={value}
                        maxMenuHeight={YEAR_MENU_HEIGHT}
                        removeValueContainerPadding
                        styles={{
                          valueContainer: (provided) => ({
                            ...provided,
                            margin: '16px',
                          }),
                        }}
                      />
                    </FormField>
                  )}
                />
              </StyledComponents.SelectWrapper>
              <StyledComponents.ApiErrorWrapper>
                {!isFileApiError && (
                  <InputError
                    data-testid={selectors.apiErrorYear}
                    id={selectors.apiErrorYear}
                  >
                    {apiError}
                  </InputError>
                )}
              </StyledComponents.ApiErrorWrapper>
            </StyledComponents.InputContainer>

            <StyledComponents.InputContainer
              data-testid={selectors.scope1InputContainer}
              hasError={Boolean(errors.scope1)}
            >
              <Controller
                control={control}
                defaultValue=""
                name={FIELD_KEYS.SCOPE_1}
                rules={{
                  required: true,
                  validate: {
                    lessThanOrEqualToBillion,
                  },
                }}
                render={({ onChange, value, name }) => (
                  <NumberInput
                    dataTestId={selectors.scope1Input}
                    id={FIELD_KEYS.SCOPE_1}
                    name={name}
                    onChange={onChange}
                    decimals={2}
                    label={t('corporateEmissionForm:scope1-label')}
                    subLabel={t('corporateEmissionForm:scope-one-sublabel')}
                    units={t('common:unit-mt-co2')}
                    errorMessage={getErrorMessage(
                      t,
                      errors.scope1,
                      FIELD_KEYS.SCOPE_1
                    )}
                    value={value}
                    isRequired
                    disabled={isEditingDisabled}
                    lrgLabelSize
                    size="small"
                    maxLength={MAX_INPUT_CHARACTER_LENGTH}
                  />
                )}
              />
            </StyledComponents.InputContainer>

            <StyledComponents.InputContainer
              data-testid={selectors.scope2InputContainer}
              hasError={Boolean(errors.scope2)}
            >
              <InputLabel
                dataTestId={`${selectors.scope2Input}-label`}
                htmlFor={FIELD_KEYS.SCOPE_2}
                lrgSize
              >
                {t('corporateEmissionForm:scope2-label')}
              </InputLabel>
              <InputSubLabel dataTestId={`${selectors.scope2Input}-sublabel`}>
                <Trans
                  i18nKey="corporateEmissionForm:scope-two-sublabel"
                  components={[<strong />]}
                />
              </InputSubLabel>

              <StyledComponents.OuterWrapper>
                <StyledComponents.InnerWrapper>
                  <Controller
                    control={control}
                    defaultValue=""
                    name={FIELD_KEYS.SCOPE_2}
                    rules={{
                      required: true,
                      validate: {
                        lessThanOrEqualToBillion,
                      },
                    }}
                    render={({ onChange, value, name }) => (
                      <NumberInput
                        dataTestId={selectors.scope2Input}
                        id={FIELD_KEYS.SCOPE_2}
                        name={name}
                        onChange={onChange}
                        decimals={2}
                        units={t('common:unit-mt-co2')}
                        value={value}
                        isRequired
                        errorMessage={getErrorMessage(
                          t,
                          errors.scope2,
                          FIELD_KEYS.SCOPE_2
                        )}
                        disabled={isEditingDisabled}
                        lrgLabelSize
                        size="small"
                        maxLength={MAX_INPUT_CHARACTER_LENGTH}
                      />
                    )}
                  />
                </StyledComponents.InnerWrapper>

                <StyledComponents.InputGroup>
                  <Controller
                    control={control}
                    name={FIELD_KEYS.SCOPE_2_TYPE}
                    rules={{
                      required: true,
                    }}
                    render={({ onChange }) => (
                      <RadioInputField
                        tabIndex={0}
                        dataTestId={selectors.scope2MarketRadioBtn}
                        id={Scope2Type.MARKET}
                        isChecked={isScope2MarketTypeChecked}
                        label={t('corporateEmissionForm:scope2-market-type')}
                        name={FIELD_KEYS.SCOPE_2_TYPE}
                        onChange={({ target: { value } }) => onChange(value)}
                        value={Scope2Type.MARKET}
                        isDisabled={isEditingDisabled}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={FIELD_KEYS.SCOPE_2_TYPE}
                    rules={{
                      required: true,
                    }}
                    render={({ onChange }) => (
                      <RadioInputField
                        tabIndex={-1}
                        dataTestId={selectors.scope2LocationRadioBtn}
                        id={Scope2Type.LOCATION}
                        isChecked={isScope2LocationTypeChecked}
                        label={t('corporateEmissionForm:scope2-location-type')}
                        name={FIELD_KEYS.SCOPE_2_TYPE}
                        onChange={({ target: { value } }) => onChange(value)}
                        value={Scope2Type.LOCATION}
                        isDisabled={isEditingDisabled}
                      />
                    )}
                  />
                </StyledComponents.InputGroup>
              </StyledComponents.OuterWrapper>
            </StyledComponents.InputContainer>

            <StyledComponents.InputContainer hasError={Boolean(errors.scope3)}>
              <Controller
                control={control}
                defaultValue=""
                name={FIELD_KEYS.SCOPE_3}
                rules={{
                  required: false,
                  validate: {
                    lessThanOrEqualToTrillion,
                    notLessThanEmissionAllocations,
                  },
                }}
                render={({ onChange, value, name }) => (
                  <NumberInput
                    dataTestId={selectors.scope3Input}
                    id={FIELD_KEYS.SCOPE_3}
                    name={name}
                    onChange={onChange}
                    decimals={2}
                    label={t('corporateEmissionForm:scope3-label')}
                    subLabel={
                      <>
                        {t('corporateEmissionForm:scope-three-sublabel-[0]')}
                        <br />
                        <StyledComponents.SubLabelLinkContainer>
                          <Trans
                            i18nKey="corporateEmissionForm:scope-three-sublabel-[1]"
                            components={[
                              <StyledComponents.SubLabelLink
                                data-testid={selectors.scope3SubLabelLink}
                                href={VALUE_CHAIN_SUPPLIERS_TAB_ROUTE}
                                target="_blank"
                              >
                                {t(
                                  'corporateEmissionForm:value-chain-page-link'
                                )}
                              </StyledComponents.SubLabelLink>,
                            ]}
                          />
                        </StyledComponents.SubLabelLinkContainer>
                      </>
                    }
                    units={t('common:unit-mt-co2')}
                    errorMessage={getErrorMessage(t, errors.scope3)}
                    value={value}
                    disabled={isEditingDisabled}
                    lrgLabelSize
                    size="small"
                    maxLength={MAX_INPUT_CHARACTER_LENGTH}
                  />
                )}
              />
              {yearHasEmissionAllocations && (
                <StyledComponents.Scope3MinimumMessage
                  data-testid={selectors.scope3MinimumMessage}
                  isValid={!errors[FIELD_KEYS.SCOPE_3]}
                >
                  {t('corporateEmissionForm:scope3-minimum-message', {
                    allocations: formatInteger(emissionAllocationsForYear),
                  })}
                </StyledComponents.Scope3MinimumMessage>
              )}
            </StyledComponents.InputContainer>

            <StyledComponents.InputContainer hasError={Boolean(errors.offset)}>
              <Controller
                control={control}
                defaultValue=""
                name={FIELD_KEYS.OFFSET}
                rules={{
                  required: false,
                  validate: {
                    lessThanOrEqualToBillion,
                  },
                }}
                render={({ onChange, value, name }) => (
                  <NumberInput
                    dataTestId={selectors.offsetInput}
                    id={FIELD_KEYS.OFFSET}
                    name={name}
                    onChange={onChange}
                    decimals={2}
                    label={t('corporateEmissionForm:offset-label')}
                    subLabel={t('corporateEmissionForm:percentage-sublabel')}
                    units={t('common:unit-mt-co2')}
                    errorMessage={getErrorMessage(t, errors.offset)}
                    value={value}
                    disabled={isEditingDisabled}
                    lrgLabelSize
                    size="small"
                    maxLength={MAX_INPUT_CHARACTER_LENGTH}
                  />
                )}
              />
            </StyledComponents.InputContainer>

            <CarbonIntensities
              control={control}
              carbonIntensities={carbonIntensities}
              errors={errors}
              isDisabled={isEditingDisabled}
            />

            <StyledComponents.InputContainer hasError={hasFileFieldError}>
              <StyledComponents.FileVerificationContainer>
                <InputFile
                  dataTestId={selectors.verificationInput}
                  label={t('corporateEmissionForm:verification-file-label')}
                  lrgLabelSize
                  size="small"
                  description={
                    <>
                      {t(
                        'corporateEmissionForm:verification-file-description[0]'
                      )}
                      <br />
                      <ExternalLink
                        link={t(
                          'corporateEmissionForm:verification-file-description-link'
                        )}
                      >
                        <InputDescriptionLink lrgSize>
                          <StyledComponents.IconContainer>
                            <Icon
                              alt="Open New Tab"
                              src="/new-tab.svg"
                              size={12}
                            />
                          </StyledComponents.IconContainer>

                          {t(
                            'corporateEmissionForm:verification-file-description[1]'
                          )}
                        </InputDescriptionLink>
                      </ExternalLink>{' '}
                      <InputHighlight lrgSize>
                        {t(
                          'corporateEmissionForm:verification-file-description[2]'
                        )}
                      </InputHighlight>
                    </>
                  }
                  register={register}
                  existingFile={existingVerificationFile}
                  selectedFile={verificationFile}
                  name={FIELD_KEYS.VERIFICATION_FILE}
                  clearValue={clearFileValue}
                  errorMessage={getErrorMessage(t, errors.verificationFile)}
                  hasError={hasFileFieldError}
                  validationRules={{
                    validate: {
                      maxPDFSize,
                      notPDFMimetype,
                    },
                  }}
                />
              </StyledComponents.FileVerificationContainer>
              {isFileApiError && (
                <InputError
                  data-testid={selectors.apiErrorFile}
                  id={selectors.apiErrorFile}
                >
                  {apiError}
                </InputError>
              )}
            </StyledComponents.InputContainer>
            <StyledComponents.InputContainer
              data-testid={selectors.privacyTypeInputContainer}
              hasError={
                valuesForNetEmissions.privacyType !==
                  EmissionPrivacyType.Private &&
                (Boolean(errors.privacyType) ||
                  Boolean(control.formState.isSubmitted) ||
                  Boolean(errors.publicLink))
              }
            >
              <StyledComponents.InputHeaderContainer>
                <InputLabel
                  dataTestId={`${selectors.privacyTypeInputContainer}-label`}
                  htmlFor={FIELD_KEYS.PRIVACY_TYPE}
                  lrgSize
                >
                  {t('corporateEmissionForm:privacy-type-label')}
                </InputLabel>
                <InputSubLabel
                  dataTestId={`${selectors.privacyTypeInputContainer}-sublabel`}
                >
                  <Trans
                    i18nKey="corporateEmissionForm:privacy-type-sublabel"
                    components={[<strong />]}
                  />
                </InputSubLabel>
              </StyledComponents.InputHeaderContainer>
              <DataPubliclyAvailable
                control={control}
                privacyError={errors.privacyType}
                publicLinkError={errors.publicLink}
                disabled={isEditingDisabled}
              />
            </StyledComponents.InputContainer>

            <StyledComponents.ButtonContainer>
              <Button
                type="submit"
                color="primary"
                data-testid={selectors.submitBtn}
                disabled={
                  !hasYearBeenSelected ||
                  isSubmitting ||
                  !!Object.keys(errors).length
                }
              >
                {getSaveButtonText(t, formType)}
              </Button>
              <ButtonSpacer />
              <Button
                type="submit"
                color="secondary"
                data-testid={selectors.cancelBtn}
                disabled={isSubmitting}
                onClick={closeModal}
              >
                {t('common:cancel')}
              </Button>
            </StyledComponents.ButtonContainer>
          </StyledComponents.Column>
          <StyledComponents.Column>
            <StyledComponents.SummaryContainer>
              <SummaryCard fieldValues={valuesForNetEmissions} />
            </StyledComponents.SummaryContainer>
          </StyledComponents.Column>
        </StyledComponents.Columns>
      </StyledComponents.Form>
    </FormProvider>
  );
};

CorporateEmissionForm.defaultProps = {
  onNewActualSuccess: undefined,
  selectedEmissionYear: undefined,
};
