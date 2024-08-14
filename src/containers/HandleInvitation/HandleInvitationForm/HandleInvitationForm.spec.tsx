import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import * as meMocks from 'mocks/me';
import { HANDLE_INVITATION_FORM_SUBMISSION } from 'utils/analyticsEvents';
import { trackEvent } from 'utils/analytics';
import * as analyticsEvents from 'utils/analytics';
import * as handleInvitationMocks from 'mocks/handleInvitation';
import * as pageTitleSelectors from '../HandleInvitationPageTitle/selectors';
import * as selectors from './selectors';
import { HandleInvitationForm } from '.';
import commonNamespace from '../../../../locales/en/common.json';
import handleInvitationNamespace from '../../../../locales/en/handleInvitation.json';
import { ACTION_IDS, ContentType } from '../types';

const setup = (mocks: any = [], overrides: any = {}) => {
  const props = {
    company: meMocks.baseMe.company,
    onSubmit: jest.fn(),
    apiError: '',
    type: ContentType.HANDLE_INVITATION_FORM,
    ...overrides,
  };
  return render(
    <I18nProvider
      namespaces={{
        common: commonNamespace,
        handleInvitation: handleInvitationNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserProvider>
          <HandleInvitationForm {...props} />
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );
};

describe('HandleInvitationForm', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('should render form and form page title', async () => {
    const { findByTestId } = setup([meMocks.getGetMeMock()]);

    expect(
      await findByTestId(selectors.handleInvitationForm)
    ).toBeInTheDocument();
    expect(
      await findByTestId(pageTitleSelectors.pageTitle)
    ).toBeInTheDocument();
    expect(await findByTestId(pageTitleSelectors.pageTitle)).toHaveTextContent(
      handleInvitationMocks.FORM_PAGE_TITLE
    );
  });

  it('should render company details', async () => {
    const { findByTestId, getByTestId } = setup([meMocks.getGetMeMock()]);

    expect(await findByTestId(selectors.companyName)).toBeInTheDocument();
    expect(getByTestId(selectors.companyName).textContent).toContain(
      `${meMocks.baseMe.company?.name.toUpperCase()}`
    );
  });

  it('should render unchecked radio buttons by default', async () => {
    const { findByTestId } = setup([meMocks.getGetMeMock()]);

    expect(
      await findByTestId(`${selectors.radioBtnAccept}-input`)
    ).toBeInTheDocument();
    expect(
      await findByTestId(`${selectors.radioBtnDecline}-input`)
    ).toBeInTheDocument();
    expect(
      await findByTestId(`${selectors.radioBtnAccept}-input`)
    ).not.toBeChecked();
    expect(
      await findByTestId(`${selectors.radioBtnDecline}-input`)
    ).not.toBeChecked();
  });

  it('should NOT render decline reason input by default', async () => {
    const { queryByTestId } = setup([meMocks.getGetMeMock()]);

    expect(
      queryByTestId(`${selectors.declineReasonInput}-input`)
    ).not.toBeInTheDocument();
  });

  it('should render disabled submit button by default', async () => {
    const { findByTestId } = setup([meMocks.getGetMeMock()]);

    expect(await findByTestId(selectors.onSubmitBtn)).toBeDisabled();
  });

  it('should allow a user to accept and submit', async () => {
    const onSubmit = jest.fn();
    jest.spyOn(analyticsEvents, 'trackEvent');
    const { findByTestId } = setup(
      [
        meMocks.getGetMeMock(),
        handleInvitationMocks.acceptCompanyInvitationMock,
      ],
      {
        onSubmit,
      }
    );

    expect(
      await findByTestId(selectors.handleInvitationForm)
    ).toBeInTheDocument();
    expect(await findByTestId(selectors.onSubmitBtn)).toBeDisabled();

    expect(
      await findByTestId(`${selectors.radioBtnAccept}-input`)
    ).not.toBeChecked();

    await waitFor(async () => {
      fireEvent.click(await findByTestId(`${selectors.radioBtnAccept}-label`));
    });

    expect(
      await findByTestId(`${selectors.radioBtnAccept}-input`)
    ).toBeChecked();
    expect(await findByTestId(selectors.onSubmitBtn)).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(await findByTestId(selectors.onSubmitBtn));
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(trackEvent).toHaveBeenCalledWith(
        ...[
          HANDLE_INVITATION_FORM_SUBMISSION,
          {
            companyId: meMocks.baseMe.company?.id,
            reason: undefined,
            action: ACTION_IDS.ACCEPT,
          },
        ]
      );
    });
  });

  it('should allow a user to decline, select reason and submit', async () => {
    jest.spyOn(analyticsEvents, 'trackEvent');
    const onSubmit = jest.fn();
    const { findByTestId, findByLabelText } = setup(
      [
        meMocks.getGetMeMock(),
        handleInvitationMocks.declineCompanyInvitationMock,
      ],
      {
        onSubmit,
      }
    );

    expect(
      await findByTestId(selectors.handleInvitationForm)
    ).toBeInTheDocument();
    expect(await findByTestId(selectors.onSubmitBtn)).toBeDisabled();

    expect(
      await findByTestId(`${selectors.radioBtnDecline}-input`)
    ).not.toBeChecked();

    await waitFor(async () => {
      fireEvent.click(await findByTestId(`${selectors.radioBtnDecline}-label`));
    });

    expect(
      await findByTestId(`${selectors.radioBtnDecline}-input`)
    ).toBeChecked();

    await act(async () => {
      const declineReasonSelect = await findByLabelText(
        handleInvitationMocks.DECLINE_REASON_SELECT_LABEL
      );
      await selectEvent.select(
        declineReasonSelect,
        handleInvitationMocks.DECLINE_REASON
      );
    });

    expect(await findByTestId(selectors.onSubmitBtn)).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(await findByTestId(selectors.onSubmitBtn));
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(trackEvent).toHaveBeenCalledWith(
        HANDLE_INVITATION_FORM_SUBMISSION,
        {
          companyId: meMocks.baseMe.company?.id,
          reason: handleInvitationMocks.DECLINE_REASON,
          action: ACTION_IDS.DECLINE,
        }
      );
    });
  });

  it('should display an API error - accept invitation', async () => {
    const { findByTestId } = setup(
      [
        meMocks.getGetMeMock(),
        handleInvitationMocks.acceptCompanyInvitationErrorMock,
      ],
      {
        apiError: handleInvitationMocks.ERROR_MESSAGE,
      }
    );

    expect(
      await findByTestId(selectors.handleInvitationForm)
    ).toBeInTheDocument();
    expect(await findByTestId(selectors.onSubmitBtn)).toBeDisabled();

    expect(
      await findByTestId(`${selectors.radioBtnAccept}-input`)
    ).not.toBeChecked();

    await waitFor(async () => {
      fireEvent.click(await findByTestId(`${selectors.radioBtnAccept}-label`));
    });

    expect(
      await findByTestId(`${selectors.radioBtnAccept}-input`)
    ).toBeChecked();

    expect(await findByTestId(selectors.onSubmitBtn)).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(await findByTestId(selectors.onSubmitBtn));
    });

    expect(await findByTestId(pageTitleSelectors.pageTitle)).toHaveTextContent(
      handleInvitationMocks.FORM_PAGE_TITLE
    );

    expect(
      (await findByTestId(selectors.handleInvitationFormApiError)).textContent
    ).toBe(handleInvitationMocks.ERROR_MESSAGE);
  });

  it('should display an API error - decline invitation', async () => {
    const { findByTestId, findByLabelText } = setup(
      [
        meMocks.getGetMeMock(),
        handleInvitationMocks.declineCompanyInvitationErrorMock,
      ],
      {
        apiError: handleInvitationMocks.ERROR_MESSAGE,
      }
    );

    expect(
      await findByTestId(selectors.handleInvitationForm)
    ).toBeInTheDocument();
    expect(await findByTestId(selectors.onSubmitBtn)).toBeDisabled();

    expect(
      await findByTestId(`${selectors.radioBtnDecline}-input`)
    ).not.toBeChecked();

    await waitFor(async () => {
      fireEvent.click(await findByTestId(`${selectors.radioBtnDecline}-label`));
    });

    expect(
      await findByTestId(`${selectors.radioBtnDecline}-input`)
    ).toBeChecked();

    await act(async () => {
      const declineReasonSelect = await findByLabelText(
        handleInvitationMocks.DECLINE_REASON_SELECT_LABEL
      );
      await selectEvent.select(
        declineReasonSelect,
        handleInvitationMocks.DECLINE_REASON
      );
    });

    expect(await findByTestId(selectors.onSubmitBtn)).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(await findByTestId(selectors.onSubmitBtn));
    });

    expect(
      (await findByTestId(selectors.handleInvitationFormApiError)).textContent
    ).toBe(handleInvitationMocks.ERROR_MESSAGE);
  });
});
