import Button from 'components/Button';
import { ButtonSpacer } from 'components/ButtonSpacer';
import { CheckboxField } from 'components/Form/Fields/CheckboxField';
import { TextareaField } from 'components/Form/Fields/TextareaField';
import { InputContainer } from 'components/InputContainer';
import { InputError } from 'components/InputError';
import { InputLabel } from 'components/InputLabel';
import { MultiSelect } from 'components/MultiSelect';
import { OpenInNewTabButton } from 'components/OpenInNewTabButton';
import { Text } from 'components/Text';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { EmailEnquiry } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import { CONTACT_US_FORM_SUBMISSION } from 'utils/analyticsEvents';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { FIELD_KEYS, TEXTAREA_MAX_LENGTH } from './constants';
import { useEnquiryEmail } from './mutations';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import { IContactUsFormValues, IProps } from './types';
import {
  getEnquiryOptions,
  getErrorMessage,
  getRegionOptions,
  onEnquiryChange,
  SOLUTION_EMAIL_ENQUIRY,
} from './utils';

export const ContactUs = ({ onClose, solutionId }: IProps) => {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState('');
  const user = useAuthenticatedUser();
  const companyName = user.company?.name;
  const userName = `${user.firstName} ${user.lastName}`;
  const userEmail = user.email;

  const enquiryOptions = getEnquiryOptions(t);
  const solutionEnquiryOption = enquiryOptions.find(
    ({ value }) => solutionId && value === SOLUTION_EMAIL_ENQUIRY[solutionId]
  );
  const defaultSolutionValue = solutionEnquiryOption
    ? [solutionEnquiryOption]
    : [];

  const [enquiryEmail] = useEnquiryEmail({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:contact-form-toast-error-title'),
        subtitle: t('common:contact-form-toast-error-subtitle'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:contact-form-toast-success-title'),
        subtitle: t('common:contact-form-toast-success-subtitle'),
      });
      onClose();
    },
  });

  const onSubmit = useCallback(
    async ({ enquiry, region, message, consent }: IContactUsFormValues) => {
      trackEvent(CONTACT_US_FORM_SUBMISSION, {
        company: companyName,
        enquiry: (enquiry.map((item) => item.value) as unknown) as string,
        region: (region?.map((item) => item.value) as unknown) as string,
      });
      await enquiryEmail({
        variables: {
          input: {
            name: userName,
            email: userEmail,
            company: companyName,
            enquiries: enquiry.map((item) => item.value),
            regions: region?.map((item) => item.value),
            message,
            consent,
          },
        },
      });
    },
    []
  );

  const {
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid },
    control,
    watch,
  } = useForm<IContactUsFormValues>({
    defaultValues: {
      enquiry: defaultSolutionValue,
      region: [],
      message: '',
      consent: false,
    },
    mode: 'onChange',
  });

  const enquiryValue = watch(FIELD_KEYS.ENQUIRY);
  const regionValue = watch(FIELD_KEYS.REGION);

  const shouldDisplayRegions = enquiryValue?.find(
    (e) => e.value !== EmailEnquiry.GENERAL_ENQUIRY
  );

  const isDisabled =
    isSubmitting ||
    !isValid ||
    enquiryValue.length === 0 ||
    (shouldDisplayRegions && !regionValue) ||
    (shouldDisplayRegions && regionValue && regionValue.length === 0);

  return (
    <StyledComponents.StyledWrapper data-testid={selectors.form}>
      <StyledComponents.StyledTitle
        data-testid={selectors.formTitle}
        color={Tundora}
        size="32px"
        family={exampleBold}
        as="h1"
      >
        {t('contactUs:contact-us-form-heading')}
      </StyledComponents.StyledTitle>

      <StyledComponents.MandatoryText>
        {t('contactUs:form-mandatory-text')}
      </StyledComponents.MandatoryText>

      <StyledComponents.StyledForm onSubmit={handleSubmit(onSubmit)}>
        <InputLabel
          dataTestId={selectors.enquiryLabel}
          htmlFor={FIELD_KEYS.ENQUIRY}
        >
          {`${t('contactUs:contact-us-form-enquiry-label')} *`}
        </InputLabel>

        <InputContainer testIdPrefix={selectors.enquiryInput}>
          <Controller
            control={control}
            name={FIELD_KEYS.ENQUIRY}
            rules={{ required: true }}
            render={({ value, onChange }) => (
              <MultiSelect
                inputId={FIELD_KEYS.ENQUIRY}
                value={value}
                onChange={(newValue) => onEnquiryChange(newValue, onChange)}
                name={FIELD_KEYS.ENQUIRY}
                data-testid={selectors.enquiryInput}
                placeholder={t('common:form-placeholder')}
                options={enquiryOptions}
              />
            )}
          />
        </InputContainer>

        {enquiryValue && shouldDisplayRegions && (
          <>
            <InputLabel
              dataTestId={selectors.regionLabel}
              htmlFor={FIELD_KEYS.REGION}
            >
              {`${t('contactUs:contact-us-form-region-label')} *`}
            </InputLabel>
            <InputContainer testIdPrefix={selectors.regionInput}>
              <Controller
                control={control}
                name={FIELD_KEYS.REGION}
                rules={{ required: true }}
                render={({ value, onChange }) => (
                  <MultiSelect
                    inputId={FIELD_KEYS.REGION}
                    value={value}
                    onChange={onChange}
                    name={FIELD_KEYS.REGION}
                    placeholder={t('common:form-placeholder')}
                    options={getRegionOptions(t)}
                  />
                )}
              />
            </InputContainer>
          </>
        )}

        <Controller
          control={control}
          name={FIELD_KEYS.MESSAGE as 'id'}
          rules={{
            required: true,
          }}
          render={({ value, onChange }) => (
            <TextareaField
              dataTestId={selectors.messageInput}
              errorMessage={getErrorMessage(t, errors[FIELD_KEYS.MESSAGE])}
              hasCharacterCount
              id={FIELD_KEYS.MESSAGE}
              label={`${t('contactUs:contact-us-form-message-label')} *`}
              maxLength={TEXTAREA_MAX_LENGTH}
              name={FIELD_KEYS.MESSAGE}
              onChange={onChange}
              placeholder={t('common:form-placeholder')}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name={FIELD_KEYS.CONSENT}
          rules={{ required: true }}
          render={({ value, onChange }) => (
            <CheckboxField
              dataTestId={selectors.consentInput}
              id={FIELD_KEYS.CONSENT}
              label={t('common:form-marketing-consent-label')}
              isChecked={value}
              onChange={onChange}
            />
          )}
        />

        <StyledComponents.PrivacyPolicyMessage>
          <Text color={Tundora} size="14px">
            {t('common:form-privacy-policy-message')}
          </Text>
          <StyledComponents.IconSpacer />
          <OpenInNewTabButton
            href="https://www.example.com/privacy/b2b-notice.html"
            text={t('common:form-privacy-policy-link')}
          />
        </StyledComponents.PrivacyPolicyMessage>

        <StyledComponents.ApiErrorWrapper>
          {apiError && (
            <InputError data-testid={selectors.formApiError}>
              {apiError}
            </InputError>
          )}
        </StyledComponents.ApiErrorWrapper>
        <StyledComponents.ButtonContainer>
          <Button
            onClick={onClose}
            color="secondary"
            data-testid={selectors.formCancelBtn}
            disabled={isSubmitting}
          >
            {t('contactUs:contact-us-form-close-btn')}
          </Button>
          <ButtonSpacer />
          <Button
            width="auto"
            type="submit"
            color="primary"
            data-testid={selectors.formSubmitBtn}
            disabled={Boolean(isDisabled)}
          >
            {t('contactUs:contact-us-form-submit-btn')}
          </Button>
        </StyledComponents.ButtonContainer>
      </StyledComponents.StyledForm>
    </StyledComponents.StyledWrapper>
  );
};

ContactUs.defaultProps = {
  solutionId: undefined,
};
