import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { CTAContainer } from 'components/CTAContainer';
import { ModalForm } from 'components/ModalForm';
import { InputError } from 'components/InputError';
import { AuthProvider, RoleName } from 'types/globalTypes';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { useAccountSettingsData } from 'containers/AccountSettings/queries';
import Button from 'components/Button';
import { InputField } from 'components/Form/Fields/InputField';
import { PATTERNS } from 'components/Form/utils';
import { OptionType, SingleSelect } from 'components/SingleSelect';
import { InputContainer } from 'components/InputContainer';
import { InputLabel } from 'components/InputLabel';
import { getExpertiseDomainOptions } from 'containers/AccountSettings/utils';
import { getRoleOptions, getRoleTypeFromRoles } from 'utils/roleHelpers';
import { OptionWithMeta } from 'components/SingleSelect/OptionWithMeta';
import { IProps, IUserInviteFormValues, FIELD_KEYS } from './types';
import { getErrorMessage } from './utils';

import * as StyledComponents from '../styledComponents';
import * as selectors from '../../../selectors';
import { useCreateCompanyUser, useEditCompanyUser } from '../mutations';

const toSentenceCase = (text: string | null | undefined) =>
  `${String(text).charAt(0).toUpperCase()}${String(text)
    .slice(1)
    .toLowerCase()}`.replace('_', ' ');

