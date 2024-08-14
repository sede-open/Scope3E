import CogSpinner from 'components/CogSpinner';
import { SettingHeader } from 'components/Settings/Header';
import {
  Column,
  ColumnSpacer,
  TabContent,
  Wrapper,
} from 'components/Settings/sharedStyledComponents';
import { Tab, TabList, TabsAlignment, TabSize } from 'components/Tabs';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { useFlags } from 'launchdarkly-react-client-sdk';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { CompanyRelationshipType } from 'types/globalTypes';
import { CompanyRelationships } from './CompanyRelationships';
import {
  accountSettingsNavLinks,
  AccountSettingsRoutes,
  ACCOUNT_SETTINGS_ROUTE_PREFIX,
} from './constants';
import { PersonalPreferences } from './PersonalPreferences';
import { headerSettingsTestId } from './selectors';
import { YourOrganisation } from './YourOrganisation';

interface IProps {
  selectedTab: AccountSettingsRoutes;
}

export const AccountSettings = ({ selectedTab }: IProps) => {
  const { t } = useTranslation();
  const { company: userCompany } = useAuthenticatedUser();
  const { isNetworkPageEnabled } = useFlags();
  const companyId = userCompany?.id;
  if (!companyId) {
    return null;
  }

  // Temporary fix until Launch Darkly is moved back into app.tsx
  if (isNetworkPageEnabled === undefined) {
    return <CogSpinner />;
  }
  const accountSettingsNavLinksFiltered =
    isNetworkPageEnabled === true
      ? accountSettingsNavLinks.filter(
          (link) =>
            link.link !== AccountSettingsRoutes.Customers &&
            link.link !== AccountSettingsRoutes.Suppliers
        )
      : accountSettingsNavLinks;
  return (
    <Wrapper data-testid={headerSettingsTestId}>
      <SettingHeader
        backNavigationText={t('accountSettings:nav-btn')}
        title={t('accountSettings:heading')}
        dataTestIdPrefix={headerSettingsTestId}
      />
      <ColumnSpacer />
      <Column width={100}>
        <TabList align={TabsAlignment.LEFT}>
          {accountSettingsNavLinksFiltered.map(({ label, link }) => (
            <Link
              key={link}
              href={`${ACCOUNT_SETTINGS_ROUTE_PREFIX}${link}`}
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
                {t(label)}
              </Tab>
            </Link>
          ))}
        </TabList>

        <TabContent>
          {selectedTab === AccountSettingsRoutes.PersonalPreferences && (
            <PersonalPreferences />
          )}
          {selectedTab === AccountSettingsRoutes.YourOrganisation && (
            <YourOrganisation />
          )}
          {selectedTab === AccountSettingsRoutes.Suppliers &&
            isNetworkPageEnabled === false && (
              <CompanyRelationships
                relationshipType={CompanyRelationshipType.SUPPLIER}
              />
            )}
          {selectedTab === AccountSettingsRoutes.Customers &&
            isNetworkPageEnabled === false && (
              <CompanyRelationships
                relationshipType={CompanyRelationshipType.CUSTOMER}
              />
            )}
        </TabContent>
      </Column>
    </Wrapper>
  );
};
