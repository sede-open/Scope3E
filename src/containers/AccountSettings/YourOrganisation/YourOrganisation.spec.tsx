import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { mockFlags } from 'jest-launchdarkly-mock';
import { updateCompanySectorsMutationMock } from 'mocks/companySectors';
import * as companyUserMocks from 'mocks/companyUsers';
import * as meMocks from 'mocks/me';
import * as sectorsMocks from 'mocks/sectors';
import * as userOnboardingMocks from 'mocks/userOnboarding';
import I18nProvider from 'next-translate/I18nProvider';
import getConfig from 'next/config';
import React from 'react';
import selectEvent from 'react-select-event';
import { CompanySectorType, RoleName } from 'types/globalTypes';
import { Environments } from 'utils/featureFlags';
import * as toast from 'utils/toast';
import { AccountSettings } from '..';
import accountSettingsNamespace from '../../../../locales/en/accountSettings.json';
import rolesNamespace from '../../../../locales/en/roles.json';
import { AccountSettingsRoutes } from '../constants';
import * as selectors from '../selectors';
import { FIELD_KEYS } from './CompanyTeamMembers/InviteForm/types';
import * as userDeleteConfirmationSelectors from './CompanyTeamMembers/UserDeleteConfirmation/selectors';

jest.mock('effects/useAuthenticatedUser');

const userMock = {
  role: {
    id: 'E22B0F60-FBD0-4A77-A6D0-BC3AC9EABAD3',
    name: 'SUPPLIER_EDITOR',
  },
  roles: [
    {
      id: 'E22B0F60-FBD0-4A77-A6D0-BC3AC9EABAD3',
      name: 'SUPPLIER_EDITOR',
    },
    {
      id: 'E22B0F60-FBD0-4A77-A6D0-BC3AC9EABAD3',
      name: 'SUPPLIER_VIEWER',
    },
  ],
  company: {
    id: 'company-id',
    name: 'Company Ltd',
    location: 'London',
    companySectors: [
      {
        sectorType: CompanySectorType.PRIMARY,
        sector: { name: 'IT services', id: 'it-services-id' },
      },
    ],
  },
};

const mockSectorData = [
  'Coating, engraving and allied services',
  'Telephone communication',
  'Arrangement of passenger transportation',
  'Petroleum and petroleum products, nec',
  'IT services',
];

const setup = (mocks: any) =>
  render(
    <I18nProvider
      namespaces={{
        accountSettings: accountSettingsNamespace,
        roles: rolesNamespace,
      }}
    >
      <MockedProvider
        mocks={[
          sectorsMocks.sectorsMock(50, 1, null, mockSectorData),
          ...mocks,
        ]}
        addTypename
      >
        <AccountSettings selectedTab={AccountSettingsRoutes.YourOrganisation} />
      </MockedProvider>
    </I18nProvider>
  );

