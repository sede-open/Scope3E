import I18nProvider from 'next-translate/I18nProvider';
import { render } from '@testing-library/react';
import redirect from 'utils/redirect';
import { useAuthenticatedUser } from 'effects/useAuthenticatedUser';
import loginNamespace from '../../../locales/en/login.json';
import publicNavigationNamespace from '../../../locales/en/publicNavigation.json';
import { Login } from '.';
import * as selectors from './selectors';

jest.mock('effects/useAuthenticatedUser');
jest.mock('utils/redirect');

describe('Login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render a login page when the user is not logged in', async () => {
    ((useAuthenticatedUser as unknown) as jest.Mock).mockImplementation(() => ({
      id: '',
    }));

    const { findByTestId } = render(
      <I18nProvider
        namespaces={{
          login: loginNamespace,
          publicNavigation: publicNavigationNamespace,
        }}
      >
        <Login />
      </I18nProvider>
    );

    expect(redirect).toHaveBeenCalledTimes(0);

    expect(
      await findByTestId(selectors.loginWithAkamaiButton)
    ).toHaveTextContent(publicNavigationNamespace['user-login-btn']);
    expect(await findByTestId(selectors.getInTouchLink)).toHaveTextContent(
      loginNamespace['contact-us']
    );
  });
});
