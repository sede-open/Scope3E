import React from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import CogSpinner from 'components/CogSpinner';

export function withIsLaunchDarklyReady<T>(Component: any) {
  return function WrappedComponent(props: T) {
    const ldClient = useLDClient();

    if (!ldClient) {
      return <CogSpinner />;
    }

    return <Component {...props} />;
  };
}
