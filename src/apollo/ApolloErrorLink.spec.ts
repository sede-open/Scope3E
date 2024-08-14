import { ErrorResponse } from '@apollo/client/link/error';
import redirect from 'utils/redirect';
import { getApolloLink } from './ApolloErrorLink';

jest.mock('utils/redirect');

describe('handleApolloError()', () => {
  const handleApolloError = getApolloLink(false);
  it('should call redirect with /login when graphql error is UNAUTHENTICATED', () => {
    const mockErrResponse = ({
      graphQLErrors: [
        {
          extensions: {
            code: 'UNAUTHENTICATED',
          },
        },
      ],
    } as unknown) as ErrorResponse;
    handleApolloError(mockErrResponse);

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('should call redirect with /forbidden when graphql error is ACCESS_DENIED', () => {
    const mockErrResponse = ({
      graphQLErrors: [
        {
          extensions: {
            code: 'ACCESS_DENIED',
          },
        },
      ],
    } as unknown) as ErrorResponse;
    handleApolloError(mockErrResponse);

    expect(redirect).toHaveBeenCalledWith('/forbidden');
  });

  it('should call redirect with /forbidden when graphql error is FORBIDDEN', () => {
    const mockErrResponse = ({
      graphQLErrors: [
        {
          extensions: {
            code: 'FORBIDDEN',
          },
        },
      ],
    } as unknown) as ErrorResponse;
    handleApolloError(mockErrResponse);

    expect(redirect).toHaveBeenCalledWith('/forbidden');
  });

  it('should call redirect with /login when network error status code is 401', () => {
    const mockErrResponse = ({
      networkError: { statusCode: 401 },
    } as unknown) as ErrorResponse;
    handleApolloError(mockErrResponse);

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('should call redirect with /forbidden when network error status code is 401', () => {
    const mockErrResponse = ({
      networkError: { statusCode: 403 },
    } as unknown) as ErrorResponse;
    handleApolloError(mockErrResponse);

    expect(redirect).toHaveBeenCalledWith('/forbidden');
  });

  describe('when graphql error is USED_INVITE_TOKEN', () => {
    it('should call redirect with /used-invite-token ', () => {
      const mockErrResponse = ({
        graphQLErrors: [
          {
            extensions: {
              code: 'USED_INVITE_TOKEN',
            },
          },
        ],
      } as unknown) as ErrorResponse;
      handleApolloError(mockErrResponse);

      expect(redirect).toHaveBeenCalledWith('/used-invite-token');
    });
  });
});
