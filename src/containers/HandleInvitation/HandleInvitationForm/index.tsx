import useTranslation from 'next-translate/useTranslation';
import { useForm, Controller } from 'react-hook-form';
import { GetMe_me_company as Company } from 'types/GetMe';
import { RadioInputField } from 'components/Form/Fields/RadioInputField';
import { InputLabel } from 'components/InputLabel';
import { InputError } from 'components/InputError';
import Button from 'components/Button';
import { trackEvent } from 'utils/analytics';
import { HANDLE_INVITATION_FORM_SUBMISSION } from 'utils/analyticsEvents';

import { SingleSelect } from 'components/SingleSelect';
import {
  getErrorMessage,
  getDeclineReasonOptions,
  getLabelText,
} from './utils';
import { HandleInvitationPageTitle } from '../HandleInvitationPageTitle/HandleInvitationPageTitle';
import {
  IHandleInvitationFormValues,
  FIELD_KEYS,
  ACTION_IDS,
  ContentType,
} from '../types';

import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  company: Company;
  onSubmit: (data: IHandleInvitationFormValues) => Promise<void>;
  apiError: string;
  type: ContentType;
}

export const HandleInvitationForm = ({
  company,
  onSubmit,
  apiError,
  type,
}: IProps) => {
  const { t } = useTranslation();
  const companyName = company?.name.toUpperCase();
  const declineReasonOptions = getDeclineReasonOptions(t);

  const {
    control,
    handleSubmit,
    errors,
    watch,
    formState: { isSubmitting, isValid },
  } = useForm<IHandleInvitationFormValues>({
    defaultValues: {
      [String(FIELD_KEYS.ACTION_TYPE)]: '',
      [String(FIELD_KEYS.DECLINE_REASON)]: '',
    },
    mode: 'onChange',
  });

  const selectedActionType = watch(FIELD_KEYS.ACTION_TYPE);
  const selectedDeclineReason = watch(FIELD_KEYS.DECLINE_REASON);
  const isAcceptActionTypeChecked = selectedActionType === ACTION_IDS.ACCEPT;
  const isDeclineActionTypeChecked = selectedActionType === ACTION_IDS.DECLINE;

  const handleTrackEvent = () => {
    trackEvent(HANDLE_INVITATION_FORM_SUBMISSION, {
      companyId: company.id,
      reason: selectedDeclineReason.label,
      action: selectedActionType,
    });
  };

  return (
    <StyledComponents.Wrapper data-testid={selectors.handleInvitationForm}>
      <HandleInvitationPageTitle type={type} />
      <StyledComponents.Form onSubmit={handleSubmit(onSubmit)}>
        <StyledComponents.SubtextContainer>
          <StyledComponents.SubtextHeading>
            {t('handleInvitation:company-name-heading')}
          </StyledComponents.SubtextHeading>
          <StyledComponents.Subtext data-testid={selectors.companyName}>
            {companyName}
          </StyledComponents.Subtext>
        </StyledComponents.SubtextContainer>
        <InputLabel isHidden htmlFor={FIELD_KEYS.ACTIONS}>
          {t('handleInvitation:form-radio-label')}
        </InputLabel>
        <StyledComponents.RadioGroup>
          <Controller
            control={control}
            name={FIELD_KEYS.ACTION_TYPE}
            rules={{
              required: true,
            }}
            render={({ onChange }) => (
              <RadioInputField
                tabIndex={0}
                isVertical
                dataTestId={selectors.radioBtnAccept}
                id={ACTION_IDS.ACCEPT}
                isChecked={isAcceptActionTypeChecked}
                label={getLabelText(t, ACTION_IDS.ACCEPT)}
                name={FIELD_KEYS.ACTION_TYPE}
                onChange={({ target: { value } }) => onChange(value)}
                hasError={errors[FIELD_KEYS.ACTION_TYPE] !== undefined}
                value={ACTION_IDS.ACCEPT}
              />
            )}
          />
          <Controller
            control={control}
            name={FIELD_KEYS.ACTION_TYPE}
            rules={{
              required: true,
            }}
            render={({ onChange }) => (
              <RadioInputField
                tabIndex={-1}
                isVertical
                dataTestId={selectors.radioBtnDecline}
                id={ACTION_IDS.DECLINE}
                isChecked={isDeclineActionTypeChecked}
                label={getLabelText(t, ACTION_IDS.DECLINE)}
                name={FIELD_KEYS.ACTION_TYPE}
                onChange={({ target: { value } }) => onChange(value)}
                hasError={errors[FIELD_KEYS.ACTION_TYPE] !== undefined}
                value={ACTION_IDS.DECLINE}
              />
            )}
          />
        </StyledComponents.RadioGroup>

        <StyledComponents.ErrorWrapper>
          <InputError data-testid={selectors.actionsTypeInputError}>
            {getErrorMessage(t, errors[FIELD_KEYS.ACTION_TYPE])}
          </InputError>
        </StyledComponents.ErrorWrapper>

        {isDeclineActionTypeChecked && (
          <>
            <InputLabel
              dataTestId={selectors.declineReasonLabel}
              htmlFor={FIELD_KEYS.DECLINE_REASON}
            >
              {t('handleInvitation:form-decline-reason-label')}
            </InputLabel>
            <StyledComponents.DeclineDetailInputContainer>
              <Controller
                control={control}
                name={FIELD_KEYS.DECLINE_REASON}
                rules={{ required: true, minLength: 1 }}
                render={({ value, name, onChange }) => (
                  <SingleSelect
                    inputId={FIELD_KEYS.DECLINE_REASON}
                    value={value}
                    onChange={onChange}
                    name={name}
                    data-testid={selectors.declineReasonInput}
                    placeholder={t('common:form-placeholder')}
                    options={declineReasonOptions}
                  />
                )}
              />
            </StyledComponents.DeclineDetailInputContainer>
          </>
        )}

        <StyledComponents.ApiErrorWrapper>
          {apiError && (
            <InputError data-testid={selectors.handleInvitationFormApiError}>
              {apiError}
            </InputError>
          )}
        </StyledComponents.ApiErrorWrapper>

        <StyledComponents.CTAContainer xLMarginTop={isDeclineActionTypeChecked}>
          <Button
            width="auto"
            type="submit"
            color="primary"
            data-testid={selectors.onSubmitBtn}
            disabled={isSubmitting || !isValid}
            onClick={() => handleTrackEvent()}
          >
            {t('handleInvitation:form-save-btn')}
          </Button>
        </StyledComponents.CTAContainer>
      </StyledComponents.Form>
    </StyledComponents.Wrapper>
  );
};