const InviteForm = ({ onClose, companyUser }: IProps) => {
  const { t } = useTranslation();
  const [apiError, setApiError] = useState('');

  const companyUserToEdit = companyUser;

  const user = useAuthenticatedUser();
  const companyId = user.company?.id;
  if (!companyId) {
    return null;
  }

  const roleOptions = getRoleOptions(t).filter(
    (roleOption) => roleOption.value !== RoleName.ADMIN
  );

  const existingRole = getRoleTypeFromRoles(
    companyUser?.roles?.map((role) => role.name) ?? []
  );
  const selectedRoleOption: OptionType = roleOptions.find(
    (roleOption) => roleOption.value === existingRole
  ) ?? { label: '', value: '' };

  const {
    control,
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid },
  } = useForm<IUserInviteFormValues>({
    defaultValues: {
      [FIELD_KEYS.FIRST_NAME]: companyUser?.firstName ?? '',
      [FIELD_KEYS.LAST_NAME]: companyUser?.lastName ?? '',
      [FIELD_KEYS.EMAIL]: companyUser?.email ?? '',
      [String(FIELD_KEYS.EXPERTISE_DOMAIN)]:
        companyUser?.expertiseDomain ?? undefined,
      [FIELD_KEYS.ROLE_ID_TYPE]: selectedRoleOption,
    },
    mode: 'onChange',
  });

  const { loading: isAccountSettingsDataLoading } = useAccountSettingsData();

  const expertiseDomainOptions = getExpertiseDomainOptions(t);
  const isEditingDisabled = companyUser === undefined;

  const isEditTitle = companyUser
    ? t('accountSettings:edit-invite-form-heading')
    : t('accountSettings:invite-form-heading');

  const isEditSaveButton = companyUser
    ? t('accountSettings:form-save-updates-button')
    : t('accountSettings:form-invite-button');

  const [createCompanyUser] = useCreateCompanyUser({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:save-toast-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:save-toast-success'),
      });
      onClose();
    },
  });

  const [editCompanyUser] = useEditCompanyUser({
    onError: (err) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('common:save-toast-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('common:save-toast-success'),
      });
      onClose();
    },
  });

  const onUserInviteFormSubmit = async (payload: IUserInviteFormValues) => {
    if (companyUserToEdit) {
      await editCompanyUser({
        variables: {
          input: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            roleName: payload.roleId.value as RoleName,
            expertiseDomain: payload.expertiseDomain?.value,
          },
        },
      });
    } else {
      await createCompanyUser({
        variables: {
          input: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            expertiseDomain: payload.expertiseDomain?.value,
            roleName: payload.roleId.value as RoleName,
            companyId,
            authProvider: payload.email.endsWith('@example.com')
              ? AuthProvider.PORT
              : AuthProvider.AKAMAI,
          },
        },
      });
    }
  };

  return (
    <ModalForm
      title={isEditTitle}
      dataTestId={selectors.inviteUserForm}
      isLoading={isAccountSettingsDataLoading}
      onSubmit={handleSubmit(onUserInviteFormSubmit)}
    >
      <Controller
        control={control}
        name={FIELD_KEYS.FIRST_NAME}
        rules={{
          required: true,
          maxLength: 26,
          minLength: 2,
        }}
        render={({ onChange, value, name }) => (
          <InputField
            dataTestId={selectors.firstName}
            errorMessage={getErrorMessage(t, errors[FIELD_KEYS.FIRST_NAME])}
            id={FIELD_KEYS.FIRST_NAME}
            label={t('accountSettings:invite-form-first-name')}
            name={name}
            placeholder={t('common:form-placeholder')}
            onChange={onChange}
            value={value}
            isDisabled={!isEditingDisabled}
          />
        )}
      />

      <Controller
        control={control}
        name={FIELD_KEYS.LAST_NAME}
        rules={{
          required: true,
          maxLength: 26,
          minLength: 2,
        }}
        render={({ onChange, value, name }) => (
          <InputField
            dataTestId={selectors.lastName}
            errorMessage={getErrorMessage(t, errors[FIELD_KEYS.LAST_NAME])}
            id={FIELD_KEYS.FIRST_NAME}
            label={t('accountSettings:invite-form-last-name')}
            name={name}
            placeholder={t('common:form-placeholder')}
            onChange={onChange}
            value={value}
            isDisabled={!isEditingDisabled}
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
          validate: (e) => !e.endsWith('@example.com'),
        }}
        render={({ onChange, value, name }) => (
          <InputField
            dataTestId={selectors.email}
            errorMessage={getErrorMessage(t, errors[FIELD_KEYS.EMAIL])}
            id={FIELD_KEYS.FIRST_NAME}
            label={t('accountSettings:invite-form-email')}
            name={name}
            placeholder={t('common:form-placeholder')}
            onChange={onChange}
            isDisabled={!isEditingDisabled}
            value={value}
            type="email"
          />
        )}
      />
      <InputLabel
        isOptional
        htmlFor={FIELD_KEYS.EXPERTISE_DOMAIN}
        dataTestId={selectors.expertiseDomain}
      >
        {t('accountSettings:invite-form-expertise-domain')}
      </InputLabel>
      <InputContainer testIdPrefix={selectors.expertiseDomain}>
        {companyUser?.expertiseDomain !== null && !isEditingDisabled ? (
          <Controller
            control={control}
            name={FIELD_KEYS.EXPERTISE_DOMAIN}
            render={({ value, onChange }) => (
              <SingleSelect
                dataTestId={`${selectors.expertiseDomain}-input`}
                inputId={FIELD_KEYS.EXPERTISE_DOMAIN}
                name={FIELD_KEYS.EXPERTISE_DOMAIN}
                onChange={onChange}
                options={expertiseDomainOptions}
                placeholder={toSentenceCase(companyUser?.expertiseDomain)}
                value={value}
                isDisabled={!isEditingDisabled}
              />
            )}
          />
        ) : (
          <Controller
            control={control}
            name={FIELD_KEYS.EXPERTISE_DOMAIN}
            render={({ value, onChange }) => (
              <SingleSelect
                dataTestId={`${selectors.expertiseDomain}-input`}
                inputId={FIELD_KEYS.EXPERTISE_DOMAIN}
                name={FIELD_KEYS.EXPERTISE_DOMAIN}
                onChange={onChange}
                options={expertiseDomainOptions}
                placeholder="-"
                value={value}
                isDisabled={!isEditingDisabled}
              />
            )}
          />
        )}
      </InputContainer>

      <InputLabel htmlFor={FIELD_KEYS.ROLE_ID_TYPE}>
        {t('accountSettings:invite-form-role-type')}
      </InputLabel>
      <Controller
        control={control}
        name={FIELD_KEYS.ROLE_ID_TYPE}
        rules={{
          required: true,
        }}
        render={({ value, onChange }) => (
          <>
            <SingleSelect
              menuPlacement="top"
              defaultValue={selectedRoleOption}
              placeholder={t('common:form-placeholder')}
              dataTestId={selectors.userRoleType}
              inputId={FIELD_KEYS.ROLE_ID_TYPE}
              maxMenuHeight={180}
              name={FIELD_KEYS.ROLE_ID_TYPE}
              onChange={onChange}
              options={roleOptions}
              value={value}
              hasError={errors[FIELD_KEYS.ROLE_ID_TYPE] !== undefined}
              isSearchable
              styles={{
                control: (provided) => ({
                  ...provided,
                  padding: '4px',
                }),
              }}
              components={{ Option: OptionWithMeta }}
            />
          </>
        )}
      />
      <StyledComponents.ApiErrorWrapper>
        {apiError && (
          <InputError data-testid={selectors.inviteUserFormApiError}>
            {apiError}
          </InputError>
        )}
      </StyledComponents.ApiErrorWrapper>

      <CTAContainer>
        <Button
          width="auto"
          color="secondary"
          data-testid={selectors.onCloseBtn}
          disabled={isSubmitting}
          onClick={onClose}
        >
          {t('accountSettings:form-close-button')}
        </Button>
        <Button
          width="auto"
          type="submit"
          color="primary"
          data-testid={selectors.onSubmitBtn}
          disabled={isSubmitting || !isValid}
        >
          {isEditSaveButton}
        </Button>
      </CTAContainer>
    </ModalForm>
  );
};

export default InviteForm;
