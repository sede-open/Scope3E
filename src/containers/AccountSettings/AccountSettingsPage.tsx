import { createPage } from 'components/CreatePage';
import { Page } from 'components/Page';
import { AccountSettings } from '.';
import { AccountSettingsRoutes } from './constants';

interface IProps {
  selectedTab: AccountSettingsRoutes;
}

export const AccountSettingsPage = ({ selectedTab }: IProps) => (
  <Page hasSubheaderNavigation={false}>
    <AccountSettings selectedTab={selectedTab} />
  </Page>
);

export default createPage(AccountSettingsPage, { publicPage: false });
