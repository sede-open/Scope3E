import { render, fireEvent, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import { MockedProvider } from '@apollo/client/testing';
import * as meMocks from 'mocks/me';
import * as toast from 'utils/toast';
import { GraphQLError } from 'graphql';
import { ExpertiseDomain } from 'types/globalTypes';
import accountSettingsNamespace from '../../../../../locales/en/accountSettings.json';
import formNamespace from '../../../../../locales/en/form.json';
import usersAdminDashboardNamespace from '../../../../../locales/en/usersAdminDashboard.json';
import * as selectors from './selectors';
import { IProps } from './types';
import UserDetailsModalForm from '.';

const setup = (overrides: Partial<IProps> = {}, mocks: any[] = []) => {
  const props: IProps = {
    closeModal: jest.fn(),
    ...overrides,
  };

  return render(
    <I18nProvider
      namespaces={{
        accountSettings: accountSettingsNamespace,
        usersAdminDashboard: usersAdminDashboardNamespace,
        form: formNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserDetailsModalForm {...props} />
      </MockedProvider>
    </I18nProvider>
  );
};

describe('UserDetailsModalFormToasts', () => {
  it('displays the success toast when the the mutation call fails', async () => {
    jest.spyOn(toast, 'displayErrorMessage');

    const { findByTestId } = setup({}, [
      meMocks.updateMeMock({}, undefined, [new GraphQLError('Ooops')]),
    ]);

    const firstNameInput = await findByTestId(`${selectors.firstName}-input`);
    const lastNameInput = await findByTestId(`${selectors.lastName}-input`);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });
    fireEvent.submit(await findByTestId(`${selectors.userDetailsForm}-form`));

    await waitFor(() => {
      expect(toast.displayErrorMessage).toHaveBeenCalledWith({
        title: 'We couldn’t update your details, please try again',
      });
    });
  });
  it('calls the mutation and displays the success toast', async () => {
    jest.spyOn(toast, 'displaySuccessMessage');
    const closeModalMock = jest.fn();

    const input = {
      firstName: 'John',
      lastName: 'Smith',
      expertiseDomain: ExpertiseDomain.PROCUREMENT,
    };
    const { findByTestId, getByLabelText } = setup(
      {
        closeModal: closeModalMock,
      },
      [meMocks.updateMeMock(input, { id: 'user-id', ...input })]
    );

    const firstNameInput = await findByTestId(`${selectors.firstName}-input`);
    const lastNameInput = await findByTestId(`${selectors.lastName}-input`);
    fireEvent.change(firstNameInput, { target: { value: input.firstName } });
    fireEvent.change(lastNameInput, { target: { value: input.lastName } });
    await selectEvent.select(
      getByLabelText(/Domain expertise.*/),
      'Procurement'
    );
    fireEvent.submit(await findByTestId(`${selectors.userDetailsForm}-form`));

    await waitFor(() => {
      expect(toast.displaySuccessMessage).toHaveBeenCalledWith({
        title: 'Details successfully updated',
      });
      expect(closeModalMock).toHaveBeenCalled();
    });
  });
});
