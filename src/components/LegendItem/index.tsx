import { LegendPayload } from 'recharts';
import { Text } from 'components/Text';
import { Gray } from 'styles/colours';

export const LegendItem = (value?: LegendPayload['value']) => (
  <Text as="span" color={Gray} size="12px">
    {value}{' '}
  </Text>
);
