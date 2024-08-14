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

import { Alto, CongressBlue, Gray } from 'styles/colours';
import { LegendItem } from 'components/LegendItem';
import { getFutureYearOptions } from 'utils/emissions';
import { formatInteger } from 'utils/number';

import { CompanyOverviewQuery_emissionsAllocatedToMyCompany as EmissionAllocation } from 'types/CompanyOverviewQuery';
import { ChartTooltip } from './ChartTooltip';

const formatTick = (tick: number) => {
  const futureYears = getFutureYearOptions();
  const formattedYear = `'${moment().set('year', tick).format('YY')}`;

  if (futureYears.includes(tick)) {
    return `${formattedYear}*`;
  }
  return formattedYear;
};

interface IProps {
  emissionAllocations: EmissionAllocation[];
}

export const EmissionsAllocatedChart = ({ emissionAllocations }: IProps) => {
  const { t } = useTranslation('companyOverview');

  return (
    <ResponsiveContainer height={340} width="100%">
      <BarChart
        data={emissionAllocations}
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
            value={t('tCO2e')}
            position="left"
            angle={-90}
            style={{ textAnchor: 'middle', fill: Gray }}
            offset={50}
            fontSize={12}
          />
        </YAxis>
        <Bar dataKey="emissions" stackId="b" fill={CongressBlue} barSize={12} />
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
              value: t('emissionsAllocated'),
              type: 'circle',
              id: 'legend1',
              color: CongressBlue,
            },
          ]}
          formatter={LegendItem}
        />
        <Tooltip content={ChartTooltip} cursor={{ fill: 'transparent' }} />
      </BarChart>
    </ResponsiveContainer>
  );
};
