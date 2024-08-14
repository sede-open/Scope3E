import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Controller, useForm } from 'react-hook-form';

import {
  CompanyRelationshipType,
  EmissionAllocationDirection,
  EmissionAllocationStatus,
  InviteStatus,
} from 'types/globalTypes';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import Trans from 'next-translate/Trans';
import { Link } from 'components/Link';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { CTAContainer } from 'components/CTAContainer';
import { InputContainer } from 'components/InputContainer';
import { InputError } from 'components/InputError';
import { InputLabel } from 'components/InputLabel';
import { OptionType, SingleSelect } from 'components/SingleSelect';
import Button from 'components/Button';
import { InfoToolTip } from 'components/InfoToolTip';
import { NoOptionsMessage } from 'components/NoOptionsMessage';
import { TextareaField } from 'components/Form/Fields/TextareaField';
import { ModalForm } from 'components/ModalForm';
import { FormField } from 'components/Form/FormField';
import { getYearSelectOptions } from 'utils/emissions';

import {
  useUpdateEmissionAllocationMutation,
  useCreateEmissionAllocationMutation,
} from '../../mutations';
import {
  useAllocateEmissionsFormQuery,
  useEmissionAllocationsQuery,
} from '../../queries';
import * as StyledComponents from '../../styledComponents';
import * as selectors from './selectors';
import { getCompanyOptions } from './utils';
import { FormValues, IProps } from './types';
import { FIELD_KEYS } from './constants';

// NOTE :: there is also varchar constraint
// on this field in the DB for note field
const TEXTAREA_MAX_LENGTH = 300;

