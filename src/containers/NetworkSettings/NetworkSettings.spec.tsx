import { render, waitFor } from '@testing-library/react';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { Page } from 'components/Page';
import { CompanyRelationships } from 'containers/AccountSettings/CompanyRelationships';
import { QuickConnect } from 'containers/QuickConnect';
import { useNetworkSummaryQuery } from 'containers/ValueChain/NeworkSummary/queries';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';
import { mocked } from 'jest-mock';
import I18nProvider from 'next-translate/I18nProvider';
import { ReactNode } from 'react';
import { CompanyRelationshipType } from 'types/globalTypes';
import { NetworkSettingsContainer } from '.';
import networkSettingsNamespace from '../../../locales/en/networkSettings.json';
import { networkSettingsNavLinks, NetworkSettingsRoutes } from './constants';
import { Invitations } from './Invitations';
import {
  networkPageSelector,
  tabNotificationContainerSelector,
} from './selectors';

jest.mock('effects/useAuthenticatedUser');
jest.mock('components/Page');
jest.mock('containers/AccountSettings/CompanyRelationships');
jest.mock('./Invitations');
jest.mock('containers/QuickConnect');
jest.mock('containers/ValueChain/NeworkSummary/queries');
const mockedPage = mocked(Page);
const mockedCompanyRelations = mocked(CompanyRelationships);
const mockedQuickConnect = mocked(QuickConnect);
const mockedInvitations = mocked(Invitations);
const mockedPendingInvites = mocked(useNetworkSummaryQuery);

describe('Network Settings', () => {
  const setup = (tab: NetworkSettingsRoutes) => {
    return render(
      <I18nProvider
        namespaces={{
          networkSettings: networkSettingsNamespace,
        }}
      >
        <NetworkSettingsContainer selectedTab={tab} />
      </I18nProvider>
    );
  };

  mockedPage.mockImplementation(({ children }: { children: ReactNode }) => {
    return <div>{children}</div>;
  });

  const invitationSelector = 'invitation-component';

  mockedInvitations.mockImplementation(() => {
    return <div data-testid={invitationSelector} />;
  });

  mockedPendingInvites.mockReturnValue({
    data: {
      networkSummary: {
        numPendingInvitations: 1,
      },
    },
    loading: false,
  } as any);

  const quickConnectSelector = 'quick-connect';

  mockedQuickConnect.mockImplementation(() => {
    return <div data-testid={quickConnectSelector} />;
  });

  mockedCompanyRelations.mockReturnValue(null);

  beforeAll(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockResolvedValue({
      canEditCompanyRelationships: true,
    });
  });

  describe('When network page flag disabled', () => {
    beforeAll(() => {
      resetLDMocks();
      mockFlags({ isNetworkPageEnabled: false });
    });
    it('should render null', () => {
      const { queryByTestId } = setup(NetworkSettingsRoutes.Customers);
      const element = queryByTestId(networkPageSelector);
      expect(element).toBeNull();
    });
  });

  describe('When network page flag enabled', () => {
    beforeAll(() => {
      resetLDMocks();
      mockFlags({ isNetworkPageEnabled: true });
    });
    beforeEach(() => {
      mockedCompanyRelations.mockClear();
    });
    it('should load all tabs headers and customer tab', () => {
      const { getByTestId } = setup(NetworkSettingsRoutes.Customers);
      networkSettingsNavLinks.forEach(({ link }) => {
        getByTestId(`tab-${link}`);
      });

      waitFor(() => {
        expect(mockedCompanyRelations).toBeCalledWith({
          relationshipType: CompanyRelationshipType.CUSTOMER,
        });
      });
    });

    it('should load supplier tab', () => {
      setup(NetworkSettingsRoutes.Suppliers);
      waitFor(() => {
        expect(mockedCompanyRelations).toBeCalledWith({
          relationshipType: CompanyRelationshipType.SUPPLIER,
        });
      });
    });

    it('should load invitation tab and show notification', () => {
      const { queryByTestId } = setup(NetworkSettingsRoutes.Invitations);
      expect(queryByTestId(invitationSelector)).toBeInTheDocument();
      expect(queryByTestId(tabNotificationContainerSelector)).not.toBeNull();
    });

    describe('when displaying tabs', () => {
      it('should show network, supplier and invites tabs', async () => {
        const links = networkSettingsNavLinks.flatMap((link) => link.link);
        expect(links).toContain('/invitations');
        expect(links).toContain('/suppliers');
        expect(links).toContain('/customers');
      });
    });

    describe('when the user can edit company relations', () => {
      it('should render the quick connect component', async () => {
        ((useAuthenticatedUser as unknown) as jest.Mock).mockReturnValue({
          canEditCompanyRelationships: true,
        });
        const { findByTestId } = setup(NetworkSettingsRoutes.Invitations);
        expect(await findByTestId(quickConnectSelector)).toBeInTheDocument();
      });
    });

    describe('when the user cannot edit company relations', () => {
      it('should not render the quick connect component', async () => {
        ((useAuthenticatedUser as unknown) as jest.Mock).mockReturnValue({
          canEditCompanyRelationships: false,
        });
        const { queryByTestId } = setup(NetworkSettingsRoutes.Invitations);
        expect(queryByTestId(quickConnectSelector)).not.toBeInTheDocument();
      });
    });
  });
});
