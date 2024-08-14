import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  Legend,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Area,
} from 'recharts';
import useTranslation from 'next-translate/useTranslation';

import { Alto, Apple, Gray, EarlyDawn } from 'styles/colours';
import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { SimulationDataQuery_baseline as SimulationBaseline } from 'types/SimulationDataQuery';
import { TargetStrategyType } from 'types/globalTypes';
import { LegendItem } from 'components/LegendItem';
import {
  TargetChartData,
  getTargetData,
  getNetEmissions,
} from 'utils/emissions';
import { getIEAChartData } from 'utils/iea';
import { getYAxisHighestPoint } from 'utils/charts';
import { formatInteger } from 'utils/number';

import { TargetFormDataQuery_corporateEmissions as CorporateEmissions } from 'types/TargetFormDataQuery';
import { DEFAULT_CHART_END_YEAR } from '../../../../constants';
import * as StyledComponents from './styledComponents';

interface IProps {
  baseline:
    | Emission
    | CorporateEmissions
    | SimulationBaseline
    | Pick<Emission, 'scope1' | 'scope2' | 'scope3' | 'offset' | 'year'>
    | null;
  scope1And2Year?: number;
  scope1And2Reduction?: number | null;
  strategy?: TargetStrategyType | null;
  scope3Year?: number | null;
  scope3Reduction?: number | null;
  includeCarbonOffset?: boolean | null;
}

export const getChartYearOptions = (year: number, baselineYear?: number) => {
  const yearOptions = [];
  if (baselineYear && typeof year === 'number') {
    yearOptions.push(baselineYear, year);

    let interval = 3;
    if (year - baselineYear >= 40) {
      interval = 10;
    } else if (year - baselineYear >= 20) {
      interval = 5;
    }

    // get year distribution between baselineYear and target year
    for (let i = baselineYear; i < year; i += interval) {
      // don't add ticks for years too close
      // to baselineYear or target year
      if (i - baselineYear >= interval && year - i >= interval) {
        yearOptions.push(i);
      }
    }
  }

  return yearOptions.sort((a, b) => a - b);
};

export const TargetChart = ({
  baseline,
  scope1And2Year,
  scope1And2Reduction,
  scope3Year,
  scope3Reduction,
  strategy,
  includeCarbonOffset,
}: IProps) => {
  const { t } = useTranslation();
  const latestTargetYear =
    scope3Year && scope1And2Year && scope3Year > scope1And2Year
      ? scope3Year
      : scope1And2Year;
  const ieaData = getIEAChartData(
    getNetEmissions(baseline),
    baseline?.year,
    latestTargetYear
  );
  const chartYears = getChartYearOptions(
    latestTargetYear ?? DEFAULT_CHART_END_YEAR,
    baseline?.year
  );

  const [chartData, setChartData] = useState<TargetChartData[]>([]);

  useEffect(() => {
    if (
      baseline &&
      scope1And2Year != null &&
      scope1And2Reduction != null &&
      strategy &&
      includeCarbonOffset != null
    ) {
      setChartData(
        getTargetData({
          baselineData: {
            year: baseline.year,
            scope1: baseline.scope1,
            scope2: baseline.scope2,
            scope3: baseline.scope3,
            offset: baseline.offset,
          },
          targetData: {
            scope1And2Year,
            scope1And2Reduction,
            scope3Year,
            scope3Reduction,
            strategy,
            includeCarbonOffset,
          },
        })
      );
    }
  }, [
    baseline,
    scope1And2Year,
    scope1And2Reduction,
    scope3Year,
    scope3Reduction,
    strategy,
    includeCarbonOffset,
  ]);

  const yAxisHighestPoint = getYAxisHighestPoint({
    targetData: chartData,
    ieaData,
  });

  return (
    <StyledComponents.ChartContainer data-testid="targets-chart">
      <ResponsiveContainer>
        <ComposedChart
          data={[...chartData, ...ieaData]}
          margin={{
            top: 25,
            right: 50,
            left: 50,
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
            dataKey="year"
            type="number"
            tickLine={false}
            interval={0}
            ticks={chartYears}
            tick={{ fill: Gray, fontSize: 12 }}
            domain={[chartYears[0], chartYears[chartYears.length - 1]]}
            padding={{ left: 20, right: 20 }}
            tickFormatter={(tick) =>
              `'${moment().set('year', tick).format('YY')}`
            }
            stroke={Alto}
            height={10}
          />
          <YAxis
            type="number"
            dataKey="targetEmission"
            axisLine={false}
            tickLine={false}
            tick={{ fill: Gray, fontSize: 12 }}
            interval={0}
            domain={[0, yAxisHighestPoint]}
            tickFormatter={formatInteger}
          />
          <Area
            dataKey="iea"
            fill={EarlyDawn}
            stroke="transparent"
            fillOpacity={1}
          />
          <Line
            dataKey="totalTargetEmission"
            type="monotone"
            dot={false}
            strokeDasharray="5 5"
            stroke={Apple}
            strokeWidth="2"
            strokeDashoffset={-2}
          />
          <Legend
            align="center"
            iconSize={12}
            iconType="circle"
            payload={[
              {
                value: t('targetForm:legend-label-target-data'),
                type: 'circle',
                id: 'legend1',
                color: Apple,
              },
              {
                value: t('targetForm:legend-label-iea'),
                type: 'circle',
                id: 'legend2',
                color: EarlyDawn,
              },
            ]}
            formatter={LegendItem}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </StyledComponents.ChartContainer>
  );
};

TargetChart.defaultProps = {
  scope1And2Year: undefined,
  scope1And2Reduction: undefined,
  strategy: undefined,
  scope3Year: undefined,
  scope3Reduction: undefined,
  includeCarbonOffset: undefined,
};
