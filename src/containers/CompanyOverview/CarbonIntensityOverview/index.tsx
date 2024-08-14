import { CarbonIntensityGraph } from 'components/CarbonIntensityGraph';
import useTranslation from 'next-translate/useTranslation';
import { DashboardDataQuery_corporateEmissions as CorporateEmissions } from 'types/DashboardDataQuery';
import { CorporateEmissionType } from 'types/globalTypes';
import { TargetsQuery_targets_intensity as IntensityTarget } from 'types/TargetsQuery';
import * as StyledComponents from '../styledComponents';

export type Props = {
  target?: IntensityTarget;
  emissions: CorporateEmissions[];
  emptyView: React.ReactNode;
};
export const CarbonIntensityOverview = ({
  target,
  emissions,
  emptyView,
}: Props) => {
  const { t } = useTranslation('companyOverview');
  const baselineYear = emissions.find(
    (emission) => emission.type === CorporateEmissionType.BASELINE
  )?.year;

  return (
    <StyledComponents.ChartSection>
      <div>
        <StyledComponents.ChartTitle>
          {t('carbonIntensityOverview')}
        </StyledComponents.ChartTitle>
      </div>
      {target && baselineYear ? (
        <StyledComponents.ChartContainer>
          <CarbonIntensityGraph
            target={target}
            emissions={emissions}
            baselineYear={baselineYear}
          />
        </StyledComponents.ChartContainer>
      ) : (
        emptyView
      )}
    </StyledComponents.ChartSection>
  );
};
