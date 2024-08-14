import useTranslation from 'next-translate/useTranslation';

import { exampleBold } from 'styles/fonts';
import { Tundora } from 'styles/colours';
import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { getContiguousEmissions } from 'utils/trendline';
import { Text } from 'components/Text';

import * as StyledComponents from './styledComponents';

import { ActiveState } from './ActiveState';
import { EmptyState } from './EmptyState';

interface IProps {
  emissions: Emission[];
  loading: Boolean;
}

export const EmissionsTrendline = ({ emissions, loading }: IProps) => {
  const { t } = useTranslation();

  const contiguousEmissions = getContiguousEmissions(emissions);
  const hasRequiredHistoricalData = contiguousEmissions.length > 2;

  return (
    <div data-testid="emissions-trendline">
      <StyledComponents.Header>
        <Text as="h2" family={exampleBold} color={Tundora} size="24px">
          {t('dashboard:emissions-trendline-heading')}
        </Text>
      </StyledComponents.Header>
      {hasRequiredHistoricalData ? (
        <ActiveState emissions={contiguousEmissions} loading={loading} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
