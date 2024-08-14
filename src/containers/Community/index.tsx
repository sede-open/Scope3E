import CogSpinner from 'components/CogSpinner';
import { UnexpectedError } from 'containers/UnexpectedError';
import { useTribeJWT } from 'effects/useTribeJWT';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { CommunityDiscoverCards } from './CommunityDiscoverCards';
import { CommunityNeedMoreHelp } from './CommunityNeedMoreHelp';
import { CommunityPopularSpaces } from './CommunityPopularSpaces';
import { useTribeUsageStatsQuery } from './queries';
import * as StyledComponents from './styledComponents';
import { TribeBannerSimple } from './TribeBannerSimple';
import { TribeBannerSmart } from './TribeBannerSmart';

export const Community = () => {
  const { isTribeSmartBannerEnabled } = useFlags();
  const { error: tribeJwtError } = useTribeJWT();
  const { loading: isTribeUsageStatsLoading } = useTribeUsageStatsQuery();

  if (isTribeUsageStatsLoading) {
    return (
      <StyledComponents.Wrapper>
        <CogSpinner />
      </StyledComponents.Wrapper>
    );
  }

  if (tribeJwtError) {
    return (
      <StyledComponents.Wrapper>
        <UnexpectedError errorMessage={tribeJwtError} />
      </StyledComponents.Wrapper>
    );
  }

  return (
    <StyledComponents.Wrapper>
      <>
        {isTribeSmartBannerEnabled ? (
          <TribeBannerSmart />
        ) : (
          <TribeBannerSimple />
        )}
        <CommunityDiscoverCards />
        <CommunityPopularSpaces />
        <CommunityNeedMoreHelp />
      </>
    </StyledComponents.Wrapper>
  );
};
