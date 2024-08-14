import { useQuery } from '@apollo/client';
import CogSpinner from 'components/CogSpinner';
import { GET_ME } from 'context/AuthenticatedUserProvider/AuthenticatedUserProvider';
import { LDUser } from 'launchdarkly-node-server-sdk';
import { LDProvider } from 'launchdarkly-react-client-sdk';
import getConfig from 'next/config';
import { ReactNode, useEffect, useState } from 'react';
import { GetMe } from 'types/GetMe';
import { globalUserKey } from 'utils/launchDarklyFlags';

export const LaunchDarklyProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading } = useQuery<GetMe>(GET_ME);
  const [loadingHash, setLoadingHash] = useState(false);
  const [globalHash, setGlobalHash] = useState('');

  const { publicRuntimeConfig } = getConfig();
  const clientSideID =
    publicRuntimeConfig.NEXT_PUBLIC_LAUNCH_DARKLY_CLIENT_SDK_KEY || '';

  const user: LDUser = data
    ? {
        key: data.me.email,
        name: `${data.me.firstName} ${data.me.lastName}`,
        email: data.me.email,
      }
    : {
        key: globalUserKey,
      };

  const getLDHash = async () => {
    try {
      setLoadingHash(true);
      const res = await fetch('/api/public/ld-hash');
      const { launchDarklyHash } = await res.json();
      setGlobalHash(launchDarklyHash);
    } catch (error) {
      console.error({ error });
    } finally {
      setLoadingHash(false);
    }
  };

  useEffect(() => {
    if (!loading && !data) {
      getLDHash();
    }
  }, [loading, data]);

  if (loading || loadingHash) {
    return <CogSpinner />;
  }

  const hash = data?.me.launchDarklyHash ?? globalHash;

  if (!hash) {
    return <CogSpinner />;
  }

  return (
    <LDProvider clientSideID={clientSideID} options={{ hash }} user={user}>
      {children}
    </LDProvider>
  );
};
