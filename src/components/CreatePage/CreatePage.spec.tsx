import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import redirect from 'utils/redirect';
import { createPage } from '.';

jest.mock('utils/redirect');
jest.mock('nookies');

describe('createPage', () => {
  it('should not call redirect if the user is logged in', async () => {
    (parseCookies as jest.Mock).mockImplementationOnce(() => ({
      token_id: 'sometoken',
      refresh_token: 'somerefreshtoken',
      token_issuer: 'example',
    }));

    const Component = () => <div>I am private</div>;
    const PrivateRoute = createPage(Component, { publicPage: false });

    await PrivateRoute.getInitialProps(({
      req: {},
    } as unknown) as NextPageContext);

    expect(redirect).toHaveBeenCalledTimes(0);
  });

  it('should call redirect function if the user is not authenticated', async () => {
    (parseCookies as jest.Mock).mockImplementationOnce(() => ({
      token_id: undefined,
      refresh_token: undefined,
      token_issuer: undefined,
    }));
    const Component = () => <div>I am private</div>;
    const PrivateRoute = createPage(Component, { publicPage: false });

    const pathname = '/example/route';
    await PrivateRoute.getInitialProps(({
      req: {},
      pathname,
    } as unknown) as NextPageContext);

    expect(redirect).toHaveBeenCalledTimes(1);
    expect(redirect).toHaveBeenCalledWith(
      `/redirect?to=${pathname}`,
      expect.any(Object)
    );
  });
});
