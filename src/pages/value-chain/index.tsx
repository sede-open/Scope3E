import { createPage } from 'components/CreatePage';
import { ValueChainRoutes } from 'containers/ValueChain/constants';
import { TribeJWTProvider } from 'context/TribeJWTProvider/TribeJWTProvider';
import { ValueChainPage } from '../../containers/ValueChain/ValueChainPage';

const ValueChainIndexPage = () => (
  <TribeJWTProvider>
    <ValueChainPage selectedTab={ValueChainRoutes.PendingRequests} />
  </TribeJWTProvider>
);

export default createPage(ValueChainIndexPage, {
  publicPage: false,
});
