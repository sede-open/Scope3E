import { CookieOptions, Request, RequestHandler, Response } from 'express';
import expressProxy from 'express-http-proxy';
import { DecodedTribeJWT, TribeJWTResponse } from 'interfaces/Tribe';
import fetch from 'isomorphic-fetch';
import decode from 'jwt-decode';
import jwt from 'jsonwebtoken';

import { AuthProvider } from '../../types/globalTypes';
import * as date from '../../utils/date';
import { toQueryString } from '../../utils/url';
import { getSanitizedErrorMessage } from './errors';

interface CodeGrant {
  code: string;
}

interface RefreshGrant {
  refreshToken: string;
}

type Grant = CodeGrant | RefreshGrant;

interface TokenResponse {
  id: string;
  issuer: AuthProvider;
  refresh?: string;
  accessToken?: string;
  expiresIn?: number;
}

export const example_TOKEN_ERROR =
  'Could not retrieve example authentication tokens';
export const example_TOKEN_CALL_ERROR = "Couldn't connect to AUTHURL";

export function getAkamaiLoginUrl() {
  const params = toQueryString({
    client_id: process.env.AKAMAI_CLIENT_ID,
    redirect_uri: process.env.AKAMAI_LOGIN_CALLBACK_URL,
    response_type: 'code',
    scope: 'openid%20email',
    state: 'JunZ0z16Ac',
  });

  return `${process.env.AKAMAI_LOGIN_URL}${params}`;
}

export async function getAkamaiTokens(grant: Grant): Promise<TokenResponse> {
  const { code } = grant as CodeGrant;
  const { refreshToken } = grant as RefreshGrant;

  const params = toQueryString({
    client_id: process.env.AKAMAI_CLIENT_ID,
    grant_type: code ? 'authorization_code' : 'refresh_token',
    redirect_uri: process.env.AKAMAI_LOGIN_CALLBACK_URL,
    ...(code && { code }),
    ...(refreshToken && { refresh_token: refreshToken }),
  });

  const akamaiAuthBuff = Buffer.from(
    `${process.env.AKAMAI_CLIENT_ID}:${process.env.AKAMAI_SECRET}`
  );
  const akamaiSecretBase64 = akamaiAuthBuff.toString('base64');

  const response = await fetch(`${process.env.AKAMAI_TOKEN_API}${params}`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${akamaiSecretBase64}`,
    },
  });

  const { error_description: error, ...json } = await response.json();
  if (!response.ok || error) {
    throw new Error(
      `Bad response from token issuer (Akamai): ${error || 'unknown error'}`
    );
  }

  return {
    id: json.id_token as string,
    refresh: json.refresh_token as string,
    issuer: AuthProvider.AKAMAI,
    accessToken: json.access_token as string,
    expiresIn: json.expires_in as number,
  };
}

export async function getAUTHURLUrl() {
  const params = toQueryString({
    client_id: process.env.AUTHURL_CLIENT_ID,
    redirect_uri: process.env.AUTHURL_CALLBACK_URL,
    response_type: 'code',
    scope: 'openid profile',
  });

  return `${process.env.AUTHURL_LOGIN_API}${params}`;
}

export async function getexampleLoginUrl() {
  return getAUTHURLUrl();
}

export function getAkamaiLogoutUrl() {
  const params = toQueryString({
    client_id: process.env.AKAMAI_CLIENT_ID,
    post_logout_redirect_uri: process.env.AKAMAI_LOGOUT_CALLBACK_URL,
  });

  return `${process.env.AKAMAI_LOGOUT_API}${params}`;
}

export function getexampleLogoutUrl() {
  return '/';
}

export function getLogoutUrl({ tokenIssuer }: { tokenIssuer: AuthProvider }) {
  if (tokenIssuer === AuthProvider.PORT) {
    return getexampleLogoutUrl();
  }

  return getAkamaiLogoutUrl();
}

export async function getAUTHURLTokens(grant: Grant): Promise<TokenResponse> {
  const { code } = grant as CodeGrant;
  const { refreshToken } = grant as RefreshGrant;

  const payload = new URLSearchParams();

  payload.append('client_id', process.env.AUTHURL_CLIENT_ID ?? '');
  payload.append('code', code);
  payload.append('grant_type', code ? 'authorization_code' : 'refresh_token');
  payload.append('redirect_uri', process.env.AUTHURL_CALLBACK_URL ?? '');
  payload.append('refresh_token', refreshToken);

  try {
    const basicAuth = Buffer.from(
      `${process.env.AUTHURL_CLIENT_ID}:${process.env.AUTHURL_CLIENT_SECRET}`
    ).toString('base64');

    const tokenResponse = await fetch(`${process.env.AUTHURL_TOKEN_API}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: payload,
    });

    const json = await tokenResponse.json();

    if (!json?.access_token || !json?.refresh_token) {
      throw Error(example_TOKEN_ERROR);
    }

    return {
      id: json.access_token,
      refresh: json.refresh_token,
      issuer: AuthProvider.PORT,
    };
  } catch (err) {
    throw Error(example_TOKEN_CALL_ERROR);
  }
}

