import { getRouteHandlerFunction } from 'utils/useTestRouter';
import router from './authMiddleware';

jest.mock('server/utils/auth', () => ({
  getAkamaiTokens: () => 'tokens',
  getexampleTokens: () => 'tokens',
  setAuthCookies: () => () => {},
  clearAuthCookies: () => {},
  sanitizeError: () => {},
}));

describe('Auth Middleware', () => {
  const redirect = jest.fn();
  const res = {
    clearCookie: jest.fn(),
    redirect,
  };

  beforeEach(() => {
    redirect.mockClear();
  });

  describe('/auth/akamai/callback', () => {
    it('should redirect with from query parameter', async () => {
      const req = {
        query: {
          code: 'test code',
        },
      };
      const next = jest.fn();
      const callback = getRouteHandlerFunction(
        '/auth/akamai/callback',
        'get',
        router
      );
      await callback(req, res, next);
      const redirectUrl = redirect.mock.calls[0][0];
      expect(redirectUrl).toContain('from=sso-callback');
    });
  });

  describe('/auth/example/callback', () => {
    it('should redirect with from query parameter', async () => {
      const req = {
        query: {
          code: 'test code',
        },
      };
      const next = jest.fn();
      const callback = getRouteHandlerFunction(
        '/auth/example/callback',
        'get',
        router
      );
      await callback(req, res, next);
      const redirectUrl = redirect.mock.calls[0][0];
      expect(redirectUrl).toContain('from=sso-callback');
    });
  });
});
