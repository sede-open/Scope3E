import { CompanyRelationshipsQuery_companyRelationships } from 'types/CompanyRelationshipsQuery';
import { EmissionAllocationMethod } from 'types/globalTypes';
import * as StyledComponents from '../../styledComponents';

const sortRelationshipsByCustomerName = (
  relationship1: CompanyRelationshipsQuery_companyRelationships,
  relationship2: CompanyRelationshipsQuery_companyRelationships
) => relationship1.customer.name.localeCompare(relationship2.customer.name);

export const getCompanyOptions = (
  companyRelationships: CompanyRelationshipsQuery_companyRelationships[]
) =>
  companyRelationships
    .slice()
    .sort(sortRelationshipsByCustomerName)
    .map(({ customer }) => ({
      label: customer.name,
      value: customer.id,
    }));

const OptionLabel = (title: string, subtext: string) => (
  <StyledComponents.OptionContainer>
    <StyledComponents.OptionTitle>{title}</StyledComponents.OptionTitle>
    <StyledComponents.OptionSubtext>{subtext}</StyledComponents.OptionSubtext>
  </StyledComponents.OptionContainer>
);

export const getAllocationMethodOptions = (t: any) => [
  {
    value: EmissionAllocationMethod.PHYSICAL,
    label: OptionLabel(
      t('valueChain:allocation-method-option-physical'),
      t('valueChain:allocation-method-option-physical-info')
    ),
  },
  {
    value: EmissionAllocationMethod.ECONOMICAL,
    label: OptionLabel(
      t('valueChain:allocation-method-option-economical'),
      t('valueChain:allocation-method-option-economical-info')
    ),
  },
  {
    value: EmissionAllocationMethod.OTHER,
    label: OptionLabel(
      t('valueChain:allocation-method-option-other'),
      t('valueChain:allocation-method-option-other-info')
    ),
  },
];