export async function getexampleTokens(grant: Grant): Promise<TokenResponse> {
  return getAUTHURLTokens(grant);
}

export async function getInviteToken(
  inviteToken: string
): Promise<TokenResponse> {
  const url = new URL(
    `${process.env.API_HOST}/public/verify-invite?jwt=${inviteToken}`
  );
  const response = await fetch(url.toString());
  const body = await response.json();

  if (!response.ok || body.isJWTValid !== true) {
    throw new Error(body.message ?? 'Invalid token');
  }

  return {
    id: inviteToken,
    issuer: AuthProvider.INVITE,
  };
}

export const setAuthCookies = ({
  id,
  issuer,
  refresh,
  accessToken,
  expiresIn,
}: TokenResponse) => (res: Response) => {
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // NOTE: Local environments do not use HTTPS
  };

  const { exp: epoch } = decode<{ exp: number }>(id);
  const authExpiryDate = new Date(epoch * 1000);
  const refreshExpiryDate = date.addDay(new Date());

  res.cookie('auth_token', id, {
    ...options,
    expires: authExpiryDate,
  });

  // NOTE :: an invite does not have a refresh token
  if (refresh) {
    res.cookie('refresh_token', refresh, {
      ...options,
      expires: refreshExpiryDate,
    });
  }

  // Retrieval of a refresh token is not possible without knowing who issued it in the first place.
  // The token_issuer cookie must always exist during the lifetime
  // of either the auth_token or refresh_token cookies.
  res.cookie('token_issuer', issuer, {
    ...options,
    expires: date.max(authExpiryDate, refreshExpiryDate),
  });

  // Access token is needed to authorise the user when connecting to Akamai API to update the user's details
  if (accessToken && expiresIn) {
    res.cookie('access_token', accessToken, {
      ...options,
      expires: date.addSeconds(expiresIn)(new Date()),
    });
  }
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie('token_issuer');
  res.clearCookie('auth_token');
  res.clearCookie('refresh_token');
  res.clearCookie('access_token');
  res.clearCookie('tribe_token');
};

export function getTokenFetcherByIssuer(issuer: AuthProvider) {
  if (issuer === AuthProvider.PORT) {
    return getexampleTokens;
  }
  if (issuer === AuthProvider.AKAMAI) {
    return getAkamaiTokens;
  }
  throw new Error('Unknown token issuer.');
}

export const removeNullCookies = (req: Request, res: Response) => {
  Object.keys(req.cookies).forEach((cookieName) => {
    if (req.cookies[cookieName] === 'null') {
      // Remove from domain and subdomains
      [process.env.COOKIE_DOMAIN, `.${process.env.COOKIE_DOMAIN}`].forEach(
        (domain) => {
          res.clearCookie(cookieName, {
            path: '/',
            domain,
          });
        }
      );
    }
  });
};

export const sanitizeError = getSanitizedErrorMessage([
  /token=[^&]+/,
  /client_id=[^&]+/,
  /refresh_token=[^&]+/,
]);

export const hasTokenExpired = (token: string) => {
  const { exp } = decode<{ exp: number }>(token);
  const expiryDate = exp * 1000;
  return new Date() > new Date(expiryDate);
};

export const fetchAndSetTribeCookie: expressProxy.ProxyOptions['userResDecorator'] = (
  _,
  proxyResData,
  __,
  userRes
) => {
  const options: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // NOTE: Local environments do not use HTTPS
  };
  const { token } = JSON.parse(
    proxyResData.toString('utf8')
  ) as TribeJWTResponse;

  const { exp: expiresAt } = jwt.decode(token) as DecodedTribeJWT;

  userRes.cookie('tribe_token', token, {
    ...options,
    expires: new Date(expiresAt * 1000),
  });
  return proxyResData;
};

export const getTribeCookieOrContinue: RequestHandler = (req, res, next) => {
  const { tribe_token: tribeToken } = req.cookies;

  if (!tribeToken) {
    return next();
  }

  const { exp: expiresAt } = jwt.decode(tribeToken) as DecodedTribeJWT;

  const now = new Date();
  const expiresAtDate = new Date(expiresAt * 1000);

  if (now > expiresAtDate) {
    return next();
  }

  return res.send({ token: tribeToken });
};
