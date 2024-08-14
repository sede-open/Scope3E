import { Router } from 'express';
import { NextRouter } from 'next/router';

export const useTestRouter = (overrides: Partial<NextRouter> = {}) => () => ({
  route: '/',
  pathname: '',
  basePath: '/',
  isLocaleDomain: true,
  asPath: '',
  push: jest.fn(),
  query: {},
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  prefetch: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  isFallback: false,
  isReady: true,
  isPreview: false,
  locale: 'en',
  ...overrides,
});

// Gets the route handler function for an express Route
export const getRouteHandlerFunction = (
  url: string,
  method: string,
  router: Router
) => {
  const routePath = router.stack.find((layer) => {
    if (Array.isArray(layer.route.path)) {
      return layer.route.path.find((path: string) => path === url);
    }
    return layer.route.path === url;
  });
  const res = routePath.route.stack.find(
    (layer: any) => layer.method === method
  );
  return res.handle;
};
