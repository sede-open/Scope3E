/* eslint-disable no-console */
import * as Sentry from '@sentry/node';

import next from './next';
import { startServer } from './server';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.ENVIRONMENT,
  release: `abcd-web@${process.env.VERSION}`,
});

export default next
  .prepare()
  .then(() => startServer())
  .catch((e) => {
    console.error(e);
    Sentry.captureException(e);
    process.exit(1);
  });
