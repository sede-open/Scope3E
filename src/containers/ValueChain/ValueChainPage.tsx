import { Page } from 'components/Page';
import { ValueChain } from 'containers/ValueChain';
import { ValueChainRoutes } from 'containers/ValueChain/constants';

import { PrimaryRoutes } from '../../constants';

interface IProps {
  selectedTab: ValueChainRoutes;
}

export const ValueChainPage = ({ selectedTab }: IProps) => (
  <Page selectedLink={PrimaryRoutes.ValueChain}>
    <ValueChain selectedTab={selectedTab} />
  </Page>
);
