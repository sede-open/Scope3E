import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import redirect from 'utils/redirect';
import * as toast from 'utils/toast';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import * as adminDashboardMocks from 'mocks/adminDashboard';
import * as meMocks from 'mocks/me';
import { CompanyStatus } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import * as analyticsEvents from 'utils/analytics';
import { NEW_COMPANY_REVIEWED } from 'utils/analyticsEvents';
import { CompaniesDashboard } from '.';
import commonNamespace from '../../../../locales/en/common.json';
import formNamespace from '../../../../locales/en/form.json';
import companiesAdminDashboardNamespace from '../../../../locales/en/companiesAdminDashboard.json';
import * as adminDashboardSelectors from '../selectors';

jest.mock('utils/redirect');

const setup = (mocks: any = []) =>
  render(
    <I18nProvider
      namespaces={{
        common: commonNamespace,
        form: formNamespace,
        companiesAdminDashboard: companiesAdminDashboardNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserProvider>
          <CompaniesDashboard />
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );

describe('CompaniesDashboard', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('should redirect user if they do not have canViewCompaniesAdminDashboard permission', async () => {
    setup([
      meMocks.getGetMeMock({
        canViewCompaniesAdminDashboard: false,
      }),
      adminDashboardMocks.adminQueryMockWithUsers,
    ]);

    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/forbidden');
    });
  });

  it('should render Companies Dashboard if user has canViewCompaniesAdminDashboard permission', async () => {
    const { findByTestId } = setup([
      meMocks.getGetMeMock({}),
      adminDashboardMocks.companiesAdminQueryMock,
    ]);

    const dashboard = await findByTestId(
      adminDashboardSelectors.companiesDashboard
    );

    expect(dashboard).toBeInTheDocument();
  });

  it('should render Companies Dashboard if user has canViewCompaniesAdminDashboard but does not have canViewUsersAdminDashboard permission', async () => {
    const { findByTestId } = setup([
      meMocks.getGetMeMock({ canViewUsersAdminDashboard: false }),
      adminDashboardMocks.companiesAdminQueryMock,
    ]);

    const dashboard = await findByTestId(
      adminDashboardSelectors.companiesDashboard
    );

    expect(dashboard).toBeInTheDocument();
  });

  describe('Companies table', () => {
    it('should display the "Approve" button when company status is VETTING_IN_PROGRESS', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const { findByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.companyWithVettingCompanyStatus,
      ]);

      expect(
        await findByTestId(adminDashboardSelectors.approveCompanyActionsBtn)
      ).toBeInTheDocument();
    });

    it('should display the "Veto" button when company status is VETTING_IN_PROGRESS', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const { findByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.companyWithVettingCompanyStatus,
      ]);

      expect(
        await findByTestId(adminDashboardSelectors.vetoCompanyActionsBtn)
      ).toBeInTheDocument();
    });

    it('should NOT display the "Approve" button when company status is NOT VETTING_IN_PROGRESS', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const { queryByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.companyWithPendingCompanyStatus,
      ]);

      expect(
        queryByTestId(adminDashboardSelectors.vetoCompanyActionsBtn)
      ).not.toBeInTheDocument();
    });

    it('should NOT display the "Veto" button when company status is NOT VETTING_IN_PROGRESS', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const { queryByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.companyWithPendingCompanyStatus,
      ]);

      expect(
        queryByTestId(adminDashboardSelectors.vetoCompanyActionsBtn)
      ).not.toBeInTheDocument();
    });

    it('should allow user to APPROVE company status with success confirmation', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      jest.spyOn(analyticsEvents, 'trackEvent');

      const { findByTestId, getByTestId, queryByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.companiesAdminQueryMockWithCompanies,
        adminDashboardMocks.approveCompanyMock,
      ]);

      fireEvent.click(
        await findByTestId(adminDashboardSelectors.approveCompanyActionsBtn)
      );

      await waitFor(() =>
        expect(
          getByTestId(adminDashboardSelectors.approveCompanyConfirmationWrapper)
        ).toBeVisible()
      );

      expect(toast.displaySuccessMessage).not.toHaveBeenCalledTimes(1);

      await act(async () => {
        fireEvent.click(
          await findByTestId(adminDashboardSelectors.approveOnSubmit)
        );
      });

      await waitFor(() => {
        expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Company successfully approved',
          })
        );
        expect(trackEvent).toHaveBeenCalledWith(NEW_COMPANY_REVIEWED, {
          reviewedType: CompanyStatus.ACTIVE,
          companyId:
            adminDashboardMocks.approveCompanyMock.request.variables.input
              .companyId,
        });
      });

      await waitFor(() =>
        expect(
          queryByTestId(
            adminDashboardSelectors.approveCompanyConfirmationWrapper
          )
        ).toBeNull()
      );
    });

    it('should allow user to VETO company status with success confirmation', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      jest.spyOn(analyticsEvents, 'trackEvent');
      const { findByTestId, getByTestId, queryByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.companiesAdminQueryMockWithCompanies,
        adminDashboardMocks.vetoCompanyMock,
      ]);

      fireEvent.click(
        await findByTestId(adminDashboardSelectors.vetoCompanyActionsBtn)
      );

      await waitFor(() =>
        expect(
          getByTestId(adminDashboardSelectors.vetoCompanyConfirmationWrapper)
        ).toBeVisible()
      );

      expect(toast.displaySuccessMessage).not.toHaveBeenCalledTimes(1);

      expect(
        await findByTestId(adminDashboardSelectors.vetoOnSubmit)
      ).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(
          await findByTestId(adminDashboardSelectors.vetoOnSubmit)
        );
      });

      await waitFor(() => {
        expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Company successfully vetoed',
          })
        );
        expect(trackEvent).toHaveBeenCalledWith(NEW_COMPANY_REVIEWED, {
          reviewedType: CompanyStatus.VETOED,
          companyId:
            adminDashboardMocks.vetoCompanyMock.request.variables.input
              .companyId,
        });
      });

      await waitFor(() =>
        expect(
          queryByTestId(adminDashboardSelectors.vetoCompanyConfirmationWrapper)
        ).toBeNull()
      );
    });

    it('should display an API error for APPROVING a company', async () => {
      const { findByTestId, getByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.companiesAdminQueryMockWithCompanies,
        adminDashboardMocks.approveCompanyErrorMock,
      ]);

      fireEvent.click(
        await findByTestId(adminDashboardSelectors.approveCompanyActionsBtn)
      );

      await waitFor(() =>
        expect(
          getByTestId(adminDashboardSelectors.approveCompanyConfirmationWrapper)
        ).toBeVisible()
      );

      await act(async () => {
        fireEvent.click(
          await findByTestId(adminDashboardSelectors.approveOnSubmit)
        );
      });

      expect(
        (await findByTestId(adminDashboardSelectors.companyApiError))
          .textContent
      ).toBe(adminDashboardMocks.ERROR_MESSAGE);
    });

    it('should call error toast if API error when APPROVING', async () => {
      jest.spyOn(toast, 'displayErrorMessage');
      const { findByTestId, getByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.companiesAdminQueryMockWithCompanies,
        adminDashboardMocks.approveCompanyErrorMock,
      ]);

      fireEvent.click(
        await findByTestId(adminDashboardSelectors.approveCompanyActionsBtn)
      );

      await waitFor(() =>
        expect(
          getByTestId(adminDashboardSelectors.approveCompanyConfirmationWrapper)
        ).toBeVisible()
      );

      await act(async () => {
        fireEvent.click(
          await findByTestId(adminDashboardSelectors.approveOnSubmit)
        );
      });

      await waitFor(() => {
        expect(toast.displayErrorMessage).toHaveBeenCalledTimes(1);
        expect(toast.displayErrorMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Delete unsuccessful',
          })
        );
      });
    });

    it('should display an API error for VETOING a company', async () => {
      const { findByTestId, getByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.companiesAdminQueryMockWithCompanies,
        adminDashboardMocks.vetoCompanyErrorMock,
      ]);

      fireEvent.click(
        await findByTestId(adminDashboardSelectors.vetoCompanyActionsBtn)
      );

      await waitFor(() =>
        expect(
          getByTestId(adminDashboardSelectors.vetoCompanyConfirmationWrapper)
        ).toBeVisible()
      );

      expect(
        await findByTestId(adminDashboardSelectors.vetoOnSubmit)
      ).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(
          await findByTestId(adminDashboardSelectors.vetoOnSubmit)
        );
      });

      expect(
        (await findByTestId(adminDashboardSelectors.companyApiError))
          .textContent
      ).toBe(adminDashboardMocks.ERROR_MESSAGE);
    });

    it('should call error toast if API error when VETOING', async () => {
      jest.spyOn(toast, 'displayErrorMessage');
      const { findByTestId, getByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.companiesAdminQueryMockWithCompanies,
        adminDashboardMocks.vetoCompanyErrorMock,
      ]);

      fireEvent.click(
        await findByTestId(adminDashboardSelectors.vetoCompanyActionsBtn)
      );

      await waitFor(() =>
        expect(
          getByTestId(adminDashboardSelectors.vetoCompanyConfirmationWrapper)
        ).toBeVisible()
      );

      expect(
        await findByTestId(adminDashboardSelectors.vetoOnSubmit)
      ).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(
          await findByTestId(adminDashboardSelectors.vetoOnSubmit)
        );
      });

      await waitFor(() => {
        expect(toast.displayErrorMessage).toHaveBeenCalledTimes(1);
        expect(toast.displayErrorMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Delete unsuccessful',
          })
        );
      });
    });

    describe('user details', () => {
      describe('when company has not users', () => {
        it('should display "--" for user details', async () => {
          const { findByText } = setup([
            meMocks.getGetMeMock(),
            adminDashboardMocks.getCompaniesAdminQueryMock([
              adminDashboardMocks.companies[0],
            ]),
          ]);

          expect(await findByText('--')).toBeInTheDocument();
        });
      });

      describe('when company has 1 user', () => {
        it('should display user contact details', async () => {
          const user = adminDashboardMocks.createdExternalUser;
          const { findByText, getByText } = setup([
            meMocks.getGetMeMock(),
            adminDashboardMocks.getCompaniesAdminQueryMock([
              {
                ...adminDashboardMocks.companies[0],
                users: [user],
              },
            ]),
          ]);

          expect(
            await findByText(`${user.firstName} ${user.lastName}`)
          ).toBeInTheDocument();
          expect(getByText(user.email)).toBeInTheDocument();
        });
      });

      describe('when company has multiple users', () => {
        const user1 = adminDashboardMocks.createdExternalUser;
        const user2 = adminDashboardMocks.createdViewerUser;

        const mocks = [
          meMocks.getGetMeMock(),
          adminDashboardMocks.getCompaniesAdminQueryMock([
            {
              ...adminDashboardMocks.companies[0],
              users: [user1, user2],
            },
          ]),
        ];

        it('should display number of company users', async () => {
          const { findByText } = setup(mocks);
          expect(await findByText('2 users')).toBeInTheDocument();
        });

        describe('when number of users is clicked', () => {
          it('should display contact details of all customers', async () => {
            const { findByText, findByTestId, getByText } = setup(mocks);

            fireEvent.click(await findByText('2 users'));

            expect(
              await findByTestId(adminDashboardSelectors.companyUsersModal)
            ).toBeInTheDocument();

            expect(
              getByText(`${user1.firstName} ${user1.lastName}`)
            ).toBeInTheDocument();
            expect(
              getByText(`${user2.firstName} ${user2.lastName}`)
            ).toBeInTheDocument();

            expect(getByText(user1.email)).toBeInTheDocument();
            expect(getByText(user2.email)).toBeInTheDocument();

            expect(getByText('Editor')).toBeInTheDocument();
            expect(getByText('Viewer')).toBeInTheDocument();
          });
        });
      });
    });
  });
});
