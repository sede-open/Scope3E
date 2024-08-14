import { useQuery, gql, WatchQueryFetchPolicy } from '@apollo/client';
import {
  ReductionRankQuery,
  ReductionRankQueryVariables,
} from 'types/ReductionRankQuery';
import {
  DashboardDataQuery,
  DashboardDataQueryVariables,
} from 'types/DashboardDataQuery';
import {
  CompanyReductionRankQueryVariables,
  CompanyReductionRankQuery,
} from 'types/CompanyReductionRankQuery';
import {
  CarbonIntensityQueryVariables,
  CarbonIntensityQuery,
} from 'types/CarbonIntensityQuery';

export const DASHBOARD_DATA_QUERY = gql`
  query DashboardDataQuery($companyId: UUID!) {
    corporateEmissions(companyId: $companyId) {
      id
      type
      year
      scope1
      scope2
      scope3
      scope2Type
      offset
      examplePercentage
      headCount
      verificationFile {
        id
        originalFilename
      }
      carbonIntensities {
        intensityMetric
        intensityValue
      }
    }
    target(companyId: $companyId) {
      scope1And2Year
      scope1And2Reduction
      scope3Year
      scope3Reduction
      strategy
      includeCarbonOffset
    }
    companyDataPrivacyCompleteness(companyId: $companyId) {
      isComplete
    }
  }
`;

export const useDashboardData = (
  { companyId }: DashboardDataQueryVariables,
  { fetchPolicy = 'cache-and-network' }: { fetchPolicy: WatchQueryFetchPolicy }
) =>
  useQuery<DashboardDataQuery>(DASHBOARD_DATA_QUERY, {
    variables: {
      companyId,
    },
    fetchPolicy,
  });

export const REDUCTION_RANK_QUERY = gql`
  query ReductionRankQuery($companyId: UUID!, $year: Int!) {
    corporateEmissionRanks(companyId: $companyId, year: $year) {
      id
      rank
      currentYear
      primarySector
      secondarySector
      reductionPercentage
      rankType
      hasVerificationFile
      hasPreviousYearVerificationFile
    }
  }
`;

export const useReductionRank = ({
  companyId,
  year,
}: ReductionRankQueryVariables) =>
  useQuery<ReductionRankQuery>(REDUCTION_RANK_QUERY, {
    variables: {
      companyId,
      year,
    },
  });

export const COMPANY_REDUCTION_RANK_QUERY = gql`
  query CompanyReductionRankQuery(
    $companyId: UUID!
    $year: Int!
    $previousYear: Int!
  ) {
    currentRank: corporateEmissionRank(companyId: $companyId, year: $year) {
      id
      rank
      currentYear
      primarySector
      reductionPercentage
      rankType
      hasVerificationFile
      hasPreviousYearVerificationFile
    }
    previousRank: corporateEmissionRank(
      companyId: $companyId
      year: $previousYear
    ) {
      id
      rank
      currentYear
      primarySector
      reductionPercentage
      rankType
      hasVerificationFile
      hasPreviousYearVerificationFile
    }
  }
`;

export const useCompanyReductionRank = ({
  companyId,
  year,
  previousYear,
}: CompanyReductionRankQueryVariables) =>
  useQuery<CompanyReductionRankQuery>(COMPANY_REDUCTION_RANK_QUERY, {
    variables: {
      companyId,
      year,
      previousYear,
    },
    fetchPolicy: 'cache-and-network',
  });

export const CARBON_INTENSITY_QUERY = gql`
  query CarbonIntensityQuery($companyId: UUID!, $years: [Int!]!) {
    corporateCarbonIntensityComparisons(companyId: $companyId, years: $years) {
      year
      sectorIntensity {
        scope1
        scope2
        scope3
      }
      companyIntensity {
        scope1
        scope2
        scope3
      }
    }
  }
`;

export const useCarbonIntensities = ({
  companyId,
  years,
}: CarbonIntensityQueryVariables) =>
  useQuery<CarbonIntensityQuery>(CARBON_INTENSITY_QUERY, {
    variables: {
      companyId,
      years,
    },
    fetchPolicy: 'cache-and-network',
  });
