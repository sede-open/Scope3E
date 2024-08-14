import { TRIBE_USAGE_STATS_QUERY } from 'containers/Community/queries';

export const tribeMocks = {
  request: {
    query: TRIBE_USAGE_STATS_QUERY,
  },
  result: {
    data: {
      tribeUsageStats: {
        replies: 500,
        members: 440,
        topics: 473,
      },
    },
  },
};