describe('Your Organisation', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      ...userMock,
    }));
    mockFlags({ isNetworkPageEnabled: false });
  });

  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('should render company invite table when enabled', async () => {
    const { findByTestId } = setup([
      companyUserMocks.createAccountSettingsCompanyUsersMock({}),
    ]);

    expect(
      await findByTestId(selectors.companyInviteTable)
    ).toBeInTheDocument();
  });

  it('should not render company invite table when disabled', async () => {
    const { queryByTestId } = setup([
      userOnboardingMocks.getCombinedSolutionInterestsQueryMock([]),
      companyUserMocks.createAccountSettingsCompanyUsersMock({}),
    ]);

    await waitFor(() => {
      expect(
        queryByTestId(selectors.companyInviteTable)
      ).not.toBeInTheDocument();
    });
  });

  it('should render the company sectors panel when enabled', async () => {
    const { findByTestId } = setup([
      companyUserMocks.createAccountSettingsCompanyUsersMock({}),
    ]);

    expect(
      await findByTestId(selectors.yourOrganisationCompanySectors)
    ).toBeInTheDocument();
  });

  describe('Company details panel', () => {
    it('should display the company name', async () => {
      const { findByTestId } = setup([
        companyUserMocks.createAccountSettingsCompanyUsersMock({}),
      ]);

      expect(
        await findByTestId(selectors.yourOrganisationCompanyDetails)
      ).toBeInTheDocument();

      const userCompanyName = await findByTestId(selectors.userCompanyName);
      expect(userCompanyName).toBeInTheDocument();
      expect(userCompanyName).toHaveTextContent(userMock.company.name);
    });

    it('should display the company location', async () => {
      const { findByTestId } = setup([
        companyUserMocks.createAccountSettingsCompanyUsersMock({}),
      ]);
      const userCompanyLocation = await findByTestId(
        selectors.userCompanyLocation
      );
      expect(userCompanyLocation).toBeInTheDocument();
      expect(userCompanyLocation).toHaveTextContent(userMock.company.location);
    });
  });

  describe('Company sectors panel', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      mockFlags({ isNetworkPageEnabled: false });

      jest.spyOn(toast, 'displayErrorMessage');
      jest.spyOn(toast, 'displaySuccessMessage');
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should load company sectors when the authenticated user has data', async () => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          ...userMock,
          company: {
            ...userMock.company,
            companySectors: [
              {
                sectorType: CompanySectorType.PRIMARY,
                sector: { name: 'IT services', id: 'it-services-id' },
              },
              {
                sectorType: CompanySectorType.SECONDARY,
                sector: {
                  name: 'Investing',
                  id: 'investing-id',
                },
              },
            ],
          },
        })
      );
      const { findByTestId } = setup([]);

      const primaryInput = await findByTestId(
        `${CompanySectorType.PRIMARY}-dropdown-input`
      );
      expect(primaryInput).toHaveValue('IT services');

      const secondaryInput = await findByTestId(
        `${CompanySectorType.SECONDARY}-dropdown-input`
      );
      expect(secondaryInput).toHaveValue('Investing');
    });

    it('should render empty inputs when the authenticated user has no company sector data', async () => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          ...userMock,
          company: {
            ...userMock.company,
            companySectors: [],
          },
        })
      );
      const { findByTestId } = setup([]);

      const primaryInput = await findByTestId(
        `${CompanySectorType.PRIMARY}-dropdown-input`
      );
      expect(primaryInput).toHaveValue('');

      const secondaryInput = await findByTestId(
        `${CompanySectorType.SECONDARY}-dropdown-input`
      );
      expect(secondaryInput).toHaveValue('');
    });

    it('should not update company sectors when page is initially rendered', async () => {
      jest.useFakeTimers();
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          ...userMock,
        })
      );

      /** Deliberately do not mock the mutation here, we want it to error if it was called */
      setup([sectorsMocks.sectorsMock(50, 1, null, mockSectorData)]);

      jest.advanceTimersByTime(1000);

      await waitFor(() => {
        expect(toast.displayErrorMessage).not.toHaveBeenCalled();
      });
    });

    describe('updating the company sectors after the inputs have changed', () => {
      it('should error when the mutation is not mocked', async () => {
        jest.useFakeTimers();
        ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
          () => ({
            ...userMock,
            company: {
              ...userMock.company,
              companySectors: [
                {
                  sectorType: CompanySectorType.PRIMARY,
                  sector: { name: 'IT services', id: 'it-services-id' },
                },
                {
                  sectorType: CompanySectorType.SECONDARY,
                  sector: {
                    name: 'Investing',
                    id: 'investing-id',
                  },
                },
              ],
            },
            canEditCompanySectors: true,
          })
        );

        const { findByTestId } = setup([]);

        jest.advanceTimersByTime(1000);

        await act(async () => {
          fireEvent.click(
            await findByTestId(`${CompanySectorType.PRIMARY}-dropdown-input`)
          );
        });

        const firstSectorOption = await findByTestId(
          `${CompanySectorType.PRIMARY}-dropdown-list-item-0`
        );

        expect(firstSectorOption).toBeInTheDocument();

        await act(async () => {
          fireEvent.click(firstSectorOption);
        });

        jest.advanceTimersByTime(1000);

        await waitFor(() => {
          expect(toast.displayErrorMessage).toHaveBeenCalledWith({
            title: "We couldn't update the company sector, please try again",
          });
          expect(toast.displaySuccessMessage).not.toHaveBeenCalledWith();
        });
      });

      it('should display a success message when the mutation has succeeded', async () => {
        jest.useFakeTimers();
        ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
          () => ({
            ...userMock,
            company: {
              ...userMock.company,
              companySectors: [
                {
                  sectorType: CompanySectorType.PRIMARY,
                  sector: { name: 'IT services', id: 'it-services-id' },
                },
                {
                  sectorType: CompanySectorType.SECONDARY,
                  sector: {
                    name: 'Investing',
                    id: 'investing-id',
                  },
                },
              ],
            },
            canEditCompanySectors: true,
          })
        );

        const { findByTestId } = setup([
          /* Mock a mutation where the primary company sector has changed to the first list item */
          updateCompanySectorsMutationMock({
            companyId: userMock.company.id,
            sectors: [
              {
                id: 'Coating, engraving and allied services-id',
                sectorType: CompanySectorType.PRIMARY,
              },
              {
                id: 'investing-id',
                sectorType: CompanySectorType.SECONDARY,
              },
            ],
          }),
        ]);

        jest.advanceTimersByTime(1000);

        await act(async () => {
          fireEvent.click(
            await findByTestId(`${CompanySectorType.PRIMARY}-dropdown-input`)
          );
        });

        const firstSectorOption = await findByTestId(
          `${CompanySectorType.PRIMARY}-dropdown-list-item-0`
        );

        expect(firstSectorOption).toBeInTheDocument();

        await act(async () => {
          fireEvent.click(firstSectorOption);
        });

        jest.advanceTimersByTime(1000);

        await waitFor(() => {
          expect(toast.displaySuccessMessage).toHaveBeenCalledWith({
            title: 'Company sector successfully updated',
          });
          expect(toast.displaySuccessMessage).not.toHaveBeenCalledWith();
        });
      });

      it('should remove the secondary sector option from payload if nullish value provided', async () => {
        mockFlags({ isNetworkPageEnabled: false });
        jest.useFakeTimers();
        ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
          () => ({
            ...userMock,
            company: {
              ...userMock.company,
              companySectors: [
                {
                  sectorType: CompanySectorType.PRIMARY,
                  sector: { name: 'IT services', id: 'it-services-id' },
                },
                {
                  sectorType: CompanySectorType.SECONDARY,
                  sector: {
                    name: 'Investing',
                    id: 'investing-id',
                  },
                },
              ],
            },
            canEditCompanySectors: true,
          })
        );

        const { findByTestId } = setup([
          /* Mock a mutation where the secondary sector has been set to null, and thus omitted */
          updateCompanySectorsMutationMock({
            companyId: userMock.company.id,
            sectors: [
              {
                id: 'it-services-id',
                sectorType: CompanySectorType.PRIMARY,
              },
            ],
          }),
        ]);

        jest.advanceTimersByTime(1000);

        await act(async () => {
          fireEvent.click(
            await findByTestId(`${CompanySectorType.SECONDARY}-dropdown-input`)
          );
        });

        const placeholderOption = await findByTestId(
          `${CompanySectorType.SECONDARY}-dropdown-list-item-placeholder`
        );

        expect(placeholderOption).toBeInTheDocument();

        await act(async () => {
          fireEvent.click(placeholderOption);
        });

        jest.advanceTimersByTime(1000);

        await waitFor(() => {
          expect(toast.displaySuccessMessage).toHaveBeenCalledWith({
            title: 'Company sector successfully updated',
          });
          expect(toast.displaySuccessMessage).not.toHaveBeenCalledWith();
        });
      });
    });
  });

  describe('Company team members panel', () => {
    beforeEach(() => {
      ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
        publicRuntimeConfig: {
          ENVIRONMENT: Environments.DEV,
        },
      }));
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          ...userMock,
          canInviteNewCompanyMembers: true,
        })
      );
    });

    describe('when company has multiple users', () => {
      it('should render the number of company users and the details of the first user in a row', async () => {
        const { findByTestId, getByText, findAllByTestId } = setup([
          companyUserMocks.createAccountSettingsCompanyUsersMock({
            companyUsers: [
              companyUserMocks.externalCompanyUser1Mock,
              companyUserMocks.externalCompanyUser2Mock,
            ],
          }),
        ]);

        const companyUserTableRows = await findAllByTestId(
          `${selectors.companyUserTable}-row`
        );

        expect(companyUserTableRows.length).toEqual(2);
        expect(
          await findByTestId(selectors.companyUserTable)
        ).toBeInTheDocument();

        expect(
          getByText(companyUserMocks.externalCompanyUser1Mock.email)
        ).toBeInTheDocument();
      });
    });

    describe('when user is a support viewer', () => {
      beforeEach(() => {
        ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
          publicRuntimeConfig: {
            ENVIRONMENT: Environments.DEV,
          },
        }));
        ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
          () => ({
            ...userMock,
            roles: [
              {
                id: 'E22B0F60-FBD0-4A77-A6D0-BC3AC9EABAD3',
                name: 'SUPPLIER_VIEWER',
              },
            ],
            canInviteNewCompanyMembers: false,
          })
        );
      });

      it('should not display the invite form button', async () => {
        const { findByTestId, queryByTestId } = setup([
          companyUserMocks.createAccountSettingsCompanyUsersMock({}),
        ]);

        expect(
          await findByTestId(selectors.companyInviteTable)
        ).toBeInTheDocument();

        expect(
          queryByTestId(selectors.inviteFormButton)
        ).not.toBeInTheDocument();
      });
    });

    describe('Invite company team member', () => {
      beforeEach(() => {
        ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
          publicRuntimeConfig: {
            ENVIRONMENT: Environments.DEV,
          },
        }));
        ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
          () => ({
            ...userMock,
            canInviteNewCompanyMembers: true,
          })
        );
      });
      it('should allow an editor to create an invite user with success confirmation', async () => {
        const {
          findByTestId,
          queryByTestId,
          getByTestId,
          getByLabelText,
        } = setup([
          companyUserMocks.createAccountSettingsCompanyUsersMock({
            companyUsers: [
              companyUserMocks.externalCompanyUser1Mock,
              companyUserMocks.externalCompanyUser2Mock,
            ],
          }),
          meMocks.getGetMeMock(),
          companyUserMocks.createCompanyUserMutationMock({}),
        ]);
        jest.spyOn(toast, 'displaySuccessMessage');

        expect(
          await findByTestId(selectors.companyInviteTable)
        ).toBeInTheDocument();

        expect(queryByTestId(selectors.inviteFormButton)).toBeInTheDocument();

        const inviteFormBtn = await findByTestId(selectors.inviteFormButton);

        fireEvent.click(inviteFormBtn);

        expect(
          await findByTestId(selectors.inviteUserForm)
        ).toBeInTheDocument();

        await act(async () => {
          fireEvent.change(getByTestId(`${selectors.firstName}-input`), {
            target: {
              value: companyUserMocks.externalCompanyUser1Mock.firstName,
            },
          });
          fireEvent.change(getByTestId(`${selectors.lastName}-input`), {
            target: {
              value: companyUserMocks.externalCompanyUser1Mock.lastName,
            },
          });

          await selectEvent.select(
            getByLabelText(/Domain expertise.*/),
            'Business Development'
          );
          await selectEvent.select(
            getByLabelText(/Role type.*/),
            'Company Administrator'
          );
          fireEvent.change(getByTestId(`${selectors.email}-input`), {
            target: {
              value: 'test.mctest@test.com',
            },
          });
        });
        await waitFor(async () => {
          expect(
            getByTestId(`${selectors.firstName}-input`) as HTMLInputElement
          ).toHaveValue(companyUserMocks.externalCompanyUser1Mock.firstName);
          expect(
            getByTestId(`${selectors.lastName}-input`) as HTMLInputElement
          ).toHaveValue(companyUserMocks.externalCompanyUser1Mock.lastName);
          expect(
            getByTestId(`${selectors.email}-input`) as HTMLInputElement
          ).toHaveValue(companyUserMocks.externalCompanyUser1Mock.email);
          expect(
            getByTestId(`${selectors.inviteUserForm}-form`)
          ).toHaveFormValues({
            [FIELD_KEYS.EXPERTISE_DOMAIN]: 'BUSINESS_DEVELOPMENT',
            [FIELD_KEYS.ROLE_ID_TYPE]: 'SUPPLIER_EDITOR',
          });
          expect(getByTestId(selectors.onSubmitBtn)).not.toBeDisabled();
        });

        fireEvent.click(getByTestId(selectors.onSubmitBtn));

        await waitFor(() =>
          expect(getByTestId(selectors.onSubmitBtn)).toBeDisabled()
        );
      });
    });

    it('should prevent the form from being submitted if a example email in entered', async () => {
      const { getByTestId, findByTestId, getByLabelText } = setup([
        meMocks.getGetMeMock(),
        companyUserMocks.createAccountSettingsCompanyUsersMock({}),
      ]);

      const inviteFormBtn = await findByTestId(selectors.inviteFormButton);

      fireEvent.click(inviteFormBtn);

      expect(await findByTestId(selectors.inviteUserForm)).toBeInTheDocument();

      fireEvent.change(getByTestId(`${selectors.firstName}-input`), {
        target: {
          value: companyUserMocks.externalCompanyUser1Mock.firstName,
        },
      });
      fireEvent.change(getByTestId(`${selectors.lastName}-input`), {
        target: {
          value: companyUserMocks.externalCompanyUser1Mock.lastName,
        },
      });
      fireEvent.change(getByLabelText(/Domain expertise.*/), {
        target: {
          value: companyUserMocks.externalCompanyUser1Mock.expertiseDomain,
        },
      });

      fireEvent.change(getByLabelText(/Role type.*/), {
        target: {
          value: RoleName.SUPPLIER_VIEWER,
        },
      });

      fireEvent.change(getByTestId(`${selectors.email}-input`), {
        target: {
          value: 'some@example.com',
        },
      });

      fireEvent.click(getByTestId(selectors.onSubmitBtn));

      await waitFor(() =>
        expect(getByTestId(selectors.onSubmitBtn)).toBeDisabled()
      );
    });

    describe('Edit user', () => {
      describe('when the current user can edit other users', () => {
        beforeEach(() => {
          ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
            () => ({
              ...userMock,
              canEditCompanyMembers: true,
            })
          );
        });
        it('should allow an editor to open invite user form to edit', async () => {
          const { getByTestId, findByTestId } = setup([
            companyUserMocks.createAccountSettingsCompanyUsersMock({
              companyUsers: [companyUserMocks.externalCompanyUser2Mock],
            }),
            meMocks.getGetMeMock(),
            companyUserMocks.createCompanyUserMutationMock({}),
            companyUserMocks.editCompanyUserMock,
          ]);

          fireEvent.click(await findByTestId(selectors.editUserButton));

          await waitFor(() =>
            expect(getByTestId(selectors.inviteUserForm)).toBeVisible()
          );
        });

        it('should populate form data with created user values', async () => {
          const { findByTestId, getByTestId } = setup([
            companyUserMocks.createAccountSettingsCompanyUsersMock({
              companyUsers: [companyUserMocks.externalCompanyUser2Mock],
            }),
            meMocks.getGetMeMock(),
            companyUserMocks.createCompanyUserMutationMock({}),
            companyUserMocks.editCompanyUserMock,
          ]);

          fireEvent.click(await findByTestId(selectors.editUserButton));

          await waitFor(() =>
            expect(getByTestId(selectors.inviteUserForm)).toBeVisible()
          );

          expect(
            getByTestId(`${selectors.firstName}-input`) as HTMLInputElement
          ).toHaveValue(companyUserMocks.externalCompanyUser2Mock.firstName);
          expect(
            getByTestId(`${selectors.lastName}-input`) as HTMLInputElement
          ).toHaveValue(companyUserMocks.externalCompanyUser2Mock.lastName);
          expect(
            getByTestId(`${selectors.email}-input`) as HTMLInputElement
          ).toHaveValue(companyUserMocks.externalCompanyUser2Mock.email);
        });

        it('should contain disabled firstName, lastName and email field on edit', async () => {
          const { findByTestId, getByTestId } = setup([
            companyUserMocks.createAccountSettingsCompanyUsersMock({
              companyUsers: [companyUserMocks.externalCompanyUser2Mock],
            }),
            meMocks.getGetMeMock(),
            companyUserMocks.createCompanyUserMutationMock({}),
            companyUserMocks.editCompanyUserMock,
          ]);

          fireEvent.click(await findByTestId(selectors.editUserButton));

          expect(await findByTestId(selectors.inviteUserForm)).toBeVisible();
          expect(getByTestId(`${selectors.firstName}-input`)).toBeDisabled();
          expect(getByTestId(`${selectors.lastName}-input`)).toBeDisabled();
          expect(getByTestId(`${selectors.email}-input`)).toBeDisabled();
        });
      });
    });

    describe('delete user', () => {
      describe('when the current user has permissions to remove users', () => {
        it('should allow the user to open delete confirmation modal', async () => {
          ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
            () => ({
              ...userMock,
              canRemoveCompanyMembers: true,
            })
          );
          const { getByTestId, findByTestId } = setup([
            companyUserMocks.createAccountSettingsCompanyUsersMock({
              companyUsers: [companyUserMocks.externalCompanyUser2Mock],
            }),
            meMocks.getGetMeMock(),
          ]);

          fireEvent.click(await findByTestId(selectors.removeUserButton));

          await waitFor(() =>
            expect(
              getByTestId(
                userDeleteConfirmationSelectors.userDeleteConfirmation
              )
            ).toBeVisible()
          );
        });
      });

      describe('when current user is a SUPPLIER_VIEWER', () => {
        it('should not show remove button', async () => {
          const { queryByTestId } = setup([
            companyUserMocks.createAccountSettingsCompanyUsersMock({
              companyUsers: [companyUserMocks.externalCompanyUser2Mock],
            }),
            meMocks.getGetMeMock({
              roles: [
                {
                  id: 'role_id',
                  name: RoleName.SUPPLIER_VIEWER,
                },
              ],
            }),
          ]);

          await waitFor(() =>
            expect(queryByTestId(selectors.removeUserButton)).toBeNull()
          );
        });
      });
    });
  });
});
