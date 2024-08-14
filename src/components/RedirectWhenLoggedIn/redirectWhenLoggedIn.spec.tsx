import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import redirect from 'utils/redirect';
import { redirectWhenLoggedIn } from '.';

jest.mock('utils/redirect');
jest.mock('nookies');

describe('redirectWhenLoggedIn', () => {
  const Component = () => <div>I am private</div>;
  const RedirectWrappedComponent = redirectWhenLoggedIn(
    Component,
    '/dashboard'
  );

  describe('when the user is authenticated', () => {
    it('should redirect the user to the specified redirect path', async () => {
      (parseCookies as jest.Mock).mockImplementationOnce(() => ({
        auth_token: 'sometoken',
        refresh_token: 'somerefreshtoken',
        token_issuer: 'example',
      }));

      await RedirectWrappedComponent.getInitialProps(({
        req: {},
        res: {},
      } as unknown) as NextPageContext);

      expect(redirect).toHaveBeenCalledTimes(1);
      expect(redirect).toHaveBeenCalledWith('/dashboard', { res: {} });
    });
  });

  describe('when the user is unauthenticated', () => {
    it('should not call redirect when the user is authenticated', async () => {
      (parseCookies as jest.Mock).mockImplementationOnce(() => ({
        auth_token: null,
        refresh_token: null,
        token_issuer: null,
      }));

      await RedirectWrappedComponent.getInitialProps(({
        req: {},
        res: {},
      } as unknown) as NextPageContext);

      expect(redirect).toHaveBeenCalledTimes(0);
    });
  });
});
