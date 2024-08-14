import { ErrorLink } from '@apollo/client/link/error';
import redirect from 'utils/redirect';

export const getApolloLink = (publicPage?: boolean) => {
  const handleApolloError: ErrorLink.ErrorHandler = ({
    graphQLErrors,
    networkError,
  }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ extensions }) => {
        switch (extensions?.code) {
          case 'UNAUTHENTICATED':
            if (!publicPage) {
              redirect('/login');
            }
            break;
          case 'USED_INVITE_TOKEN':
            redirect('/used-invite-token');
            break;
          case 'ACCESS_DENIED':
          case 'FORBIDDEN':
            redirect('/forbidden');
            break;
          default:
        }
      });
    }

    if (networkError) {
      if ((networkError as any).statusCode === 401) {
        if (!publicPage) {
          redirect('/login');
        }
      }
      if ((networkError as any).statusCode === 403) {
        redirect('/forbidden');
      }
    }
  };
  return handleApolloError;
};
