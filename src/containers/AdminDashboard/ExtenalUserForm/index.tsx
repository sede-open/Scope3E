import { useForm, Controller } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { CTAContainer } from 'components/CTAContainer';
import { ModalForm } from 'components/ModalForm';
import { InputError } from 'components/InputError';
import Button from 'components/Button';
import { InputField } from 'components/Form/Fields/InputField';
import { PATTERNS } from 'components/Form/utils';
import { OptionType, SingleSelect } from 'components/SingleSelect';
import { InputContainer } from 'components/InputContainer';
import { InputLabel } from 'components/InputLabel';
import { OptionWithMeta } from 'components/SingleSelect/OptionWithMeta';
import { getRoleTypeFromRoles, getRoleOptions } from 'utils/roleHelpers';
import { IProps, IExternalUserFormValues, FIELD_KEYS } from './types';
import { getErrorMessage } from '../utils';
import { getApprovedCompanyOptions } from '../Users/utils';
import * as selectors from './selectors';
import * as StyledComponents from '../styledComponents';

const ExternalUserForm = ({
  onClose,
  onSubmit,
  companies,
  apiError,
  user,
  isLoading,
}: IProps) => {
  const { t } = useTranslation();
  const companyOptions = getApprovedCompanyOptions(companies || []);
  const selectedCompanyOption: OptionType = !user?.company
    ? { label: '', value: '' }
    : {
        label: user.company.name,
        value: user.company.id,
      };

  const roleOptions = getRoleOptions(t);
  const existingRole = getRoleTypeFromRoles(
    user?.roles?.map((role) => role.name) ?? []
  );
  const selectedRoleOption: OptionType = roleOptions.find(
    (roleOption) => roleOption.value === existingRole
  ) ?? { label: '', value: '' };

  const {
    control,
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid },
  } = useForm<IExternalUserFormValues>({
    defaultValues: {
      [FIELD_KEYS.FIRST_NAME]: user?.firstName ?? '',
      [FIELD_KEYS.LAST_NAME]: user?.lastName ?? '',
      [FIELD_KEYS.EMAIL]: user?.email ?? '',
      [FIELD_KEYS.COMPANY_ID]: selectedCompanyOption,
      [FIELD_KEYS.ROLE_ID_TYPE]: selectedRoleOption,
    },
    mode: 'onChange',
  });

  const isEditingDisabled = user === undefined;

  const isEditTitle = user
    ? t('usersAdminDashboard:edit-external-form-heading')
    : t('usersAdminDashboard:add-external-form-heading');

  return (
    <ModalForm
      title={isEditTitle}
      dataTestId={selectors.externalUserForm}
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        name={FIELD_KEYS.FIRST_NAME}
        rules={{
          required: true,
          minLength: 2,
          maxLength: 26,
        }}
        render={({ onChange, value, name }) => (
          <InputField
            dataTestId={selectors.firstName}
            errorMessage={getErrorMessage(t, errors[FIELD_KEYS.FIRST_NAME])}
            id={FIELD_KEYS.FIRST_NAME}
            label={t('usersAdminDashboard:form-first-name-label')}
            name={name}
            placeholder={t('common:form-placeholder')}
            onChange={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name={FIELD_KEYS.LAST_NAME}
        rules={{
          required: true,
          minLength: 2,
          maxLength: 26,
        }}
        render={({ onChange, value, name }) => (
          <InputField
            dataTestId={selectors.lastName}
            errorMessage={getErrorMessage(t, errors[FIELD_KEYS.LAST_NAME])}
            id={FIELD_KEYS.FIRST_NAME}
            label={t('usersAdminDashboard:form-last-name-label')}
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
            errorMessage={getErrorMessage(t, errors[FIELD_KEYS.EMAIL])}
            id={FIELD_KEYS.FIRST_NAME}
            label={t('usersAdminDashboard:form-email-label')}
            name={name}
            placeholder={t('common:form-placeholder')}
            onChange={onChange}
            value={value}
            isDisabled={!isEditingDisabled}
            type="email"
          />
        )}
      />
      <InputLabel htmlFor={FIELD_KEYS.COMPANY_ID}>
        {t('usersAdminDashboard:form-company-label')}
      </InputLabel>
      <InputContainer testIdPrefix={selectors.companyInput}>
        <Controller
          control={control}
          name={FIELD_KEYS.COMPANY_ID}
          rules={{ required: true }}
          render={({ value, onChange }) => (
            <>
              <SingleSelect
                defaultValue={selectedCompanyOption}
                placeholder={t('common:form-placeholder')}
                dataTestId={selectors.companyId}
                inputId={FIELD_KEYS.COMPANY_ID}
                maxMenuHeight={180}
                name={FIELD_KEYS.COMPANY_ID}
                onChange={onChange}
                options={companyOptions}
                value={value}
                hasError={errors[FIELD_KEYS.COMPANY_ID] !== undefined}
                isSearchable
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: '4px',
                  }),
                }}
              />
            </>
          )}
        />
      </InputContainer>
      <InputLabel htmlFor={FIELD_KEYS.ROLE_ID_TYPE}>
        {t('usersAdminDashboard:form-role-label')}
      </InputLabel>
      <InputContainer testIdPrefix={selectors.roleInput}>
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
                dataTestId={selectors.roleIdType}
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
      </InputContainer>
      <StyledComponents.ApiErrorWrapper>
        {apiError && (
          <InputError data-testid={selectors.externalUserFormApiError}>
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
          {t('usersAdminDashboard:form-close-button')}
        </Button>
        <Button
          width="auto"
          type="submit"
          color="primary"
          data-testid={selectors.onSubmitBtn}
          disabled={isSubmitting || !isValid}
        >
          {t('usersAdminDashboard:form-save-button')}
        </Button>
      </CTAContainer>
    </ModalForm>
  );
};

export default ExternalUserForm;
