import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';
import { USER_COMPANY_ID } from 'mocks/constants';
import { tribeMocks } from 'mocks/tribe';
import I18nProvider from 'next-translate/I18nProvider';
import { Community } from '.';
import communityNamespace from '../../../locales/en/community.json';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');

const setup = (mocks: any[]) =>
  render(
    <I18nProvider
      namespaces={{
        community: communityNamespace,
      }}
    >
      <MockedProvider mocks={mocks} addTypename={false}>
        <Community />
      </MockedProvider>
    </I18nProvider>
  );

describe('Community', () => {
  beforeEach(() => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      firstName: 'Test',
      company: { id: USER_COMPANY_ID },
    }));
    resetLDMocks();
  });

  it('should render simple tribe hero banner when flag enabled', async () => {
    mockFlags({ isTribeSmartBannerEnabled: true });
    const { findByTestId } = setup([tribeMocks]);

    expect(await findByTestId(selectors.tribeBannerSmart)).toBeInTheDocument();
  });

  it('should render simple tribe hero banner when flag disabled', async () => {
    mockFlags({ isTribeSmartBannerEnabled: false });
    const { findByTestId } = setup([]);
    expect(await findByTestId(selectors.tribeBannerSimple)).toBeInTheDocument();
  });
});
