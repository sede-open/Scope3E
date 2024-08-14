import { createPage } from 'components/CreatePage';
import { Page } from 'components/Page';
import RedirectTo from 'components/RedirectTo';
import { Community } from 'containers/Community';
import { TribeJWTProvider } from 'context/TribeJWTProvider/TribeJWTProvider';
import { Flags, getFeatureFlag } from 'utils/featureFlags';
import { PrimaryRoutes } from '../../constants';

export const CommunityPage = () =>
  getFeatureFlag(Flags.IS_COMMUNITY_PAGE_ENABLED) ? (
    <TribeJWTProvider>
      <Page selectedLink={PrimaryRoutes.Community}>
        <Community />
      </Page>
    </TribeJWTProvider>
  ) : (
    <RedirectTo url="/404" />
  );

export default createPage(CommunityPage, { publicPage: false });
