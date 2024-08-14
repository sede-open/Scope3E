import { createPage } from 'components/CreatePage';
import { Page } from 'components/Page';
import { CompaniesDashboard } from 'containers/AdminDashboard/Companies';
import { AdminDashboardRoutes } from '../../../constants';

export const CompaniesDashboardPage = () => (
  <Page isAdminPage selectedLink={AdminDashboardRoutes.CompaniesDashboard}>
    <CompaniesDashboard />
  </Page>
);

export default createPage(CompaniesDashboardPage, { publicPage: false });
