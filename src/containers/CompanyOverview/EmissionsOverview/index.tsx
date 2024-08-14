import { EmissionsBarChart } from 'components/EmissionsBarChart';
import { EmissionsComposedChart } from 'components/EmissionsComposedChart';
import { BarChartIcon, ComposedChartIcon } from 'components/Glyphs';
import { Text } from 'components/Text';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { Tundora } from 'styles/colours';
import { exampleBold } from 'styles/fonts';
import { CompanyOverviewQuery_targets_absolute as AbsoluteTarget } from 'types/CompanyOverviewQuery';
import { ChartSection } from '../styledComponents';
import * as StyledComponents from './styledComponents';

type Props = {
  emissions: any[];
  target?: AbsoluteTarget;
  emptyView: React.ReactNode;
};

enum ChartType {
  COMPOSED,
  BAR,
}

export const EmissionsOverview = ({ emissions, target, emptyView }: Props) => {
  const { t } = useTranslation('companyOverview');
  const [selectedChart, setSelectedChart] = useState(ChartType.COMPOSED);
  const Chart =
    selectedChart === ChartType.COMPOSED
      ? EmissionsComposedChart
      : EmissionsBarChart;

  return (
    <ChartSection>
      <StyledComponents.TitleContainer>
        <div>
          <Text as="h2" size="1.5rem" family={exampleBold} color={Tundora}>
            {t('emissionsOverview')}
          </Text>
        </div>
        {emissions.length > 1 && (
          <StyledComponents.ToggleBtnContainer>
            <StyledComponents.ToggleChartBtn
              onClick={() => setSelectedChart(ChartType.BAR)}
              isSelectedChart={selectedChart === ChartType.BAR}
            >
              <BarChartIcon
                title={t('dashboard:emissions-overview-bar-chart')}
              />
            </StyledComponents.ToggleChartBtn>
            <StyledComponents.ToggleChartBtn
              onClick={() => setSelectedChart(ChartType.COMPOSED)}
              isSelectedChart={selectedChart === ChartType.COMPOSED}
            >
              <ComposedChartIcon
                title={t('dashboard:emissions-overview-composed-chart')}
              />
            </StyledComponents.ToggleChartBtn>
          </StyledComponents.ToggleBtnContainer>
        )}
      </StyledComponents.TitleContainer>
      {emissions.length ? (
        <Chart emissions={emissions} target={target} />
      ) : (
        emptyView
      )}
    </ChartSection>
  );
};
