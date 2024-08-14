import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';

import * as toast from 'utils/toast';
import * as analyticsEvents from 'utils/analytics';
import * as accountSettingMocks from 'mocks/accountSettings';
import { UserStatus } from 'types/globalTypes';
import { TEAM_MEMBER_INVITE_RESENT } from 'utils/analyticsEvents';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';

import commonNamespace from '../../../../../../locales/en/common.json';
import * as selectors from '../../../selectors';
import { CompanyUserActions } from '.';
import { IProps } from './types';

jest.mock('effects/useAuthenticatedUser');

const setup = (propOverrides: Partial<IProps> = {}, mocks: any = []) => {
  const props: IProps = {
    setModalState: jest.fn(),
    user: accountSettingMocks.userMock,
    currentUserId: 'ca01eb4f-57db-4766-b477-cad76f555ce8',
    ...propOverrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        common: commonNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename>
        <CompanyUserActions {...props} />
      </MockedProvider>
    </I18nProvider>
  );
};

describe('CompanyUserUpdateActions', () => {
  beforeAll(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      ...accountSettingMocks.userMock,
      canRemoveCompanyMembers: true,
      canEditCompanyMembers: true,
    }));
  });

  describe('when current user can remove company members', () => {
    describe('when current user is the same as user', () => {
      it('should NOT display remove button', async () => {
        const { queryByTestId } = setup({
          currentUserId: accountSettingMocks.userMock.id,
        });

        expect(queryByTestId(selectors.removeUserButton)).toBeNull();
      });
    });

    describe('when current user is not the same as user', () => {
      it('should display remove button', () => {
        const { queryByTestId } = setup();

        expect(queryByTestId(selectors.removeUserButton)).toBeInTheDocument();
      });

      describe('when user has status of PENDING', () => {
        const pendingUser = {
          ...accountSettingMocks.userMock,
          status: UserStatus.PENDING,
        };

        it('should display "Resend" invite button', () => {
          const { getByTestId } = setup({
            user: pendingUser,
          });

          expect(getByTestId(selectors.resendInviteButton)).toBeInTheDocument();
        });

        describe('when resend invite button is clicked', () => {
          it('should disable the resend button', async () => {
            const { getByTestId, findByTestId } = setup({
              user: pendingUser,
            });

            fireEvent.click(getByTestId(selectors.resendInviteButton));

            expect(getByTestId(selectors.resendInviteButton)).toBeDisabled();
            await waitFor(async () => {
              expect(
                await findByTestId(selectors.resendInviteButton)
              ).not.toBeDisabled();
            });
          });

          describe('on success', () => {
            const successMocks = [
              accountSettingMocks.resendUserInviteMutationMock({
                userId: pendingUser.id,
              }),
            ];

            it('should display a success toaster', async () => {
              jest.spyOn(toast, 'displaySuccessMessage');

              const { getByTestId } = setup(
                {
                  user: pendingUser,
                },
                successMocks
              );

              fireEvent.click(getByTestId(selectors.resendInviteButton));

              await waitFor(() => {
                expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
              });
            });

            it('should trigger analytics event', async () => {
              jest.spyOn(analyticsEvents, 'trackEvent');

              const { getByTestId } = setup(
                {
                  user: pendingUser,
                },
                successMocks
              );

              fireEvent.click(getByTestId(selectors.resendInviteButton));

              await waitFor(() => {
                expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
                  TEAM_MEMBER_INVITE_RESENT,
                  {
                    companyId: pendingUser.company?.id,
                  }
                );
              });
            });
          });

          describe('on failure', () => {
            const failureMocks = [
              accountSettingMocks.resendUserInviteMutationMock(
                {
                  userId: pendingUser.id,
                },
                undefined,
                [new GraphQLError('Oops')]
              ),
            ];

            it('should display a failure toaster', async () => {
              jest.spyOn(toast, 'displayErrorMessage');

              const { getByTestId } = setup(
                {
                  user: pendingUser,
                },
                failureMocks
              );

              fireEvent.click(getByTestId(selectors.resendInviteButton));

              await waitFor(() => {
                expect(toast.displayErrorMessage).toHaveBeenCalledTimes(1);
              });
            });

            it('should NOT trigger an analytics event', async () => {
              jest.spyOn(analyticsEvents, 'trackEvent');

              const { getByTestId } = setup(
                {
                  user: pendingUser,
                },
                failureMocks
              );

              fireEvent.click(getByTestId(selectors.resendInviteButton));

              await waitFor(() => {
                expect(analyticsEvents.trackEvent).not.toHaveBeenCalled();
              });
            });
          });
        });
      });
    });
  });

  describe('when current user can edit company members', () => {
    beforeEach(() => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          ...accountSettingMocks.userMock,
          canRemoveCompanyMembers: true,
          canEditCompanyMembers: true,
        })
      );
    });

    describe('when the current user is not the same as user', () => {
      it('should display the edit button', async () => {
        const { queryByTestId } = setup();

        expect(queryByTestId(selectors.editUserButton)).toBeInTheDocument();
      });
    });
  });

  describe('when the current user cannot edit company members', () => {
    it('should hide the edit user button', () => {
      ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(
        () => ({
          ...accountSettingMocks.userMock,
          canRemoveCompanyMembers: false,
          canEditCompanyMembers: false,
        })
      );

      const { queryByTestId } = setup();

      expect(queryByTestId(selectors.editUserButton)).not.toBeInTheDocument();
    });
  });
});
