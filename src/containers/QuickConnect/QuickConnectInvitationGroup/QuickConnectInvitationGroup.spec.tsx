import { mocked } from 'jest-mock';
import I18nProvider from 'next-translate/I18nProvider';
import { render } from '@testing-library/react';
import {
  CompanyRelationshipRecommendationStatus,
  CompanyRelationshipType,
} from 'types/globalTypes';
import networkSettingsNamespace from '../../../../locales/en/networkSettings.json';
import { QuickConnectCard } from '../QuickConnectCard';
import { InviteNewCompanyCard } from '../InviteNewCompanyCard';
import * as selectors from '../selectors';
import { QuickConnectInvitationGroup, IProps } from '.';

jest.mock('../QuickConnectCard');
jest.mock('../InviteNewCompanyCard');

const mockedQuickConnectCard = mocked(QuickConnectCard);
const mockedInviteNewCompanyCard = mocked(InviteNewCompanyCard);

mockedQuickConnectCard.mockImplementation(() => {
  return <div>quick connect card</div>;
});

mockedInviteNewCompanyCard.mockImplementation(() => {
  return <div>invite new company card</div>;
});

describe('QuickConnectInvitationGroup', () => {
  const recommendationBase = {
    id: 'xxxx',
    duns: '1233456',
    recommendationStatus:
      CompanyRelationshipRecommendationStatus.UNACKNOWLEDGED,
    name: 'Some Company',
    companyId: undefined,
    region: 'London',
    country: 'UK',
    sector: 'Agriculture',
  };

  const setup = (props: Partial<IProps>) => {
    return render(
      <I18nProvider
        namespaces={{
          networkSettings: networkSettingsNamespace,
        }}
      >
        <QuickConnectInvitationGroup
          {...{
            recommendations: [],
            setRecommendations: jest.fn(),
            numRecommendationsToDisplay: 2,
            relationshipType: CompanyRelationshipType.CUSTOMER,
            displayInviteNewCompanyCard: true,
            ...props,
          }}
        />
      </I18nProvider>
    );
  };
  describe('when the displayInviteCard option is enabled', () => {
    it('should display the max number of recommendations plus the invite card', async () => {
      const { findByTestId } = setup({
        recommendations: [
          {
            ...recommendationBase,
            id: '1',
            relationshipType: CompanyRelationshipType.CUSTOMER,
          },
          {
            ...recommendationBase,
            id: '2',
            relationshipType: CompanyRelationshipType.CUSTOMER,
          },
          {
            ...recommendationBase,
            id: '3',
            relationshipType: CompanyRelationshipType.CUSTOMER,
          },
          {
            ...recommendationBase,
            id: '4',
            relationshipType: CompanyRelationshipType.CUSTOMER,
          },
          {
            ...recommendationBase,
            id: '5',
            relationshipType: CompanyRelationshipType.CUSTOMER,
          },
        ],
        numRecommendationsToDisplay: 2,
        displayInviteNewCompanyCard: true,
      });

      const container = await findByTestId(
        `${selectors.quickConnectCardContainer}-${CompanyRelationshipType.CUSTOMER}`
      );

      expect(container.childNodes).toHaveLength(3);

      expect(mockedQuickConnectCard).toHaveBeenCalledTimes(2);
      expect(mockedInviteNewCompanyCard).toHaveBeenCalledTimes(1);
    });
  });
});
