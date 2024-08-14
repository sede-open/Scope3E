import { createPage } from 'components/CreatePage';
import { Providers } from 'components/Page/Providers';
import { PageHead } from 'components/PageHead';
import { Dashboard } from 'containers/Dashboard';

export const DashboardPage = () => (
  <Providers>
    <PageHead />
    <Dashboard />
  </Providers>
);

export default createPage(DashboardPage, { publicPage: false });
