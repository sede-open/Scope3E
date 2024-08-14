import jwt from 'jsonwebtoken';
import decode from 'jwt-decode';
import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';
import { Request, Response, NextFunction } from 'express';

import { AuthProvider } from 'types/globalTypes';
import { Environments } from 'utils/featureFlags';

import * as dateHelpers from '../../utils/date';
import {
  getTokenFetcherByIssuer,
  getexampleTokens,
  getAkamaiTokens,
  getAkamaiLoginUrl,
  getexampleLoginUrl,
  clearAuthCookies,
  removeNullCookies,
  setAuthCookies,
  getLogoutUrl,
  getInviteToken,
  example_TOKEN_CALL_ERROR,
  getTribeCookieOrContinue,
  fetchAndSetTribeCookie,
} from './auth';
import { getSecondsInNumberOfDays } from '../../utils/date';

jest.mock('jwt-decode');
jest.mock('isomorphic-fetch');

const akamaiAuthBuff = Buffer.from('TEST_AKAMAI_CLIENT_ID:TEST_AKAMAI_SECRET');
const expectedAuthHeader = akamaiAuthBuff.toString('base64');
const anHourInSeconds = 3600;

const setupSetAuthCookies = (mockJwtDecode: any) => {
  jest.resetModules();

  jest.setMock('jwt-decode', () => mockJwtDecode);

  // eslint-disable-next-line global-require
  return require('./auth').setAuthCookies;
};

describe('getTokenFetcherByIssuer', () => {
  const { env } = process;

  afterEach(() => {
    jest.clearAllMocks();

    process.env = { ...env };
  });

  it('should return the Akamai token retrieval function when token issuer is AKAMAI', () => {
    expect(getTokenFetcherByIssuer(AuthProvider.AKAMAI)).toEqual(
      getAkamaiTokens
    );
  });

  it('should return the Port token retrieval function when token issuer is PORT', () => {
    expect(getTokenFetcherByIssuer(AuthProvider.PORT)).toEqual(getexampleTokens);
  });

  it('should throw when the supplied token issuer is not known', () => {
    expect(() => getTokenFetcherByIssuer('UNKNOWN_ISSUER' as any)).toThrow(
      'Unknown token issuer.'
    );
  });
});

describe('getAkamaiLoginUrl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct Akamai login URL', () => {
    expect(getAkamaiLoginUrl()).toEqual(
      // From __mocks__/next/config.js
      'http://some-akamai-url.com/login?client_id=TEST_AKAMAI_CLIENT_ID&redirect_uri=http://localhost:3000/some/callback&response_type=code&scope=openid%20email&state=JunZ0z16Ac'
    );
  });
});

describe(getexampleLoginUrl.name, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe.each`
    env
    ${Environments.LOCAL}
    ${Environments.DEV}
    ${Environments.STAGING}
    ${Environments.PREPROD}
    ${Environments.PROD}
  `(
    'when the app is running in $env environment',
    ({ env }: { env: Environments }) => {
      beforeAll(() => {
        ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
          publicRuntimeConfig: {
            ENVIRONMENT: env,
          },
        }));
      });

      it('should return AUTHURL login url', async () => {
        const actual = await getexampleLoginUrl();
        expect(actual).toContain(process.env.AUTHURL_LOGIN_API);
      });
    }
  );
});

