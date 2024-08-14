import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import selectEvent from 'react-select-event';
import * as toast from 'utils/toast';
import redirect from 'utils/redirect';
import { Environments } from 'utils/featureFlags';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import * as adminDashboardMocks from 'mocks/adminDashboard';
import * as meMocks from 'mocks/me';
import getConfig from 'next/config';
import { CompanyStatus } from 'types/globalTypes';
import { AdminCompaniesQuery_companies_data } from 'types/AdminCompaniesQuery';
import { UsersDashboard } from '.';
import { getApprovedCompanyOptions } from './utils';
import { validateInternalEmail } from '../utils';
import commonNamespace from '../../../../locales/en/common.json';
import formNamespace from '../../../../locales/en/form.json';
import usersAdminDashboardNamespace from '../../../../locales/en/usersAdminDashboard.json';
import rolesNamespace from '../../../../locales/en/roles.json';
import * as externalUserFormSelectors from '../ExtenalUserForm/selectors';
import * as adminDashboardSelectors from '../selectors';

jest.mock('utils/redirect');

const setup = (mocks: any = []) =>
  render(
    <I18nProvider
      namespaces={{
        common: commonNamespace,
        form: formNamespace,
        usersAdminDashboard: usersAdminDashboardNamespace,
        roles: rolesNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserProvider>
          <UsersDashboard />
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );

describe('UsersDashboard', () => {
  beforeAll(() => {
    jest.resetAllMocks();
    ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
      publicRuntimeConfig: {
        ENVIRONMENT: Environments.PROD,
      },
    }));
  });

  describe('when user !canViewUsersAdminDashboard && !canViewCompaniesAdminDashboard', () => {
    it('should redirect user to "/forbidden"', async () => {
      setup([
        meMocks.getGetMeMock({
          canViewUsersAdminDashboard: false,
          canViewCompaniesAdminDashboard: false,
        }),
        adminDashboardMocks.adminQueryMock,
      ]);

      await waitFor(() => {
        expect(redirect).toHaveBeenCalledWith('/forbidden');
      });
    });
  });

  describe('when user canViewUsersAdminDashboard && canViewCompaniesAdminDashboard', () => {
    it('should render Users Dashboard', async () => {
      const { findByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.adminQueryMock,
        adminDashboardMocks.companiesAdminQueryMock,
      ]);

      const dashboard = await findByTestId(
        adminDashboardSelectors.usersDashboard
      );

      expect(dashboard).toBeInTheDocument();
    });
  });

  describe('when user canViewUsersAdminDashboard && !canViewCompaniesAdminDashboard', () => {
    it('should render Users Dashboard', async () => {
      const { findByTestId } = setup([
        meMocks.getGetMeMock({ canViewCompaniesAdminDashboard: false }),
        adminDashboardMocks.adminQueryMock,
        adminDashboardMocks.companiesAdminQueryMock,
      ]);

      const dashboard = await findByTestId(
        adminDashboardSelectors.usersDashboard
      );

      expect(dashboard).toBeInTheDocument();
    });
  });

  describe('when user !canViewUsersAdminDashboard && canViewCompaniesAdminDashboard', () => {
    it('should redirect users to "/admin-dashboard/companies"', async () => {
      setup([
        meMocks.getGetMeMock({
          canViewUsersAdminDashboard: false,
        }),
        adminDashboardMocks.adminQueryMock,
      ]);

      await waitFor(() => {
        expect(redirect).toHaveBeenCalledWith('/admin-dashboard/companies');
      });
    });
  });

  describe('User Actions', () => {
    it('should display user actions btn when ADMIN role', async () => {
      const { findByTestId } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.adminQueryMock,
        adminDashboardMocks.companiesAdminQueryMock,
        adminDashboardMocks.createInternalUserMock,
      ]);

      expect(
        await findByTestId(adminDashboardSelectors.addNewUserButton)
      ).toBeInTheDocument();
    });
  });

  describe('Create External user', () => {
    it('should allow an admin to create an external user with success confirmation', async () => {
      const {
        getByTestId,
        queryByTestId,
        findByTestId,
        findByLabelText,
      } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.adminQueryMock,
        adminDashboardMocks.companiesAdminQueryMock,
        adminDashboardMocks.createExternalUserMock,
      ]);
      jest.spyOn(toast, 'displaySuccessMessage');

      const userActionsBtn = await findByTestId(
        adminDashboardSelectors.addNewUserButton
      );

      await act(async () => {
        fireEvent.click(userActionsBtn);
      });

      await waitFor(() => {
        expect(
          getByTestId(externalUserFormSelectors.externalUserForm)
        ).toBeVisible();
        expect(
          getByTestId(externalUserFormSelectors.onSubmitBtn)
        ).toBeDisabled();
      });

      await act(async () => {
        fireEvent.change(
          getByTestId(`${externalUserFormSelectors.firstName}-input`),
          {
            target: {
              value: adminDashboardMocks.externalUserToCreate.firstName,
            },
          }
        );
        fireEvent.change(
          getByTestId(`${externalUserFormSelectors.lastName}-input`),
          {
            target: {
              value: adminDashboardMocks.externalUserToCreate.lastName,
            },
          }
        );
        fireEvent.change(
          getByTestId(`${externalUserFormSelectors.email}-input`),
          {
            target: {
              value: adminDashboardMocks.externalUserToCreate.email,
            },
          }
        );
        const companySelect = await findByLabelText('Company');
        await selectEvent.select(
          companySelect,
          adminDashboardMocks.companies[1].name
        );

        await selectEvent.select(
          await findByLabelText('Role type'),
          'Company Administrator'
        );
      });

      await waitFor(async () => {
        expect(
          (getByTestId(
            `${externalUserFormSelectors.firstName}-input`
          ) as HTMLInputElement).value
        ).toBe(adminDashboardMocks.createdExternalUser.firstName);
        expect(
          (getByTestId(
            `${externalUserFormSelectors.lastName}-input`
          ) as HTMLInputElement).value
        ).toBe(adminDashboardMocks.createdExternalUser.lastName);
        expect(
          (getByTestId(
            `${externalUserFormSelectors.email}-input`
          ) as HTMLInputElement).value
        ).toBe(adminDashboardMocks.createdExternalUser.email);
        expect(
          getByTestId(externalUserFormSelectors.onSubmitBtn)
        ).not.toBeDisabled();
      });

      expect(toast.displaySuccessMessage).not.toHaveBeenCalled();

      await act(async () => {
        fireEvent.click(getByTestId(externalUserFormSelectors.onSubmitBtn));
      });

      await waitFor(async () => {
        expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Save successful',
          })
        );
      });

      await waitFor(() =>
        expect(
          queryByTestId(externalUserFormSelectors.externalUserForm)
        ).toBeNull()
      );

      const tableRow = await findByTestId(
        `${adminDashboardSelectors.adminDashboardTable}-row`
      );

      expect(tableRow.textContent).toContain(
        `${adminDashboardMocks.createdExternalUser.firstName} ${adminDashboardMocks.createdExternalUser.lastName}`
      );
    });
  });

  it('should prevent the form from being submitted if a example email in entered', async () => {
    const { getByTestId, findByTestId, findByLabelText } = setup([
      meMocks.getGetMeMock(),
      adminDashboardMocks.adminQueryMock,
      adminDashboardMocks.companiesAdminQueryMock,
      adminDashboardMocks.createExternalUserMock,
    ]);

    const userActionsBtn = await findByTestId(
      adminDashboardSelectors.addNewUserButton
    );

    await act(async () => {
      fireEvent.click(userActionsBtn);
    });

    await waitFor(() =>
      expect(
        getByTestId(externalUserFormSelectors.externalUserForm)
      ).toBeVisible()
    );
    fireEvent.change(
      getByTestId(`${externalUserFormSelectors.firstName}-input`),
      {
        target: {
          value: adminDashboardMocks.externalUserToCreate.firstName,
        },
      }
    );
    fireEvent.change(
      getByTestId(`${externalUserFormSelectors.lastName}-input`),
      {
        target: {
          value: adminDashboardMocks.externalUserToCreate.lastName,
        },
      }
    );
    fireEvent.change(getByTestId(`${externalUserFormSelectors.email}-input`), {
      target: {
        value: 'some@example.com',
      },
    });
    const companySelect = await findByLabelText('Company');
    await selectEvent.select(
      companySelect,
      adminDashboardMocks.companies[1].name
    );

    await selectEvent.select(
      await findByLabelText('Role type'),
      'Company Administrator'
    );

    fireEvent.click(getByTestId(externalUserFormSelectors.onSubmitBtn));

    await waitFor(() =>
      expect(getByTestId(externalUserFormSelectors.onSubmitBtn)).toBeDisabled()
    );
  });

  it.each`
    firstName         | lastName
    ${'a'}            | ${'b'}
    ${'a'.repeat(27)} | ${'b'.repeat(27)}
  `(
    'should not allow to submit when the first name or last name values are to short or too long',
    async ({ firstName, lastName }) => {
      const { getByTestId, findByTestId, findByLabelText } = setup([
        meMocks.getGetMeMock(),
        adminDashboardMocks.adminQueryMock,
        adminDashboardMocks.companiesAdminQueryMock,
        adminDashboardMocks.createExternalUserMock,
      ]);

      const userActionsBtn = await findByTestId(
        adminDashboardSelectors.addNewUserButton
      );

      await act(async () => {
        fireEvent.click(userActionsBtn);
      });

      await waitFor(() =>
        expect(
          getByTestId(externalUserFormSelectors.externalUserForm)
        ).toBeVisible()
      );
      fireEvent.change(
        getByTestId(`${externalUserFormSelectors.firstName}-input`),
        {
          target: {
            value: firstName,
          },
        }
      );
      fireEvent.change(
        getByTestId(`${externalUserFormSelectors.lastName}-input`),
        {
          target: {
            value: lastName,
          },
        }
      );
      fireEvent.change(
        getByTestId(`${externalUserFormSelectors.email}-input`),
        {
          target: {
            value: 'some@email.com',
          },
        }
      );
      const companySelect = await findByLabelText('Company');
      await selectEvent.select(
        companySelect,
        adminDashboardMocks.companies[1].name
      );

      await selectEvent.select(
        await findByLabelText('Role type'),
        'Company Administrator'
      );

      fireEvent.click(getByTestId(externalUserFormSelectors.onSubmitBtn));

      expect(
        getByTestId(`${externalUserFormSelectors.firstName}-error`)
      ).toBeInTheDocument();
      expect(
        getByTestId(`${externalUserFormSelectors.lastName}-error`)
      ).toBeInTheDocument();

      await waitFor(() => {
        expect(
          getByTestId(externalUserFormSelectors.onSubmitBtn)
        ).toBeDisabled();
      });
    }
  );

  describe('Edit External user', () => {
    it('should allow an admin to open external user form to edit from the admin table', async () => {
      const { getByTestId, findByTestId } = setup([
        meMocks.getGetMeMock({
          id: adminDashboardMocks.createdInternalAdminUser.id,
          canViewUsersAdminDashboard: true,
        }),
        adminDashboardMocks.adminQueryMockWithUsers,
        adminDashboardMocks.companiesAdminQueryMock,
        adminDashboardMocks.editExternalUserMock,
      ]);
      const editModalToggle = await findByTestId(
        `edit-${adminDashboardSelectors.userModalToggle}`
      );
      fireEvent.click(editModalToggle);
      await waitFor(() =>
        expect(
          getByTestId(externalUserFormSelectors.externalUserForm)
        ).toBeVisible()
      );
    });

    it('should populate form data with created external user values', async () => {
      const { getByTestId, findByTestId } = setup([
        meMocks.getGetMeMock({
          id: adminDashboardMocks.createdInternalAdminUser.id,
          canViewUsersAdminDashboard: true,
        }),
        adminDashboardMocks.adminQueryMockWithUsers,
        adminDashboardMocks.companiesAdminQueryMock,
        adminDashboardMocks.editExternalUserMock,
      ]);
      const editModalToggle = await findByTestId(
        `edit-${adminDashboardSelectors.userModalToggle}`
      );
      fireEvent.click(editModalToggle);
      await waitFor(() =>
        expect(
          getByTestId(externalUserFormSelectors.externalUserForm)
        ).toBeVisible()
      );
      expect(
        (getByTestId(
          `${externalUserFormSelectors.firstName}-input`
        ) as HTMLInputElement).value
      ).toBe(adminDashboardMocks.createdExternalUser.firstName);
      expect(
        (getByTestId(
          `${externalUserFormSelectors.lastName}-input`
        ) as HTMLInputElement).value
      ).toBe(adminDashboardMocks.createdExternalUser.lastName);
      expect(
        (getByTestId(
          `${externalUserFormSelectors.email}-input`
        ) as HTMLInputElement).value
      ).toBe(adminDashboardMocks.createdExternalUser.email);
    });

    it('should contain disabled email field on edit', async () => {
      const { getByTestId, findByTestId } = setup([
        meMocks.getGetMeMock({
          id: adminDashboardMocks.createdInternalAdminUser.id,
          canViewUsersAdminDashboard: true,
        }),
        adminDashboardMocks.adminQueryMockWithUsers,
        adminDashboardMocks.companiesAdminQueryMock,
        adminDashboardMocks.editExternalUserMock,
      ]);
      const editModalToggle = await findByTestId(
        `edit-${adminDashboardSelectors.userModalToggle}`
      );
      fireEvent.click(editModalToggle);
      await waitFor(() => {
        expect(
          getByTestId(externalUserFormSelectors.externalUserForm)
        ).toBeVisible();
        expect(
          getByTestId(`${externalUserFormSelectors.email}-input`)
        ).toBeDisabled();
      });
    });
  });

  describe('Delete user', () => {
    it('should allow an admin to delete a user with success confirmation called', async () => {
      jest.spyOn(toast, 'displaySuccessMessage');
      const {
        getByTestId,
        findByTestId,
        findAllByTestId,
        queryByTestId,
      } = setup([
        meMocks.getGetMeMock({
          id: adminDashboardMocks.createdInternalAdminUser.id,
          canViewUsersAdminDashboard: true,
        }),
        adminDashboardMocks.adminQueryMockWithUsers,
        adminDashboardMocks.companiesAdminQueryMock,
        adminDashboardMocks.deleteUserMock,
        adminDashboardMocks.adminQueryMockAfterDelete,
      ]);

      expect(
        await findAllByTestId(
          `${adminDashboardSelectors.adminDashboardTable}-row`
        )
      ).toHaveLength(2);

      fireEvent.click(
        getByTestId(`delete-${adminDashboardSelectors.userModalToggle}`)
      );

      expect(
        await findByTestId(adminDashboardSelectors.userDeleteConfirmation)
      ).toBeInTheDocument();

      expect(toast.displaySuccessMessage).not.toHaveBeenCalledTimes(1);

      fireEvent.click(getByTestId(adminDashboardSelectors.userDeleteConfirm));

      await waitFor(() => {
        expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
        expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Delete successful',
          })
        );
      });

      await findByTestId(adminDashboardSelectors.usersDashboard);
      expect(
        await findAllByTestId(
          `${adminDashboardSelectors.adminDashboardTable}-row`
        )
      ).toHaveLength(1);
      expect(
        queryByTestId(adminDashboardSelectors.userDeleteConfirmation)
      ).not.toBeInTheDocument();
    });

    it('should display an API error', async () => {
      const { getByTestId, findByTestId, findAllByTestId } = setup([
        meMocks.getGetMeMock({
          id: adminDashboardMocks.createdInternalAdminUser.id,
          canViewUsersAdminDashboard: true,
        }),
        adminDashboardMocks.adminQueryMockWithUsers,
        adminDashboardMocks.companiesAdminQueryMock,
        adminDashboardMocks.deleteUserErrorMock,
      ]);

      expect(
        await findAllByTestId(
          `${adminDashboardSelectors.adminDashboardTable}-row`
        )
      ).toHaveLength(2);

      fireEvent.click(
        getByTestId(`delete-${adminDashboardSelectors.userModalToggle}`)
      );

      expect(
        await findByTestId(adminDashboardSelectors.userDeleteConfirmation)
      ).toBeInTheDocument();

      fireEvent.click(getByTestId(adminDashboardSelectors.userDeleteConfirm));

      expect(
        (await findByTestId(adminDashboardSelectors.userDeleteApiError))
          .textContent
      ).toBe(adminDashboardMocks.ERROR_MESSAGE);
    });

    it('should call error toast if API error', async () => {
      jest.spyOn(toast, 'displayErrorMessage');
      const { getByTestId, findByTestId, findAllByTestId } = setup([
        meMocks.getGetMeMock({
          id: adminDashboardMocks.createdInternalAdminUser.id,
          canViewUsersAdminDashboard: true,
        }),
        adminDashboardMocks.adminQueryMockWithUsers,
        adminDashboardMocks.companiesAdminQueryMock,
        adminDashboardMocks.deleteUserErrorMock,
      ]);

      expect(
        await findAllByTestId(
          `${adminDashboardSelectors.adminDashboardTable}-row`
        )
      ).toHaveLength(2);

      fireEvent.click(
        getByTestId(`delete-${adminDashboardSelectors.userModalToggle}`)
      );

      expect(
        await findByTestId(adminDashboardSelectors.userDeleteConfirmation)
      ).toBeInTheDocument();

      fireEvent.click(getByTestId(adminDashboardSelectors.userDeleteConfirm));

      expect(toast.displayErrorMessage).not.toHaveBeenCalledTimes(1);

      expect(
        (await findByTestId(adminDashboardSelectors.userDeleteApiError))
          .textContent
      ).toBe(adminDashboardMocks.ERROR_MESSAGE);

      await waitFor(() => {
        expect(toast.displayErrorMessage).toHaveBeenCalledTimes(1);
        expect(toast.displayErrorMessage).toHaveBeenCalledWith(
          expect.objectContaining({
            title: 'Delete unsuccessful',
          })
        );
      });
    });
  });

  describe('validateInternalEmail()', () => {
    it('should be truthy if string does not match regex', async () => {
      const email = 'test@example.com';

      const result = validateInternalEmail(email);

      expect(result).toBeTruthy();
    });

    it('should be falsy if string does not match regex', async () => {
      const email = 'test@test.com';

      const result = validateInternalEmail(email);

      expect(result).toBeFalsy();
    });
  });

  describe('getApprovedCompanyOptions()', () => {
    it('should return filtered companies by ACTIVE and PENDING_USER_ACTIVATION status', async () => {
      const companyOptions = [
        {
          id: 'agile-hub-blue',
          name: 'blue',
          dnbCountry: 'United Kingdom',
          status: CompanyStatus.ACTIVE,
          updatedAt: '00:00',
          createdAt: '00:00',
          reviewedAt: '00:00',
        },
        {
          id: 'agile-hub-red',
          name: 'red',
          dnbCountry: 'United Kingdom',
          status: CompanyStatus.PENDING_USER_ACTIVATION,
          updatedAt: '00:00',
          createdAt: '00:00',
          reviewedAt: '00:00',
        },
        {
          id: 'agile-hub-green',
          name: 'green',
          dnbCountry: 'United Kingdom',
          status: CompanyStatus.ACTIVE,
          updatedAt: '00:00',
          createdAt: '00:00',
          reviewedAt: '00:00',
        },
        {
          id: 'agile-hub-purple',
          name: 'purple',
          dnbCountry: 'United Kingdom',
          status: CompanyStatus.VETTING_IN_PROGRESS,
          updatedAt: '00:00',
          createdAt: '00:00',
          reviewedAt: '00:00',
        },
        {
          id: 'agile-hub-orange',
          name: 'orange',
          dnbCountry: 'United Kingdom',
          status: CompanyStatus.PENDING_USER_CONFIRMATION,
          updatedAt: '00:00',
          createdAt: '00:00',
          reviewedAt: '00:00',
        },
        {
          id: 'agile-hub-yellow',
          name: 'yellow',
          dnbCountry: 'United Kingdom',
          status: CompanyStatus.ACTIVE,
          updatedAt: '00:00',
          createdAt: '00:00',
          reviewedAt: '00:00',
        },
      ] as AdminCompaniesQuery_companies_data[];

      const result = getApprovedCompanyOptions(companyOptions);

      expect(result).toHaveLength(4);
      expect(result[0].value).toBe(companyOptions[0].id);
      expect(result[1].value).toBe(companyOptions[1].id);
      expect(result[2].value).toBe(companyOptions[2].id);
      expect(result[3].value).toBe(companyOptions[5].id);
    });
  });
});
