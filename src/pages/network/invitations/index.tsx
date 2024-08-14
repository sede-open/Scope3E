import { createPage } from 'components/CreatePage';
import { Page } from 'components/Page';
import { NetworkSettingsContainer } from 'containers/NetworkSettings';
import { NetworkSettingsRoutes } from 'containers/NetworkSettings/constants';

export const NetworkPage = () => {
  const selectedTab: NetworkSettingsRoutes = NetworkSettingsRoutes.Invitations;

  return (
    <Page hasSubheaderNavigation={false}>
      <NetworkSettingsContainer selectedTab={selectedTab} />
    </Page>
  );
};

export default createPage(NetworkPage, { publicPage: false });
