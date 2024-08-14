import { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  TooltipProps,
} from 'recharts';
import {
  DashboardDataQuery_corporateEmissions as Emission,
  DashboardDataQuery_target as Target,
} from 'types/DashboardDataQuery';
import {
  Alto,
  Azure,
  FunGreen,
  Fuego,
  abcdGray,
  Gray,
  RockBlue,
  ShipCove,
  MorningGlory,
} from 'styles/colours';
import { formatInteger } from 'utils/number';
import { getTargetData, TargetChartData } from 'utils/emissions';
import { CorporateEmissionType } from 'types/globalTypes';
import { Legend } from './Legend';
import {
  EmissionsBarChartKeys,
  emissionsBarStackId,
  getBarSize,
  chartStackOffsetType,
  targetBarStackId,
  mergeEmissionsAndTargetData,
  getBarChartEmissionsData,
} from './utils';
import { EmissionsBarChartTooltip } from './EmissionsBarChartToolTip';

import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';

interface IProps {
  emissions: Emission[];
  target?: Target | null;
}

export const EmissionsBarChart = ({ emissions, target }: IProps) => {
  const { t } = useTranslation();

  const [barChartTargetData, setBarChartTargetData] = useState<
    TargetChartData[]
  >([]);

  // get bar chart emissions data
  const barChartEmissionsData = getBarChartEmissionsData(emissions);

  const baseline = emissions.find(
    (e) => e.type === CorporateEmissionType.BASELINE
  );
  const isEmissionOffsetData = emissions.find((e) => e.offset) !== undefined;
  const isOffsetTargetFormData = target?.includeCarbonOffset === true;
  const isScope3TargetFormData = target?.scope3Reduction !== null;
  const isScope1And2TargetFormData =
    (target?.scope1And2Reduction && target?.scope1And2Year) !==
    (null || undefined);

  useEffect(() => {
    if (baseline && target) {
      // get bar chart target data
      const targets = getTargetData({
        baselineData: {
          year: baseline.year,
          scope1: baseline.scope1,
          scope2: baseline.scope2,
          scope3: baseline.scope3,
          offset: baseline.offset,
        },
        targetData: target,
      });
      setBarChartTargetData(targets);
    }
  }, [emissions, baseline, target]);

  const chartData = target
    ? mergeEmissionsAndTargetData(barChartTargetData, barChartEmissionsData)
    : barChartEmissionsData;

  const scope1And2Year = target?.scope1And2Year ?? 0;
  const baselineYear = baseline?.year ?? 0;
  const targetAndBaselineYearDifference = scope1And2Year - baselineYear;

  // set chart bar size
  const chartBarSize = getBarSize(getBarSize(targetAndBaselineYearDifference));

  return (
    <StyledComponents.ChartContainer data-testid={selectors.barChart}>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={[...chartData]}
          stackOffset={chartStackOffsetType}
          margin={{
            top: 75,
            right: 50,
            left: 85,
            bottom: 15,
          }}
        >
          <CartesianGrid
            strokeDasharray="5 5"
            vertical={false}
            strokeWidth="2"
            stroke={Alto}
          />
          <XAxis
            axisLine={false}
            dataKey={EmissionsBarChartKeys.YEAR}
            height={10}
            padding={{ left: 20, right: 20 }}
            stroke={Gray}
            tick={{ fill: Gray, fontSize: 12 }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            stroke={Gray}
            tickFormatter={formatInteger}
            tick={{ fill: Gray, fontSize: 12 }}
          >
            <Label
              value={t('emissionsOverviewChart:bar-chart-y-label')}
              position="left"
              angle={-90}
              style={{ textAnchor: 'middle', fill: Gray }}
              offset={30}
              fontSize={12}
            />
          </YAxis>
          <Bar
            dataKey={EmissionsBarChartKeys.SCOPE1}
            stackId={emissionsBarStackId}
            fill={Azure}
            barSize={chartBarSize}
          />
          <Bar
            dataKey={EmissionsBarChartKeys.SCOPE2}
            stackId={emissionsBarStackId}
            fill={ShipCove}
            barSize={chartBarSize}
          />
          <Bar
            dataKey={EmissionsBarChartKeys.SCOPE3}
            stackId={emissionsBarStackId}
            fill={RockBlue}
            barSize={chartBarSize}
          />
          <Bar
            dataKey={EmissionsBarChartKeys.OFFSET}
            stackId={emissionsBarStackId}
            fill={MorningGlory}
            barSize={chartBarSize}
          />

          {isOffsetTargetFormData ? (
            <Bar
              dataKey={EmissionsBarChartKeys.TOTAL_TARGET_EMISSION}
              stackId={targetBarStackId}
              fill={FunGreen}
              barSize={chartBarSize}
            />
          ) : (
            <Bar
              dataKey={EmissionsBarChartKeys.SCOPE1_2_TARGET_EMISSION}
              stackId={targetBarStackId}
              fill={FunGreen}
              barSize={chartBarSize}
            />
          )}
          {!isOffsetTargetFormData && isScope3TargetFormData && (
            <Bar
              dataKey={EmissionsBarChartKeys.SCOPE3_TARGET_EMISSION}
              stackId={targetBarStackId}
              fill={Fuego}
              barSize={chartBarSize}
            />
          )}
          <ReferenceLine y={0} stroke={Alto} />
          <Tooltip
            cursor={{ fill: `${abcdGray}`, opacity: 0.5 }}
            content={(props: TooltipProps) => (
              <EmissionsBarChartTooltip
                {...props}
                baselineYear={baselineYear}
                isScope3TargetFormData={isScope3TargetFormData}
                isOffsetTargetFormData={isOffsetTargetFormData}
              />
            )}
          />
        </BarChart>
      </ResponsiveContainer>
      <StyledComponents.ChartLegendContainer>
        <Legend
          shouldShowTotalAmbition={isOffsetTargetFormData}
          isScope3TargetFormData={isScope3TargetFormData}
          isEmissionOffsetData={isEmissionOffsetData}
          isScope1And2TargetFormData={isScope1And2TargetFormData}
        />
      </StyledComponents.ChartLegendContainer>
    </StyledComponents.ChartContainer>
  );
};

EmissionsBarChart.defaultProps = {
  target: undefined,
};