describe('getAkamaiTokens', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should query the Akamai tokens API endpoint correctly for an id token by one time access code', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        id_token: 'SOME_ID_TOKEN',
        refresh_token: 'SOME_REFRESH_TOKEN',
      }),
      ok: true,
    });

    const tokens = await getAkamaiTokens({ code: 'SOME_ONE_TIME_ACCESS_CODE' });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'http://some-akamai-endpoint.com/token?client_id=TEST_AKAMAI_CLIENT_ID&grant_type=authorization_code&redirect_uri=http://localhost:3000/some/callback&code=SOME_ONE_TIME_ACCESS_CODE',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: `Basic ${expectedAuthHeader}`,
        }),
      })
    );
    expect(tokens).toEqual({
      id: 'SOME_ID_TOKEN',
      refresh: 'SOME_REFRESH_TOKEN',
      issuer: 'AKAMAI',
    });
  });

  it('should query the Akamai tokens API endpoint correctly for refresh tokens', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        id_token: 'SOME_NEW_ID_TOKEN',
        refresh_token: 'SOME_NEW_REFRESH_TOKEN',
      }),
      ok: true,
    });

    const tokens = await getAkamaiTokens({
      refreshToken: 'SOME_REFRESH_TOKEN',
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'http://some-akamai-endpoint.com/token?client_id=TEST_AKAMAI_CLIENT_ID&grant_type=refresh_token&redirect_uri=http://localhost:3000/some/callback&refresh_token=SOME_REFRESH_TOKEN',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: `Basic ${expectedAuthHeader}`,
        }),
      })
    );
    expect(tokens).toEqual({
      id: 'SOME_NEW_ID_TOKEN',
      refresh: 'SOME_NEW_REFRESH_TOKEN',
      issuer: 'AKAMAI',
    });
  });

  it('should throw when the id token request returns an error response', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        error_description: 'Some remote error occurred',
      }),
      ok: false,
    });

    expect(getAkamaiTokens({ code: 'SOME_ONE_TIME_CODE' })).rejects.toThrow(
      'Bad response from token issuer (Akamai): Some remote error occurred'
    );
  });

  it('should throw when the refresh token request returns an error response', async () => {
    ((fetch as unknown) as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        error_description: 'Some remote error occurred',
      }),
      ok: false,
    });

    expect(
      getAkamaiTokens({ refreshToken: 'SOME_REFRESH_TOKEN' })
    ).rejects.toThrow(
      'Bad response from token issuer (Akamai): Some remote error occurred'
    );
  });
});

describe(getexampleTokens.name, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe.each`
    env
    ${Environments.LOCAL}
    ${Environments.DEV}
    ${Environments.STAGING}
    ${Environments.PREPROD}
    ${Environments.PROD}
  `(
    'when the app is running in $env environment',
    ({ env }: { env: Environments }) => {
      const payload = {
        code: 'SOME_ONE_TIME_ACCESS_CODE',
        state: 'state',
      };

      const successReturnValue = {
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      };

      beforeAll(() => {
        ((getConfig as unknown) as jest.Mock).mockImplementation(() => ({
          publicRuntimeConfig: {
            ENVIRONMENT: env,
          },
        }));
      });

      it('should call AUTHURL endpoint with the correct body', async () => {
        ((fetch as unknown) as jest.Mock).mockResolvedValue({
          json: jest.fn().mockResolvedValue(successReturnValue),
          ok: true,
        });

        await getexampleTokens(payload);

        expect(fetch).toHaveBeenCalledWith(
          'https://authurl.com/as/token.oauth2',
          expect.any(Object)
        );

        const [[, { body }]] = (fetch as jest.Mock).mock.calls;

        expect(body.get('client_id')).toBe(process.env.AUTHURL_CLIENT_ID);
        expect(body.get('code')).toBe(payload.code);
        expect(body.get('grant_type')).toBe('authorization_code');
        expect(body.get('redirect_uri', process.env.AUTHURL_CALLBACK_URL ?? ''));
        expect(body.get('refresh_token')).toBe('undefined');
      });

      describe('on success', () => {
        it('should return encrypted id and refresh tokens', async () => {
          ((fetch as unknown) as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue(successReturnValue),
            ok: true,
          });

          const tokens = await getexampleTokens(payload);

          expect(tokens.issuer).toEqual('PORT');
          expect(tokens.id).toEqual(successReturnValue.access_token);
          expect(tokens.refresh).toBe(successReturnValue.refresh_token);
        });
      });

      describe('when AUTHURL responds without access_token', () => {
        it('should throw an error', async () => {
          ((fetch as unknown) as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue({
              refresh_token: successReturnValue.refresh_token,
            }),
            ok: true,
          });

          expect.assertions(1);

          try {
            await getexampleTokens(payload);
          } catch (err) {
            expect(err.message).toBe(example_TOKEN_CALL_ERROR);
          }
        });
      });

      describe('when AUTHURL responds without refresh_token', () => {
        it('should throw an error', async () => {
          ((fetch as unknown) as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue({
              access_token: successReturnValue.access_token,
            }),
            ok: true,
          });

          expect.assertions(1);

          try {
            await getexampleTokens(payload);
          } catch (err) {
            expect(err.message).toBe(example_TOKEN_CALL_ERROR);
          }
        });
      });

      describe('when AUTHURL responds with an error', () => {
        it('should throw an error', async () => {
          const authurlFetchErrorMessage = 'Oopsy';
          ((fetch as unknown) as jest.Mock).mockRejectedValue(
            new Error(authurlFetchErrorMessage)
          );

          expect.assertions(1);

          try {
            await getexampleTokens(payload);
          } catch (err) {
            expect(err.message).toBe(example_TOKEN_CALL_ERROR);
          }
        });
      });
    }
  );
});

