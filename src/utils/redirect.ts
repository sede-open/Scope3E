import { ServerResponse } from 'http';
import Router from 'next/router';

type Options = {
  /**
   * The server-side res object. If present, it will be used to do a 302 redirect.
   */
  res?: ServerResponse;
  /**
   * When redirecting on the client, whether a full refresh should be carried out to invoke SSR.
   */
  forceSSR?: boolean;
};

export default function redirect(url: string, options?: Options) {
  // On the server
  if (options && options.res) {
    options.res.writeHead(302, { Location: url });
    options.res.end();
    return;
  }

  // On the client
  if (options && options.forceSSR) {
    // Do a full page refresh to force SSR to execute.
    window.location.assign(url);
  } else {
    Router.push(url);
  }
}
