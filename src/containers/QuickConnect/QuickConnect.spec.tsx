import { render, waitFor } from '@testing-library/react';
import { mocked } from 'jest-mock';
import I18nProvider from 'next-translate/I18nProvider';

import {
  CompanyRelationshipRecommendationStatus,
  CompanyRelationshipType,
} from 'types/globalTypes';
import { CompanyRelationshipRecommendationsQuery_companyRelationshipRecommendations as CompanyRelationshipRecommendation } from 'types/CompanyRelationshipRecommendationsQuery';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { shuffle } from 'utils/shuffle';
import { IProps as QuickConnectInvitationGroupProps } from './QuickConnectInvitationGroup';
import networkSettingsNamespace from '../../../locales/en/networkSettings.json';
import { useCompanyRelationshipRecommendationsQuery } from './queries';
import { QuickConnect, IProps as QuickConnectProps } from '.';
import { QuickConnectContentType } from './types';

const mockedQuickConnectInvitationGroup = jest.fn();

jest.mock('effects/useAuthenticatedUser');
jest.mock('utils/shuffle');
jest.mock('./QuickConnectInvitationGroup', () => ({
  QuickConnectInvitationGroup: (props: QuickConnectInvitationGroupProps) => {
    mockedQuickConnectInvitationGroup(props);
    return <div>quick connect invitation group</div>;
  },
}));
jest.mock('./queries');

const mockedRecommendationsQuery = mocked(
  useCompanyRelationshipRecommendationsQuery
);

