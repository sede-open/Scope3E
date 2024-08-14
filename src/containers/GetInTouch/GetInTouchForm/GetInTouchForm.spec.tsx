import { MockedProvider } from '@apollo/client/testing';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import * as getInTouchEmailMocks from 'mocks/getInTouchEmail';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import { EmailEnquiry } from 'types/globalTypes';
import { trackEvent } from 'utils/analytics';
import { SUBJECT_GET_IN_TOUCH_PUBLIC } from 'utils/analyticsEvents';
import redirect from 'utils/redirect';
import { GetInTouchForm } from '.';
import formNamespace from '../../../../locales/en/form.json';
import publicGetInTouchNamespace from '../../../../locales/en/publicGetInTouch.json';
import * as selectors from './selectors';

jest.mock('utils/redirect');
jest.mock('utils/analytics');

const payload = { from: 'testfrom', body: 'testbody', subject: 'testsubject' };

const setup = (mocks: any[]) =>
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <I18nProvider
        lang="en"
        namespaces={{
          publicGetInTouch: publicGetInTouchNamespace,
          form: formNamespace,
        }}
      >
        <GetInTouchForm />
      </I18nProvider>
    </MockedProvider>
  );
const getInputSelector = (id: string) => `${id}-input`;

const filloutForm = async ({
  name,
  company,
  email,
  message,
  source,
  subject,
  marketingConsent,
  termsConsent,
}: {
  name?: string;
  company?: string;
  email?: string;
  message?: string;
  source?: string;
  subject?: string;
  marketingConsent?: boolean;
  termsConsent?: boolean;
}) => {
  const { findByTestId, getByLabelText } = screen;
  if (name) {
    const nameInput = await findByTestId(getInputSelector(selectors.name));
    await act(async () => {
      fireEvent.input(nameInput, { target: { value: name } });
    });
  }

  if (company) {
    const companyInput = await findByTestId(
      getInputSelector(selectors.company)
    );
    await act(async () => {
      fireEvent.input(companyInput, { target: { value: company } });
    });
  }

  if (email) {
    const emailInput = await findByTestId(getInputSelector(selectors.email));
    await act(async () => {
      fireEvent.input(emailInput, {
        target: { value: email },
      });
    });
  }

  if (message) {
    const messageInput = await findByTestId(
      getInputSelector(selectors.messageInput)
    );
    await act(async () => {
      fireEvent.input(messageInput, {
        target: { value: message },
      });
    });
  }

  if (marketingConsent) {
    await act(async () => {
      fireEvent.click(
        await findByTestId(`${selectors.commsConsentInput}-label`)
      );
    });
  }

  if (termsConsent) {
    await act(async () => {
      fireEvent.click(
        await findByTestId(`${selectors.termsConsentInput}-label`)
      );
    });
  }

  if (subject) {
    await selectEvent.select(
      getByLabelText('How can we help (subject):'),
      subject
    );
  }

  if (source) {
    await selectEvent.select(
      getByLabelText('How did you hear from us?'),
      'Events'
    );
  }
};

