import * as Sentry from '@sentry/node';
import express, { Request, Response, NextFunction } from 'express';
import { AuthProvider } from '../../types/globalTypes';
import { AuthenticationError, HttpError } from '../utils/errors';
import {
  clearAuthCookies,
  getAkamaiLoginUrl,
  getAkamaiTokens,
  getTokenFetcherByIssuer,
  sanitizeError,
  setAuthCookies,
  getInviteToken,
  hasTokenExpired,
} from '../utils/auth';

const router = express.Router();

router.get('/auth/akamai', async (_, res) => {
  res.redirect(getAkamaiLoginUrl());
});

router.get('/auth/akamai/callback', async (req, res, next) => {
  const { code } = req.query;
  if (!code) {
    const error = new AuthenticationError(
      'Missing one time code, unable to exchange for Akamai tokens'
    );
    Sentry.captureException(error);
    next(error);
    return;
  }

  clearAuthCookies(res);

  try {
    const tokens = await getAkamaiTokens({ code: (code as unknown) as string });
    setAuthCookies(tokens)(res);
    res.redirect('/redirect?from=sso-callback');
  } catch (e) {
    const error = new AuthenticationError(
      `Unable to retrieve tokens from Akamai: ${sanitizeError(e)}`
    );
    Sentry.captureException(error);
    next(error);
  }
});


router.get('/auth/invite', async (req, res, next) => {
  const inviteToken = req.query.inviteToken as string;

  if (!inviteToken) {
    const error = new AuthenticationError('Missing invite token');
    Sentry.captureException(error);
    next(error);
  }

  if (hasTokenExpired(inviteToken)) {
    return res.redirect('/invite-expired');
  }

  try {
    const tokens = await getInviteToken(inviteToken as string);

    setAuthCookies(tokens)(res);
    return res.redirect('/handle-invitation');
  } catch (error) {
    return res.redirect('/forbidden');
  }
});

type exampleCallbackQueryType = {
  code?: string;
  state?: string;
};

router.use(
  ['/api/graphql', '/api/files/emission-verification', '/api/tribe/jwt'],
  async (req, res, next) => {
    const {
      token_issuer: tokenIssuer,
      auth_token: authToken,
      refresh_token: refreshToken,
      access_token: accessToken,
    } = req.cookies;

    // If the user does not have a token issuer, throw an error and let the app redirect.
    if (!tokenIssuer) {
      next(
        new AuthenticationError(
          'Missing token issuer, unable to refresh token.'
        )
      );
      return;
    }

    if (authToken) {
      if (tokenIssuer === AuthProvider.AKAMAI) {
        // Access token is required to be able to connect to AKAMAI API to update the user profile
        if (accessToken) {
          (req as any).authToken = authToken;
          (req as any).authTokenIssuer = tokenIssuer;
          (req as any).accessToken = accessToken;
          next();
          return;
        }
        // Else do nothing. it should continue the execution of the handler to get all the tokens
      } else {
        // used by proxy to set auth headers in api request
        (req as any).authToken = authToken;
        (req as any).authTokenIssuer = tokenIssuer;
        next();
        return;
      }
    }

    // If the user does not have a refresh token, throw an error and let the app redirect.
    if (!refreshToken) {
      next(
        new AuthenticationError(
          'Missing refresh token, unable to refresh auth token.'
        )
      );
      return;
    }

    // Otherwise, refresh the user's tokens.
    try {
      const getTokens = getTokenFetcherByIssuer(tokenIssuer);
      const tokens = await getTokens({ refreshToken });

      setAuthCookies(tokens)(res);

      // used by proxy to set auth headers in api request
      (req as any).authToken = tokens.id;
      (req as any).authTokenIssuer = tokens.issuer;
      (req as any).accessToken = tokens.accessToken;

      next();
      return;
    } catch (e) {
      const error = new AuthenticationError(
        `Unable to refresh tokens for ${tokenIssuer}: ${sanitizeError(e)}`
      );
      Sentry.captureException(error);
      next(error);
    }
  }
);

export default router;
