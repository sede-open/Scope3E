import { createPage } from 'components/CreatePage';
import { ValueChainRoutes } from 'containers/ValueChain/constants';
import { ValueChainPage } from '../../../containers/ValueChain/ValueChainPage';

const ValueChainSuppliersPage = () => (
  <ValueChainPage selectedTab={ValueChainRoutes.Suppliers} />
);

export default createPage(ValueChainSuppliersPage, {
  publicPage: false,
});