describe('clearAuthCookies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete all auth related cookies', () => {
    const res = {
      clearCookie: jest.fn(),
    } as any;

    clearAuthCookies(res);

    expect(res.clearCookie).toHaveBeenCalledTimes(5);
    expect(res.clearCookie).toHaveBeenNthCalledWith(1, 'token_issuer');
    expect(res.clearCookie).toHaveBeenNthCalledWith(2, 'auth_token');
    expect(res.clearCookie).toHaveBeenNthCalledWith(3, 'refresh_token');
    expect(res.clearCookie).toHaveBeenNthCalledWith(4, 'access_token');
    expect(res.clearCookie).toHaveBeenNthCalledWith(5, 'tribe_token');
  });
});

describe('setAuthCookies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create cookies for auth_token, refresh_token, access_token and token_issuer with the correct values', () => {
    (decode as jest.Mock).mockReturnValue({
      exp: '1584542494',
    });

    const res = {
      clearCookie: jest.fn(),
      cookie: jest.fn(),
    } as any;

    const tokenResponse = {
      id: 'SOME_ID_TOKEN',
      issuer: AuthProvider.AKAMAI,
      refresh: 'SOME_REFRESH_TOKEN',
      accessToken: 'SOME_ACCESS_TOKEN',
      expiresIn: anHourInSeconds,
    };

    setAuthCookies(tokenResponse)(res);

    expect(res.cookie).toHaveBeenCalledTimes(4);
    expect(res.cookie).toHaveBeenNthCalledWith(
      1,
      'auth_token',
      'SOME_ID_TOKEN',
      expect.any(Object)
    );
    expect(res.cookie).toHaveBeenNthCalledWith(
      2,
      'refresh_token',
      'SOME_REFRESH_TOKEN',
      expect.any(Object)
    );
    expect(res.cookie).toHaveBeenNthCalledWith(
      3,
      'token_issuer',
      AuthProvider.AKAMAI,
      expect.any(Object)
    );
    expect(res.cookie).toHaveBeenNthCalledWith(
      4,
      'access_token',
      'SOME_ACCESS_TOKEN',
      expect.objectContaining({
        expires: expect.any(Date),
      })
    );
  });

  describe('In a production-like environment', () => {
    beforeEach(() => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
      });
    });

    it('should set all cookies securely', () => {
      const setAuthConfigWithMockedConfig = setupSetAuthCookies({
        exp: '1584542494',
      });

      const res = {
        clearCookie: jest.fn(),
        cookie: jest.fn(),
      } as any;

      const tokenResponse = {
        id: 'SOME_ID_TOKEN',
        issuer: AuthProvider.AKAMAI,
        refresh: 'SOME_REFRESH_TOKEN',
        accessToken: 'SOME_ACCESS_TOKEN',
        expiresIn: anHourInSeconds,
      };

      setAuthConfigWithMockedConfig(tokenResponse)(res);

      expect(res.cookie).toHaveBeenNthCalledWith(
        1,
        'auth_token',
        expect.anything(),
        expect.objectContaining({
          httpOnly: true,
          secure: true,
        })
      );
      expect(res.cookie).toHaveBeenNthCalledWith(
        2,
        'refresh_token',
        expect.anything(),
        expect.objectContaining({
          httpOnly: true,
          secure: true,
        })
      );
      expect(res.cookie).toHaveBeenNthCalledWith(
        3,
        'token_issuer',
        expect.anything(),
        expect.objectContaining({
          httpOnly: true,
          secure: true,
        })
      );
      expect(res.cookie).toHaveBeenNthCalledWith(
        4,
        'access_token',
        expect.anything(),
        expect.objectContaining({
          httpOnly: true,
          secure: true,
        })
      );
    });
  });

  describe('when NODE_ENV=development', () => {
    beforeEach(() => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
      });
    });

    it('should set cookies appropriately for local environments (as the app does not run over HTTPS locally)', () => {
      const exp = '1584542494';
      (decode as jest.Mock).mockReturnValue({ exp });

      const setAuthConfigWithMockedConfig = setupSetAuthCookies({ exp });

      const res = {
        clearCookie: jest.fn(),
        cookie: jest.fn(),
      } as any;

      const tokenResponse = {
        id: 'SOME_ID_TOKEN',
        issuer: AuthProvider.PORT,
        refresh: 'SOME_REFRESH_TOKEN',
        accessToken: 'ACCESS_TOKEN',
        expiresIn: anHourInSeconds,
      };

      setAuthConfigWithMockedConfig(tokenResponse)(res);

      expect(res.cookie).toHaveBeenNthCalledWith(
        1,
        'auth_token',
        expect.anything(),
        expect.objectContaining({
          httpOnly: true,
          secure: false,
        })
      );
      expect(res.cookie).toHaveBeenNthCalledWith(
        2,
        'refresh_token',
        expect.anything(),
        expect.objectContaining({
          httpOnly: true,
          secure: false,
        })
      );
      expect(res.cookie).toHaveBeenNthCalledWith(
        3,
        'token_issuer',
        expect.anything(),
        expect.objectContaining({
          httpOnly: true,
          secure: false,
        })
      );
      expect(res.cookie).toHaveBeenNthCalledWith(
        4,
        'access_token',
        expect.anything(),
        expect.objectContaining({
          httpOnly: true,
          secure: false,
        })
      );
    });
  });

  it('should set the auth_token cookie expiry to match the tokens decoded expiry date', () => {
    (decode as jest.Mock).mockReturnValue({
      exp: '1584542494',
    });

    const res = {
      clearCookie: jest.fn(),
      cookie: jest.fn(),
    } as any;

    const tokenResponse = {
      id: 'SOME_ID_TOKEN',
      issuer: AuthProvider.PORT,
      refresh: 'SOME_REFRESH_TOKEN',
    };

    setAuthCookies(tokenResponse)(res);

    expect(res.cookie).toHaveBeenNthCalledWith(
      1,
      'auth_token',
      'SOME_ID_TOKEN',
      expect.objectContaining({
        expires: new Date(1584542494000),
      })
    );
  });

  it('should set the refresh_token cookie expiry to be twenty four hours from creation', () => {
    jest.spyOn(dateHelpers, 'addDay').mockReturnValue(new Date(1584628894000));

    (decode as jest.Mock).mockReturnValue({
      exp: '1584542494',
    });

    const res = {
      clearCookie: jest.fn(),
      cookie: jest.fn(),
    } as any;

    const tokenResponse = {
      id: 'SOME_ID_TOKEN',
      issuer: AuthProvider.PORT,
      refresh: 'SOME_REFRESH_TOKEN',
    };

    setAuthCookies(tokenResponse)(res);

    expect(dateHelpers.addDay).toHaveBeenCalledTimes(1);
    expect(dateHelpers.addDay).toHaveBeenCalledWith(expect.any(Date));

    expect(res.cookie).toHaveBeenNthCalledWith(
      2,
      'refresh_token',
      'SOME_REFRESH_TOKEN',
      expect.objectContaining({
        expires: new Date(1584628894000),
      })
    );
  });

  it('should set the token_issuer cookie expiry to be twenty four hours from creation', () => {
    jest.spyOn(dateHelpers, 'addDay').mockReturnValue(new Date(1584628894000));

    (decode as jest.Mock).mockReturnValue({
      exp: '1584542494',
    });

    const res = {
      clearCookie: jest.fn(),
      cookie: jest.fn(),
    } as any;

    const tokenResponse = {
      id: 'SOME_ID_TOKEN',
      issuer: AuthProvider.PORT,
      refresh: 'SOME_REFRESH_TOKEN',
    };

    setAuthCookies(tokenResponse)(res);

    expect(dateHelpers.addDay).toHaveBeenCalledTimes(1);
    expect(dateHelpers.addDay).toHaveBeenCalledWith(expect.any(Date));

    expect(res.cookie).toHaveBeenNthCalledWith(
      3,
      'token_issuer',
      AuthProvider.PORT,
      expect.objectContaining({
        expires: new Date(1584628894000),
      })
    );
  });

  it('should ensure that the token_issuer does not expire before the auth_token and refresh_token. The maximum expiry date of either of the other cookies should be used.', () => {
    jest.spyOn(dateHelpers, 'addDay').mockReturnValue(new Date(1584628894000));

    (decode as jest.Mock).mockReturnValue({
      exp: '1636414433',
    });

    const res = {
      clearCookie: jest.fn(),
      cookie: jest.fn(),
    } as any;

    const tokenResponse = {
      id: 'SOME_ID_TOKEN',
      issuer: AuthProvider.PORT,
      refresh: 'SOME_REFRESH_TOKEN',
    };

    setAuthCookies(tokenResponse)(res);

    expect(dateHelpers.addDay).toHaveBeenCalledTimes(1);
    expect(dateHelpers.addDay).toHaveBeenCalledWith(expect.any(Date));

    expect(res.cookie).toHaveBeenNthCalledWith(
      3,
      'token_issuer',
      AuthProvider.PORT,
      expect.objectContaining({
        expires: new Date(1636414433000),
      })
    );
  });

  it('should set the expiry date of access_token depending on expiresIn argument', () => {
    const expiryDate = new Date(1584628894000);
    jest.spyOn(dateHelpers, 'addSeconds').mockReturnValue(() => expiryDate);

    (decode as jest.Mock).mockReturnValue({
      exp: '1636414433',
    });

    const res = {
      clearCookie: jest.fn(),
      cookie: jest.fn(),
    } as any;

    const tokenResponse = {
      id: 'SOME_ID_TOKEN',
      issuer: AuthProvider.PORT,
      refresh: 'SOME_REFRESH_TOKEN',
      accessToken: 'SOME_ACCESS_TOKEN',
      expiresIn: 3600,
    };

    setAuthCookies(tokenResponse)(res);

    expect(res.cookie).toHaveBeenNthCalledWith(
      4,
      'access_token',
      'SOME_ACCESS_TOKEN',
      expect.objectContaining({
        expires: expiryDate,
      })
    );
  });
});

