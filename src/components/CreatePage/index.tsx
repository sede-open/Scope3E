import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import { Component } from 'react';
import redirect from 'utils/redirect';

/**
 * Handles authorization / guards for private or public pages
 */
export function createPage(
  WrappedComponent: any,
  { publicPage }: { publicPage: boolean }
) {
  return class extends Component {
    static getInitialProps(ctx: NextPageContext) {
      if (publicPage) {
        return { publicPage };
      }
      const cookies = parseCookies(ctx);
      const isServer = Boolean(ctx.req);

      const isAuthenticated =
        Boolean(cookies.token_issuer) &&
        (Boolean(cookies.auth_token) || Boolean(cookies.refresh_token));

      if (isServer && !isAuthenticated) {
        redirect(`/redirect?to=${ctx.pathname}`, { res: ctx.res });
      }
      return { publicPage };
    }

    render() {
      return <WrappedComponent />;
    }
  };
}
