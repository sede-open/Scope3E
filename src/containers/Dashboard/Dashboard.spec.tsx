import I18nProvider from 'next-translate/I18nProvider';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Environments } from 'utils/featureFlags';
import getConfig from 'next/config';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import * as userSolutionInterestsMocks from 'mocks/userSolutionInterests';
import * as companySectorsMocks from 'mocks/companySectors';
import * as sectorsMocks from 'mocks/sectors';
import * as dashboardMocks from 'mocks/dashboard';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { USER_COMPANY_ID } from 'mocks/constants';
import { COMPANY_ACTIVATED } from 'utils/analyticsEvents';
import { trackEvent } from 'utils/analytics';
import * as analyticsEvents from 'utils/analytics';
import {
  CompanySectorType,
  CompanyStatus,
  SolutionInterestsSystemName,
  UserStatus,
} from 'types/globalTypes';
import { editorRole, viewerRole } from 'mocks/adminDashboard';
import { primaryNavLinks } from '../../constants';
import * as userOnboardingSelectors from './UserOnboarding/selectors';
import * as activeDashboardSelectors from './ActiveState/selectors';
import * as dashboardSelectors from './selectors';
import * as footerSelectors from '../../components/Footer/selectors';
import * as userOnboardingNamespace from '../../../locales/en/userOnboarding.json';
import { Dashboard } from '.';

jest.mock('effects/useAuthenticatedUser');

