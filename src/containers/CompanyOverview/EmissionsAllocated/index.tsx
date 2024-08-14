import useTranslation from 'next-translate/useTranslation';
import { CompanyOverviewQuery_emissionsAllocatedToMyCompany as EmissionAllocation } from 'types/CompanyOverviewQuery';
import { EmissionsAllocatedChart } from './EmissionsAllocatedChart';
import { AllocationsEmpty } from './AllocationsEmpty';
import * as StyledComponents from '../styledComponents';

export type Props = {
  emissionAllocations: EmissionAllocation[];
};
export const EmissionsAllocated = ({ emissionAllocations }: Props) => {
  const { t } = useTranslation('companyOverview');

  return (
    <StyledComponents.ChartSection>
      <StyledComponents.ChartTitle>
        {t('emissionsAllocatedToYourCompany')}
      </StyledComponents.ChartTitle>
      <StyledComponents.ChartContainer>
        {emissionAllocations.length ? (
          <EmissionsAllocatedChart emissionAllocations={emissionAllocations} />
        ) : (
          <AllocationsEmpty />
        )}
      </StyledComponents.ChartContainer>
    </StyledComponents.ChartSection>
  );
};
