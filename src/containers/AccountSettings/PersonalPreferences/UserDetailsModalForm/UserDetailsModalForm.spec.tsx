import { render, fireEvent, waitFor } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import { MockedProvider } from '@apollo/client/testing';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as meMocks from 'mocks/me';
import { ExpertiseDomain } from 'types/globalTypes';
import accountSettingsNamespace from '../../../../../locales/en/accountSettings.json';
import formNamespace from '../../../../../locales/en/form.json';
import usersAdminDashboardNamespace from '../../../../../locales/en/usersAdminDashboard.json';
import { useUpdateMe } from './mutations';
import * as selectors from './selectors';
import { IProps, USER_DETAILS_FIELD_KEYS } from './types';
import UserDetailsModalForm from '.';

jest.mock('effects/useAuthenticatedUser');
jest.mock('./mutations');

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

describe('UserDetailsModalForm', () => {
  beforeEach(() => {
    (useAuthenticatedUser as jest.Mock).mockImplementation(
      () => meMocks.baseMe
    );
    (useUpdateMe as jest.Mock).mockImplementation(() => [
      jest.fn(),
      { loading: false },
    ]);
  });

  describe('When the form is untouched', () => {
    it.each`
      selector               | expected
      ${selectors.firstName} | ${meMocks.baseMe.firstName}
      ${selectors.lastName}  | ${meMocks.baseMe.lastName}
      ${selectors.email}     | ${meMocks.baseMe.email}
    `(
      'pre-fills the inputs with the authenticated user properties',
      async ({ selector, expected }) => {
        const { findByTestId } = setup();

        const el = await findByTestId(`${selector}-input`);
        expect(el).toHaveAttribute('value', expected);
      }
    );

    it('does not pre-fill domain expertise when the user has no expertise', async () => {
      const { findByTestId } = setup();
      expect(
        await findByTestId(`${selectors.userDetailsForm}-form`)
      ).toHaveFormValues({
        [USER_DETAILS_FIELD_KEYS.EXPERTISE_DOMAIN]: '',
      });
    });

    it.each`
      expertiseDomain
      ${null}
      ${ExpertiseDomain.SUSTAINABILITY}
      ${ExpertiseDomain.PROCUREMENT}
      ${ExpertiseDomain.FINANCE}
      ${ExpertiseDomain.BUSINESS_DEVELOPMENT}
      ${ExpertiseDomain.OTHER}
    `(
      'pre-fills the $expertiseDomain expertise domain correctly',
      async ({ expertiseDomain }) => {
        (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
          ...meMocks.baseMe,
          expertiseDomain,
        }));
        const { findByTestId } = setup();
        expect(
          await findByTestId(`${selectors.userDetailsForm}-form`)
        ).toHaveFormValues({
          [USER_DETAILS_FIELD_KEYS.EXPERTISE_DOMAIN]: expertiseDomain || '',
        });
      }
    );

    it.each`
      field            | selector
      ${'email input'} | ${`${selectors.email}-input`}
      ${'save button'} | ${selectors.saveBtn}
    `('shows $field disabled', async ({ selector }) => {
      const { findByTestId } = setup();
      expect(await findByTestId(selector)).toBeDisabled();
    });
  });

  describe.each`
    field           | selector
    ${'first name'} | ${selectors.firstName}
    ${'last name'}  | ${selectors.lastName}
  `('when user wants to change the $field', ({ field, selector }) => {
    it('shows save button enabled', async () => {
      const { findByTestId } = setup();

      fireEvent.change(await findByTestId(`${selector}-input`), {
        target: { value: field },
      });
      expect(await findByTestId(selectors.saveBtn)).not.toBeDisabled();
    });

    it.each`
      description                      | value
      ${'when the value is empty'}     | ${''}
      ${'when the value is too short'} | ${'a'}
      ${'when the value is too long'}  | ${'a'.repeat(27)}
    `(
      'shows error message and the save button disabled, $description',
      async ({ value }) => {
        const { findByTestId } = setup();

        fireEvent.change(await findByTestId(`${selector}-input`), {
          target: { value },
        });
        expect(await findByTestId(`${selector}-error`)).toBeInTheDocument();
        expect(await findByTestId(selectors.saveBtn)).toBeDisabled();
      }
    );
  });

  describe('when the user changes the domain expertise', () => {
    it('enables the submit button and disables it when the init value is selected again', async () => {
      const mockUpdateMe = jest.fn();
      (useUpdateMe as jest.Mock).mockImplementation(() => [
        mockUpdateMe,
        { loading: false },
      ]);
      (useAuthenticatedUser as jest.Mock).mockImplementation(() => ({
        ...meMocks.baseMe,
        expertiseDomain: ExpertiseDomain.OTHER,
      }));

      const { getByLabelText, findByTestId } = setup();
      expect(await findByTestId(selectors.saveBtn)).toBeDisabled();

      await selectEvent.select(
        getByLabelText(/Domain expertise.*/),
        'Sustainability'
      );
      expect(await findByTestId(selectors.saveBtn)).not.toBeDisabled();

      await selectEvent.select(getByLabelText(/Domain expertise.*/), 'Other');
      expect(await findByTestId(selectors.saveBtn)).toBeDisabled();

      fireEvent.submit(await findByTestId(selectors.userDetailsForm));
      expect(mockUpdateMe).not.toHaveBeenCalled();
    });
  });

  describe('when the user clicks on cancel button', () => {
    it('calls onCancel prop', async () => {
      const closeModal = jest.fn();
      const { findByTestId } = setup({ closeModal });

      fireEvent.click(await findByTestId(selectors.cancelBtn));
      expect(closeModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the user submits the form', () => {
    it('trims the data input values and shows an error message, when the trimmed value is empty', async () => {
      const mockUpdateMe = jest.fn();
      (useUpdateMe as jest.Mock).mockImplementation(() => [
        mockUpdateMe,
        { loading: false },
      ]);
      const { findByTestId } = setup();

      const value = '     ';
      const firstNameInput = await findByTestId(`${selectors.firstName}-input`);
      const lastNameInput = await findByTestId(`${selectors.lastName}-input`);
      fireEvent.change(firstNameInput, { target: { value } });
      fireEvent.change(lastNameInput, { target: { value } });
      fireEvent.submit(await findByTestId(selectors.userDetailsForm));

      waitFor(async () => {
        expect(
          await findByTestId(`${selectors.firstName}-error`)
        ).toBeInTheDocument();
        expect(
          await findByTestId(`${selectors.lastName}-error`)
        ).toBeInTheDocument();
        expect(firstNameInput.getAttribute('value')).toBe('');
        expect(lastNameInput.getAttribute('value')).toBe('');
        expect(mockUpdateMe).not.toHaveBeenCalled();
      });
    });

    it('does not call update mutation when the trimmed values are equal to the init values', async () => {
      const mockUpdateMe = jest.fn();
      (useUpdateMe as jest.Mock).mockImplementation(() => [
        mockUpdateMe,
        { loading: false },
      ]);
      const { findByTestId } = setup();

      const firstNameWithSpaces = ` ${meMocks.baseMe.firstName} `;
      const lastNameWithSpaces = ` ${meMocks.baseMe.lastName} `;
      const firstNameInput = await findByTestId(`${selectors.firstName}-input`);
      const lastNameInput = await findByTestId(`${selectors.lastName}-input`);
      fireEvent.change(firstNameInput, {
        target: { value: firstNameWithSpaces },
      });
      fireEvent.change(lastNameInput, {
        target: { value: lastNameWithSpaces },
      });
      fireEvent.submit(await findByTestId(selectors.userDetailsForm));

      waitFor(() => {
        expect(firstNameInput.getAttribute('value')).toBe(
          firstNameWithSpaces.trim()
        );
        expect(lastNameInput.getAttribute('value')).toBe(
          lastNameWithSpaces.trim()
        );
        expect(mockUpdateMe).not.toBeCalled();
      });
    });

    it('does not call the mutation and the save button is disabled in loading state', async () => {
      const mockUpdateMe = jest.fn();
      (useUpdateMe as jest.Mock).mockImplementation(() => [
        mockUpdateMe,
        { loading: true },
      ]);
      const { findByTestId } = setup();

      expect(await findByTestId(selectors.saveBtn)).toBeDisabled();

      const firstNameInput = await findByTestId(`${selectors.firstName}-input`);
      const lastNameInput = await findByTestId(`${selectors.lastName}-input`);
      fireEvent.change(firstNameInput, { target: { value: 'firstName' } });
      fireEvent.change(lastNameInput, { target: { value: 'lastName' } });
      fireEvent.submit(await findByTestId(selectors.userDetailsForm));

      expect(mockUpdateMe).not.toHaveBeenCalled();
    });
  });
});
