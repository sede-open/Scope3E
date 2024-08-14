import Button from 'components/Button';
import { CTAContainer } from 'components/CTAContainer';
import { TextareaField } from 'components/Form/Fields/TextareaField';
import { InfoToolTip } from 'components/InfoToolTip';
import { InputContainer } from 'components/InputContainer';
import { InputError } from 'components/InputError';
import { InputLabel } from 'components/InputLabel';
import { ModalForm } from 'components/ModalForm';
import { SingleSelect } from 'components/SingleSelect';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CompaniesQuery_companies_data } from 'types/CompaniesQuery';
import { CompanyRelationshipsQuery_companyRelationships } from 'types/CompanyRelationshipsQuery';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { useUpdateCompanyRelationshipMutation } from '../mutations';
import { useCompaniesQuery } from '../queries';
import { getRelationshipCompany } from '../utils';
import { getNoOptionsMessage, InviteText } from './getNoOptionsMessage';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

const TEXTAREA_MAX_LENGTH = 500;

interface IProps {
  companyId: string;
  existingRelationship?: CompanyRelationshipsQuery_companyRelationships;
  onClose: () => void;
  openInviteCompanyModal: () => void;
  relationshipType: CompanyRelationshipType;
}

interface FormValues {
  id: string;
  note: string;
}

const FIELD_KEYS = {
  COMPANY: 'inviteCompany',
  NOTE: 'inviteNote',
} as const;

const getCompanyOptions = (companies: CompaniesQuery_companies_data[]) =>
  companies.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

export const CreateRelationshipForm = ({
  companyId,
  existingRelationship,
  onClose,
  openInviteCompanyModal,
  relationshipType,
}: IProps) => {
  const { t } = useTranslation();

  const [apiError, setApiError] = useState('');

  const hasExistingRelationship = existingRelationship !== undefined;

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      [String(FIELD_KEYS.COMPANY)]: existingRelationship?.id ?? '',
      [String(FIELD_KEYS.NOTE)]: existingRelationship?.note ?? '',
    },
    mode: 'onChange',
  });

  const isDisabled = isSubmitting || !isValid;

  const mutationOptions = {
    onError: (err: Error) => {
      setApiError(err.message);
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
    },
  };

  const [updateCompanyRelationship] = useUpdateCompanyRelationshipMutation(
    mutationOptions
  );

  const onSubmit = async (data: any) => {
    setApiError('');

    const status =
      relationshipType === CompanyRelationshipType.CUSTOMER
        ? InviteStatus.AWAITING_CUSTOMER_APPROVAL
        : InviteStatus.AWAITING_SUPPLIER_APPROVAL;

    await updateCompanyRelationship({
      variables: {
        input: {
          id: existingRelationship!.id,
          note: data[FIELD_KEYS.NOTE],
          status,
        },
      },
    });
  };

  const {
    data: companiesData,
    loading: isCompaniesDataLoading,
  } = useCompaniesQuery(hasExistingRelationship);

  const existingRelationshipCompany = hasExistingRelationship
    ? getRelationshipCompany({ relationship: existingRelationship!, companyId })
    : undefined;
  const companyOptions = hasExistingRelationship
    ? [
        {
          value: existingRelationshipCompany!.id,
          label: existingRelationshipCompany!.name,
        },
      ]
    : getCompanyOptions(companiesData?.companies.data || []);
  const companyNamePlaceholder = hasExistingRelationship
    ? existingRelationshipCompany!.name
    : '--';

  const inviteText = (
    <InviteText openInviteCompanyModal={openInviteCompanyModal} />
  );
  const NoOptionsMessage = getNoOptionsMessage(inviteText);

  return (
    <ModalForm
      dataTestId={selectors.createRelationshipForm}
      isLoading={isCompaniesDataLoading}
      title={t('companyRelationships:connect-form-title')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledComponents.TextContainer>
        <InputLabel
          dataTestId={selectors.createRelationshipNameLabel}
          htmlFor={FIELD_KEYS.COMPANY}
        >
          {t('companyRelationships:form-company-name-label')}
        </InputLabel>
        <StyledComponents.TooltipContainer>
          <InfoToolTip
            id="missing-company-tooltip"
            offset={{
              left: 50,
              right: 0,
              bottom: 0,
              top: 0,
            }}
            place="bottom"
            title={t(
              'companyRelationships:form-missing-company-tooltip-title',
              { relationship: relationshipType.toLowerCase() }
            )}
            content={t(
              'companyRelationships:form-missing-company-tooltip-content'
            )}
            ariaLabel={t(
              'companyRelationships:form-missing-company-tooltip-aria-label',
              { relationship: relationshipType.toLowerCase() }
            )}
          />
        </StyledComponents.TooltipContainer>
      </StyledComponents.TextContainer>
      <InputContainer testIdPrefix={selectors.createRelationshipNameInput}>
        <Controller
          control={control}
          name={FIELD_KEYS.COMPANY as 'id'}
          rules={{ required: true }}
          render={({ value, onChange }) => (
            <SingleSelect
              components={{
                NoOptionsMessage,
              }}
              dataTestId={selectors.createRelationshipNameInput}
              inputId={FIELD_KEYS.COMPANY}
              isDisabled={hasExistingRelationship}
              isSearchable={!hasExistingRelationship}
              maxMenuHeight={250}
              name={FIELD_KEYS.COMPANY}
              onChange={onChange}
              options={companyOptions}
              placeholder={companyNamePlaceholder}
              value={value}
            />
          )}
        />
      </InputContainer>

      <Controller
        control={control}
        name={FIELD_KEYS.NOTE as 'id'}
        render={({ value, onChange }) => (
          <TextareaField
            dataTestId={selectors.createRelationshipNoteInput}
            hasCharacterCount
            id={FIELD_KEYS.NOTE}
            isOptional
            label={t('companyRelationships:form-note-label')}
            maxLength={TEXTAREA_MAX_LENGTH}
            name={FIELD_KEYS.NOTE}
            onChange={onChange}
            placeholder={t('common:form-placeholder')}
            value={value}
          />
        )}
      />

      <StyledComponents.ApiErrorWrapper>
        {apiError && (
          <InputError data-testid={selectors.createRelationshipApiError}>
            {apiError}
          </InputError>
        )}
      </StyledComponents.ApiErrorWrapper>
      <CTAContainer>
        <Button
          width="auto"
          color="secondary"
          data-testid={selectors.createRelationshipCancel}
          disabled={isSubmitting}
          onClick={onClose}
        >
          {t('companyRelationships:form-cancel')}
        </Button>
        <Button
          width="auto"
          type="submit"
          color="primary"
          data-testid={selectors.createRelationshipSubmit}
          disabled={isDisabled}
        >
          {t('companyRelationships:form-submit')}
        </Button>
      </CTAContainer>
    </ModalForm>
  );
};

CreateRelationshipForm.defaultProps = {
  existingRelationship: undefined,
};