export const RequestAllocationForm = ({
  allocation,
  isEditing,
  onClose,
  selectedYear,
  yearOptions,
}: IProps) => {
  const {
    company: userCompany,
    canEditSupplyDashboard,
  } = useAuthenticatedUser();
  const companyId = userCompany?.id;

  if (!companyId || !canEditSupplyDashboard) {
    return null;
  }

  if (isEditing && !allocation) {
    throw new Error('Missing allocation');
  }

  const { t } = useTranslation();

  const [apiError, setApiError] = useState('');

  const mutationOptions = {
    onError: (err: Error) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t(
          'valueChain:request-allocation-form-request-toaster-title-error'
        ),
        subtitle: t(
          'valueChain:request-allocation-form-request-toaster-subtitle-error'
        ),
      });
    },
    onCompleted: () => {
      displaySuccessMessage({
        title: t(
          'valueChain:request-allocation-form-request-toaster-title-success'
        ),
        subtitle: t(
          'valueChain:request-allocation-form-request-toaster-subtitle-success'
        ),
      });

      onClose();
    },
  };

  const {
    data: allocateEmissionsFormData,
    loading: isAllocateEmissionsFormDataLoading,
  } = useAllocateEmissionsFormQuery({
    companyId,
    relationshipType: CompanyRelationshipType.SUPPLIER,
    status: InviteStatus.APPROVED,
  });

  const companyOptions = getCompanyOptions(
    allocateEmissionsFormData?.companyRelationships || []
  );

  const selectedSupplierOption: OptionType | undefined = isEditing
    ? {
        label: allocation?.supplier?.name,
        id: allocation?.supplier?.id,
      }
    : undefined;

  const selectedYearOption: OptionType = {
    label: selectedYear,
    value: selectedYear,
  };

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
      [String(FIELD_KEYS.YEAR)]: selectedYearOption,
      [String(FIELD_KEYS.SUPPLIER)]: selectedSupplierOption || '',
      // NOTE :: always clear the existing message from the customer
      [String(FIELD_KEYS.NOTE)]: '',
    },
    mode: 'onChange',
  });

  const yearValue: OptionType = watch(FIELD_KEYS.YEAR);
  const supplierValue: OptionType = watch(FIELD_KEYS.SUPPLIER);

  const {
    data: emissionAllocationsData,
    loading: isEmissionAllocationsDataLoading,
    refetch: refetchAllocationData,
  } = useEmissionAllocationsQuery({
    companyId,
    emissionAllocation:
      EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
    statuses: null,
    year: selectedYear,
  });

  const allocationForSupplier = emissionAllocationsData?.emissionAllocations.filter(
    (e) => e.supplier && e.supplier?.id === supplierValue.value
  )[0];

  useEffect(() => {
    if (yearValue.value) {
      refetchAllocationData({
        companyId,
        emissionAllocation:
          EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
        statuses: null,
        year: yearValue.value as number,
      });
    }
  }, [yearValue]);

  useEffect(() => {
    const allocationStatus = allocationForSupplier?.status;

    switch (allocationStatus) {
      case EmissionAllocationStatus.AWAITING_APPROVAL:
        setError(FIELD_KEYS.SUPPLIER, {
          message: t(
            'valueChain:request-allocation-form-pending-allocation-error',
            { year: yearValue.value }
          ),
          type: 'allocation-exists',
        });
        break;
      case EmissionAllocationStatus.APPROVED:
        setError(FIELD_KEYS.SUPPLIER, {
          message: t(
            'valueChain:request-allocation-form-approved-allocation-error',
            { year: yearValue.value }
          ),
          type: 'allocation-exists',
        });
        break;
      default:
        if (errors[FIELD_KEYS.SUPPLIER]) {
          clearErrors(FIELD_KEYS.SUPPLIER);
        }
    }
  }, [supplierValue, allocationForSupplier, yearValue]);

  const corporateEmissionForYear = allocateEmissionsFormData?.corporateEmissions.find(
    ({ year }) => year === yearValue.value
  );

  const [createEmissionAllocation] = useCreateEmissionAllocationMutation(
    mutationOptions
  );
  const [updateEmissionAllocation] = useUpdateEmissionAllocationMutation(
    mutationOptions
  );

  const onSubmit = async (data: any) => {
    setApiError('');

    const {
      supplier: { value: supplierId },
      note,
      year: { value: year },
    } = data;

    if (isEditing || allocationForSupplier) {
      const allocationId = allocation?.id ?? allocationForSupplier!.id;
      await updateEmissionAllocation({
        variables: {
          input: {
            id: allocationId,
            note,
            status: EmissionAllocationStatus.REQUESTED,
          },
        },
      });
    } else {
      await createEmissionAllocation({
        variables: {
          input: {
            supplierId,
            customerId: companyId,
            year,
            note,
            customerEmissionId: corporateEmissionForYear?.id,
          },
        },
      });
    }
  };

  const companyNoOptionsMessage = t(
    'valueChain:allocation-form-supplier-no-options-message'
  );

  const isDisabled =
    isSubmitting || !isValid || isEmissionAllocationsDataLoading;

  const yearSelectOptions = getYearSelectOptions(yearOptions);

  return (
    <ModalForm
      dataTestId={selectors.requestEmissionsForm}
      isLoading={isAllocateEmissionsFormDataLoading}
      title={t('valueChain:request-allocation-form-title')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledComponents.TextContainer>
        <InputLabel
          dataTestId={selectors.requestEmissionsYearLabel}
          htmlFor={FIELD_KEYS.YEAR}
        >
          {t('valueChain:allocation-form-year-label')}
        </InputLabel>
      </StyledComponents.TextContainer>
      <InputContainer testIdPrefix={selectors.requestEmissionsYearInput}>
        <Controller
          control={control}
          name={FIELD_KEYS.YEAR}
          rules={{ required: !isEditing }}
          render={({ value, onChange }) => (
            <SingleSelect
              dataTestId={selectors.requestEmissionsYearInput}
              inputId={FIELD_KEYS.YEAR}
              isDisabled={yearSelectOptions.length === 1 || isEditing}
              maxMenuHeight={250}
              name={FIELD_KEYS.YEAR}
              onChange={onChange}
              options={yearSelectOptions}
              value={value}
            />
          )}
        />
      </InputContainer>

      <StyledComponents.TextContainer>
        <InputLabel
          dataTestId={selectors.requestEmissionsSupplierLabel}
          htmlFor={FIELD_KEYS.SUPPLIER}
        >
          {t('valueChain:request-allocation-form-supplier-label')}
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
              'valueChain:allocation-form-missing-supplier-tooltip-title'
            )}
            ariaLabel={t(
              'valueChain:allocation-form-missing-supplier-tooltip-aria-label'
            )}
          >
            <Trans
              i18nKey="valueChain:allocation-form-missing-supplier-tooltip-content"
              components={[<Link href="/network/suppliers" />]}
            />
          </InfoToolTip>
        </StyledComponents.TooltipContainer>
      </StyledComponents.TextContainer>

      <FormField
        testIdPrefix={selectors.requestEmissionsSupplierInput}
        hasError={Boolean(errors[FIELD_KEYS.SUPPLIER])}
        errorMessage={
          (errors[FIELD_KEYS.SUPPLIER]?.message as unknown) as string
        }
      >
        <Controller
          control={control}
          name={FIELD_KEYS.SUPPLIER}
          rules={{ required: !isEditing }}
          render={({ value, onChange }) => (
            <SingleSelect
              defaultValue={selectedSupplierOption}
              components={{
                NoOptionsMessage: () => (
                  <NoOptionsMessage message={companyNoOptionsMessage} />
                ),
              }}
              dataTestId={selectors.requestEmissionsSupplierInput}
              inputId={FIELD_KEYS.SUPPLIER}
              isDisabled={isEditing}
              isSearchable
              maxMenuHeight={250}
              name={FIELD_KEYS.SUPPLIER}
              onChange={onChange}
              options={companyOptions}
              value={value}
              hasError={Boolean(errors[FIELD_KEYS.SUPPLIER])}
            />
          )}
        />
      </FormField>

      <Controller
        control={control}
        name={FIELD_KEYS.NOTE as 'id'}
        render={({ value, onChange }) => (
          <TextareaField
            dataTestId={selectors.requestEmissionsNote}
            hasCharacterCount
            id={FIELD_KEYS.NOTE}
            isOptional
            label={t('valueChain:request-allocation-form-note-label')}
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
          <InputError data-testid={selectors.requestEmissionsApiError}>
            {apiError}
          </InputError>
        )}
      </StyledComponents.ApiErrorWrapper>
      <CTAContainer>
        <Button
          width="auto"
          color="secondary"
          data-testid={selectors.requestEmissionsCancel}
          disabled={isSubmitting}
          onClick={onClose}
        >
          {t('valueChain:allocation-form-cancel')}
        </Button>
        <Button
          width="auto"
          type="submit"
          color="primary"
          data-testid={selectors.requestEmissionsSubmit}
          disabled={isDisabled}
        >
          {t('valueChain:allocation-form-request')}
        </Button>
      </CTAContainer>
    </ModalForm>
  );
};

RequestAllocationForm.defaultProps = {
  allocation: undefined,
};
