/* eslint-disable no-underscore-dangle */
import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { useMemo } from 'react';
import { getApolloLink } from './ApolloErrorLink';

let apolloClient: any;

const createApolloClient = (publicPage?: boolean) => {
  const link = from([
    onError(getApolloLink(publicPage)),
    new HttpLink({
      uri: '/api/graphql',
      credentials: 'include',
    }),
  ]);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            corporateEmissions: {
              keyArgs: ['companyId'],
              merge: false,
            },
            corporateEmissionRanks: {
              merge: false,
            },
            target: {
              keyArgs: ['companyId'],
            },
            latestCorporateEmission: {
              keyArgs: ['companyId'],
            },
            baseline: {
              keyArgs: ['companyId'],
            },
            userSolutionInterests: {
              merge: false,
            },
            emissionAllocations: {
              merge: false,
            },
            companyRelationships: {
              merge: false,
            },
            companyDataPrivacyCompleteness: {
              merge: false,
            },
            sectors: {
              keyArgs: ['searchTerm'],
              merge(existing = [], incoming) {
                return [...existing, ...incoming];
              },
            },
            companies: {
              keyArgs: false,
              merge(existing = { data: [], total: 0 }, incoming) {
                return {
                  data: [...existing.data, ...incoming.data],
                  total: incoming.total,
                };
              },
            },
            users: {
              keyArgs: false,
              merge(existing = { data: [], total: 0 }, incoming) {
                return {
                  data: [...existing.data, ...incoming.data],
                  count: incoming.count,
                };
              },
            },
          },
        },
        Company: {
          fields: {
            companySectors: {
              merge(_, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
  });
};

export function initializeApollo(initialState = {}, publicPage?: boolean) {
  const _apolloClient = apolloClient ?? createApolloClient(publicPage);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (Object.keys(initialState).length !== 0) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(
  initialState: any,
  { publicPage }: { publicPage?: boolean }
) {
  const store = useMemo(() => initializeApollo(initialState, publicPage), [
    initialState,
    publicPage,
  ]);
  return store;
}
