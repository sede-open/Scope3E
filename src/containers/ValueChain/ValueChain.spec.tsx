import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import { EmissionAllocationDirection } from 'types/globalTypes';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { ModalProvider } from 'context/ModalProvider/ModalProvider';
import * as CorporateEmissionsMocks from 'mocks/corporateEmissions';
import * as emissionAllocationsMocks from 'mocks/emissionAllocations';
import * as meMocks from 'mocks/me';
import { networkSummaryMock } from 'mocks/networkSummary';
import * as emissionPathSelectSelectors from 'containers/Modals/EmissionPathSelect/selectors';
import * as communityBannerSelectors from 'containers/CommunityBanner/selectors';

import valueChainNamespace from '../../../locales/en/valueChain.json';
import corporateEmissionFormNamespace from '../../../locales/en/corporateEmissionForm.json';
import commonNamespace from '../../../locales/en/common.json';
import communityNamespace from '../../../locales/en/community.json';

import { ValueChain } from '.';
import { ValueChainRoutes } from './constants';
import * as selectors from './selectors';

const customerEmissionAllocationsMock = emissionAllocationsMocks.getEmissionAllocationsForYearMock(
  {
    year: 2020,
    emissionAllocation:
      EmissionAllocationDirection.EMISSION_ALLOCATED_TO_CUSTOMERS,
    emissionAllocations: [],
  }
);

const setup = ({ mocks }: { mocks: any[] }) =>
  render(
    <I18nProvider
      namespaces={{
        valueChain: valueChainNamespace,
        community: communityNamespace,
        common: commonNamespace,
        corporateEmissionForm: corporateEmissionFormNamespace,
      }}
    >
      <MockedProvider
        mocks={[customerEmissionAllocationsMock, ...mocks]}
        addTypename={false}
      >
        <AuthenticatedUserProvider>
          <ModalProvider>
            <ValueChain selectedTab={ValueChainRoutes.Customers} />
          </ModalProvider>
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );

