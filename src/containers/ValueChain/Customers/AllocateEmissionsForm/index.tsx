import Button from 'components/Button';
import { CTAContainer } from 'components/CTAContainer';
import Icon from 'components/Icon';
import { InfoToolTip } from 'components/InfoToolTip';
import { InputContainer } from 'components/InputContainer';
import { InputError } from 'components/InputError';
import { InputLabel } from 'components/InputLabel';
import { Link } from 'components/Link';
import { ModalForm } from 'components/ModalForm';
import { NoOptionsMessage } from 'components/NoOptionsMessage';
import { NumberInput } from 'components/NumberInput';
import { OptionType, SingleSelect } from 'components/SingleSelect';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import Trans from 'next-translate/Trans';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  CompanyRelationshipType,
  EmissionAllocationDirection,
  EmissionAllocationStatus,
  InviteStatus,
} from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import { ALLOCATE_EMISSION_FORM_ALLOCATION_METHOD } from 'utils/analyticsEvents';
import { getYearSelectOptions } from 'utils/emissions';
import { formatInteger } from 'utils/number';
import { displayErrorMessage } from 'utils/toast';
import { TransText } from 'utils/TransText';
import {
  useCreateEmissionAllocationMutation,
  useUpdateEmissionAllocationMutation,
} from '../../mutations';
import {
  useAllocateEmissionsFormQuery,
  useEmissionAllocationsQuery,
} from '../../queries';
import * as StyledComponents from '../../styledComponents';
import {
  getTotalAllocatedEmissions,
  getTotalAvailableEmissions,
} from '../../utils';
import { FIELD_KEYS } from './constants';
import { FormulaTooltip } from './FormulaTooltip';
import * as selectors from './selectors';
import { FormValues, IProps } from './types';
import { getAllocationMethodOptions, getCompanyOptions } from './utils';