describe('removeNullCookies', () => {
  const { env } = process;

  afterEach(() => {
    process.env = { ...env };
    jest.clearAllMocks();
  });

  it('should find and remove all cookies that have null values for all known surus domains', () => {
    process.env.COOKIE_DOMAIN = 'example.com';

    const req = {
      cookies: {
        a: 'null',
        b: 'not_null',
        c: '',
        d: 'true',
        e: 'false',
        f: 'null',
      },
    } as any;
    const res = {
      clearCookie: jest.fn(),
    } as any;

    removeNullCookies(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith('a', {
      domain: '.example.com',
      path: '/',
    });
    expect(res.clearCookie).toHaveBeenCalledWith('f', {
      domain: '.example.com',
      path: '/',
    });
  });
});

describe('getLogoutUrl()', () => {
  it('should get example/PORT logout url', () => {
    const result = getLogoutUrl({ tokenIssuer: AuthProvider.PORT });
    expect(result).toBe('/');
  });
  it('should get Akamai logout url', () => {
    const result = getLogoutUrl({ tokenIssuer: AuthProvider.AKAMAI });
    expect(result).toBe(
      'http://some-akamai-endpoint.com/endsession?client_id=TEST_AKAMAI_CLIENT_ID&post_logout_redirect_uri=http://localhost:3000'
    );
  });
});

describe('getInviteToken()', () => {
  process.env.API_HOST = 'http://localhost:4000';
  const inviteToken = 'INVITE_TOKEN';

  describe('when API verifies a valid token', () => {
    it('should return invite token and auth provider', async () => {
      ((fetch as unknown) as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          isJWTValid: true,
        }),
        ok: true,
      });

      const tokens = await getInviteToken(inviteToken);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.API_HOST}/public/verify-invite?jwt=${inviteToken}`
      );
      expect(tokens).toEqual({
        id: inviteToken,
        issuer: AuthProvider.INVITE,
      });
    });
  });

  describe('when API does not verifies the token', () => {
    it('should throw an error', async () => {
      expect.assertions(3);

      const errorMessage = 'Token has expired';
      ((fetch as unknown) as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          status: 401,
          message: errorMessage,
        }),
        ok: false,
      });

      try {
        await getInviteToken(inviteToken);
      } catch (err) {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
          `${process.env.API_HOST}/public/verify-invite?jwt=${inviteToken}`
        );
        expect(err.message).toBe(errorMessage);
      }
    });
  });
});

describe('fetchAndSetTribeCookie', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse = {
      json: jest.fn(),
      send: jest.fn(),
      cookie: jest.fn(),
    };
  });

  it('should decode the token and save as a response', async () => {
    const now = Math.round(new Date().getTime() / 1000);
    const token = jwt.sign(
      {
        sub: 'test@test.com',
        email: 'test@test.com',
        name: 'Tester',
        iat: now,
        exp: now + getSecondsInNumberOfDays(14),
      },
      'secret',
      { issuer: 'seth', algorithm: 'HS256' }
    );

    /* Setup a response buffer as if we had just received the proxied response data */
    const userResponseBuffer = Buffer.from(JSON.stringify({ token }));

    if (typeof fetchAndSetTribeCookie === 'function') {
      fetchAndSetTribeCookie(
        mockResponse as Response,
        userResponseBuffer,
        mockRequest as Request,
        mockResponse as Response
      );
    }

    expect(mockResponse.cookie).toHaveBeenCalledWith('tribe_token', token, {
      httpOnly: true,
      secure: false,
      expires: new Date((now + getSecondsInNumberOfDays(14)) * 1000),
    });
  });
});

describe('getTribeCookieOrContinue', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  it('should call next when the tribe_token is undefined', () => {
    mockRequest.cookies = { tribe_token: undefined };

    getTribeCookieOrContinue(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction as NextFunction
    );

    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it('should call next when the tribe_token is set but has expired', () => {
    const now = Math.round(new Date().getTime() / 1000);
    const token = jwt.sign(
      {
        sub: 'test@test.com',
        email: 'test@test.com',
        name: 'Tester',
        iat: now - getSecondsInNumberOfDays(15),
        exp: now - getSecondsInNumberOfDays(1),
      },
      'secret',
      { issuer: 'seth', algorithm: 'HS256' }
    );

    mockRequest.cookies = { tribe_token: token };

    getTribeCookieOrContinue(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction as NextFunction
    );

    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it('should return the token in the response if the token is valid', async () => {
    const now = Math.round(new Date().getTime() / 1000);
    const token = jwt.sign(
      {
        sub: 'test@test.com',
        email: 'test@test.com',
        name: 'Tester',
        iat: now,
        exp: now + getSecondsInNumberOfDays(14),
      },
      'secret',
      { issuer: 'seth', algorithm: 'HS256' }
    );

    mockRequest.cookies = { tribe_token: token };

    await getTribeCookieOrContinue(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction as NextFunction
    );

    expect(nextFunction).not.toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith({ token });
  });
});
