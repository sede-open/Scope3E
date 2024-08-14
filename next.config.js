require('dotenv').config();
const nextTranslate = require('next-translate');

const env = process.env.NODE_ENV;
let removeConsole = null;
const prodLogs = ['error', 'warn'];
const devLogs = ['info', 'log', 'trace', ...prodLogs];
if (env === 'production') {
  removeConsole = {
    exclude: prodLogs,
  };
}
if (env === 'development') {
  removeConsole = {
    exclude: devLogs,
  };
}

module.exports = nextTranslate({
  distDir: '../build/.next',
  poweredByHeader: false,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@sentry/node': isServer ? '@sentry/node' : '@sentry/browser',
      },
    },
  }),
  productionBrowserSourceMaps: process.env.ENVIRONMENT === 'preprod',
  swcMinify: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_LAUNCH_DARKLY_CLIENT_SDK_KEY:
      process.env.NEXT_PUBLIC_LAUNCH_DARKLY_CLIENT_SDK_KEY,
    NEXT_PUBLIC_SEGMENT_KEY: process.env.NEXT_PUBLIC_SEGMENT_KEY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    ENVIRONMENT: process.env.ENVIRONMENT || 'local',
    NODE_ENV: process.env.NODE_ENV,
    VERSION: process.env.VERSION || 'local',
  },
  compiler: {
    styledComponents: true,
    removeConsole,
  },
});
