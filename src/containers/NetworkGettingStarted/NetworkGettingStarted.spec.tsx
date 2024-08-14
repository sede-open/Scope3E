import { render } from '@testing-library/react';
import 'jest-styled-components';
import I18nProvider from 'next-translate/I18nProvider';
import { NetworkGettingStartedContainer } from '.';
import networkGettingStarted from '../../../locales/en/networkGettingStarted.json';

describe('Network Getting Started', () => {
  it('should render a snapshot', () => {
    const { container } = render(
      <I18nProvider namespaces={{ networkGettingStarted }}>
        <NetworkGettingStartedContainer />
      </I18nProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
