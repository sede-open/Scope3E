import { createPage } from 'components/CreatePage';
import { Page } from 'components/Page';
import { UsersDashboard } from 'containers/AdminDashboard/Users';
import { AdminDashboardRoutes } from '../../../constants';

export const UsersDashboardPage = () => (
  <Page isAdminPage selectedLink={AdminDashboardRoutes.UsersDashboard}>
    <UsersDashboard />
  </Page>
);

export default createPage(UsersDashboardPage, { publicPage: false });
