import I18nProvider from 'next-translate/I18nProvider';
import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import {
  CompanyRelationshipRecommendationStatus,
  CompanyRelationshipType,
} from 'types/globalTypes';
import {
  createCompanyRelationshipMock,
  updateCompanyRelationshipRecommendationMock,
} from 'mocks/companyRelationships';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import networkSettingsNamespace from '../../../../locales/en/networkSettings.json';
import { QuickConnectCard, IProps } from '.';
import * as selectors from '../selectors';

jest.mock('effects/useAuthenticatedUser');

describe('QuickConnectCard', () => {
  const setup = (props: Partial<IProps>, mocks: any[] = []) => {
    return render(
      <I18nProvider
        namespaces={{
          networkSettings: networkSettingsNamespace,
        }}
      >
        <MockedProvider mocks={mocks}>
          <QuickConnectCard
            {...{
              id: 'x',
              name: 'Company Name',
              duns: '123456789',
              deleteCard: jest.fn(),
              color: 'blue',
              relationshipType: CompanyRelationshipType.CUSTOMER,
              recommendedCompanyId: undefined,
              region: 'London',
              country: 'UK',
              sector: 'Agriculture',
              ...props,
            }}
          />
        </MockedProvider>
      </I18nProvider>
    );
  };

  const companyId = '98765';
  const recommendedCompanyId = '12345';
  const recommendationId = '54321';

  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockReturnValue({
      company: {
        id: companyId,
      },
      canEditCompanyRelationships: true,
    });
  });

  describe('dismissing the recommendation', () => {
    it('should remove the card once the dismiss button has been clicked', async () => {
      const { findByTestId } = setup(
        { id: recommendationId, recommendedCompanyId },
        [
          updateCompanyRelationshipRecommendationMock({
            id: recommendedCompanyId,
            status: CompanyRelationshipRecommendationStatus.DECLINED,
          }),
        ]
      );

      const dismissSelector = `${selectors.cardDismissButton}-${recommendationId}`;

      const dismissButton = await findByTestId(dismissSelector);

      expect(dismissButton).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(dismissButton);
      });

      await waitFor(() => {
        expect(dismissButton).not.toBeInTheDocument();
      });
    });
  });

  describe('when the recommended company is already on the platform', () => {
    it('should render "invite to connect" on the card button', async () => {
      const { findByText } = setup({ recommendedCompanyId });

      expect(
        await findByText(
          networkSettingsNamespace['quick-connect-invite-to-connect']
        )
      ).toBeInTheDocument();
    });

    it('should display "Invitation sent" once the company has been connected with', async () => {
      const { findByText } = setup(
        {
          recommendedCompanyId,
          relationshipType: CompanyRelationshipType.CUSTOMER,
        },
        [
          createCompanyRelationshipMock({
            customerId: recommendedCompanyId,
            supplierId: companyId,
            inviteType: CompanyRelationshipType.CUSTOMER,
            note:
              'Hi, please accept this invitation to the example Supplier Energy Transition Hub.',
          }),
        ]
      );

      const connectButton = await findByText(
        networkSettingsNamespace['quick-connect-invite-to-connect']
      );

      expect(connectButton).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(connectButton);
      });

      await waitFor(async () => {
        expect(
          await findByText(
            networkSettingsNamespace['quick-connect-invite-sent']
          )
        ).toBeInTheDocument();
      });
    });

    describe('when the company has been connected with', () => {
      it('should dismiss the card without making a request when clicking the dismiss button', async () => {
        const { findByText, findByTestId } = setup(
          {
            id: recommendationId,
            recommendedCompanyId,
            relationshipType: CompanyRelationshipType.CUSTOMER,
          },
          [
            createCompanyRelationshipMock({
              customerId: recommendedCompanyId,
              supplierId: companyId,
              inviteType: CompanyRelationshipType.CUSTOMER,
              note:
                'Hi, please accept this invitation to the example Supplier Energy Transition Hub.',
            }),
          ]
        );

        const connectButton = await findByText(
          networkSettingsNamespace['quick-connect-invite-to-connect']
        );

        expect(connectButton).toBeInTheDocument();

        await act(async () => {
          fireEvent.click(connectButton);
        });

        await waitFor(async () => {
          expect(
            await findByText(
              networkSettingsNamespace['quick-connect-invite-sent']
            )
          ).toBeInTheDocument();
        });

        const dismissSelector = `${selectors.cardDismissButton}-${recommendationId}`;
        const dismissButton = await findByTestId(dismissSelector);

        expect(dismissButton).toBeInTheDocument();

        await act(async () => {
          fireEvent.click(dismissButton);
        });

        await waitFor(() => {
          expect(dismissButton).not.toBeInTheDocument();
        });
      });
    });
  });

  describe('when the recommended company is not on the platform', () => {
    it('should render "invite to join" on the card button', async () => {
      const { findByText } = setup({ recommendedCompanyId: undefined });

      expect(
        await findByText(
          networkSettingsNamespace['quick-connect-invite-to-join']
        )
      ).toBeInTheDocument();
    });
  });
});
