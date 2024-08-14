import Button from 'components/Button';
import { CheckboxField } from 'components/Form/Fields/CheckboxField';
import { InputField } from 'components/Form/Fields/InputField';
import { TextareaField } from 'components/Form/Fields/TextareaField';
import { PATTERNS } from 'components/Form/utils';
import { InputContainer } from 'components/InputContainer';
import { InputError } from 'components/InputError';
import { InputLabel } from 'components/InputLabel';
import { Link } from 'components/Link';
import { SingleSelect } from 'components/SingleSelect';
import { useSendEmail } from 'effects/useSendEmail';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { EmailEnquiry } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import {
  GET_IN_TOUCH_FORM_SUBMIT,
  SUBJECT_GET_IN_TOUCH_PUBLIC,
} from 'utils/analyticsEvents';
import redirect from 'utils/redirect';
import {
  CONTACT_EMAIL_URI,
  SUCCESS_REDIRECT_PATH,
  TEXTAREA_MAX_LENGTH,
} from './constants';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import { ENQUIRY_OPTIONS, FIELD_KEYS, IGetInTouchFormValues } from './types';
import {
  getDefaultEnquiryOption,
  getEnquiryOptions,
  getErrorMessage,
  getSourceOptions,
} from './utils';

export const GetInTouchForm = () => {
  const { t } = useTranslation();
  const enquiryOptions = getEnquiryOptions(t);
  const sourceOptions = getSourceOptions(t);
  const router = useRouter();

  const {
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid },
    control,
    watch,
  } = useForm<IGetInTouchFormValues>({
    defaultValues: {
      [FIELD_KEYS.NAME]: '',
      [FIELD_KEYS.EMAIL]: '',
      [FIELD_KEYS.COMPANY]: '',
      [FIELD_KEYS.ENQUIRY]: getDefaultEnquiryOption(
        t,
        (router.query.enquiryOption as unknown) as ENQUIRY_OPTIONS
      ),
      [FIELD_KEYS.MESSAGE]: '',
      [FIELD_KEYS.COMMS_CONSENT]: false,
      [FIELD_KEYS.TERMS_CONSENT]: false,
      [FIELD_KEYS.SOURCE]: null,
    },
    mode: 'onChange',
  });

  const enquiryValue = watch(FIELD_KEYS.ENQUIRY);
  const commsValue = watch(FIELD_KEYS.COMMS_CONSENT);

  const mandatoryCommsConsent =
    enquiryValue?.value === EmailEnquiry.LOW_CARBON_SOLUTION;

  const [apiError, setApiError] = useState('');

  const hasFilledRightOptions =
    !mandatoryCommsConsent || (mandatoryCommsConsent && commsValue);

  const isDisabled = !hasFilledRightOptions || isSubmitting || !isValid;
  const [sendEmail] = useSendEmail(CONTACT_EMAIL_URI, {
    onError: (err) => {
      setApiError(err.message);
    },
    onCompleted: () => {
      redirect(SUCCESS_REDIRECT_PATH);
    },
  });

  const onSubmit = useCallback(
    async ({ enquiry, source, ...payload }: IGetInTouchFormValues) => {
      if (enquiry?.label) {
        trackEvent(SUBJECT_GET_IN_TOUCH_PUBLIC, {
          subject: enquiry.label,
        });

        await sendEmail({
          ...payload,
          enquiry: enquiry.value,
          source: source!.value,
        });
      }
    },
    []
  );
  return (
    <StyledComponents.Wrapper data-testid={selectors.getInTouchForm}>
      <StyledComponents.TitleContainer>
        <StyledComponents.Title>
          {t('publicGetInTouch:page-title')}
        </StyledComponents.Title>
      </StyledComponents.TitleContainer>

      <StyledComponents.SubtitleContainer>
        <StyledComponents.Subtitle>
          {t('publicGetInTouch:page-subtitle')}
        </StyledComponents.Subtitle>
      </StyledComponents.SubtitleContainer>

      <StyledComponents.MandatoryText>
        {t('publicGetInTouch:form-mandatory-text')}
      </StyledComponents.MandatoryText>

      <StyledComponents.Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name={FIELD_KEYS.NAME}
          rules={{
            required: true,
            maxLength: 26,
            minLength: 2,
          }}
          render={({ onChange, value, name }) => (
            <InputField
              dataTestId={selectors.name}
              errorMessage={getErrorMessage(t, errors.name)}
              id={FIELD_KEYS.NAME}
              label={t('publicGetInTouch:form-name-label')}
              name={name}
              placeholder={t('common:form-placeholder')}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name={FIELD_KEYS.COMPANY}
          rules={{
            required: true,
            maxLength: 160,
          }}
          render={({ onChange, value, name }) => (
            <InputField
              dataTestId={selectors.company}
              errorMessage={getErrorMessage(t, errors.company)}
              id={FIELD_KEYS.COMPANY}
              label={t('publicGetInTouch:form-company-label')}
              name={name}
              placeholder={t('common:form-placeholder')}
              onChange={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name={FIELD_KEYS.EMAIL}
          rules={{
            required: true,
            maxLength: 255,
            pattern: PATTERNS.email,
          }}
          render={({ onChange, value, name }) => (
            <InputField
              dataTestId={selectors.email}
              errorMessage={getErrorMessage(t, errors.email)}
              id={FIELD_KEYS.EMAIL}
              label={t('publicGetInTouch:form-email-label')}
              name={name}
              placeholder={t('common:form-placeholder')}
              onChange={onChange}
              type="email"
              value={value}
            />
          )}
        />

        <InputLabel
          dataTestId={selectors.enquiryLabel}
          htmlFor={FIELD_KEYS.ENQUIRY}
        >
          {t('publicGetInTouch:form-enquiry-label')}
        </InputLabel>
        <InputContainer testIdPrefix={selectors.enquiryLabel}>
          <Controller
            control={control}
            name={FIELD_KEYS.ENQUIRY}
            rules={{ required: true, minLength: 1 }}
            render={({ value, name, onChange }) => (
              <SingleSelect
                inputId={FIELD_KEYS.ENQUIRY}
                value={value}
                onChange={onChange}
                name={name}
                data-testid={selectors.enquiryInput}
                placeholder={t('common:form-placeholder')}
                options={enquiryOptions}
              />
            )}
          />
        </InputContainer>

        <InputLabel
          dataTestId={selectors.sourceLabel}
          htmlFor={FIELD_KEYS.SOURCE}
        >
          {t('publicGetInTouch:form-source-label')}
        </InputLabel>
        <InputContainer testIdPrefix={selectors.sourceLabel}>
          <Controller
            control={control}
            name={FIELD_KEYS.SOURCE}
            rules={{ required: true, minLength: 1 }}
            render={({ value, name, onChange }) => (
              <SingleSelect
                inputId={FIELD_KEYS.SOURCE}
                value={value}
                onChange={onChange}
                name={name}
                data-testid={selectors.sourceInput}
                placeholder={t('common:form-placeholder')}
                options={sourceOptions}
              />
            )}
          />
        </InputContainer>

        <Controller
          control={control}
          name={FIELD_KEYS.MESSAGE}
          rules={{
            required: true,
          }}
          render={({ value, onChange }) => (
            <TextareaField
              dataTestId={selectors.messageInput}
              errorMessage={getErrorMessage(t, errors[FIELD_KEYS.MESSAGE])}
              hasCharacterCount
              id={FIELD_KEYS.MESSAGE}
              label={t('publicGetInTouch:form-message-label')}
              maxLength={TEXTAREA_MAX_LENGTH}
              name={FIELD_KEYS.MESSAGE}
              onChange={onChange}
              placeholder={t('publicGetInTouch:message-input-placeholder')}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name={FIELD_KEYS.TERMS_CONSENT}
          rules={{ required: true }}
          render={({ value, onChange }) => (
            <CheckboxField
              dataTestId={selectors.termsConsentInput}
              id={FIELD_KEYS.TERMS_CONSENT}
              label={
                <Trans
                  components={[
                    <Link href="/terms-of-use" target="_blank" />,
                    <Link
                      href={t('common:b2b-privacy-notice-url')}
                      target="_blank"
                    />,
                  ]}
                  i18nKey="common:form-terms-consent-label"
                />
              }
              isChecked={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name={FIELD_KEYS.COMMS_CONSENT}
          render={({ value, onChange }) => (
            <CheckboxField
              dataTestId={selectors.commsConsentInput}
              id={FIELD_KEYS.COMMS_CONSENT}
              label={t('common:form-marketing-consent-label')}
              isChecked={value}
              onChange={onChange}
            />
          )}
        />

        <StyledComponents.ApiErrorWrapper>
          {apiError && (
            <InputError data-testid={selectors.formApiError}>
              {apiError}
            </InputError>
          )}
        </StyledComponents.ApiErrorWrapper>
        <StyledComponents.CtaContainer>
          <Button
            width="auto"
            type="submit"
            color="primary"
            data-testid={selectors.formSubmitBtn}
            disabled={isDisabled}
            onClick={() => trackEvent(GET_IN_TOUCH_FORM_SUBMIT)}
          >
            {t('publicGetInTouch:form-submit-btn')}
          </Button>
        </StyledComponents.CtaContainer>
      </StyledComponents.Form>
    </StyledComponents.Wrapper>
  );
};
