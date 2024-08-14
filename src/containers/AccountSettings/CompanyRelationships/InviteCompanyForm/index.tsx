import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Controller, useForm } from 'react-hook-form';
import debounce from 'debounce-promise';
import Trans from 'next-translate/Trans';

import { PATTERNS } from 'components/Form/utils';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import Button from 'components/Button';
import { InputError } from 'components/InputError';
import { CTAContainer } from 'components/CTAContainer';
import { SearchSelect } from 'components/SearchSelect';
import { TextareaField } from 'components/Form/Fields/TextareaField';
import { InputField } from 'components/Form/Fields/InputField';
import { CompanyRelationshipType } from 'types/globalTypes';
import { ModalForm } from 'components/ModalForm';
import { InfoToolTip } from 'components/InfoToolTip';
import { Link } from 'components/Link';
import { Validation } from 'utils/form';
import { SearchSelectOptionTagType } from 'components/SearchSelect/types';

import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import { IProps, FormValues, FIELD_KEYS } from './types';
import { useCompanyByDunsQuery, useDnBTypeaheadQuery } from './queries';
import { useCreateCompanyRelationshipMutation } from '../mutations';
import {
  errorsContainVetoedError,
  getCompanyOptions,
  getErrorMessage,
  handleAPIErrors,
  hasCompanyBeenVetoed,
  hasCompanyDeclinedInvite,
} from './utils';
import { mailTo } from '../../../../constants';
import { useInviteAndConnectMutation } from './mutations';

