import * as Sentry from '@sentry/browser';

export const { Severity } = Sentry;

type SentryEventData = {
  [key: string]: any;
};

const withSentryEventData = (
  userId: string | undefined,
  eventData: SentryEventData | undefined,
  callback: (scope: Sentry.Scope) => void
) => {
  Sentry.withScope((scope) => {
    if (typeof userId !== 'undefined') {
      scope.setUser({ id: userId });
    }
    if (typeof eventData !== 'undefined') {
      scope.setExtras(eventData);
    }
    callback(scope);
  });
};

export const captureException = (
  error: Error,
  options: {
    userId?: string;
    eventData?: SentryEventData;
  } = {}
) => {
  withSentryEventData(options.userId, options.eventData, () => {
    Sentry.captureException(error);
  });
};

export const captureMessage = (
  message: string,
  options: {
    level?: Sentry.Severity;
    userId?: string;
    eventData?: SentryEventData;
  } = {}
) => {
  withSentryEventData(options.userId, options.eventData, () => {
    Sentry.captureMessage(message, options.level || Sentry.Severity.Info);
  });
};
