import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Solutions } from 'containers/PrivateSolutions/types';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import * as enquiryEmailMocks from 'mocks/enquiryEmail';
import selectEvent from 'react-select-event';
import * as analyticsEvents from 'utils/analytics';
import { trackEvent } from 'utils/analytics';
import { CONTACT_US_FORM_SUBMISSION } from 'utils/analyticsEvents';
import * as toast from 'utils/toast';
import { ContactUs } from '.';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');

const user = {
  firstName: `${enquiryEmailMocks.contactMock.firstName}`,
  lastName: `${enquiryEmailMocks.contactMock.lastName}`,
  email: enquiryEmailMocks.contactMock.email,
  company: {
    id: enquiryEmailMocks.companyId,
    name: enquiryEmailMocks.contactMock.company,
  },
};

const setup = (mocks: any, overrides: any = {}) => {
  const props = {
    onClose: jest.fn(),
    ...overrides,
  };
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ContactUs {...props} />
    </MockedProvider>
  );
};

const fillValidValues = async ({
  findByTestId,
  getByLabelText,
}: {
  findByTestId: any;
  getByLabelText: any;
}) => {
  await fireEvent.input(await findByTestId(`${selectors.messageInput}-input`), {
    target: { value: enquiryEmailMocks.contactMock.message },
  });

  await selectEvent.select(
    getByLabelText('contactUs:contact-us-form-enquiry-label *'),
    'privateSolutions:lubricant-solutions-card-title'
  );

  await selectEvent.select(
    getByLabelText('contactUs:contact-us-form-region-label *'),
    'contactUs:region-europe'
  );

  await fireEvent.click(await findByTestId(`${selectors.consentInput}-label`));
};

describe('ContactUs', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      ...user,
    }));
  });

  it('should disable the submit button until all fields are valid', async () => {
    const { getByLabelText, findByTestId, queryByTestId } = setup([]);

    expect(await findByTestId(selectors.formSubmitBtn)).toBeDisabled();

    const errorSelector = `${selectors.messageInput}-error`;
    const validValue = enquiryEmailMocks.contactMock.message;
    const input = await findByTestId(`${selectors.messageInput}-input`);

    expect(queryByTestId(errorSelector)).not.toBeInTheDocument();

    await act(async () => {
      await fireEvent.input(input, { target: { value: validValue } });
      await fireEvent.input(input, { target: { value: '' } });
    });

    expect(await findByTestId(errorSelector)).toHaveTextContent(
      'form:error-required'
    );
    expect(await findByTestId(selectors.formSubmitBtn)).toBeDisabled();

    await act(async () => {
      await fireEvent.input(input, { target: { value: validValue } });
    });

    await selectEvent.select(
      getByLabelText('contactUs:contact-us-form-enquiry-label *'),
      'privateSolutions:lubricant-solutions-card-title'
    );

    await selectEvent.select(
      getByLabelText('contactUs:contact-us-form-region-label *'),
      'contactUs:region-europe'
    );

    expect(await findByTestId(selectors.formSubmitBtn)).toBeDisabled();

    fireEvent.click(await findByTestId(`${selectors.consentInput}-label`));

    expect(await findByTestId(selectors.formSubmitBtn)).not.toBeDisabled();
  });

  it('should send an email when all required fields have been filled in and call a successful toast message', async () => {
    jest.spyOn(toast, 'displaySuccessMessage');
    jest.spyOn(analyticsEvents, 'trackEvent');

    const onClose = jest.fn();

    const { findByTestId, getByLabelText } = setup(
      [enquiryEmailMocks.enquiryEmailMock],
      {
        onClose,
      }
    );

    await act(async () => {
      await fillValidValues({
        findByTestId,
        getByLabelText,
      });
    });

    const submitButton = await findByTestId(selectors.formSubmitBtn);
    expect(submitButton).not.toBeDisabled();

    expect(toast.displaySuccessMessage).not.toHaveBeenCalled();

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(trackEvent).toHaveBeenCalledWith(
        ...[
          CONTACT_US_FORM_SUBMISSION,
          {
            company: enquiryEmailMocks.contactMock.company,
            enquiry: enquiryEmailMocks.contactMock.enquiries,
            region: enquiryEmailMocks.contactMock.regions,
          },
        ]
      );
      expect(toast.displaySuccessMessage).toHaveBeenCalledTimes(1);
      expect(toast.displaySuccessMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'common:contact-form-toast-success-title',
          subtitle: 'common:contact-form-toast-success-subtitle',
        })
      );
    });
  });

  it('should call the error toast message when contact form API error', async () => {
    jest.spyOn(toast, 'displayErrorMessage');

    const { getByLabelText, findByTestId } = setup(
      [enquiryEmailMocks.enquiryEmailErrorMock],
      {}
    );

    await act(async () => {
      await fillValidValues({
        findByTestId,
        getByLabelText,
      });
    });

    const submitButton = await findByTestId(selectors.formSubmitBtn);
    expect(submitButton).not.toBeDisabled();

    await act(async () => {
      await fireEvent.click(submitButton);
    });

    const apiError = await findByTestId('contact-form-api-error');

    expect(apiError.textContent).toBe('error');
    await waitFor(() => {
      expect(toast.displayErrorMessage).toHaveBeenCalledTimes(1);
      expect(toast.displayErrorMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'common:contact-form-toast-error-title',
          subtitle: 'common:contact-form-toast-error-subtitle',
        })
      );
    });
  });

  describe('when a solutionId prop is provided', () => {
    it('should pre-select the appropriate enquiry option', async () => {
      const { findByText } = setup([], {
        solutionId: Solutions.MACHINE_MAX,
      });

      expect(
        await findByText(`privateSolutions:${Solutions.MACHINE_MAX}-card-title`)
      ).toBeInTheDocument();
    });
  });
});
