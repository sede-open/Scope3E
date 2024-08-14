import { createPage } from 'components/CreatePage';
import { ValueChainRoutes } from 'containers/ValueChain/constants';
import { ValueChainPage } from '../../../containers/ValueChain/ValueChainPage';

const ValueChainPendingRequestsPage = () => (
  <ValueChainPage selectedTab={ValueChainRoutes.PendingRequests} />
);

export default createPage(ValueChainPendingRequestsPage, {
  publicPage: false,
});
