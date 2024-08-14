import { act, fireEvent, render } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { CompanyRelationshipType, TargetPrivacyType } from 'types/globalTypes';
import { CompanyOverviewQuery_companyProfile as CompanyProfile } from 'types/CompanyOverviewQuery';
import { inviteCompanyForm } from 'containers/AccountSettings/CompanyRelationships/InviteCompanyForm/selectors';
import { MockedProvider } from '@apollo/client/testing';
import { getGetMeMock } from 'mocks/me';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import companyOverviewNamespace from '../../../../locales/en/companyOverview.json';
import carbonIntensityNamespace from '../../../../locales/en/carbonIntensity.json';
import { CompanySummary, IProps } from '.';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');

const setup = ({
  companyProfile = {},
  showInvite = false,
}: {
  companyProfile?: Partial<CompanyProfile>;
  showInvite?: boolean;
}) => {
  const defaultProps: IProps = {
    companyProfile: {
      id: 'company-id',
      name: 'Company Name',
      dnbRegion: 'Region',
      dnbCountryIso: 'Country',
      estimatedNumberOfEmployees: 100,
      estimatedUsdOfRevenue: 1000,
      absoluteTargetType: TargetPrivacyType.PUBLIC,
      sectors: [],
      duns: '123456789',
      isPublic: true,
      isActive: true,
      activeRelationship: CompanyRelationshipType.CUSTOMER,
      invitationPending: false,
      dataShareRequestSent: true,
      companyPrivacy: {
        allPlatform: true,
        customerNetwork: true,
        supplierNetwork: true,
      },
      ...companyProfile,
    },
    showInvite,
  };
  return render(
    <I18nProvider
      namespaces={{
        companyOverview: companyOverviewNamespace,
        carbonIntensity: carbonIntensityNamespace,
      }}
    >
      <MockedProvider mocks={[getGetMeMock()]} addTypename={false}>
        <CompanySummary {...defaultProps} />
      </MockedProvider>
    </I18nProvider>
  );
};

describe('CompanySummery', () => {
  it('renders all the information correctly', async () => {
    const companyProfile = {
      id: 'company-id',
      name: 'Company Name',
      dnbRegion: 'Region',
      dnbCountryIso: 'Country',
      estimatedNumberOfEmployees: 100,
      estimatedUsdOfRevenue: 1000,
      absoluteTargetType: TargetPrivacyType.PRIVATE,
      sectors: ['Sector 1', 'Sector 2'],
    };
    const { findByTestId } = setup({ companyProfile });

    const name = await findByTestId(selectors.companyName);
    const sectors = await findByTestId(selectors.companySectors);
    const summary = await findByTestId(selectors.companySummary);

    expect(name).toHaveTextContent(companyProfile.name);
    expect(sectors).toHaveTextContent(companyProfile.sectors.join(' · '));
    expect(summary).toHaveTextContent(
      `${companyProfile.dnbRegion}, ${
        companyProfile.dnbCountryIso
      } · ${companyProfile.estimatedNumberOfEmployees.toLocaleString()} estimated employees · ${companyProfile.estimatedUsdOfRevenue.toLocaleString()} USD estimated revenue · Private target`
    );
  });
  it('does not render the sectors section when sectors array is empty', async () => {
    const companyProfile = {
      id: 'company-id',
      name: 'Company Name',
      dnbRegion: 'Region',
      dnbCountryIso: 'Country',
      estimatedNumberOfEmployees: 100,
      estimatedUsdOfRevenue: 1000,
      absoluteTargetType: TargetPrivacyType.PRIVATE,
      sectors: [],
    };
    const { findByTestId, queryByTestId } = setup({
      companyProfile,
      showInvite: false,
    });

    const name = await findByTestId(selectors.companyName);
    const summary = await findByTestId(selectors.companySummary);

    expect(name).toHaveTextContent(companyProfile.name);
    expect(queryByTestId(selectors.companySectors)).not.toBeInTheDocument();
    expect(summary).toHaveTextContent(
      `${companyProfile.dnbRegion}, ${
        companyProfile.dnbCountryIso
      } · ${companyProfile.estimatedNumberOfEmployees.toLocaleString()} estimated employees · ${companyProfile.estimatedUsdOfRevenue.toLocaleString()} USD estimated revenue · Private target`
    );
  });
  describe('when showInvite is true', () => {
    beforeEach(() => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          company: { id: 'some-id' },
        })
      );
    });
    it('renders the invite form when we choose to invite a customer', async () => {
      const { findByTestId, queryByTestId } = setup({ showInvite: true });
      const inviteBtn = await findByTestId(selectors.inviteCompanyBtn);
      act(() => {
        fireEvent.click(inviteBtn);
      });
      const customerOption = await findByTestId(
        CompanyRelationshipType.CUSTOMER
      );
      act(() => {
        fireEvent.click(customerOption);
      });
      expect(queryByTestId(inviteCompanyForm)).toBeInTheDocument();
    });
    it('renders the invite form when we choose to invite a supplier', async () => {
      const { findByTestId, queryByTestId } = setup({ showInvite: true });
      const inviteBtn = await findByTestId(selectors.inviteCompanyBtn);
      act(() => {
        fireEvent.click(inviteBtn);
      });
      const supplierOption = await findByTestId(
        CompanyRelationshipType.SUPPLIER
      );
      act(() => {
        fireEvent.click(supplierOption);
      });
      expect(queryByTestId(inviteCompanyForm)).toBeInTheDocument();
    });
  });
});
