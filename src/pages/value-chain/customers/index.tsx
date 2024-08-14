import { createPage } from 'components/CreatePage';
import { ValueChainRoutes } from 'containers/ValueChain/constants';
import { ValueChainPage } from '../../../containers/ValueChain/ValueChainPage';

const ValueChainCustomersPage = () => (
  <ValueChainPage selectedTab={ValueChainRoutes.Customers} />
);

export default createPage(ValueChainCustomersPage, {
  publicPage: false,
});