export const AllocateEmissionsForm = ({
  allocation,
  isEditing,
  onClose,
  onSuccess,
  selectedYear,
  yearOptions,
}: IProps) => {
  const {
    company: userCompany,
    canEditSupplyDashboard,
  } = useAuthenticatedUser();
  const companyId = userCompany?.id;
  const companyName = userCompany?.name;

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
        title: t('valueChain:form-toast-title-error'),
        subtitle: t('valueChain:form-toast-subtitle-error'),
      });
    },
    onCompleted: () => {
      onSuccess();
    },
  };

  const {
    data: allocateEmissionsFormData,
    loading: isAllocateEmissionsFormDataLoading,
  } = useAllocateEmissionsFormQuery({
    companyId,
    relationshipType: CompanyRelationshipType.CUSTOMER,
    status: InviteStatus.APPROVED,
  });

  const companyOptions = getCompanyOptions(
    allocateEmissionsFormData?.companyRelationships || []
  );

  const selectedCustomerOption: OptionType | undefined = allocation
    ? {
        label: allocation.customer.name,
        id: allocation.customer.id,
      }
    : undefined;

  const selectedYearOption: OptionType = {
    label: selectedYear,
    value: selectedYear,
  };

  const allocationMethodOptions = getAllocationMethodOptions(t);

  const selectedAllocationMethod:
    | OptionType
    | undefined = allocationMethodOptions.find(
    ({ value }) => value === allocation?.allocationMethod
  );

  const {
    control,
    errors,
    formState: { isSubmitting, isValid },
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      [String(FIELD_KEYS.YEAR)]: selectedYearOption,
      [String(FIELD_KEYS.CUSTOMER)]: selectedCustomerOption || '',
      [String(FIELD_KEYS.EMISSIONS)]: allocation?.emissions || '',
      [String(FIELD_KEYS.ALLOCATION_METHOD)]: selectedAllocationMethod || '',
    },
    mode: 'onChange',
  });

  const yearValue: OptionType = watch(FIELD_KEYS.YEAR);
  const emissionsValue: string = watch(FIELD_KEYS.EMISSIONS);
  const customerValue: OptionType = watch(FIELD_KEYS.CUSTOMER);

  const {
    data: emissionAllocationsData,
    loading: isEmissionAllocationsDataLoading,
  } = useEmissionAllocationsQuery({
    companyId,
    emissionAllocation:
      EmissionAllocationDirection.EMISSION_ALLOCATED_TO_CUSTOMERS,
    statuses: null,
    year: selectedYear,
  });

  const allocationForCustomer = emissionAllocationsData?.emissionAllocations.filter(
    (e) => e.customer && e.customer?.id === customerValue.value
  )[0];

  const corporateEmissionForYear = allocateEmissionsFormData?.corporateEmissions.find(
    ({ year }) => year === yearValue.value
  );

  const availableCorporateEmissionsForYear =
    getTotalAvailableEmissions(corporateEmissionForYear) -
    getTotalAllocatedEmissions(
      emissionAllocationsData?.emissionAllocations || []
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
      allocationMethod: { value: allocationMethod },
      customer: { value: customerId },
      emissions,
      year: { value: year },
    } = data;

    const supplierEmissionId = corporateEmissionForYear?.id;

    const existingAllocationStatus = allocationForCustomer?.status;
    const shouldUpdate =
      isEditing ||
      Boolean(allocation) ||
      existingAllocationStatus === EmissionAllocationStatus.REQUESTED ||
      existingAllocationStatus === EmissionAllocationStatus.REQUEST_DISMISSED;

    if (shouldUpdate) {
      const allocationId = allocation?.id ?? allocationForCustomer!.id;

      await updateEmissionAllocation({
        variables: {
          input: {
            id: allocationId,
            allocationMethod,
            emissions: Number(emissions),
            supplierEmissionId,
          },
        },
      });
    } else {
      await createEmissionAllocation({
        variables: {
          input: {
            allocationMethod,
            customerId,
            emissions: Number(emissions),
            supplierEmissionId,
            supplierId: companyId,
            year,
          },
        },
      });
      trackEvent(ALLOCATE_EMISSION_FORM_ALLOCATION_METHOD, {
        allocationMethod: !data.allocationMethod.label
          ? t('valueChain:allocation-method-not-selected')
          : t('valueChain:allocation-method-selected'),
        companyId,
        companyName,
      });
    }
  };

  const emissionsRule = (value: string) =>
    Number(value) > 0 && Number(value) <= availableCorporateEmissionsForYear;

  const remainingAvailableCorporateEmissionsForYear = Math.max(
    0,
    availableCorporateEmissionsForYear - Number(emissionsValue)
  );

  const companyNoOptionsMessage = t(
    'valueChain:allocation-form-customer-no-options-message'
  );

  const isDisabled =
    isSubmitting || !isValid || isEmissionAllocationsDataLoading;

  const yearSelectOptions = getYearSelectOptions(yearOptions);

  const formTitle = isEditing
    ? t('valueChain:allocation-form-title-edit')
    : t('valueChain:allocation-form-title-allocate');

  const icon = (
    <StyledComponents.IconContainer lrg>
      <Icon
        src="/images/PublicSite/open.svg"
        alt={t('common:open-tab')}
        size={16}
      />
    </StyledComponents.IconContainer>
  );
  const externalLink = (
    <StyledComponents.StyledExternalLink
      link={t('valueChain:allocation-form-protocol-link')}
    >
      {t('valueChain:allocation-form-protocol-link')}
    </StyledComponents.StyledExternalLink>
  );
  const subtitle = isEditing ? (
    <TransText
      text={t('valueChain:allocation-form-subtitle-edit')}
      components={{
        externalLink,
        icon,
      }}
    />
  ) : (
    <>
      {t('valueChain:allocation-form-subtitle-allocate-[0]')}
      <br />
      <TransText
        text={t('valueChain:allocation-form-subtitle-allocate-[1]')}
        components={{
          externalLink,
          icon,
        }}
      />
    </>
  );

  const getSubmitText = () => {
    if (!isEditing) {
      return t('valueChain:allocation-form-submit');
    }

    return allocation?.status === EmissionAllocationStatus.REJECTED
      ? t('valueChain:allocation-form-resend')
      : t('valueChain:allocation-form-edit');
  };

  const shouldDisableYear =
    isEditing || Boolean(allocation) || yearSelectOptions.length === 1;

  const shouldDisableCustomer = isEditing || Boolean(allocation);

  return (
    <ModalForm
      dataTestId={selectors.allocateEmissionsForm}
      isLoading={isAllocateEmissionsFormDataLoading}
      subtitle={subtitle}
      title={formTitle}
      onSubmit={handleSubmit(onSubmit)}
    >
      <StyledComponents.TextContainer>
        <InputLabel
          dataTestId={selectors.allocateEmissionsYearLabel}
          htmlFor={FIELD_KEYS.YEAR}
        >
          {t('valueChain:allocation-form-year-label')}
        </InputLabel>
      </StyledComponents.TextContainer>
      <StyledComponents.YearInputWrapper>
        <InputContainer testIdPrefix={selectors.allocateEmissionsYearInput}>
          <Controller
            control={control}
            name={FIELD_KEYS.YEAR}
            rules={{ required: !isEditing }}
            render={({ value, onChange }) => (
              <SingleSelect
                dataTestId={selectors.allocateEmissionsYearInput}
                inputId={FIELD_KEYS.YEAR}
                isDisabled={shouldDisableYear}
                maxMenuHeight={250}
                name={FIELD_KEYS.YEAR}
                onChange={onChange}
                options={yearSelectOptions}
                value={value}
              />
            )}
          />
        </InputContainer>
      </StyledComponents.YearInputWrapper>

      <StyledComponents.TextContainer>
        <InputLabel
          dataTestId={selectors.allocateEmissionsCustomerLabel}
          htmlFor={FIELD_KEYS.CUSTOMER}
        >
          {t('valueChain:allocation-form-customer-label')}
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
              'valueChain:allocation-form-missing-customer-tooltip-title'
            )}
            ariaLabel={t(
              'valueChain:allocation-form-missing-customer-tooltip-aria-label'
            )}
          >
            <Trans
              i18nKey="valueChain:allocation-form-missing-customer-tooltip-content"
              components={[<Link href="/network/customers" />]}
            />
          </InfoToolTip>
        </StyledComponents.TooltipContainer>
      </StyledComponents.TextContainer>
      <InputContainer testIdPrefix={selectors.allocateEmissionsCustomerInput}>
        <Controller
          control={control}
          name={FIELD_KEYS.CUSTOMER}
          rules={{ required: !isEditing }}
          render={({ value, onChange }) => (
            <SingleSelect
              defaultValue={selectedCustomerOption}
              components={{
                NoOptionsMessage: () => (
                  <NoOptionsMessage message={companyNoOptionsMessage} />
                ),
              }}
              dataTestId={selectors.allocateEmissionsCustomerInput}
              inputId={FIELD_KEYS.CUSTOMER}
              isDisabled={shouldDisableCustomer}
              isSearchable
              maxMenuHeight={250}
              name={FIELD_KEYS.CUSTOMER}
              onChange={onChange}
              options={companyOptions}
              value={value}
            />
          )}
        />
      </InputContainer>

      <StyledComponents.TextContainer>
        <InputLabel
          dataTestId={selectors.allocateEmissionsEmissionsLabel}
          htmlFor={FIELD_KEYS.EMISSIONS}
        >
          {t('valueChain:allocation-form-emissions-label')}
        </InputLabel>
        <FormulaTooltip />
      </StyledComponents.TextContainer>
      <InputContainer testIdPrefix={selectors.allocateEmissionsEmissionsInput}>
        <>
          <Controller
            control={control}
            name={FIELD_KEYS.EMISSIONS}
            rules={{
              required: true,
              validate: emissionsRule,
            }}
            render={({ onChange, value, name }) => (
              <NumberInput
                data-testid={selectors.allocateEmissionsEmissionsInput}
                decimals={1}
                id={FIELD_KEYS.EMISSIONS}
                name={name}
                onChange={onChange}
                placeholder={t('common:form-placeholder')}
                units={t('common:unit-mt-co2')}
                value={value}
              />
            )}
          />
          <StyledComponents.AvailableEmissionsContainer
            data-testid={selectors.availableEmissionsMessage}
            isValid={!errors[FIELD_KEYS.EMISSIONS]}
          >
            {t('valueChain:allocation-form-emissions-available', {
              emissions: formatInteger(
                remainingAvailableCorporateEmissionsForYear
              ),
            })}
          </StyledComponents.AvailableEmissionsContainer>
        </>
      </InputContainer>

      <StyledComponents.TextContainer>
        <InputLabel
          dataTestId={selectors.allocateEmissionsAllocationMethodLabel}
          htmlFor={FIELD_KEYS.ALLOCATION_METHOD}
          isOptional
        >
          {t('valueChain:allocation-form-allocation-method-label')}
        </InputLabel>
      </StyledComponents.TextContainer>
      <InputContainer
        testIdPrefix={selectors.allocateEmissionsAllocationMethodInput}
      >
        <Controller
          control={control}
          name={FIELD_KEYS.ALLOCATION_METHOD}
          render={({ value, onChange }) => (
            <SingleSelect
              dataTestId={selectors.allocateEmissionsAllocationMethodInput}
              inputId={FIELD_KEYS.ALLOCATION_METHOD}
              maxMenuHeight={250}
              menuPlacement="top"
              name={FIELD_KEYS.ALLOCATION_METHOD}
              onChange={onChange}
              options={allocationMethodOptions}
              placeholder={t('common:form-placeholder')}
              value={value}
              removeValueContainerPadding
              styles={{
                valueContainer: (provided) => ({
                  ...provided,
                  margin: '16px',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  paddingTop: '16px',
                }),
              }}
            />
          )}
        />
      </InputContainer>

      <StyledComponents.ApiErrorWrapper>
        {apiError && (
          <InputError data-testid={selectors.allocateEmissionsApiError}>
            {apiError}
          </InputError>
        )}
      </StyledComponents.ApiErrorWrapper>
      <CTAContainer>
        <Button
          width="auto"
          color="secondary"
          data-testid={selectors.allocateEmissionsCancel}
          disabled={isSubmitting}
          onClick={() => onClose()}
        >
          {t('valueChain:allocation-form-cancel')}
        </Button>
        <Button
          width="auto"
          type="submit"
          color="primary"
          data-testid={selectors.allocateEmissionsSubmit}
          disabled={isDisabled}
        >
          {getSubmitText()}
        </Button>
      </CTAContainer>
    </ModalForm>
  );
};
