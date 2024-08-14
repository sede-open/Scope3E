import { gql, useQuery } from '@apollo/client';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { TribeUsageStatsQuery } from 'types/TribeUsageStatsQuery';

export const TRIBE_USAGE_STATS_QUERY = gql`
  query TribeUsageStatsQuery {
    tribeUsageStats {
      replies
      members
      topics
    }
  }
`;

export const useTribeUsageStatsQuery = () => {
  const { isTribeSmartBannerEnabled } = useFlags();
  return isTribeSmartBannerEnabled
    ? useQuery<TribeUsageStatsQuery>(TRIBE_USAGE_STATS_QUERY)
    : { data: null, loading: false };
};
