import * as Sentry from '@sentry/node';
import cookieParser from 'cookie-parser';
import express, { ErrorRequestHandler, RequestHandler } from 'express';
import helmet from 'helmet';
import errorHandler from './error';
import authMiddleware from './middleware/authMiddleware';
import app from './next';
import proxy from './proxy';
import { fetchAndSetTribeCookie, getTribeCookieOrContinue } from './utils/auth';

const handle = app.getRequestHandler();

const createServer = () => {
  // Configure the Express server
  const server = express();

  // Configure middleware
  server.disable('x-powered-by');
  server.use(helmet());
  helmet.hsts({
    maxAge: 123456,
    includeSubDomains: false,
  });
  server.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: [
          "'self'",
        ],
        scriptSrc: [
          "'self'",
          "'unsafe-eval'",
        ],
        imgSrc: [
          "'self' data:",
          'https://track-eu1.hubspot.com',
          'https://forms-eu1.hsforms.com',
        ],
        mediaSrc: ["'self'", 'https://abcdprodst.blob.core.windows.net'],
        styleSrc: ["'self'", "'unsafe-inline'"],
        frameSrc: ["'self'", 'https://www.youtube-nocookie.com'],
      },
    })
  );
  server.use(Sentry.Handlers.requestHandler() as RequestHandler);
  server.use(cookieParser() as RequestHandler);
  server.use(express.static('public', { maxAge: '365d' }));
  server.use(authMiddleware);

  // GraphQL proxy
  server.post('/api/graphql', proxy());
  server.post('/api/files/emission-verification', proxy());
  server.post('/api/public/contact-email', proxy());
  server.get('/api/public/verify-invite', proxy());
  server.get(
    '/api/tribe/jwt',
    getTribeCookieOrContinue,
    proxy({
      userResDecorator: fetchAndSetTribeCookie,
    })
  );
  server.get('/api/public/ld-hash', proxy());

  // Expresss error handling
  server.use(Sentry.Handlers.errorHandler() as ErrorRequestHandler);
  server.use(errorHandler);

  // Default Next.js routing and built in error-handling
  server.all('*', (req, res) => handle(req, res));
  return server;
};

const port = process.env.PORT || 3000;

export const startServer = () =>
  createServer()
    .listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    })
    .on('error', (err) => {
      throw err;
    });
