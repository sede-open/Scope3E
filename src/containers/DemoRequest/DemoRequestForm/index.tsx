import { InputFieldRedesign } from 'components/Form/Fields/InputFieldRedesign';
import { PATTERNS } from 'components/Form/utils';
import {
  EmailSource,
  FIELD_KEYS,
  IGetInTouchFormValues,
} from 'containers/GetInTouch/GetInTouchForm/types';
import { getErrorMessage } from 'containers/GetInTouch/GetInTouchForm/utils';
import useTranslation from 'next-translate/useTranslation';
import { Controller, useForm } from 'react-hook-form';
import { CheckboxField } from 'components/Form/Fields/CheckboxField';
import Trans from 'next-translate/Trans';
import { Link } from 'components/Link';
import { InputError } from 'components/InputError';
import { trackEvent } from 'utils/analytics';
import {
  GET_IN_TOUCH_FORM_SUBMIT,
  SUBJECT_GET_IN_TOUCH_PUBLIC,
} from 'utils/analyticsEvents';
import { useState } from 'react';
import { useSendEmail } from 'effects/useSendEmail';
import { CONTACT_EMAIL_URI } from 'containers/GetInTouch/GetInTouchForm/constants';
import * as toast from 'utils/toast';
import { EmailEnquiry } from 'types/globalTypes';
import * as StyledComponents from './styledComponents';

export const DemoRequestForm = () => {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState('');

  const [sendEmail] = useSendEmail(CONTACT_EMAIL_URI, {
    onError: (err) => {
      setApiError(err.message);
    },
    onCompleted: () => {
      toast.displaySuccessMessage({
        title: t('common:request-sent-success-title'),
        subtitle: t('common:request-sent-success-subtitle'),
      });
    },
  });

  const {
    control,
    errors,
    handleSubmit,
    formState: { isSubmitting, isValid },
    watch,
  } = useForm<IGetInTouchFormValues>({
    defaultValues: {
      [FIELD_KEYS.NAME]: '',
      [FIELD_KEYS.EMAIL]: '',
      [FIELD_KEYS.COMPANY]: '',
      [FIELD_KEYS.COMMS_CONSENT]: false,
      [FIELD_KEYS.TERMS_CONSENT]: false,
    },
    mode: 'onChange',
  });
  const commsValue = watch(FIELD_KEYS.COMMS_CONSENT);
  const isDisabled = !commsValue || isSubmitting || !isValid;

  const onSubmit = async (payload: IGetInTouchFormValues) => {
    trackEvent(SUBJECT_GET_IN_TOUCH_PUBLIC, {
      subject: EmailEnquiry.DEMO,
    });

    await sendEmail({
      ...payload,
      enquiry: EmailEnquiry.DEMO,
      source: EmailSource.Other,
    });
  };

  return (
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
          <InputFieldRedesign
            errorMessage={getErrorMessage(t, errors.name)}
            id={FIELD_KEYS.NAME}
            label={t('publicGetInTouch:redesign-form-name-label')}
            name={name}
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
          <InputFieldRedesign
            errorMessage={getErrorMessage(t, errors.email)}
            id={FIELD_KEYS.EMAIL}
            label={t('publicGetInTouch:redesign-form-email-label')}
            name={name}
            onChange={onChange}
            type="email"
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
          <InputFieldRedesign
            errorMessage={getErrorMessage(t, errors.company)}
            id={FIELD_KEYS.COMPANY}
            label={t('publicGetInTouch:redesign-form-company-label')}
            name={name}
            onChange={onChange}
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
        rules={{ required: true }}
        render={({ value, onChange }) => (
          <CheckboxField
            id={FIELD_KEYS.COMMS_CONSENT}
            label={t('common:form-marketing-consent-label')}
            isChecked={value}
            onChange={onChange}
          />
        )}
      />

      {apiError && (
        <StyledComponents.ErrorContainer>
          <InputError>{apiError}</InputError>
        </StyledComponents.ErrorContainer>
      )}

      <StyledComponents.SubmitBtn
        type="submit"
        disabled={isDisabled}
        onClick={() => trackEvent(GET_IN_TOUCH_FORM_SUBMIT)}
      >
        {t('publicGetInTouch:sendMessage')}
      </StyledComponents.SubmitBtn>
    </StyledComponents.Form>
  );
};
