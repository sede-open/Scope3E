import { Component } from 'react';
import { parseCookies } from 'nookies';
import { NextPageContext } from 'next';
import redirect from 'utils/redirect';

export function redirectWhenLoggedIn(WrappedComponent: any, path: string) {
  return class extends Component {
    static getInitialProps(ctx: NextPageContext) {
      const cookies = parseCookies(ctx);
      const isServer = Boolean(ctx.req);

      const isAuthenticated =
        Boolean(cookies.token_issuer) &&
        (Boolean(cookies.auth_token) || Boolean(cookies.refresh_token));

      if (isServer && isAuthenticated) {
        redirect(path, { res: ctx.res });
      }

      return {};
    }

    render() {
      return <WrappedComponent />;
    }
  };
}
