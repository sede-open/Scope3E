import { EmissionAllocationMethod } from 'types/globalTypes';
import { CompaniesQuery_companies_data } from 'types/CompaniesQuery';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { ADD_TO_EMISSIONS_VALUES } from './constants';

export const getOption = ({
  id,
  name,
}: {
  id: string;
  name: string | number;
}) => ({
  value: id,
  label: name,
});

export const getCompanyOptions = (companies: CompaniesQuery_companies_data[]) =>
  companies.map(getOption);

export const getAllocationMethodOptions = (t: any) => [
  {
    value: EmissionAllocationMethod.PHYSICAL,
    label: t('valueChain:allocation-method-option-physical'),
  },
  {
    value: EmissionAllocationMethod.ECONOMICAL,
    label: t('valueChain:allocation-method-option-economical'),
  },
  {
    value: EmissionAllocationMethod.OTHER,
    label: t('valueChain:allocation-method-option-other'),
  },
];

export const getTotalEmissionAllocations = (
  allocations: EmissionAllocationsQuery_emissionAllocations[]
) =>
  allocations.reduce(
    (acc: number, { emissions }) => acc + Number(emissions),
    0
  );

export const getDefaultAddedToCustomerScopeTotalValue = ({
  isEditing,
  addedToCustomerScopeTotal,
}: {
  isEditing: boolean;
  addedToCustomerScopeTotal: boolean | null;
}) => {
  if (!isEditing) {
    return ADD_TO_EMISSIONS_VALUES.TRUE;
  }

  return addedToCustomerScopeTotal
    ? ADD_TO_EMISSIONS_VALUES.TRUE
    : ADD_TO_EMISSIONS_VALUES.FALSE;
};

export const isUpstreamCategory = (category: string) => {
  const categoryNumberMatch = category.match(/\d+/) || [0];
  const categoryNumber = categoryNumberMatch[0];

  return Number(categoryNumber) < 9;
};
