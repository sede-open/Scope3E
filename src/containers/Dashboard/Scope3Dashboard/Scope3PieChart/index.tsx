import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import { formatInteger } from 'utils/number';
import useTranslation from 'next-translate/useTranslation';
import CogSpinner from 'components/CogSpinner';
import { Alto, abcdGray, CongressBlue } from 'styles/colours';
import { Scope3PieChartKeys } from '../constants';
import { setChartPadding } from '../utils';
import { Legend } from './Legend';

import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

export interface IProps {
  emissionsTotal: number | null;
  allocatedEmissionsTotal: number;
  unallocatedEmissionsTotal: number;
  isLoading: boolean;
}

export const Scope3PieChart = ({
  emissionsTotal,
  allocatedEmissionsTotal,
  unallocatedEmissionsTotal,
  isLoading,
}: IProps) => {
  const { t } = useTranslation();
  const scope3Value = emissionsTotal ?? 0;
  const hasScope3Emissions = scope3Value > 0;
  const fillerValue = 1;
  const hasAllocatedAndUnallocatedEmissions =
    allocatedEmissionsTotal > 0 && allocatedEmissionsTotal !== scope3Value;
  const chartLabelValue = scope3Value !== 0 ? formatInteger(scope3Value) : '-';
  const chartData = [
    {
      id: 1,
      name: [Scope3PieChartKeys.UNALLOCATED_EMISSIONS],
      value: unallocatedEmissionsTotal,
      fill: Alto,
    },
    {
      id: 2,
      name: [Scope3PieChartKeys.ALLOCATED_EMISSIONS],
      value: allocatedEmissionsTotal,
      fill: CongressBlue,
    },
  ];
  const fillerChartData = [
    {
      id: 3,
      name: [Scope3PieChartKeys.FILLER_VALUE],
      value: fillerValue,
      fill: abcdGray,
    },
  ];

  return (
    <StyledComponents.Wrapper data-testid={selectors.pieChartWrapper}>
      {isLoading ? (
        <CogSpinner />
      ) : (
        <>
          <StyledComponents.Title>
            {t('scope3Dashboard:pie-chart-title')}
          </StyledComponents.Title>
          <StyledComponents.LabelContainer>
            <StyledComponents.Label
              hasScope3Emissions={hasScope3Emissions}
              data-testid={selectors.chartLableValue}
            >
              {chartLabelValue}
            </StyledComponents.Label>
            {hasScope3Emissions && (
              <StyledComponents.Unit data-testid={selectors.unitLabel}>
                {t('common:unit-mt-co2')}
              </StyledComponents.Unit>
            )}
          </StyledComponents.LabelContainer>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              {hasScope3Emissions ? (
                <Pie
                  data={chartData}
                  startAngle={-267.5}
                  innerRadius={78}
                  outerRadius={100}
                  fill=""
                  paddingAngle={setChartPadding(
                    hasAllocatedAndUnallocatedEmissions
                  )}
                  dataKey="value"
                  stroke=""
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.id} fill={entry.fill} />
                  ))}
                </Pie>
              ) : (
                <Pie
                  data={fillerChartData}
                  startAngle={-270}
                  innerRadius={78}
                  outerRadius={100}
                  fill=""
                  paddingAngle={0}
                  dataKey="value"
                  stroke=""
                >
                  {fillerChartData.map((entry) => (
                    <Cell key={entry.id} fill={entry.fill} />
                  ))}
                </Pie>
              )}
            </PieChart>
          </ResponsiveContainer>
          <StyledComponents.ChartLegendContainer>
            <Legend />
          </StyledComponents.ChartLegendContainer>
        </>
      )}
    </StyledComponents.Wrapper>
  );
};
