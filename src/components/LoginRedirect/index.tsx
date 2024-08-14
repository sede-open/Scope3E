import { isString } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  setSessionSolutionStories,
  solutionStoryMappings,
} from 'utils/solutionStory';
import { REDIRECT_SESSION_KEY } from '../../constants';

export const LoginRedirect = () => {
  const { query, replace } = useRouter();

  useEffect(() => {
    if (query.from === 'sso-callback') {
      // This has been redirected from SSO after a successful login.
      setSessionSolutionStories(solutionStoryMappings());
    }

    if (isString(query.to)) {
      sessionStorage.setItem(REDIRECT_SESSION_KEY, query.to);
      const route = query.to.startsWith('/admin-dashboard')
        ? '/auth/example'
        : '/login';

      replace(route);
    } else {
      const route = sessionStorage.getItem(REDIRECT_SESSION_KEY);
      if (route) {
        sessionStorage.removeItem(REDIRECT_SESSION_KEY);

        replace(route);
      } else {
        replace('/dashboard');
      }
    }
  }, []);

  return null;
};
