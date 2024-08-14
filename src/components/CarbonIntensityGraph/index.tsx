import { useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
  Label,
  Area,
  Tooltip,
  TooltipProps,
} from 'recharts';

import { ChartDot } from 'components/Charts/ChartDot';
import { formatInteger } from 'utils/number';
import { getTargetData } from 'utils/emissions';
import { getIEAChartData } from 'utils/iea';
import { findByYear } from 'utils/charts';

import { Alto, Gray, CannonPink, EarlyDawn, FunGreen } from 'styles/colours';
import { CarbonIntensityChartKey, IProps } from './types';
import {
  getActualIntensityGraphData,
  getYAxisHighestPoint,
  getYears,
  getIntensityEmissionsForMetric,
} from './utils';
import { CarbonIntensityLabel } from './CarbonIntensityLabel';
import { CarbonIntensityTooltip } from './CarbonIntensityTooltip';
import * as StyledComponents from './styledComponents';
import { CarbonIntensityLegend } from './CarbonIntensityLegend';
import * as selectors from './selectors';

type ChartData = {
  year: number;
  [CarbonIntensityChartKey.IEA]?: number[] | number;
  [CarbonIntensityChartKey.TARGET_INTENSITIES]?: number;
  [CarbonIntensityChartKey.ACTUAL_INTENSITIES]?: number;
};

export const CarbonIntensityGraph = ({
  target,
  emissions,
  baselineYear,
}: IProps) => {
  const { t } = useTranslation();

  const intensities = getIntensityEmissionsForMetric(
    emissions,
    baselineYear,
    target.intensityMetric
  );

  const years = getYears(intensities, target);

  const formatTick = useCallback(
    (tick: number) => (tick === baselineYear ? `${tick}*` : tick),
    [baselineYear]
  );

  const baselineIntensityEmission = intensities.find(
    (e) => e.year === baselineYear
  );
  const actualIntensityData = getActualIntensityGraphData(intensities);

  const targetsData = baselineIntensityEmission
    ? getTargetData({
        baselineData: {
          year: baselineIntensityEmission.year,
          scope1: baselineIntensityEmission.scope1,
          scope2: baselineIntensityEmission.scope2,
          scope3: baselineIntensityEmission.scope3,
          offset: baselineIntensityEmission.offset,
        },
        targetData: target,
      })
    : [];

  const ieaData = getIEAChartData(
    baselineIntensityEmission?.netEmissions,
    baselineYear,
    years[years.length - 1]
  );

  const yAxisHighestPoint = getYAxisHighestPoint({
    actualIntensities: actualIntensityData,
  });

  const intensityLabelText = `${t('common:unit-mt-co2')} / ${t(
    `carbonIntensity:${target.intensityMetric}`
  )}`;

  const graphData: ChartData[] = years.map((year) => {
    const chartData: ChartData = { year };
    const targetData = targetsData.find(findByYear, { year });
    if (targetData) {
      chartData[CarbonIntensityChartKey.TARGET_INTENSITIES] =
        targetData[CarbonIntensityChartKey.TARGET_INTENSITIES];
    }
    const intensity = actualIntensityData.find(findByYear, { year });
    if (intensity) {
      chartData[CarbonIntensityChartKey.ACTUAL_INTENSITIES] =
        intensity[CarbonIntensityChartKey.ACTUAL_INTENSITIES];
    }
    const iea = ieaData.find(findByYear, { year });
    if (iea) {
      chartData[CarbonIntensityChartKey.IEA] = iea[CarbonIntensityChartKey.IEA];
    }
    return chartData;
  });

  const yLabelLength = `${yAxisHighestPoint}`.length;
  return (
    <div data-testid={selectors.intensityTargetGraph}>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart
          className="carbon-intensity-graph"
          margin={{
            top: 15,
            right: 50,
            left: yLabelLength <= 5 ? 55 : 70,
            bottom: 10,
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
              position="left"
              angle={-90}
              style={{ textAnchor: 'middle', fill: Gray }}
              fontSize={12}
              content={() => (
                <CarbonIntensityLabel title={intensityLabelText} />
              )}
            />
          </YAxis>
          <Tooltip
            content={(props: TooltipProps) => (
              <CarbonIntensityTooltip {...props} baselineYear={baselineYear} />
            )}
          />
          <Area
            dataKey={CarbonIntensityChartKey.IEA}
            fill={EarlyDawn}
            stroke="transparent"
            fillOpacity={1}
          />
          <Line
            dataKey={CarbonIntensityChartKey.ACTUAL_INTENSITIES}
            type="linear"
            dot={ChartDot}
            stroke={CannonPink}
            strokeWidth="2"
            strokeDashoffset={-2}
            isAnimationActive={false}
          />
          <Line
            dataKey={CarbonIntensityChartKey.TARGET_INTENSITIES}
            type="monotone"
            dot={false}
            strokeDasharray="5 5"
            stroke={FunGreen}
            strokeWidth="2"
            strokeDashoffset={-2}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <StyledComponents.ChartLegendContainer>
        <CarbonIntensityLegend />
      </StyledComponents.ChartLegendContainer>
    </div>
  );
};
