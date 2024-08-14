import { render, within } from '@testing-library/react';
import I18nProvider from 'next-translate/I18nProvider';
import { CompanyRelationshipType, InviteStatus } from 'types/globalTypes';
import { fireEvent } from '@testing-library/dom';
import { inviteCompanyForm } from 'containers/AccountSettings/CompanyRelationships/InviteCompanyForm/selectors';
import { getTitleSelector } from 'components/ModalContent/selectors';
import { MockedProvider } from '@apollo/client/testing';
import { container } from 'components/Modal/selectors';
import companyOverviewNamespace from '../../../../../../locales/en/companyOverview.json';
import companyRelationshipsNamespace from '../../../../../../locales/en/companyRelationships.json';
import * as selectors from '../../selectors';
import { NetworkCell, Props } from '.';

const setup = (props: Partial<Props> = {}) => {
  return render(
    <I18nProvider
      namespaces={{
        companyOverview: companyOverviewNamespace,
        companyRelationships: companyRelationshipsNamespace,
      }}
    >
      <MockedProvider mocks={[]} addTypename={false}>
        <NetworkCell
          {...{
            companyName: 'companyName',
            relationshipType: null,
            relationshipStatus: null,
            companyDuns: '123',
            ...props,
          }}
        />
      </MockedProvider>
    </I18nProvider>
  );
};

describe('NetworkCell', () => {
  describe('when relationship type is null', () => {
    it('renders the invite dropdown and opens the supplier invite form modal upon a dropdown select', async () => {
      const { findByTestId } = setup({
        relationshipType: null,
      });
      const inviteBtn = await findByTestId(selectors.inviteBtn);
      fireEvent.click(inviteBtn);

      const customerOption = await findByTestId(
        CompanyRelationshipType.SUPPLIER
      );
      fireEvent.click(customerOption);

      expect(
        await findByTestId(getTitleSelector(inviteCompanyForm))
      ).toHaveTextContent(companyRelationshipsNamespace['invite-supplier']);
    });
    it('renders the invite dropdown and opens the customer invite form modal upon a dropdown select', async () => {
      const { findByTestId } = setup({
        relationshipType: null,
      });
      const inviteBtn = await findByTestId(selectors.inviteBtn);
      fireEvent.click(inviteBtn);

      const customerOption = await findByTestId(
        CompanyRelationshipType.CUSTOMER
      );
      fireEvent.click(customerOption);

      expect(
        await findByTestId(getTitleSelector(inviteCompanyForm))
      ).toHaveTextContent(companyRelationshipsNamespace['invite-customer']);
    });
  });
  describe(`when relationship type is ${CompanyRelationshipType.SUPPLIER}`, () => {
    describe(`when the relationship status is ${InviteStatus.APPROVED}`, () => {
      it('renders "your supplier"', () => {
        const { queryByText } = setup({
          relationshipType: CompanyRelationshipType.SUPPLIER,
          relationshipStatus: InviteStatus.APPROVED,
        });
        expect(
          queryByText(companyOverviewNamespace.yourSupplier)
        ).toBeInTheDocument();
      });
    });
    describe(`when the relationship status is ${InviteStatus.AWAITING_SUPPLIER_APPROVAL}`, () => {
      it('renders "invite sent" and opens the corresponding modal', async () => {
        const { findByTestId, findByText } = setup({
          relationshipType: CompanyRelationshipType.SUPPLIER,
          relationshipStatus: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
        });
        const invitationSentBtn = await findByText(
          companyOverviewNamespace.invitationSent
        );

        fireEvent.click(invitationSentBtn);

        const modalContainer = await findByTestId(container);
        expect(within(modalContainer).queryByRole('link')).toHaveAttribute(
          'href',
          '/network'
        );

        const modalCloseBtn = await findByTestId(
          selectors.inviteSentModalCloseBtn
        );
        fireEvent.click(modalCloseBtn);

        expect(modalContainer).not.toBeInTheDocument();
      });
    });
    describe(`when the relationship status is ${InviteStatus.AWAITING_CUSTOMER_APPROVAL}`, () => {
      it('renders "invite received" and opens the corresponding modal', async () => {
        const { findByTestId, findByText } = setup({
          relationshipType: CompanyRelationshipType.SUPPLIER,
          relationshipStatus: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
        });
        const invitationReceivedBtn = await findByText(
          companyOverviewNamespace.invitationReceived
        );

        fireEvent.click(invitationReceivedBtn);

        const modalContainer = await findByTestId(container);
        expect(within(modalContainer).queryByRole('link')).toHaveAttribute(
          'href',
          '/network'
        );

        const modalCloseBtn = await findByTestId(
          selectors.inviteReceivedModalCloseBtn
        );
        fireEvent.click(modalCloseBtn);

        expect(modalContainer).not.toBeInTheDocument();
      });
    });
  });
  describe(`when relationship type is ${CompanyRelationshipType.CUSTOMER}`, () => {
    describe(`when the relationship status is ${InviteStatus.APPROVED}`, () => {
      it('renders "your customer"', async () => {
        const { queryByText } = setup({
          relationshipType: CompanyRelationshipType.CUSTOMER,
          relationshipStatus: InviteStatus.APPROVED,
        });
        expect(
          queryByText(companyOverviewNamespace.yourCustomer)
        ).toBeInTheDocument();
      });
    });
    describe(`when the relationship status is ${InviteStatus.AWAITING_CUSTOMER_APPROVAL}`, () => {
      it('renders "invite sent" and opens the corresponding modal', async () => {
        const { findByTestId, findByText } = setup({
          relationshipType: CompanyRelationshipType.CUSTOMER,
          relationshipStatus: InviteStatus.AWAITING_CUSTOMER_APPROVAL,
        });
        const invitationSentBtn = await findByText(
          companyOverviewNamespace.invitationSent
        );

        fireEvent.click(invitationSentBtn);

        const modalContainer = await findByTestId(container);
        expect(within(modalContainer).queryByRole('link')).toHaveAttribute(
          'href',
          '/network'
        );

        const modalCloseBtn = await findByTestId(
          selectors.inviteSentModalCloseBtn
        );
        fireEvent.click(modalCloseBtn);

        expect(modalContainer).not.toBeInTheDocument();
      });
    });
    describe(`when the relationship status is ${InviteStatus.AWAITING_SUPPLIER_APPROVAL}`, () => {
      it('renders "invite received" and opens the corresponding modal', async () => {
        const { findByTestId, findByText } = setup({
          relationshipType: CompanyRelationshipType.CUSTOMER,
          relationshipStatus: InviteStatus.AWAITING_SUPPLIER_APPROVAL,
        });
        const invitationReceivedBtn = await findByText(
          companyOverviewNamespace.invitationReceived
        );

        fireEvent.click(invitationReceivedBtn);

        const modalContainer = await findByTestId(container);
        expect(within(modalContainer).queryByRole('link')).toHaveAttribute(
          'href',
          '/network'
        );

        const modalCloseBtn = await findByTestId(
          selectors.inviteReceivedModalCloseBtn
        );
        fireEvent.click(modalCloseBtn);

        expect(modalContainer).not.toBeInTheDocument();
      });
    });
  });
});
