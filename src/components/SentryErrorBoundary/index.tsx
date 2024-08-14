import { Component, ReactNode } from 'react';

import { captureException } from 'utils/logging';

interface IProps {
  children: ReactNode;
}

class SentryErrorBoundary extends Component<IProps> {
  componentDidCatch(error: any, errorInfo: any) {
    captureException(error, {
      eventData: errorInfo,
    });
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default SentryErrorBoundary;
