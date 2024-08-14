import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import {
  EmissionAllocationDirection,
  EmissionAllocationStatus,
} from 'types/globalTypes';
import { displayErrorMessage, displaySuccessMessage } from 'utils/toast';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { CTAContainer } from 'components/CTAContainer';
import { InputContainer } from 'components/InputContainer';
import { InputError } from 'components/InputError';
import { InputLabel } from 'components/InputLabel';
import { DescriptionList } from 'components/DescriptionList';
import { OptionType, SingleSelect } from 'components/SingleSelect';
import Button from 'components/Button';
import { formatInteger } from 'utils/number';
import { ExternalLink } from 'components/ExternalLink';
import { InfoToolTip, InfoTooltipLink } from 'components/InfoToolTip';
import { ModalForm } from 'components/ModalForm';
import { RadioInputField } from 'components/Form/Fields/RadioInputField';
import { RadioInputGroup } from 'components/Form/RadioInputGroup';

import {
  useCorporateEmissionsQuery,
  useEmissionAllocationsQuery,
} from '../queries';
import { useUpdateEmissionAllocationMutation } from '../mutations';
import * as StyledComponents from './styledComponents';
import * as selectors from './selectors';
import { ADD_TO_EMISSIONS_VALUES, FIELD_KEYS } from './constants';
import { useCategoriesQuery } from './queries';
import {
  getDefaultAddedToCustomerScopeTotalValue,
  getOption,
  getTotalEmissionAllocations,
  isUpstreamCategory,
} from './utils';
import { IncludeInTotalLabel } from './IncludeInTotalLabel';

interface IProps {
  isEditing: boolean;
  onClose: () => void;
  allocation: EmissionAllocationsQuery_emissionAllocations;
}