const setup = (mocks: any[]) =>
  render(
    <I18nProvider
      namespaces={{
        userOnboarding: userOnboardingNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    </I18nProvider>
  );

describe('Dashboard', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      canViewSupplyDashboard: true,
      firstName: 'Test',
      company: { id: USER_COMPANY_ID },
      roles: [editorRole, viewerRole],
      status: UserStatus.ACTIVE,
    }));
    resetLDMocks();
    mockFlags({ isDataPrivacyInfoWizardEnabled: true });
  });

  it('should display the onboarding dashboard', async () => {
    const { findByTestId, queryByTestId } = setup([
      userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
    ]);

    expect(
      await findByTestId(dashboardSelectors.withOnboarding)
    ).toBeInTheDocument();
    expect(
      await queryByTestId(footerSelectors.footerContainer)
    ).not.toBeInTheDocument();
  });

  describe('when the user does not have any saved solution interests or company sectors', () => {
    describe('when the user is an editor', () => {
      it('should display the onboarding journey', async () => {
        ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
          () => ({
            canViewSupplyDashboard: true,
            firstName: 'Test',
            company: { id: USER_COMPANY_ID },
            roles: [editorRole, viewerRole],
          })
        );

        const { findByTestId, queryByTestId } = setup([
          userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
          companySectorsMocks.getCompanySectorsMock([]),
          sectorsMocks.sectorsMock(),
        ]);

        expect(
          await findByTestId(userOnboardingSelectors.container)
        ).toBeInTheDocument();
        expect(
          await queryByTestId(footerSelectors.footerContainer)
        ).not.toBeInTheDocument();
      });
    });

    describe('when the user is a viewer', () => {
      it('should display the user solution interests step', async () => {
        ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
          () => ({
            canViewSupplyDashboard: true,
            firstName: 'Test',
            company: { id: USER_COMPANY_ID },
            roles: [viewerRole],
          })
        );

        const { findByTestId, queryByTestId } = setup([
          userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
          companySectorsMocks.getCompanySectorsMock([]),
          sectorsMocks.sectorsMock(),
        ]);

        expect(
          await findByTestId(userOnboardingSelectors.userSolutionInterestsStep)
        ).toBeInTheDocument();
        expect(
          await queryByTestId(activeDashboardSelectors.wrapper)
        ).not.toBeInTheDocument();
        expect(
          await queryByTestId(footerSelectors.footerContainer)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('when the user has saved solution interests and company sectors', () => {
    it('should display the active Dashboard', async () => {
      const { findByTestId, queryByTestId } = setup([
        userSolutionInterestsMocks.getUsersolutionInterestsMock([
          {
            id: 'some-user-solution-interest-id',
            solutionInterest: {
              systemName: SolutionInterestsSystemName.CARBON_CAPTURE,
              id: 'some-solution-id',
            },
          },
        ]),
        companySectorsMocks.getCompanySectorsMock([
          {
            id: 'some-company-sector-id',
            sector: {
              id: 'some-sector-id',
              name: 'Machinery, equipment and supplies',
            },
            sectorType: CompanySectorType.PRIMARY,
            hasBeenUpdated: true,
          },
        ]),
        dashboardMocks.noEmissionsQueryMock,
      ]);
      expect(
        queryByTestId(userOnboardingSelectors.container)
      ).not.toBeInTheDocument();
      expect(
        await findByTestId(activeDashboardSelectors.wrapper)
      ).toBeInTheDocument();
      expect(
        await findByTestId(footerSelectors.footerContainer)
      ).toBeInTheDocument();
    });
  });

  describe('when the user has company sectors but does not have user solution interests', () => {
    describe('when the user is an editor', () => {
      it('should render one step in the wizard', async () => {
        ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
          () => ({
            canViewSupplyDashboard: true,
            firstName: 'Test',
            company: { id: USER_COMPANY_ID },
            roles: [editorRole, viewerRole],
            status: UserStatus.ACTIVE,
          })
        );
        const { findByTestId, queryByTestId } = setup([
          userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
          companySectorsMocks.getCompanySectorsMock([
            {
              id: 'some-company-sector-id',
              sector: {
                id: 'some-sector-id',
                name: 'Machinery, equipment and supplies',
              },
              sectorType: CompanySectorType.PRIMARY,
              hasBeenUpdated: true,
            },
          ]),
        ]);

        expect(
          await findByTestId(userOnboardingSelectors.container)
        ).toBeInTheDocument();
        expect(
          queryByTestId(userOnboardingSelectors.backButton)
        ).not.toBeInTheDocument();
        expect(
          await findByTestId(userOnboardingSelectors.stepTracker)
        ).toHaveTextContent('1 of 1');
        expect(
          await queryByTestId(footerSelectors.footerContainer)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('when user has ACTIVE status', () => {
    it('should not call activateUserAndCompany mutation', async () => {
      setup([
        userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
        dashboardMocks.activateUserAndCompanyMutationMock,
      ]);

      expect(
        dashboardMocks.activateUserAndCompanyMutationMock.newData
      ).not.toHaveBeenCalled();
    });
  });

  describe('when user has PENDING status', () => {
    it('should call activateUserAndCompany mutation', async () => {
      jest.spyOn(analyticsEvents, 'trackEvent');
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          canViewSupplyDashboard: true,
          firstName: 'Test',
          company: {
            id: USER_COMPANY_ID,
            status: CompanyStatus.PENDING_USER_ACTIVATION,
          },
          status: UserStatus.PENDING,
          roles: [editorRole, viewerRole],
        })
      );

      setup([
        userSolutionInterestsMocks.getUsersolutionInterestsMock([]),
        dashboardMocks.activateUserAndCompanyMutationMock,
      ]);

      expect(
        dashboardMocks.activateUserAndCompanyMutationMock.newData
      ).toHaveBeenCalled();
      expect(trackEvent).toHaveBeenCalledWith(COMPANY_ACTIVATED, {
        companyId: USER_COMPANY_ID,
      });
    });
  });

  it.each`
    environment
    ${Environments.LOCAL}
    ${Environments.STAGING}
  `(
    'should render 5 primary nav links in $environment',
    async () => async ({ environment }: { environment: string }) => {
      ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
        publicRuntimeConfig: {
          ENVIRONMENT: environment,
        },
      }));
      expect(primaryNavLinks).toHaveLength(5);
    }
  );

  it.each`
    environment
    ${Environments.LOCAL}
    ${Environments.STAGING}
    ${Environments.PREPROD}
    ${Environments.PROD}
  `(
    'should render the community tab in $environment',
    async () => async ({ environment }: { environment: string }) => {
      ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
        publicRuntimeConfig: {
          ENVIRONMENT: environment,
        },
      }));
      const { findByTestId } = setup([]);

      expect(await findByTestId('tab-community')).toBeInTheDocument();
    }
  );
});
