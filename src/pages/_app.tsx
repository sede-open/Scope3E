import { ApolloProvider } from '@apollo/client';
import * as Sentry from '@sentry/browser';
import { CookiesConsentManager } from 'components/CookiesConsentManager';
import { LaunchDarklyProvider } from 'components/LaunchDarklyProvider';
import SentryErrorBoundary from 'components/SentryErrorBoundary';
import { ToastContainer } from 'components/ToastContainer';
import type { AppContext, AppProps } from 'next/app';
import getConfig from 'next/config';
import { Router } from 'next/router';
import React from 'react';
import 'react-multi-carousel/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from 'styles/global-style';
import { trackPage } from 'utils/analytics';
import { useApollo } from '../apollo';

const { publicRuntimeConfig } = getConfig();

Router.events.on('routeChangeComplete', (url) => {
  trackPage(url);
});

if (publicRuntimeConfig.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: publicRuntimeConfig.NODE_ENV !== 'production',
    dsn: publicRuntimeConfig.NEXT_PUBLIC_SENTRY_DSN,
  });
}

const App = ({ Component, pageProps }: AppProps) => {
  // @ts-ignore
  const { initialApolloState, publicPage } = pageProps;
  // @ts-ignore
  const apolloClient = useApollo(initialApolloState, {
    publicPage,
  });

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyle />
      <LaunchDarklyProvider>
        <SentryErrorBoundary>
          <ToastContainer
            pauseOnHover
            autoClose={5000}
            draggable={false}
            closeButton
            closeOnClick={false}
            hideProgressBar
            limit={3}
            position="top-center"
          />
          <CookiesConsentManager />
          <Component {...pageProps} />
        </SentryErrorBoundary>
      </LaunchDarklyProvider>
    </ApolloProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }: AppContext) => ({
  pageProps: Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {},
});

export default App;