describe('QuickConnect', () => {
  const recommendationBase = {
    id: 'xxxx',
    duns: '1233456',
    recommendationStatus:
      CompanyRelationshipRecommendationStatus.UNACKNOWLEDGED,
    name: 'Some Company',
    companyId: undefined,
  };

  const setup = (
    props: Partial<QuickConnectProps> & {
      contentType: QuickConnectProps['contentType'];
    }
  ) => {
    return render(
      <I18nProvider
        namespaces={{
          networkSettings: networkSettingsNamespace,
        }}
      >
        <QuickConnect {...props} />
      </I18nProvider>
    );
  };

  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockReturnValue({
      company: {
        id: '1',
      },
    });
    (shuffle as jest.Mock).mockImplementation((arr: any[]) => arr);
  });

  afterEach(() => {
    mockedRecommendationsQuery.mockReset();
    mockedQuickConnectInvitationGroup.mockReset();
    (shuffle as jest.Mock).mockReset();
  });

  describe(`when the content type is ${QuickConnectContentType.ANY}`, () => {
    describe('when there are customer + supplier recommendations', () => {
      beforeEach(() => {
        mockedRecommendationsQuery.mockReturnValue({
          data: {
            companyRelationshipRecommendations: [
              {
                ...recommendationBase,
                relationshipType: CompanyRelationshipType.SUPPLIER,
              },
              {
                ...recommendationBase,
                relationshipType: CompanyRelationshipType.CUSTOMER,
              },
            ] as CompanyRelationshipRecommendation[],
          },
          loading: false,
        } as any);
      });

      it('should shuffle customer and supplier recommendations after load', async () => {
        setup({ contentType: QuickConnectContentType.ANY });

        expect(shuffle).toHaveBeenCalledTimes(2);
        expect(shuffle).toHaveBeenNthCalledWith(1, [
          {
            ...recommendationBase,
            relationshipType: CompanyRelationshipType.SUPPLIER,
          },
        ]);
        expect(shuffle).toHaveBeenNthCalledWith(2, [
          {
            ...recommendationBase,
            relationshipType: CompanyRelationshipType.CUSTOMER,
          },
        ]);
      });

      it('should create an invitation group for suppliers', async () => {
        setup({
          contentType: QuickConnectContentType.ANY,
        });

        await waitFor(() => {
          expect(mockedQuickConnectInvitationGroup).toHaveBeenNthCalledWith(1, {
            relationshipType: CompanyRelationshipType.SUPPLIER,
            displayInviteNewCompanyCard: false,
            numRecommendationsToDisplay: 3,
            recommendations: [
              {
                ...recommendationBase,
                relationshipType: CompanyRelationshipType.SUPPLIER,
              },
            ],
            setRecommendations: expect.anything(),
          });
        });
      });

      it('should create an invitation group for customers', async () => {
        setup({
          contentType: QuickConnectContentType.ANY,
        });

        await waitFor(() => {
          expect(mockedQuickConnectInvitationGroup).toHaveBeenNthCalledWith(2, {
            relationshipType: CompanyRelationshipType.CUSTOMER,
            displayInviteNewCompanyCard: false,
            numRecommendationsToDisplay: 3,
            recommendations: [
              {
                ...recommendationBase,
                relationshipType: CompanyRelationshipType.CUSTOMER,
              },
            ],
            setRecommendations: expect.anything(),
          });
        });
      });
    });

    describe('when there are no recommendations', () => {
      beforeEach(() => {
        mockedRecommendationsQuery.mockReturnValue({
          data: {
            companyRelationshipRecommendations: [] as CompanyRelationshipRecommendation[],
          },
          loading: false,
        } as any);
      });

      it('should not render the component', () => {
        const { container } = setup({
          contentType: QuickConnectContentType.ANY,
        });

        expect(container.firstChild).toBeNull();
      });
    });

    describe('when there are only customer recommendations', () => {
      beforeEach(() => {
        mockedRecommendationsQuery.mockReturnValue({
          data: {
            companyRelationshipRecommendations: [
              {
                ...recommendationBase,
                relationshipType: CompanyRelationshipType.CUSTOMER,
              },
            ] as CompanyRelationshipRecommendation[],
          },
          loading: false,
        } as any);
      });

      it('should not render the suppliers invitation group', async () => {
        setup({
          contentType: QuickConnectContentType.ANY,
        });

        await waitFor(() => {
          expect(mockedQuickConnectInvitationGroup).toHaveBeenCalledTimes(1);
          expect(mockedQuickConnectInvitationGroup).toHaveBeenCalledWith(
            expect.objectContaining({
              relationshipType: CompanyRelationshipType.CUSTOMER,
            })
          );
        });
      });
    });

    describe('when there are only supplier recommendations', () => {
      beforeEach(() => {
        mockedRecommendationsQuery.mockReturnValue({
          data: {
            companyRelationshipRecommendations: [
              {
                ...recommendationBase,
                relationshipType: CompanyRelationshipType.SUPPLIER,
              },
            ] as CompanyRelationshipRecommendation[],
          },
          loading: false,
        } as any);
      });

      it('should not render the customers invitation group', async () => {
        setup({
          contentType: QuickConnectContentType.ANY,
        });

        await waitFor(() => {
          expect(mockedQuickConnectInvitationGroup).toHaveBeenCalledTimes(1);
          expect(mockedQuickConnectInvitationGroup).toHaveBeenCalledWith(
            expect.objectContaining({
              relationshipType: CompanyRelationshipType.SUPPLIER,
            })
          );
        });
      });
    });
  });

  describe(`when the content type is ${QuickConnectContentType.CUSTOMER}`, () => {
    beforeEach(() => {
      mockedRecommendationsQuery.mockReturnValue({
        data: {
          companyRelationshipRecommendations: [
            {
              ...recommendationBase,
              relationshipType: CompanyRelationshipType.CUSTOMER,
            },
          ] as CompanyRelationshipRecommendation[],
        },
        loading: false,
      } as any);
    });

    it('should create an appropriate invitation group', async () => {
      setup({
        contentType: QuickConnectContentType.CUSTOMER,
      });

      await waitFor(() => {
        expect(mockedQuickConnectInvitationGroup).toHaveBeenCalledWith({
          relationshipType: CompanyRelationshipType.CUSTOMER,
          displayInviteNewCompanyCard: true,
          numRecommendationsToDisplay: 5,
          recommendations: [
            {
              ...recommendationBase,
              relationshipType: CompanyRelationshipType.CUSTOMER,
            },
          ],
          setRecommendations: expect.anything(),
        });
      });
    });
  });

  describe(`when the content type is ${QuickConnectContentType.SUPPLIER}`, () => {
    beforeEach(() => {
      mockedRecommendationsQuery.mockReturnValue({
        data: {
          companyRelationshipRecommendations: [
            {
              ...recommendationBase,
              relationshipType: CompanyRelationshipType.SUPPLIER,
            },
          ] as CompanyRelationshipRecommendation[],
        },
        loading: false,
      } as any);
    });

    it('should create an appropriate invitation group', async () => {
      setup({
        contentType: QuickConnectContentType.SUPPLIER,
      });

      await waitFor(() => {
        expect(mockedQuickConnectInvitationGroup).toHaveBeenCalledWith({
          relationshipType: CompanyRelationshipType.SUPPLIER,
          displayInviteNewCompanyCard: true,
          numRecommendationsToDisplay: 5,
          recommendations: [
            {
              ...recommendationBase,
              relationshipType: CompanyRelationshipType.SUPPLIER,
            },
          ],
          setRecommendations: expect.anything(),
        });
      });
    });
  });
});
