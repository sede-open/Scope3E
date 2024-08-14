import { ReactNode, useCallback, useEffect, useState } from 'react';
import CogSpinner from 'components/CogSpinner';
import { TribeJWTContext } from './TribeJWTContext';

interface IProps {
  children: ReactNode;
}

export const TribeJWTProvider = ({ children }: IProps) => {
  const tribeCommunityDomain =
    'https://supplierenergytransitionhub.tribeplatform.com';
  const tribeSsoEndpoint = '/api/auth/sso';

  const [token, setToken] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const getToken = async () => {
      const res = await fetch('/api/tribe/jwt', {
        method: 'GET',
      });

      if (!res.ok) {
        setError(
          'We are currently experiencing some issues connecting to our community platform. Please check back later.'
        );
        return;
      }

      const { token: tokenResponse } = await res.json();
      setToken(tokenResponse);
    };

    getToken();
  }, []);

  const wrapTribeLinkWithSSO = useCallback(
    (path: string) => {
      if (!token) {
        return '';
      }
      const searchParams = new URLSearchParams({
        jwt: token,
        redirect_uri: path,
      }).toString();

      return `${tribeCommunityDomain}${tribeSsoEndpoint}?${searchParams}`;
    },
    [token]
  );

  if (!error && !token) {
    return <CogSpinner />;
  }

  return (
    <TribeJWTContext.Provider
      value={{
        token,
        wrapTribeLinkWithSSO,
        error,
      }}
    >
      {children}
    </TribeJWTContext.Provider>
  );
};