export const InviteCompanyForm = ({
  onClose,
  onCompleted,
  relationshipType,
  companyId,
  initialCompany,
}: IProps) => {
  const { t } = useTranslation();

  const [apiError, setApiError] = useState('');

  const [
    queryCompanyByDuns,
    { data: companyByDunsData, loading: isLoadingCompanyByDuns },
  ] = useCompanyByDunsQuery();

  const { refetch: fetchDnBResults } = useDnBTypeaheadQuery(
    { searchTerm: '' },
    true
  );

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    watch,
    setError,
    errors,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      [FIELD_KEYS.COMPANY]: initialCompany
        ? {
            value: initialCompany.duns,
            label: initialCompany.name,
            tag: {
              name: t('companyRelationships:subsidiary-company'),
              type: SearchSelectOptionTagType.SECONDARY,
            },
          }
        : null,
      [FIELD_KEYS.NOTE]: '',
      [FIELD_KEYS.FIRST_NAME]: '',
      [FIELD_KEYS.LAST_NAME]: '',
      [FIELD_KEYS.EMAIL]: '',
    },
    mode: 'onChange',
  });

  const isCompanyFieldDisabled = !!initialCompany;

  const watchCompany = watch(FIELD_KEYS.COMPANY);

  const mutationOptions = {
    onError: (err: Error) => {
      handleAPIErrors({
        apiError: err,
        setFieldError: setError,
        setApiError,
      });

      displayErrorMessage({
        title: t('companyRelationships:form-toast-save-title-error'),
        subtitle: t('companyRelationships:form-toast-save-subtitle-error'),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t('companyRelationships:form-toast-save-title-success'),
        subtitle: t('companyRelationships:form-toast-save-subtitle-success'),
      });
      onClose();
      if (onCompleted) {
        onCompleted();
      }
    },
  };

  const [createCompanyRelationship] = useCreateCompanyRelationshipMutation(
    mutationOptions
  );

  const [inviteAndConnect] = useInviteAndConnectMutation(mutationOptions);

  const onSubmit = async (data: FormValues) => {
    const isCustomerRelationship =
      relationshipType === CompanyRelationshipType.CUSTOMER;
    const customerIdValue = isCustomerRelationship
      ? companyByDunsData?.companyByDuns?.id
      : companyId;
    const supplierIdValue = isCustomerRelationship
      ? companyId
      : companyByDunsData?.companyByDuns?.id;

    if (
      customerIdValue &&
      supplierIdValue &&
      !hasCompanyDeclinedInvite(companyByDunsData?.companyByDuns?.status)
    ) {
      await createCompanyRelationship({
        variables: {
          input: {
            customerId: customerIdValue,
            supplierId: supplierIdValue,
            inviteType: relationshipType,
            note: data[FIELD_KEYS.NOTE],
          },
        },
      });
    } else if (watchCompany) {
      await inviteAndConnect({
        variables: {
          input: {
            inviteType: relationshipType,
            companyDuns: watchCompany.value,
            note: data[FIELD_KEYS.NOTE],
            email: data[FIELD_KEYS.EMAIL],
            firstName: data[FIELD_KEYS.FIRST_NAME],
            lastName: data[FIELD_KEYS.LAST_NAME],
          },
        },
      });
    }
  };

  useEffect(() => {
    if (watchCompany?.value) {
      queryCompanyByDuns({
        variables: {
          duns: watchCompany.value,
        },
      });
    }
  }, [watchCompany]);

  const fetchCompanies = async (value: string) => {
    setApiError('');

    if (value && value.length >= 3) {
      try {
        const { data } = await fetchDnBResults({
          searchTerm: value,
        });

        return getCompanyOptions(t, data?.dnbTypeaheadSearch);
      } catch (err) {
        setApiError(err.message);
      }
    }

    return [];
  };

  const debouncedFetchCompanies = debounce(fetchCompanies, 500);

  const isDisabled = isSubmitting || !isValid;
  const modalTitle =
    relationshipType === CompanyRelationshipType.CUSTOMER
      ? t('companyRelationships:invite-customer')
      : t('companyRelationships:invite-supplier');

  const shouldDisplayUserInputs = Boolean(
    watchCompany &&
      !isLoadingCompanyByDuns &&
      (!companyByDunsData?.companyByDuns ||
        hasCompanyDeclinedInvite(companyByDunsData?.companyByDuns?.status))
  );

  useEffect(() => {
    if (
      hasCompanyBeenVetoed(companyByDunsData?.companyByDuns?.status) &&
      !errorsContainVetoedError(errors[FIELD_KEYS.COMPANY]?.type)
    ) {
      setError(FIELD_KEYS.COMPANY, {
        type: Validation.CONNECTION_VETOED_ERROR_NAME,
      });
    } else if (
      !hasCompanyBeenVetoed(companyByDunsData?.companyByDuns?.status) &&
      errorsContainVetoedError(errors[FIELD_KEYS.COMPANY]?.type)
    ) {
      clearErrors(FIELD_KEYS.COMPANY);
    }
  }, [companyByDunsData?.companyByDuns, errors]);

  return (
    <ModalForm
      dataTestId={selectors.inviteCompanyForm}
      isLoading={false}
      title={modalTitle}
      onSubmit={handleSubmit(onSubmit)}
    >
      {!isCompanyFieldDisabled && (
        <StyledComponents.InfoWrapper>
          <InfoToolTip
            id={selectors.companyInputTooltip}
            offset={{
              left: 50,
              right: 0,
              bottom: 0,
              top: 0,
            }}
            place="bottom"
            title={t(
              'companyRelationships:invite-form-company-select-tooltip-title'
            )}
            ariaLabel={t(
              'companyRelationships:invite-form-company-select-tooltip-aria-label'
            )}
          >
            <Trans
              i18nKey="companyRelationships:invite-form-company-select-tooltip-content"
              components={[<Link href={mailTo} />]}
            />
          </InfoToolTip>
        </StyledComponents.InfoWrapper>
      )}
      <Controller
        control={control}
        name={FIELD_KEYS.COMPANY}
        rules={{
          required: true,
          maxLength: 26,
        }}
        render={({ onChange, value, name }) => (
          <SearchSelect
            id={FIELD_KEYS.COMPANY}
            name={name}
            value={value}
            maxMenuHeight={250}
            inputLabel={t(
              'companyRelationships:invite-form-company-select-label'
            )}
            placeholder={t(
              'companyRelationships:invite-form-company-select-placeholder'
            )}
            onChange={onChange}
            loadOptions={debouncedFetchCompanies}
            errorMessage={getErrorMessage(
              t,
              errors[FIELD_KEYS.COMPANY],
              watchCompany?.label
            )}
            isDisabled={isCompanyFieldDisabled}
          />
        )}
      />

      {!shouldDisplayUserInputs && <StyledComponents.InputSpacer />}

      {shouldDisplayUserInputs && (
        <>
          <StyledComponents.NewCompanyInfo>
            {t('companyRelationships:invite-form-new-company-explainer')}
          </StyledComponents.NewCompanyInfo>
          <StyledComponents.FormColumns>
            <StyledComponents.FormColumn>
              <Controller
                control={control}
                name={FIELD_KEYS.FIRST_NAME}
                rules={{
                  required: true,
                  minLength: 2,
                  maxLength: 255,
                }}
                render={({ onChange, value, name }) => (
                  <InputField
                    dataTestId={selectors.contactFirstName}
                    errorMessage={getErrorMessage(
                      t,
                      errors[FIELD_KEYS.FIRST_NAME]
                    )}
                    id={FIELD_KEYS.FIRST_NAME}
                    label={t(
                      'companyRelationships:invite-form-contact-firstname-label'
                    )}
                    name={name}
                    placeholder={t('common:form-placeholder')}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </StyledComponents.FormColumn>
            <StyledComponents.FormColumn>
              <Controller
                control={control}
                name={FIELD_KEYS.LAST_NAME}
                rules={{
                  required: true,
                  minLength: 2,
                  maxLength: 255,
                }}
                render={({ onChange, value, name }) => (
                  <InputField
                    dataTestId={selectors.contactLastName}
                    errorMessage={getErrorMessage(
                      t,
                      errors[FIELD_KEYS.LAST_NAME]
                    )}
                    id={FIELD_KEYS.LAST_NAME}
                    label={t(
                      'companyRelationships:invite-form-contact-lastname-label'
                    )}
                    name={name}
                    placeholder={t('common:form-placeholder')}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </StyledComponents.FormColumn>
          </StyledComponents.FormColumns>

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
                dataTestId={selectors.contactEmail}
                errorMessage={getErrorMessage(t, errors[FIELD_KEYS.EMAIL])}
                id={FIELD_KEYS.EMAIL}
                label={t(
                  'companyRelationships:invite-form-contact-email-label'
                )}
                name={name}
                placeholder={t('common:form-placeholder')}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </>
      )}

      <Controller
        control={control}
        name={FIELD_KEYS.NOTE}
        render={({ value, onChange }) => (
          <TextareaField
            isOptional
            dataTestId={selectors.note}
            hasCharacterCount
            id={FIELD_KEYS.NOTE}
            label={t('companyRelationships:invite-form-note-label')}
            maxLength={300}
            name={FIELD_KEYS.NOTE}
            onChange={onChange}
            placeholder={t('common:form-placeholder')}
            value={value}
          />
        )}
      />

      <StyledComponents.ApiErrorWrapper>
        {apiError && (
          <InputError data-testid={selectors.inviteCompanyApiError}>
            {apiError}
          </InputError>
        )}
      </StyledComponents.ApiErrorWrapper>

      <CTAContainer>
        <Button
          width="auto"
          color="secondary"
          data-testid={selectors.inviteCompanyCancel}
          disabled={isSubmitting}
          onClick={onClose}
        >
          {t('companyRelationships:form-cancel')}
        </Button>
        <Button
          width="auto"
          type="submit"
          color="primary"
          data-testid={selectors.inviteCompanySubmit}
          disabled={isDisabled}
        >
          {t('companyRelationships:form-submit')}
        </Button>
      </CTAContainer>
    </ModalForm>
  );
};