describe('ValueChain', () => {
  const emptyCorporateEmissionsMock = CorporateEmissionsMocks.getCorporateEmissions(
    []
  );

  beforeEach(() => {
    resetLDMocks();
    mockFlags({
      isValueChainCommunityBannerEnabled: false,
      isNetworkPageEnabled: true,
    });
  });

  describe('when there are no historical emissions', () => {
    it('should display the Empty View', async () => {
      const { findByTestId, queryByTestId } = setup({
        mocks: [meMocks.getGetMeMock(), emptyCorporateEmissionsMock],
      });

      expect(
        queryByTestId(selectors.tabContentContainer)
      ).not.toBeInTheDocument();
      expect(
        await findByTestId(selectors.valueChainEmptyView)
      ).toBeInTheDocument();
      expect(
        await findByTestId(selectors.valueChainEmptyViewCTA)
      ).toBeInTheDocument();
    });

    it('should open the Emission Path Select when the Add emissions button is clicked', async () => {
      const { findByTestId } = setup({
        mocks: [emptyCorporateEmissionsMock, meMocks.getGetMeMock()],
      });

      await act(async () => {
        fireEvent.click(await findByTestId(selectors.valueChainEmptyViewCTA));
      });

      expect(
        await findByTestId(emissionPathSelectSelectors.container)
      ).toBeInTheDocument();
    });

    describe('when the user does not have edit permission', () => {
      it('should not display the Add emissions button', async () => {
        const { findByTestId, queryByTestId } = setup({
          mocks: [
            emptyCorporateEmissionsMock,
            meMocks.getGetMeMock({ canEditSupplyDashboard: false }),
          ],
        });

        expect(
          await findByTestId(selectors.valueChainEmptyView)
        ).toBeInTheDocument();
        expect(
          queryByTestId(selectors.valueChainEmptyViewCTA)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('when there are any historical emissions', () => {
    const corporateEmissionsMock = CorporateEmissionsMocks.getCorporateEmissions(
      [
        {
          id: 'emission-0',
          scope1: 1000,
          scope2: 1000,
          scope3: 1000,
          offset: 1000,
          year: 2020,
        },
      ]
    );

    it('should display the active tabbed interface', async () => {
      const { findByTestId, queryByTestId } = setup({
        mocks: [corporateEmissionsMock, meMocks.getGetMeMock()],
      });

      expect(
        queryByTestId(selectors.valueChainEmptyView)
      ).not.toBeInTheDocument();
      expect(
        await findByTestId(selectors.tabContentContainer)
      ).toBeInTheDocument();
    });
  });

  describe('the community banner', () => {
    describe('when the value chain community banner flag is disabled', () => {
      beforeEach(() => {
        mockFlags({ isValueChainCommunityBannerEnabled: false });
      });

      it('should not render the community banner', async () => {
        const { queryByTestId } = setup({
          mocks: [meMocks.getGetMeMock(), emptyCorporateEmissionsMock],
        });

        expect(
          queryByTestId(communityBannerSelectors.title)
        ).not.toBeInTheDocument();
      });
    });

    describe('when the value chain community banner flag is enabled', () => {
      beforeEach(() => {
        mockFlags({
          isValueChainCommunityBannerEnabled: true,
        });
      });

      it('should render the community banner', async () => {
        const { findByTestId } = setup({
          mocks: [meMocks.getGetMeMock(), emptyCorporateEmissionsMock],
        });

        expect(
          await findByTestId(communityBannerSelectors.title)
        ).toHaveTextContent(communityNamespace['banner-title']);
      });
    });
  });

  describe('the network summary', () => {
    it('should not render the network summary component when the feature flag is disabled', () => {
      mockFlags({
        isValueChainCommunityBannerEnabled: false,
        isNetworkPageEnabled: false,
      });

      setup({
        mocks: [meMocks.getGetMeMock(), emptyCorporateEmissionsMock],
      });

      const { queryByTestId } = setup({
        mocks: [meMocks.getGetMeMock(), emptyCorporateEmissionsMock],
      });

      expect(
        queryByTestId(selectors.networkSummaryTitle)
      ).not.toBeInTheDocument();
    });

    it('should render the network summary component when the feature flag is enabled', async () => {
      mockFlags({
        isValueChainCommunityBannerEnabled: false,
        isNetworkPageEnabled: true,
      });

      const { queryByTestId } = setup({
        mocks: [
          meMocks.getGetMeMock(),
          emptyCorporateEmissionsMock,
          networkSummaryMock({ companyId: meMocks.baseMe?.company?.id }),
        ],
      });

      await waitFor(() => {
        expect(queryByTestId(selectors.networkSummaryTitle)).toHaveTextContent(
          valueChainNamespace['network-summary-title']
        );
      });
    });

    it('should render the correct content when network summary counts are > 0', async () => {
      mockFlags({
        isValueChainCommunityBannerEnabled: false,
        isNetworkPageEnabled: true,
      });

      const { queryByTestId } = setup({
        mocks: [
          meMocks.getGetMeMock(),
          emptyCorporateEmissionsMock,
          networkSummaryMock({
            companyId: meMocks.baseMe?.company?.id,
            numSuppliers: 1,
            numCustomers: 2,
            numPendingInvitations: 3,
          }),
        ],
      });

      await waitFor(() => {
        expect(
          queryByTestId(selectors.supplierSummaryMessage)
        ).toHaveTextContent('1 supplier');

        expect(
          queryByTestId(selectors.customerSummaryMessage)
        ).toHaveTextContent('2 customers');

        expect(
          queryByTestId(selectors.pendingInvitationsSummaryMessage)
        ).toHaveTextContent('3 invitations');
      });
    });

    it('should render the correct content when network summary values are 0', async () => {
      mockFlags({
        isValueChainCommunityBannerEnabled: false,
        isNetworkPageEnabled: true,
      });

      const { queryByTestId } = setup({
        mocks: [
          meMocks.getGetMeMock(),
          emptyCorporateEmissionsMock,
          networkSummaryMock({
            companyId: meMocks.baseMe?.company?.id,
            numSuppliers: 0,
            numCustomers: 0,
            numPendingInvitations: 0,
          }),
        ],
      });

      await waitFor(() => {
        expect(
          queryByTestId(selectors.supplierSummaryMessage)
        ).toHaveTextContent('0 suppliers');

        expect(
          queryByTestId(selectors.customerSummaryMessage)
        ).toHaveTextContent('0 customers');

        expect(
          queryByTestId(selectors.pendingInvitationsSummaryMessage)
        ).toHaveTextContent('0 invitations');
      });
    });
  });

  describe('the intro section', () => {
    describe('when the network page is enabled', () => {
      it('should render a button with a link to the create network page', async () => {
        mockFlags({
          isValueChainCommunityBannerEnabled: false,
          isNetworkPageEnabled: true,
        });

        const { queryByText } = setup({
          mocks: [
            meMocks.getGetMeMock(),
            emptyCorporateEmissionsMock,
            networkSummaryMock({ companyId: meMocks.baseMe?.company?.id }),
          ],
        });

        await waitFor(() => {
          expect(
            queryByText(valueChainNamespace['build-your-supply-chain-cta'])
          ).toBeInTheDocument();
        });
      });
    });
  });
});
