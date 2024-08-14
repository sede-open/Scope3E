import { render } from '@testing-library/react';
import * as nextRouter from 'next/router';
import { useTestRouter } from 'utils/useTestRouter';
import {
  getSessionSolutionStories,
  solutionStoryMappings,
} from 'utils/solutionStory';
import { REDIRECT_SESSION_KEY } from '../../constants';
import { LoginRedirect } from '.';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginRedirect', () => {
  describe('when there is "to" query string param, it keeps a record and redirects to auth', () => {
    it('sets an item in the sessionStorage and calls the example auth endpoint in case of admin routes', () => {
      const to = '/admin-dashboard/user';
      const replace = jest.fn();

      jest
        .spyOn(nextRouter, 'useRouter')
        .mockImplementationOnce(useTestRouter({ query: { to }, replace }));

      render(<LoginRedirect />);
      const sessionRedirectUrl = sessionStorage.getItem(REDIRECT_SESSION_KEY);
      expect(sessionRedirectUrl).toEqual(to);
      expect(replace).toBeCalledWith('/auth/example');
    });

    it('sets an item in the sessionStorage and calls the homepage in case of regular user routes', () => {
      const to = '/account-settings/customer';
      const replace = jest.fn();

      jest
        .spyOn(nextRouter, 'useRouter')
        .mockImplementationOnce(useTestRouter({ query: { to }, replace }));

      render(<LoginRedirect />);

      const sessionRedirectUrl = sessionStorage.getItem(REDIRECT_SESSION_KEY);
      expect(sessionRedirectUrl).toEqual(to);
      expect(replace).toBeCalledWith('/login');
    });
  });

  describe('when there is no "to" query string param, it reads the sessionStorage record and redirects', () => {
    it('reads the "redirect" value from sessionStorage and redirect to the value', () => {
      const route = '/example/route';

      const replace = jest.fn();

      jest
        .spyOn(nextRouter, 'useRouter')
        .mockImplementationOnce(useTestRouter({ query: {}, replace }));

      sessionStorage.setItem(REDIRECT_SESSION_KEY, route);
      render(<LoginRedirect />);
      expect(replace).toBeCalledWith(route);
    });

    it('redirects admin users to /admin-dashboard/users if no "redirect" value was found in sessionStorage', () => {
      const replace = jest.fn();

      jest
        .spyOn(nextRouter, 'useRouter')
        .mockImplementationOnce(
          useTestRouter({ query: { user: 'admin' }, replace })
        );

      render(<LoginRedirect />);

      expect(replace).toBeCalledWith('/dashboard');
    });

    it('redirects users to /dashboard if no "redirect" value was found in sessionStorage', () => {
      const replace = jest.fn();

      jest
        .spyOn(nextRouter, 'useRouter')
        .mockImplementationOnce(useTestRouter({ query: {}, replace }));

      render(<LoginRedirect />);

      expect(replace).toBeCalledWith('/dashboard');
    });
  });

  describe('when there is a "from" query string param, it sets the sessionStorage with solution stories', () => {
    it('should set session storage with story and solution mappings', () => {
      const replace = jest.fn();
      jest.spyOn(nextRouter, 'useRouter').mockImplementationOnce(
        useTestRouter({
          query: {
            from: 'sso-callback',
          },
          replace,
        })
      );
      render(<LoginRedirect />);
      const sessionStorySolutions = getSessionSolutionStories();
      expect(sessionStorySolutions).toEqual(solutionStoryMappings());
    });
  });
});
