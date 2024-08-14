import { TabNotification } from 'components/Glyphs/TabNotification';
import { SettingHeader } from 'components/Settings/Header';
import {
  Column,
  ColumnSpacer,
  TabContent,
  Wrapper,
} from 'components/Settings/sharedStyledComponents';
import { Tab, TabList, TabsAlignment, TabSize } from 'components/Tabs';
import { CompanyRelationships } from 'containers/AccountSettings/CompanyRelationships';
import { QuickConnect } from 'containers/QuickConnect';
import { useNetworkSummaryQuery } from 'containers/ValueChain/NeworkSummary/queries';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useFlags } from 'launchdarkly-react-client-sdk';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { CompanyRelationshipType } from 'types/globalTypes';
import {
  networkSettingsNavLinks,
  NetworkSettingsRoutes,
  NETWORK_SETTINGS_ROUTE_PREFIX,
} from './constants';
import { Invitations } from './Invitations';
import {
  networkPageSelector,
  networkSettingPrefix,
  tabNotificationContainerSelector,
} from './selectors';
import {
  TabNotificationContainer,
  TabContentContainer,
} from './styledComponents';
import { getQuckConnectContentType, getQuickConnectFilterType } from './utils';

interface NetworkSettingsContainerInterface {
  selectedTab: NetworkSettingsRoutes;
}

export const NetworkSettingsContainer = ({
  selectedTab,
}: NetworkSettingsContainerInterface) => {
  const { isNetworkPageEnabled } = useFlags();
  const { t } = useTranslation();
  const { canEditCompanyRelationships } = useAuthenticatedUser();

  const { data } = useNetworkSummaryQuery();
  const hasNetworkNotification = Boolean(
    data?.networkSummary?.numPendingInvitations
  );

  if (!isNetworkPageEnabled) {
    return null;
  }

  return (
    <Wrapper data-testid={networkPageSelector}>
      <SettingHeader
        dataTestIdPrefix={networkSettingPrefix}
        backNavigationText={t('networkSettings:back-btn')}
        title={t('networkSettings:heading')}
      />
      <ColumnSpacer />
      <Column width={100}>
        <TabList align={TabsAlignment.LEFT}>
          {networkSettingsNavLinks.map(({ label, link }) => (
            <Link
              key={link}
              href={`${NETWORK_SETTINGS_ROUTE_PREFIX}${link}`}
              passHref
            >
              <Tab
                key={link}
                data-testid={`tab-${link}`}
                as="a"
                size={TabSize.SMALL}
                isSelected={selectedTab === link}
                disabled={selectedTab === link}
              >
                {hasNetworkNotification &&
                  link === NetworkSettingsRoutes.Invitations && (
                    <TabNotificationContainer
                      data-testid={tabNotificationContainerSelector}
                    >
                      <TabNotification />
                    </TabNotificationContainer>
                  )}
                {t(label)}
              </Tab>
            </Link>
          ))}
        </TabList>

        <TabContent>
          <TabContentContainer>
            {selectedTab === NetworkSettingsRoutes.Invitations && (
              <Invitations />
            )}

            {selectedTab === NetworkSettingsRoutes.Suppliers && (
              <CompanyRelationships
                relationshipType={CompanyRelationshipType.SUPPLIER}
              />
            )}
            {selectedTab === NetworkSettingsRoutes.Customers && (
              <CompanyRelationships
                relationshipType={CompanyRelationshipType.CUSTOMER}
              />
            )}
          </TabContentContainer>
          {canEditCompanyRelationships && (
            <QuickConnect
              filterOn={getQuickConnectFilterType(selectedTab)}
              contentType={getQuckConnectContentType(selectedTab)}
            />
          )}
        </TabContent>
      </Column>
    </Wrapper>
  );
};