describe('GetInTouchForm', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('when no fields have been filled', () => {
    it('should disable the submit button', async () => {
      const { findByTestId } = setup([getInTouchEmailMocks.enquiryEmailMock]);

      const submitButton = await findByTestId(selectors.formSubmitBtn);

      expect(submitButton).toBeDisabled();
    });
  });

  describe('when required fields have all been correctly filled', () => {
    it('should not disable the submit button', async () => {
      const { findByTestId } = setup([getInTouchEmailMocks.enquiryEmailMock]);

      await filloutForm({
        name: 'Some name',
        company: 'Some company',
        email: 'some.name@company.com',
        message: 'testy mctest test tests tests',
        marketingConsent: true,
      });
      expect(await findByTestId(selectors.formSubmitBtn)).toBeDisabled();
    });
  });

  describe('when only the email field does not satisfy its pattern rule', () => {
    it('should disable the submit button and display an error message for the field', async () => {
      const { findByTestId, findByText, queryByText } = setup([
        getInTouchEmailMocks.enquiryEmailMock,
      ]);

      await filloutForm({
        name: 'Some name',
        company: 'Some company',
        message: 'testy mctest test tests tests',
      });
      expect(await findByTestId(selectors.formSubmitBtn)).toBeDisabled();
      await filloutForm({ email: 'some.name' });

      expect(await findByTestId(selectors.formSubmitBtn)).toBeDisabled();
      expect(
        await findByText(formNamespace['error-pattern'])
      ).toBeInTheDocument();

      await filloutForm({ email: getInTouchEmailMocks.testUser.email });
      const submitButton = await findByTestId(selectors.formSubmitBtn);
      act(() => {
        fireEvent.click(submitButton);
      });
      expect(
        queryByText(formNamespace['error-pattern'])
      ).not.toBeInTheDocument();
    });
  });

  describe('when all the fields are filled correctly and  the enquiry field is: ', () => {
    it('low carbon solution: commsConsent is mandatory', async () => {
      global.fetch = jest.fn();
      ((global.fetch as unknown) as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => payload,
      });
      const { findByTestId, queryByText } = setup([
        getInTouchEmailMocks.enquiryEmailMock,
      ]);

      await filloutForm({
        name: getInTouchEmailMocks.testUser.name,
        company: getInTouchEmailMocks.testUser.company,
        email: getInTouchEmailMocks.testUser.email,
        message: getInTouchEmailMocks.testUser.message,
        marketingConsent: true,
        termsConsent: true,
        subject: 'I’m looking for a low-carbon solution',
      });

      const submitButton = await findByTestId(selectors.formSubmitBtn);
      act(() => {
        fireEvent.click(submitButton);
      });
      expect(
        queryByText(formNamespace['error-pattern'])
      ).not.toBeInTheDocument();
    });
  });

  describe('when all the fields are filled correctly and  the enquiry field is: ', () => {
    it('join: commsConsent is optional', async () => {
      global.fetch = jest.fn();
      ((global.fetch as unknown) as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => payload,
      });
      const { findByTestId, queryByText } = setup([
        getInTouchEmailMocks.enquiryEmailMock,
      ]);
      await filloutForm({
        name: getInTouchEmailMocks.testUser.name,
        company: getInTouchEmailMocks.testUser.company,
        email: getInTouchEmailMocks.testUser.email,
        message: getInTouchEmailMocks.testUser.message,
        termsConsent: true,
        subject: 'Join us',
      });
      const submitButton = await findByTestId(selectors.formSubmitBtn);
      act(() => {
        fireEvent.click(submitButton);
      });
      expect(
        queryByText(formNamespace['error-pattern'])
      ).not.toBeInTheDocument();
    });
  });

  describe('when the form fields are complete and form submitted', () => {
    it('should call fetch with with an EmailEnquiry value', async () => {
      global.fetch = jest.fn();
      ((global.fetch as unknown) as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => payload,
      });
      const { findByTestId } = setup([getInTouchEmailMocks.enquiryEmailMock]);

      await filloutForm({
        name: getInTouchEmailMocks.testUser.name,
        company: getInTouchEmailMocks.testUser.company,
        email: getInTouchEmailMocks.testUser.email,
        message: getInTouchEmailMocks.testUser.message,
        termsConsent: true,
        marketingConsent: true,
        subject: 'I’m looking for a low-carbon solution',
        source: 'Events',
      });
      const submitButton = await findByTestId(selectors.formSubmitBtn);
      fireEvent.click(submitButton);

      await waitFor(() => {
        const [[, fetchOptions]] = (global.fetch as jest.Mock).mock.calls;
        expect(JSON.parse(fetchOptions.body)).toEqual(
          expect.objectContaining({
            enquiry: EmailEnquiry.LOW_CARBON_SOLUTION,
          })
        );
      });
    });

    it('should call redirect to /get-in-touch/confirmation', async () => {
      global.fetch = jest.fn();
      ((global.fetch as unknown) as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => payload,
      });
      const { findByTestId, queryByText } = setup([
        getInTouchEmailMocks.enquiryEmailMock,
      ]);

      await filloutForm({
        name: getInTouchEmailMocks.testUser.name,
        company: getInTouchEmailMocks.testUser.company,
        email: getInTouchEmailMocks.testUser.email,
        message: getInTouchEmailMocks.testUser.message,
        termsConsent: true,
        marketingConsent: true,
        subject: 'I’m looking for a low-carbon solution',
        source: 'Events',
      });

      const submitButton = await findByTestId(selectors.formSubmitBtn);
      act(() => {
        fireEvent.click(submitButton);
      });

      expect(
        queryByText(formNamespace['error-pattern'])
      ).not.toBeInTheDocument();

      await waitFor(() => {
        expect(redirect).toHaveBeenCalledTimes(1);
        expect(redirect).toHaveBeenCalledWith('/get-in-touch/confirmation');
      });
      await waitFor(() => {
        expect(trackEvent).toHaveBeenCalledWith(
          ...[
            SUBJECT_GET_IN_TOUCH_PUBLIC,
            {
              subject: 'I’m looking for a low-carbon solution',
            },
          ]
        );
      });
    });
  });
});
