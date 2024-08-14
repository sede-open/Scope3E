import { useFlags } from 'launchdarkly-react-client-sdk';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';

export const PageHead = () => {
  const { t } = useTranslation();
  const { demoLogo } = useFlags();

  return (
    <Head>
      <title>
        {t(demoLogo ? 'common:seth-title-qatar' : 'common:seth-title')}
      </title>
      <link rel="icon" href="/example-logo.svg" />

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="app" />
      <meta
        property="og:image"
        content="/images/PublicSite/linkedin.jpg"
        key="image"
      />
      <meta property="og:title" content={t('common:seth-title')} key="title" />
      <meta
        property="og:description"
        content={t('common:seth-description')}
        key="description"
      />
      <meta property="og:url" content={t('common:seth-url')} key="url" />
    </Head>
  );
};
