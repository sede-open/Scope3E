import getConfig from 'next/config';
import { HUBSPOT_WHITELIST } from '../constants';
import { AnalyticsEventType } from './analyticsEvents';
import { isBrowser } from './browser';
import { isEnvironmentProd } from './featureFlags';
import { captureException } from './logging';

// Remove email property from the traits in order to track limited users
// and keep HubSpot environment clean
const sanitiseIdentifyTraits = (
  traits: { [key: string]: string | number | undefined } = {}
) => {
  const { publicRuntimeConfig } = getConfig();
  const isProd = isEnvironmentProd(publicRuntimeConfig.ENVIRONMENT ?? '');
  const isWhitelisted = HUBSPOT_WHITELIST.includes(traits.email as string);

  const traitsClone = { ...traits };

  if (traits.email && !isProd && !isWhitelisted) {
    // escape changes in HubSpot
    delete traitsClone.email;
  }

  return traitsClone;
};

export const trackUser = (
  userId: string,
  traits: { [key: string]: string | number | undefined } = {}
) => {
  if (!isBrowser()) {
    return;
  }
  try {
    const anonymousId = window.analytics.user().anonymousId();
    window.analytics.identify(userId, sanitiseIdentifyTraits(traits), {
      anonymousId,
    });
    // A 'page' or 'track' is required to be called after the 'identify' call by HubSpot
    window.analytics.page();
  } catch (e) {
    captureException(e, { userId });
  }
};

export const trackPage = (url: string) => {
  if (!isBrowser()) {
    return;
  }
  try {
    window.analytics.page(url);
  } catch (e) {
    captureException(e);
  }
};

export const trackEvent = (
  event: AnalyticsEventType,
  meta?: { [key: string]: string | number | undefined | null }
) => {
  if (!isBrowser()) {
    return;
  }
  try {
    window.analytics.track(event, meta);
  } catch (e) {
    captureException(e);
  }
};
