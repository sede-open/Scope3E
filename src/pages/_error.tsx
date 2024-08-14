import NextErrorComponent from 'next/error';
import { NextPageContext } from 'next';
import * as Sentry from '@sentry/node';
import get from 'lodash/fp/get';

const Error = async ({
  statusCode,
  hasGetInitialPropsRun,
  err,
}: {
  statusCode: number;
  hasGetInitialPropsRun: boolean;
  err: Error;
}) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
    // flush is needed after calling captureException to send server side errors to Sentry,
    // otherwise the serverless function will exit before it's sent
    await Sentry.flush(2000);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

Error.getInitialProps = ({ res, err }: NextPageContext) => ({
  statusCode: get('statusCode', res) || get('statusCode', err) || 404,
});

export default Error;
