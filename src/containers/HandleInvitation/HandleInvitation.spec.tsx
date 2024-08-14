import { MockedProvider } from '@apollo/client/testing';
import I18nProvider from 'next-translate/I18nProvider';
import selectEvent from 'react-select-event';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { AuthenticatedUserProvider } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import * as meMocks from 'mocks/me';
import * as handleInvitationMocks from 'mocks/handleInvitation';
import * as formSelectors from './HandleInvitationForm/selectors';
import * as pageTitleSelectors from './HandleInvitationPageTitle/selectors';
import * as selectors from './selectors';
import { HandleInvitation } from '.';
import commonNamespace from '../../../locales/en/common.json';
import handleInvitationNamespace from '../../../locales/en/handleInvitation.json';

const setup = (mocks: any = []) =>
  render(
    <I18nProvider
      namespaces={{
        common: commonNamespace,
        handleInvitation: handleInvitationNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthenticatedUserProvider>
          <HandleInvitation />
        </AuthenticatedUserProvider>
      </MockedProvider>
    </I18nProvider>
  );

// sets content type to ACCEPT_CONFIRMATION
const submitAcceptConfirmationHelper = async ({
  findByTestId,
  getByTestId,
}: {
  findByTestId: any;
  getByTestId: any;
}) => {
  expect(
    await findByTestId(formSelectors.handleInvitationForm)
  ).toBeInTheDocument();
  expect(getByTestId(formSelectors.onSubmitBtn)).toBeDisabled();

  expect(
    getByTestId(`${formSelectors.radioBtnAccept}-input`)
  ).not.toBeChecked();

  await waitFor(async () => {
    fireEvent.click(getByTestId(`${formSelectors.radioBtnAccept}-label`));
  });

  await waitFor(async () => {
    expect(getByTestId(`${formSelectors.radioBtnAccept}-input`)).toBeChecked();
    expect(getByTestId(formSelectors.onSubmitBtn)).not.toBeDisabled();
  });

  await act(async () => {
    fireEvent.click(getByTestId(formSelectors.onSubmitBtn));
  });
};

// sets content type to DECLINE_CONFIRMATION
const submitDeclineConfirmationHelper = async ({
  findByTestId,
  getByTestId,
  findByLabelText,
}: {
  findByTestId: any;
  getByTestId: any;
  findByLabelText: any;
}) => {
  expect(
    await findByTestId(formSelectors.handleInvitationForm)
  ).toBeInTheDocument();
  expect(getByTestId(formSelectors.onSubmitBtn)).toBeDisabled();

  expect(
    getByTestId(`${formSelectors.radioBtnDecline}-input`)
  ).not.toBeChecked();

  await waitFor(async () => {
    fireEvent.click(getByTestId(`${formSelectors.radioBtnDecline}-label`));
  });

  await waitFor(async () => {
    expect(getByTestId(`${formSelectors.radioBtnDecline}-input`)).toBeChecked();
  });

  await act(async () => {
    const declineReasonSelect = await findByLabelText(
      handleInvitationMocks.DECLINE_REASON_SELECT_LABEL
    );
    await selectEvent.select(
      declineReasonSelect,
      handleInvitationMocks.DECLINE_REASON
    );
  });

  expect(getByTestId(formSelectors.onSubmitBtn)).not.toBeDisabled();

  await act(async () => {
    fireEvent.click(getByTestId(formSelectors.onSubmitBtn));
  });
};

describe('HandleInvitation', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });
  it('should render "/handle-invitation" page container', async () => {
    const { findByTestId } = setup([meMocks.getGetMeMock()]);
    const handleInvitationPage = await findByTestId(
      selectors.handleInviationPageContainer
    );
    expect(handleInvitationPage).toBeInTheDocument();
  });

  // content type is set to HANDLE_INVITATION_FORM by default
  describe('when page content type === "HANDLE_INVITATION_FORM"', () => {
    it('should render correct squares graphic', async () => {
      const { findByTestId, queryByTestId } = setup([meMocks.getGetMeMock()]);

      expect(await findByTestId(selectors.squaresGraphic)).toBeInTheDocument();
      expect(
        queryByTestId(selectors.confirmationSquaresGraphic)
      ).not.toBeInTheDocument();
    });

    it('should render handle invitation form', async () => {
      const { findByTestId } = setup([meMocks.getGetMeMock()]);

      expect(
        await findByTestId(formSelectors.handleInvitationForm)
      ).toBeInTheDocument();
    });

    it('should render correct handle invitation form Page Title', async () => {
      const { findByTestId } = setup([meMocks.getGetMeMock()]);

      expect(
        await findByTestId(pageTitleSelectors.pageTitle)
      ).toBeInTheDocument();
      expect(
        await findByTestId(pageTitleSelectors.pageTitle)
      ).toHaveTextContent(handleInvitationMocks.FORM_PAGE_TITLE);
      expect(
        await findByTestId(pageTitleSelectors.pageTitle)
      ).not.toHaveTextContent(handleInvitationMocks.ACCEPT_PAGE_TITLE);
      expect(
        await findByTestId(pageTitleSelectors.pageTitle)
      ).not.toHaveTextContent(handleInvitationMocks.DECLINE_PAGE_TITLE);
    });
  });

  describe('when page content type === "ACCEPT_CONFIRMATION"', () => {
    it('should render correct confirmation sqaures graphic', async () => {
      const { findByTestId, getByTestId, queryByTestId } = setup([
        meMocks.getGetMeMock(),
        handleInvitationMocks.acceptCompanyInvitationMock,
      ]);
      await submitAcceptConfirmationHelper({ findByTestId, getByTestId });

      await waitFor(async () => {
        expect(
          await findByTestId(selectors.confirmationSquaresGraphic)
        ).toBeInTheDocument();
        expect(queryByTestId(selectors.squaresGraphic)).not.toBeInTheDocument();
      });
    });

    it('should render correct accepted confirmation Page Title', async () => {
      const { findByTestId, getByTestId } = setup([
        meMocks.getGetMeMock(),
        handleInvitationMocks.acceptCompanyInvitationMock,
      ]);
      await submitAcceptConfirmationHelper({ findByTestId, getByTestId });

      await waitFor(async () => {
        expect(
          await findByTestId(pageTitleSelectors.pageTitle)
        ).toBeInTheDocument();
        expect(
          await findByTestId(pageTitleSelectors.pageTitle)
        ).toHaveTextContent(handleInvitationMocks.ACCEPT_PAGE_TITLE);
        expect(
          await findByTestId(pageTitleSelectors.pageTitle)
        ).not.toHaveTextContent(handleInvitationMocks.FORM_PAGE_TITLE);
        expect(
          await findByTestId(pageTitleSelectors.pageTitle)
        ).not.toHaveTextContent(handleInvitationMocks.DECLINE_PAGE_TITLE);
      });
    });

    it('should NOT render handle invitation form', async () => {
      const { findByTestId, getByTestId, queryByTestId } = setup([
        meMocks.getGetMeMock(),
        handleInvitationMocks.acceptCompanyInvitationMock,
      ]);
      await submitAcceptConfirmationHelper({ findByTestId, getByTestId });

      await waitFor(async () => {
        expect(
          queryByTestId(formSelectors.handleInvitationForm)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('when page content type === "DECLINE_CONFIRMATION"', () => {
    it('should render correct confirmation sqaures graphic', async () => {
      const {
        findByTestId,
        getByTestId,
        findByLabelText,
        queryByTestId,
      } = setup([
        meMocks.getGetMeMock(),
        handleInvitationMocks.declineCompanyInvitationMock,
      ]);
      await submitDeclineConfirmationHelper({
        findByTestId,
        getByTestId,
        findByLabelText,
      });

      await waitFor(async () => {
        expect(
          await findByTestId(selectors.confirmationSquaresGraphic)
        ).toBeInTheDocument();
        expect(queryByTestId(selectors.squaresGraphic)).not.toBeInTheDocument();
      });
    });

    it('should render correct declined confirmation Page Title', async () => {
      const { findByTestId, getByTestId, findByLabelText } = setup([
        meMocks.getGetMeMock(),
        handleInvitationMocks.declineCompanyInvitationMock,
      ]);
      await submitDeclineConfirmationHelper({
        findByTestId,
        getByTestId,
        findByLabelText,
      });

      await waitFor(async () => {
        expect(
          await findByTestId(pageTitleSelectors.pageTitle)
        ).toBeInTheDocument();
        expect(
          await findByTestId(pageTitleSelectors.pageTitle)
        ).toHaveTextContent(handleInvitationMocks.DECLINE_PAGE_TITLE);
        expect(
          await findByTestId(pageTitleSelectors.pageTitle)
        ).not.toHaveTextContent(handleInvitationMocks.FORM_PAGE_TITLE);
        expect(
          await findByTestId(pageTitleSelectors.pageTitle)
        ).not.toHaveTextContent(handleInvitationMocks.ACCEPT_PAGE_TITLE);
      });
    });

    it('should NOT render handle invitation form', async () => {
      const {
        findByTestId,
        getByTestId,
        findByLabelText,
        queryByTestId,
      } = setup([
        meMocks.getGetMeMock(),
        handleInvitationMocks.declineCompanyInvitationMock,
      ]);
      await submitDeclineConfirmationHelper({
        findByTestId,
        getByTestId,
        findByLabelText,
      });

      await waitFor(async () => {
        expect(
          queryByTestId(formSelectors.handleInvitationForm)
        ).not.toBeInTheDocument();
      });
    });
  });
});
