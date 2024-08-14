import { DotProps } from 'recharts';
import { White } from 'styles/colours';
import { DotDataKeyType, getDotColour } from './utils';

export const ChartDot = ({
  cx,
  cy,
  r,
  key,
  payload,
  dataKey,
}: DotProps & { dataKey: string; payload: any; key: string }) => {
  if (!payload.year || !payload[dataKey]) {
    return null;
  }

  const colour = getDotColour(dataKey as DotDataKeyType);

  return (
    <circle
      key={key}
      cx={cx}
      cy={cy}
      r={r}
      fill={White}
      stroke={colour}
      strokeWidth="2"
    />
  );
};
