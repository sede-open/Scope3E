import { Request, RequestHandler, Response } from 'express';
import expressProxy from 'express-http-proxy';

const proxy = (proxyOptions: expressProxy.ProxyOptions = {}): RequestHandler =>
  expressProxy(process.env.API_HOST ?? 'http://localhost:4000', {
    proxyReqOptDecorator: (options, req) => {
      const headers = options.headers || {};
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { cookie, ...rest } = headers;
      return {
        ...options,
        headers: {
          ...rest,
          // Token is applied to the request in the auth middleware
          Authorization: `Bearer ${(req as any).authToken}`,
          'X-Token-Issuer': (req as any).authTokenIssuer || '',
          'X-Access-Token': (req as any).accessToken || '',
        },
      };
    },
    // If the proxy fails (e.g. API is down), ensure that we return a 503 network error so that
    // Apollo client fails gracefully. Without this the proxy will return a HTML document causing
    // apollo queries to error incorrectly.
    proxyErrorHandler: (_, res) =>
      (res as Response).status(503).send({
        code: 503,
      }),
    proxyReqPathResolver: (req) => (req as Request).path.replace('api/', ''),
    limit: '25mb',
    ...proxyOptions,
  });

export default proxy;
