import { useEffect, useState } from 'react';
import {
  Label,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Area,
  TooltipProps,
} from 'recharts';
import useTranslation from 'next-translate/useTranslation';

import { CorporateEmissionType } from 'types/globalTypes';
import {
  CongressBlue,
  Alto,
  Gray,
  FunGreen,
  EarlyDawn,
  MidBlue,
} from 'styles/colours';
import {
  DashboardDataQuery_corporateEmissions as Emission,
  DashboardDataQuery_target as Target,
} from 'types/DashboardDataQuery';
import { getIEAChartData, IEAChartData } from 'utils/iea';
import { findByYear, getYAxisHighestPoint } from 'utils/charts';
import { formatInteger } from 'utils/number';
import {
  getNetEmissions,
  getTargetData,
  TargetChartData,
} from 'utils/emissions';
import { ChartDot } from 'components/Charts/ChartDot';
import { getLastTargetYear } from 'utils/targets';

import { EmissionsTooltip } from './EmissionComposedChartTooltip';
import {
  getYears,
  getEmissionsData,
  formatTick,
  EmissionChartKeys,
} from './utils';
import * as selectors from './selectors';
import * as StyledComponents from './styledComponents';
import { Legend } from './Legend';

type ChartData = {
  year: number;
  [EmissionChartKeys.IEA]?: number[] | number;
  [EmissionChartKeys.TOTAL_TARGET_EMISSION]?: number;
  [EmissionChartKeys.NET_EMISSION]?: number;
  [EmissionChartKeys.GROSS_EMISSION]?: number;
};

interface IProps {
  emissions: Emission[];
  target?: Target | null;
}

export const EmissionsComposedChart = ({ emissions, target }: IProps) => {
  const { t } = useTranslation();

  const lastTargetYear = getLastTargetYear(target);

  const baseline = emissions.find(
    (e) => e.type === CorporateEmissionType.BASELINE
  );

  const baselineYear = baseline?.year;

  // get years for x axis
  const years = getYears(emissions, target);

  // get data points for the graph
  const [graphData, setGraphData] = useState<ChartData[]>([]);
  const [shouldShowGrossEmissions, setShowGrossEmissions] = useState(false);
  const [yAxisHighestPoint, setYAxisHighestPoint] = useState<number>(0);

  useEffect(() => {
    let targets: TargetChartData[] = [];
    let ieaDataSet: IEAChartData[] = [];
    if (baseline) {
      if (target) {
        targets = getTargetData({
          baselineData: {
            year: baseline.year,
            scope1: baseline.scope1,
            scope2: baseline.scope2,
            scope3: baseline.scope3,
            offset: baseline.offset,
          },
          targetData: target,
        });
      }
      ieaDataSet = getIEAChartData(
        getNetEmissions(baseline),
        baseline.year,
        lastTargetYear
      );
    }

    const emissionsData = getEmissionsData(emissions);

    // maps any matching year data from the emission, iea and targets values to the year
    const graph: ChartData[] = years.map((year) => {
      const chartData: ChartData = {
        year,
      };
      const emission = emissionsData.find(findByYear, { year });
      if (emission && emission.grossEmissions) {
        chartData[EmissionChartKeys.GROSS_EMISSION] = emission.grossEmissions;
      }
      if (emission && emission.netEmissions) {
        chartData[EmissionChartKeys.NET_EMISSION] = emission.netEmissions;
      }
      const iea = ieaDataSet.find(findByYear, { year });
      if (iea) {
        chartData[EmissionChartKeys.IEA] = iea[EmissionChartKeys.IEA];
      }
      const targetData = targets.find(findByYear, { year });
      if (targetData) {
        chartData[EmissionChartKeys.TOTAL_TARGET_EMISSION] =
          targetData[EmissionChartKeys.TOTAL_TARGET_EMISSION];
      }
      return chartData;
    });

    setGraphData(graph);

    let showGrossEmissions = false;
    emissions.forEach((emission) => {
      if (emission.offset != null) {
        showGrossEmissions = true;
      }
    });
    setShowGrossEmissions(showGrossEmissions);

    setYAxisHighestPoint(
      getYAxisHighestPoint({
        actualEmissions: emissionsData,
        ieaData: ieaDataSet,
      })
    );
  }, [emissions, baseline, target]);

  return (
    <StyledComponents.ChartContainer
      data-testid={selectors.emissionsComposedChart}
    >
      <ResponsiveContainer width="100%" height={450}>
        <ComposedChart
          className={selectors.emissionsComposedChart}
          margin={{
            top: 75,
            right: 50,
            left: 85,
            bottom: 15,
          }}
          data={graphData}
        >
          <CartesianGrid
            strokeDasharray="5 5"
            vertical={false}
            strokeWidth="2"
            stroke={Alto}
          />
          <XAxis
            dataKey="year"
            type="number"
            tickLine={false}
            axisLine={false}
            interval={0}
            ticks={years}
            tick={{ fill: Gray, fontSize: 12 }}
            domain={[years[0], years[years.length - 1]]}
            padding={{ left: 20, right: 20 }}
            tickFormatter={formatTick}
            stroke={Alto}
            height={10}
          />
          <YAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: Gray, fontSize: 12 }}
            domain={[0, yAxisHighestPoint]}
            tickFormatter={formatInteger}
          >
            <Label
              value={t('common:unit-mt-co2')}
              position="left"
              angle={-90}
              style={{ textAnchor: 'middle', fill: Gray }}
              offset={50}
              fontSize={12}
            />
          </YAxis>
          <Tooltip
            content={(props: TooltipProps) => (
              <EmissionsTooltip
                {...props}
                includeCarbonOffset={target?.includeCarbonOffset}
                baselineYear={baselineYear}
              />
            )}
          />
          <Area
            strokeWidth="0"
            dataKey={EmissionChartKeys.IEA}
            fill={EarlyDawn}
            stroke={EarlyDawn}
            fillOpacity={1}
            isAnimationActive={false}
          />
          <Line
            dataKey={EmissionChartKeys.TOTAL_TARGET_EMISSION}
            type="linear"
            dot={false}
            strokeDasharray="5 5"
            stroke={FunGreen}
            strokeWidth="2"
            strokeDashoffset={-2}
            isAnimationActive={false}
          />
          <Line
            dataKey={EmissionChartKeys.NET_EMISSION}
            type="linear"
            dot={ChartDot}
            stroke={CongressBlue}
            strokeWidth="2"
            strokeDashoffset={-2}
            isAnimationActive={false}
          />
          {shouldShowGrossEmissions && (
            <Line
              dataKey={EmissionChartKeys.GROSS_EMISSION}
              type="linear"
              dot={ChartDot}
              stroke={MidBlue}
              strokeWidth="2"
              strokeDashoffset={-2}
              isAnimationActive={false}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
      <StyledComponents.ChartLegendContainer>
        <Legend shouldShowGrossEmissions={shouldShowGrossEmissions} />
      </StyledComponents.ChartLegendContainer>
    </StyledComponents.ChartContainer>
  );
};

EmissionsComposedChart.defaultProps = {
  target: undefined,
};
