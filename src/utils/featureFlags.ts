import getConfig from 'next/config';

export enum Environments {
  LOCAL = 'local',
  DEV = 'dev',
  STAGING = 'staging',
  // identical feature flags should be used for
  // both preprod and prod
  PREPROD = 'preprod',
  PROD = 'prod',
}

export const isEnvironmentLocal = (environment: string) =>
  environment === Environments.LOCAL;
export const isEnvironmentDevelopment = (environment: string) =>
  environment === Environments.DEV;
export const isEnvironmentStaging = (environment: string) =>
  environment === Environments.STAGING;
export const isEnvironmentPreprod = (environment: string) =>
  environment === Environments.PREPROD;
export const isEnvironmentProd = (environment: string) =>
  environment === Environments.PROD;

const isRankingTableSectorFilterEnabled = (environment: string) =>
  isEnvironmentLocal(environment);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isCommunityPageEnabled = (_environment: string) => false;

export enum Flags {
  IS_RANKING_TABLE_SECTOR_FILTER_ENABLED,
  IS_COMMUNITY_PAGE_ENABLED,
}

type FeaturePredicateType = {
  [key in Flags]: (env: string) => boolean;
};

const FEATURE_FLAG_PREDICATES: FeaturePredicateType = {
  [Flags.IS_RANKING_TABLE_SECTOR_FILTER_ENABLED]: isRankingTableSectorFilterEnabled,
  [Flags.IS_COMMUNITY_PAGE_ENABLED]: isCommunityPageEnabled,
};

export const getFeatureFlag = (flagKey: Flags) => {
  const { publicRuntimeConfig } = getConfig();

  return FEATURE_FLAG_PREDICATES[flagKey](
    publicRuntimeConfig.ENVIRONMENT ?? ''
  );
};
