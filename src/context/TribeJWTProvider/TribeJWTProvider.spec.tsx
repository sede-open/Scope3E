import { render, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { TribeJWTContext } from './TribeJWTContext';
import { TribeJWTProvider } from './TribeJWTProvider';

describe('TribeJWTProvider', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should provide a util which can transform URLs into auth redirects', async () => {
    const token = 'MyJwtValue';
    const redirectPath = '/product-updates-xcqr4m2i';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token }),
        ok: true,
      })
    ) as jest.Mock;

    const dataTestId = 'tribe-link-container';

    await act(async () => {
      render(
        <TribeJWTProvider>
          <TribeJWTContext.Consumer>
            {({ wrapTribeLinkWithSSO }) => (
              <div data-testid={dataTestId}>
                {wrapTribeLinkWithSSO(redirectPath)}
              </div>
            )}
          </TribeJWTContext.Consumer>
        </TribeJWTProvider>
      );
    });

    const expectedSearchParams = new URLSearchParams({
      jwt: token,
      redirect_uri: redirectPath,
    }).toString();

    expect(global.fetch).toHaveBeenCalledWith('/api/tribe/jwt', {
      method: 'GET',
    });

    await waitFor(async () => {
      expect(await screen.queryByTestId(dataTestId)).toHaveTextContent(
        `https://supplierenergytransitionhub.tribeplatform.com/api/auth/sso?${expectedSearchParams}`
      );
    });
  });

  it('should return errors when the API response is not OK', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        ok: false,
      })
    ) as jest.Mock;

    const dataTestId = 'tribe-link-container';

    await act(async () => {
      render(
        <TribeJWTProvider>
          <TribeJWTContext.Consumer>
            {({ error }) => <div data-testid={dataTestId}>{error}</div>}
          </TribeJWTContext.Consumer>
        </TribeJWTProvider>
      );
    });

    await waitFor(async () => {
      expect(await screen.queryByTestId(dataTestId)).toHaveTextContent(
        'We are currently experiencing some issues connecting to our community platform. Please check back later.'
      );
    });
  });
});
