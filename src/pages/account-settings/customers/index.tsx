import { createPage } from 'components/CreatePage';
import { AccountSettingsPage } from 'containers/AccountSettings/AccountSettingsPage';
import { AccountSettingsRoutes } from 'containers/AccountSettings/constants';

const AccountSettingsCustomersPage = () => (
  <AccountSettingsPage selectedTab={AccountSettingsRoutes.Customers} />
);

export default createPage(AccountSettingsCustomersPage, { publicPage: false });
