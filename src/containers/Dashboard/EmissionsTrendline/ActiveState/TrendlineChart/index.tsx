import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useTranslation from 'next-translate/useTranslation';
import moment from 'moment';

import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { Alto, CongressBlue, Gray, RockBlue, ShipCove } from 'styles/colours';
import { LegendItem } from 'components/LegendItem';
import { getFutureYearOptions } from 'utils/emissions';
import {
  EmissionsTrendData,
  getHistoricalEmissionsWithFillers,
} from 'utils/trendline';
import { formatInteger } from 'utils/number';

import { TrendlineTooltip } from './TrendlineTooltip';
import * as StyledComponents from './styledComponents';

const formatTick = (tick: number) => {
  const futureYears = getFutureYearOptions();
  const formattedYear = `'${moment().set('year', tick).format('YY')}`;

  if (futureYears.includes(tick)) {
    return `${formattedYear}*`;
  }
  return formattedYear;
};

interface IProps {
  historicalEmissions: Emission[];
  emissionsTrend: EmissionsTrendData[];
}

export const TrendlineChart = ({
  emissionsTrend,
  historicalEmissions,
}: IProps) => {
  const { t } = useTranslation();
  const historicalEmissionsWithFillers = getHistoricalEmissionsWithFillers(
    historicalEmissions
  );
  const lastFourHistoricalEmissions =
    historicalEmissionsWithFillers.length > 4
      ? historicalEmissionsWithFillers.slice(
          historicalEmissionsWithFillers.length - 4,
          historicalEmissionsWithFillers.length
        )
      : historicalEmissionsWithFillers;

  return (
    <StyledComponents.ChartContainer data-testid="emissions-trendline-chart">
      <ResponsiveContainer height={340} width="100%">
        <BarChart
          data={[...lastFourHistoricalEmissions, ...emissionsTrend]}
          margin={{
            bottom: 5,
            left: 55,
            top: 12,
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
            dataKey="year"
            height={10}
            padding={{ left: 20, right: 20 }}
            stroke={Gray}
            tick={{ fill: Gray, fontSize: 12 }}
            tickFormatter={formatTick}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            stroke={Gray}
            tickFormatter={formatInteger}
          >
            <Label
              value={t('dashboard:emissions-trendline-chart-y-label')}
              position="left"
              angle={-90}
              style={{ textAnchor: 'middle', fill: Gray }}
              offset={50}
              fontSize={12}
            />
          </YAxis>
          <Bar dataKey="scope1" stackId="b" fill={CongressBlue} barSize={12} />
          <Bar dataKey="scope2" stackId="b" fill={ShipCove} barSize={12} />
          <Bar dataKey="scope3" stackId="b" fill={RockBlue} barSize={12} />
          <Legend
            align="center"
            iconSize={12}
            iconType="circle"
            wrapperStyle={{
              bottom: '0',
              paddingTop: '2rem',
            }}
            payload={[
              {
                value: t('dashboard:emissions-trendline-chart-legend-scope1'),
                type: 'circle',
                id: 'legend1',
                color: CongressBlue,
              },
              {
                value: t('dashboard:emissions-trendline-chart-legend-scope2'),
                type: 'circle',
                id: 'legend2',
                color: ShipCove,
              },
              {
                value: t('dashboard:emissions-trendline-chart-legend-scope3'),
                type: 'circle',
                id: 'legend3',
                color: RockBlue,
              },
            ]}
            formatter={LegendItem}
          />
          <Tooltip
            content={TrendlineTooltip}
            cursor={{ fill: 'transparent' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </StyledComponents.ChartContainer>
  );
};
