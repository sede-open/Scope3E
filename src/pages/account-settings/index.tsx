import { createPage } from 'components/CreatePage';
import { AccountSettingsPage } from 'containers/AccountSettings/AccountSettingsPage';
import { AccountSettingsRoutes } from 'containers/AccountSettings/constants';

const AccountSettingsIndexPage = () => (
  <AccountSettingsPage selectedTab={AccountSettingsRoutes.Suppliers} />
);

export default createPage(AccountSettingsIndexPage, { publicPage: false });