export const AcceptAllocationForm = ({
  allocation,
  isEditing,
  onClose,
}: IProps) => {
  const {
    company: userCompany,
    canEditSupplyDashboard,
  } = useAuthenticatedUser();
  const companyId = userCompany?.id;

  if (!companyId || !canEditSupplyDashboard) {
    return null;
  }

  if (!allocation) {
    throw new Error('Missing allocation');
  }

  const { t } = useTranslation();

  const [apiError, setApiError] = useState('');

  const { addedToCustomerScopeTotal } = allocation;

  const isAlreadyAddedToCustomerScopeTotal =
    isEditing && addedToCustomerScopeTotal === true;
  const defaultAddedToCustomerScopeTotalValue = getDefaultAddedToCustomerScopeTotalValue(
    {
      isEditing,
      addedToCustomerScopeTotal,
    }
  );

  const [
    addedToCustomerScopeTotalValue,
    setAddedToCustomerScopeTotalValue,
  ] = useState(defaultAddedToCustomerScopeTotalValue);
  const isAddedToCustomerScopeTotalValueTrue =
    addedToCustomerScopeTotalValue === ADD_TO_EMISSIONS_VALUES.TRUE;
  const isIncludedToCustomerScopeTotalValueTrue =
    addedToCustomerScopeTotalValue === ADD_TO_EMISSIONS_VALUES.FALSE;

  const acceptMutationOptions = {
    onError: (err: Error) => {
      setApiError(err.message);
      displayErrorMessage({
        title: t('valueChain:form-toast-title-error'),
        subtitle: t('valueChain:form-toast-subtitle-error'),
      });
    },
    onCompleted: () => {
      if (isEditing) {
        displaySuccessMessage({
          title: t(
            'valueChain:accept-allocation-form-toast-edit-title-success'
          ),
          subtitle: t(
            'valueChain:accept-allocation-form-toast-edit-subtitle-success'
          ),
        });
      } else {
        displaySuccessMessage({
          title: t(
            'valueChain:accept-allocation-form-toast-accept-title-success'
          ),
          subtitle: t(
            'valueChain:accept-allocation-form-toast-accept-subtitle-success'
          ),
        });
      }

      onClose();
    },
  };

  const {
    data: categoriesData,
    loading: isCategoriesDataLoading,
  } = useCategoriesQuery();

  const categoryItems = categoriesData?.categories || [];
  const upstreamCategoryItems = categoryItems.filter(({ name }) =>
    isUpstreamCategory(name)
  );
  const categorySelectOptions = upstreamCategoryItems.map(getOption);

  const selectedCategoryValue = allocation.category?.id
    ? getOption(allocation.category)
    : categorySelectOptions[0];

  const [categoryValue, setCategoryValue] = useState<OptionType | null>(null);

  useEffect(() => {
    if (!isCategoriesDataLoading) {
      setCategoryValue(selectedCategoryValue);
    }
  }, [isCategoriesDataLoading]);

  const {
    data: corporateEmissionsData,
    loading: isCorporateEmissionsDataLoading,
  } = useCorporateEmissionsQuery({ companyId });

  const corporateEmissionForYear = corporateEmissionsData?.corporateEmissions.find(
    ({ year }) => year === allocation.year
  );

  const {
    data: emissionAllocationsData,
    loading: isEmissionAllocationsDataLoading,
  } = useEmissionAllocationsQuery({
    companyId,
    emissionAllocation:
      EmissionAllocationDirection.EMISSION_ALLOCATED_BY_SUPPLIERS,
    statuses: [EmissionAllocationStatus.APPROVED],
    year: allocation.year,
  });

  const currentTotalScope3EmissionsForYear =
    corporateEmissionForYear?.scope3 || 0;

  const totalAllocationsForYear = getTotalEmissionAllocations(
    emissionAllocationsData?.emissionAllocations || []
  );

  const unallocatedCurrentScope3EmissionsForYear =
    Number(corporateEmissionForYear?.scope3) - totalAllocationsForYear;
  const isAllocationLargerThanUnallocatedScope3 =
    Number(allocation?.emissions) > unallocatedCurrentScope3EmissionsForYear;

  const newAddedScope3EmissionsForYear = isAlreadyAddedToCustomerScopeTotal
    ? currentTotalScope3EmissionsForYear
    : currentTotalScope3EmissionsForYear + Number(allocation?.emissions);

  const newIncludedScope3EmissionsForYear = isAlreadyAddedToCustomerScopeTotal
    ? currentTotalScope3EmissionsForYear - Number(allocation?.emissions)
    : currentTotalScope3EmissionsForYear;

  const [
    updateEmissionAllocation,
    { loading: isUpdateEmissionAllocationLoading },
  ] = useUpdateEmissionAllocationMutation(acceptMutationOptions);

  const onSubmit = async () => {
    setApiError('');

    await updateEmissionAllocation({
      variables: {
        input: {
          id: allocation.id,
          status: EmissionAllocationStatus.APPROVED,
          categoryId: categoryValue?.value as string,
          addedToCustomerScopeTotal: isAddedToCustomerScopeTotalValueTrue,
          allocationMethod: allocation.allocationMethod,
          customerEmissionId: corporateEmissionForYear?.id,
        },
      },
    });
  };

  const isLoading =
    isCategoriesDataLoading ||
    isCorporateEmissionsDataLoading ||
    isEmissionAllocationsDataLoading;
  const isDisabled = isUpdateEmissionAllocationLoading || isLoading;

  const formTitle = isEditing
    ? t('valueChain:accept-allocation-form-edit-title')
    : t('valueChain:accept-allocation-form-title');

  const submitText = isEditing
    ? t('valueChain:accept-allocation-form-edit-submit')
    : t('valueChain:accept-allocation-form-submit');

  return (
    <ModalForm
      dataTestId={selectors.allocateEmissionsForm}
      isLoading={isLoading}
      title={formTitle}
      onSubmit={onSubmit}
    >
      <StyledComponents.AllocationDetails>
        <DescriptionList
          items={[
            {
              term: t('valueChain:accept-allocation-details-supplier'),
              description: allocation.supplier?.name || '',
            },
            {
              term: t('valueChain:accept-allocation-details-year'),
              description: String(allocation.year),
            },
            {
              term: t('valueChain:accept-allocation-details-emissions'),
              description: `${formatInteger(allocation.emissions || 0)} ${t(
                'common:unit-mt-co2'
              )}`,
            },
            {
              term: t('valueChain:accept-allocation-details-allocation-method'),
              description: t(
                `valueChain:allocation-method-${allocation.allocationMethod}`
              ),
            },
          ]}
        />
      </StyledComponents.AllocationDetails>

      <StyledComponents.TextContainer>
        <InputLabel
          dataTestId={selectors.allocateEmissionsYearLabel}
          htmlFor={FIELD_KEYS.EMISSIONS_CATEGORY}
        >
          {t('valueChain:accept-allocation-form-category-label')}
        </InputLabel>
        <StyledComponents.TooltipContainer>
          <InfoToolTip
            id="carbon-emissions-tooltip"
            offset={{
              left: 75,
              right: 0,
              bottom: 0,
              top: 0,
            }}
            place="bottom"
            title={t('common:common-tooltip')}
            ariaLabel={t('common:common-tooltip')}
          >
            <Trans
              i18nKey="valueChain:accept-allocation-form-category-tooltip-content"
              components={[
                <ExternalLink
                  link={t(
                    'valueChain:accept-allocation-form-category-content-link'
                  )}
                />,
                <InfoTooltipLink>link text</InfoTooltipLink>,
              ]}
            />
          </InfoToolTip>
        </StyledComponents.TooltipContainer>
      </StyledComponents.TextContainer>
      <InputContainer testIdPrefix={selectors.allocateEmissionsYearInput}>
        <SingleSelect
          dataTestId={selectors.allocateEmissionsYearInput}
          defaultValue={categorySelectOptions[0]}
          inputId={FIELD_KEYS.EMISSIONS_CATEGORY}
          maxMenuHeight={250}
          name={FIELD_KEYS.EMISSIONS_CATEGORY}
          onChange={setCategoryValue}
          options={categorySelectOptions}
          value={categoryValue}
        />
      </InputContainer>

      <InputContainer testIdPrefix={selectors.addToTotalRadios}>
        <RadioInputGroup isVertical>
          <RadioInputField
            tabIndex={0}
            dataTestId={selectors.addToTotalRadio}
            id={FIELD_KEYS.ADD_TO_EMISSIONS_ADD}
            isChecked={isAddedToCustomerScopeTotalValueTrue}
            isVertical
            label={
              <>
                {t('valueChain:accept-allocation-add-on-top')}
                <StyledComponents.AddToTotalSublabel
                  data-testid={selectors.addToTotalRadioSublabel}
                >
                  {t('valueChain:accept-allocation-add-to-emissions-sublabel', {
                    emissions: formatInteger(newAddedScope3EmissionsForYear),
                  })}
                </StyledComponents.AddToTotalSublabel>
              </>
            }
            name={FIELD_KEYS.ADD_TO_EMISSIONS}
            onChange={({ target: { value } }) =>
              setAddedToCustomerScopeTotalValue(value)
            }
            value={ADD_TO_EMISSIONS_VALUES.TRUE}
          />

          <RadioInputField
            tabIndex={-1}
            dataTestId={selectors.includeInTotalRadio}
            id={FIELD_KEYS.ADD_TO_EMISSIONS_INCLUDE}
            isChecked={isIncludedToCustomerScopeTotalValueTrue}
            isDisabled={isAllocationLargerThanUnallocatedScope3}
            isVertical
            label={
              <IncludeInTotalLabel
                isDisabled={isAllocationLargerThanUnallocatedScope3}
                currentTotalScope3EmissionsForYear={
                  newIncludedScope3EmissionsForYear
                }
                year={allocation.year}
              />
            }
            name={FIELD_KEYS.ADD_TO_EMISSIONS}
            onChange={({ target: { value } }) =>
              setAddedToCustomerScopeTotalValue(value)
            }
            value={ADD_TO_EMISSIONS_VALUES.FALSE}
          />
        </RadioInputGroup>
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
          disabled={isUpdateEmissionAllocationLoading}
          onClick={onClose}
        >
          {t('valueChain:accept-allocation-form-cancel')}
        </Button>
        <Button
          width="auto"
          type="submit"
          color="primary"
          data-testid={selectors.allocateEmissionsSubmit}
          disabled={isDisabled}
          onClick={onSubmit}
        >
          {submitText}
        </Button>
      </CTAContainer>
    </ModalForm>
  );
};
