import React from 'react';
import { GraphQLError } from 'graphql';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';

import * as analyticsEvents from 'utils/analytics';
import * as accountSettingMocks from 'mocks/accountSettings';
import * as toast from 'utils/toast';
import { TEAM_MEMBER_REMOVED } from 'utils/analyticsEvents';

import accountSettingsNamespace from '../../../../../../locales/en/accountSettings.json';
import * as selectors from './selectors';
import { UserDeleteConfirmation } from '.';
import { IProps } from './types';

const setup = (propOverrides: Partial<IProps> = {}, mocks: any[] = []) => {
  const props = {
    onClose: jest.fn(),
    userToDelete: accountSettingMocks.userMock,
    ...propOverrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        accountSettings: accountSettingsNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename>
        <UserDeleteConfirmation {...props} />
      </MockedProvider>
    </I18nProvider>
  );
};

describe('UserDeleteConfirmation', () => {
  it('should display user being deleted first and last name', async () => {
    const { findByTestId, getByTestId } = setup();

    expect(
      await findByTestId(selectors.userDeleteConfirmation)
    ).toHaveTextContent(accountSettingMocks.userMock.firstName);
    expect(getByTestId(selectors.userDeleteConfirmation)).toHaveTextContent(
      accountSettingMocks.userMock.lastName
    );
  });

  describe('when user confirms the deletion', () => {
    describe('on success', () => {
      it('should call success toaster', async () => {
        jest.spyOn(toast, 'displaySuccessMessage');
        const { findByTestId } = setup(undefined, [
          accountSettingMocks.deleteUserMutationMock(),
        ]);

        fireEvent.click(await findByTestId(selectors.userDeleteConfirm));

        // needed to flush state promises
        expect(await findByTestId(selectors.userDeleteConfirmation));

        await waitFor(() => {
          expect(toast.displaySuccessMessage).toHaveBeenCalledWith({
            title: 'Team member successfully removed',
          });
        });
      });

      it('should close the modal', async () => {
        const onClose = jest.fn();
        const { findByTestId } = setup({ onClose }, [
          accountSettingMocks.deleteUserMutationMock(),
        ]);

        fireEvent.click(await findByTestId(selectors.userDeleteConfirm));

        // needed to flush state promises
        expect(await findByTestId(selectors.userDeleteConfirmation));

        await waitFor(() => {
          expect(onClose).toHaveBeenCalledWith();
        });
      });

      it('should trigger analytics event', async () => {
        jest.spyOn(analyticsEvents, 'trackEvent');

        const { findByTestId } = setup(undefined, [
          accountSettingMocks.deleteUserMutationMock(),
        ]);

        fireEvent.click(await findByTestId(selectors.userDeleteConfirm));

        // needed to flush state promises
        expect(await findByTestId(selectors.userDeleteConfirmation));

        await waitFor(() => {
          expect(analyticsEvents.trackEvent).toHaveBeenCalledWith(
            TEAM_MEMBER_REMOVED,
            {
              companyId: accountSettingMocks.userMock.company?.id,
            }
          );
        });
      });
    });

    describe('on error', () => {
      const errorMessage = 'Something went wrong';

      it('should call error toaster', async () => {
        jest.spyOn(toast, 'displayErrorMessage');

        const { findByTestId } = setup(undefined, [
          accountSettingMocks.deleteUserMutationMock(undefined, undefined, [
            new GraphQLError(errorMessage),
          ]),
        ]);

        fireEvent.click(await findByTestId(selectors.userDeleteConfirm));

        // needed to flush state promises
        expect(await findByTestId(selectors.userDeleteConfirmation));

        await waitFor(() => {
          expect(toast.displayErrorMessage).toHaveBeenCalled();
        });
      });

      it('should not close the modal', async () => {
        const onClose = jest.fn();
        const { findByTestId } = setup({ onClose }, [
          accountSettingMocks.deleteUserMutationMock(undefined, undefined, [
            new GraphQLError(errorMessage),
          ]),
        ]);

        fireEvent.click(await findByTestId(selectors.userDeleteConfirm));

        // needed to flush state promises
        expect(await findByTestId(selectors.userDeleteConfirmation));

        await waitFor(() => {
          expect(onClose).not.toHaveBeenCalledWith();
        });
      });

      it('should display the API error', async () => {
        const { findByTestId, getByTestId } = setup(undefined, [
          accountSettingMocks.deleteUserMutationMock(undefined, undefined, [
            new GraphQLError(errorMessage),
          ]),
        ]);

        fireEvent.click(await findByTestId(selectors.userDeleteConfirm));

        // needed to flush state promises
        expect(await findByTestId(selectors.userDeleteConfirmation));

        await waitFor(() => {
          expect(
            getByTestId(selectors.userDeleteConfirmation)
          ).toHaveTextContent(errorMessage);
        });
      });
    });
  });

  describe('when user cancels the deletion', () => {
    it('should call onClose', async () => {
      const onClose = jest.fn();
      const { findByTestId } = setup({ onClose });

      fireEvent.click(await findByTestId(selectors.userDeleteCancel));

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });
  });
});
