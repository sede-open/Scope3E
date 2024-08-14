import { createPage } from 'components/CreatePage';
import { Page } from 'components/Page';
import { AmbitionSimulation } from 'containers/AmbitionSimulation';
import { PrimaryRoutes } from '../../constants';

export const AmbitionSimulationPage = () => (
  <Page selectedLink={PrimaryRoutes.AmbitionSimulation}>
    <AmbitionSimulation />
  </Page>
);

export default createPage(AmbitionSimulationPage, { publicPage: false });
