import { ExpertiseDomain } from 'types/globalTypes';

export enum EXPERTISE_DOMAIN {
  SUSTAINABILITY = 'sustainability',
  PROCUREMENT = 'procurement',
  BUSINESS_DEVELOPMENT = 'business-development',
  FINANCE = 'finance',
  OTHER = 'other',
}

export const EXPERTISE_DOMAIN_OPTIONS: {
  [key in EXPERTISE_DOMAIN]: ExpertiseDomain;
} = {
  [EXPERTISE_DOMAIN.SUSTAINABILITY]: ExpertiseDomain.SUSTAINABILITY,
  [EXPERTISE_DOMAIN.PROCUREMENT]: ExpertiseDomain.PROCUREMENT,
  [EXPERTISE_DOMAIN.BUSINESS_DEVELOPMENT]: ExpertiseDomain.BUSINESS_DEVELOPMENT,
  [EXPERTISE_DOMAIN.FINANCE]: ExpertiseDomain.FINANCE,
  [EXPERTISE_DOMAIN.OTHER]: ExpertiseDomain.OTHER,
};

export const getExpertiseDomainOptions = (t: any) =>
  Object.values(EXPERTISE_DOMAIN).map((value: EXPERTISE_DOMAIN) => ({
    label: t(`accountSettings:expertise-domain-option-type-${value}`),
    value: EXPERTISE_DOMAIN_OPTIONS[value],
  }));
