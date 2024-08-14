import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import _ from 'lodash';
import { ModalForm } from 'components/ModalForm';
import { InputField } from 'components/Form/Fields/InputField';
import Button from 'components/Button';
import { CTAContainer } from 'components/CTAContainer';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { InputLabel } from 'components/InputLabel';
import { InputContainer } from 'components/InputContainer';
import { SingleSelect } from 'components/SingleSelect';
import { getExpertiseDomainOptions } from 'containers/AccountSettings/utils';
import { GetMe_me as Me } from 'types/GetMe';
import { useUpdateMe } from './mutations';
import {
  IProps,
  USER_DETAILS_FIELD_KEYS,
  EMAIL,
  IUserDetailsFormValues,
} from './types';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

const UserDetailsModalForm = ({ closeModal }: IProps) => {
  const { t } = useTranslation();
  const {
    firstName,
    lastName,
    email,
    expertiseDomain,
  } = useAuthenticatedUser();
  const [updateMe, { loading }] = useUpdateMe({
    onCompleted() {
      displaySuccessMessage({
        title: t('accountSettings:user-details-form-success'),
      });
      closeModal();
    },
    onError() {
      displayErrorMessage({
        title: t('accountSettings:user-details-form-error'),
      });
    },
  });

  const expertiseDomainOptions = getExpertiseDomainOptions(t);

  const findCurrentExpertiseDomainOption = () =>
    expertiseDomainOptions.find(({ value }) => value === expertiseDomain) ||
    null;

  const { control, handleSubmit, errors, watch, setValue, trigger } = useForm({
    defaultValues: {
      [USER_DETAILS_FIELD_KEYS.FIRST_NAME]: firstName ?? '',
      [USER_DETAILS_FIELD_KEYS.LAST_NAME]: lastName ?? '',
      [USER_DETAILS_FIELD_KEYS.EXPERTISE_DOMAIN]: findCurrentExpertiseDomainOption(),
    },
    mode: 'onChange',
  });

  const currentFirstName = watch(USER_DETAILS_FIELD_KEYS.FIRST_NAME);
  const currentLastName = watch(USER_DETAILS_FIELD_KEYS.LAST_NAME);
  const currentExpertiseDomain = watch(
    USER_DETAILS_FIELD_KEYS.EXPERTISE_DOMAIN
  );

  const inputRules = {
    required: t('form:error-required'),
    maxLength: {
      value: 26,
      message: t('form:error-max-length'),
    },
    minLength: {
      value: 2,
      message: t('form:min-2-characters'),
    },
  };

  const compareWithUser = (
    data: Pick<Me, 'firstName' | 'lastName' | 'expertiseDomain'>
  ) => {
    const userData = { firstName, lastName, expertiseDomain };
    return _.isEqual(data, userData);
  };

  const submit = (data: IUserDetailsFormValues) => {
    if (loading) return;

    const input = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      expertiseDomain: data.expertiseDomain?.value ?? null,
    };
    const isValueEmpty = !input.firstName || !input.lastName;
    const noChangeDetected = compareWithUser(input);

    if (isValueEmpty || noChangeDetected) {
      setValue(USER_DETAILS_FIELD_KEYS.FIRST_NAME, input.firstName);
      setValue(USER_DETAILS_FIELD_KEYS.LAST_NAME, input.lastName);
      if (isValueEmpty) trigger();
    } else {
      updateMe({ variables: { input } });
    }
  };

  const areValuesNotChanged = compareWithUser({
    firstName: currentFirstName,
    lastName: currentLastName,
    expertiseDomain: currentExpertiseDomain?.value ?? null,
  });

  const hasError = Boolean(Object.keys(errors).length);

  const isDisabled = areValuesNotChanged || hasError || loading;

  return (
    <ModalForm
      title={t('accountSettings:personal-preferences-edit-details')}
      dataTestId={selectors.userDetailsForm}
      isLoading={false}
      onSubmit={handleSubmit(submit)}
    >
      <StyledComponents.FormContent>
        <Controller
          control={control}
          name={USER_DETAILS_FIELD_KEYS.FIRST_NAME}
          rules={inputRules}
          render={({ onChange, value, name }) => (
            <InputField
              dataTestId={selectors.firstName}
              errorMessage={errors.firstName?.message}
              id={USER_DETAILS_FIELD_KEYS.FIRST_NAME}
              label={t('accountSettings:first-name')}
              name={name}
              placeholder={t('common:form-placeholder')}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name={USER_DETAILS_FIELD_KEYS.LAST_NAME}
          rules={inputRules}
          render={({ onChange, value, name }) => (
            <InputField
              dataTestId={selectors.lastName}
              errorMessage={errors.lastName?.message}
              id={USER_DETAILS_FIELD_KEYS.LAST_NAME}
              label={t('accountSettings:last-name')}
              name={name}
              placeholder={t('common:form-placeholder')}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <InputLabel
          isOptional
          htmlFor={USER_DETAILS_FIELD_KEYS.EXPERTISE_DOMAIN}
          dataTestId={selectors.expertiseDomain}
        >
          {t('accountSettings:invite-form-expertise-domain')}
        </InputLabel>
        <InputContainer testIdPrefix={selectors.expertiseDomain}>
          <Controller
            control={control}
            name={USER_DETAILS_FIELD_KEYS.EXPERTISE_DOMAIN}
            render={({ onChange, value, name }) => (
              <SingleSelect
                dataTestId={`${selectors.expertiseDomain}-select`}
                inputId={USER_DETAILS_FIELD_KEYS.EXPERTISE_DOMAIN}
                name={name}
                options={expertiseDomainOptions}
                onChange={onChange}
                placeholder="-"
                value={value}
              />
            )}
          />
        </InputContainer>
        <InputField
          dataTestId={selectors.email}
          id={EMAIL}
          label={t('accountSettings:email-label')}
          placeholder={t('common:form-placeholder')}
          value={email}
          name={EMAIL}
          isDisabled
          onChange={() => {}}
          renderAfterInput={
            <StyledComponents.EmailExtra>
              {t('accountSettings:user-details-form-email-extra')}
            </StyledComponents.EmailExtra>
          }
        />
      </StyledComponents.FormContent>
      <CTAContainer>
        <Button
          width="auto"
          color="secondary"
          data-testid={selectors.cancelBtn}
          onClick={closeModal}
        >
          {t('usersAdminDashboard:form-close-button')}
        </Button>
        <Button
          width="auto"
          type="submit"
          color="primary"
          data-testid={selectors.saveBtn}
          disabled={isDisabled}
        >
          {t('usersAdminDashboard:form-save-button')}
        </Button>
      </CTAContainer>
    </ModalForm>
  );
};

export default UserDetailsModalForm;
