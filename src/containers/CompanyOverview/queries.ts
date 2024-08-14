import {
  gql,
  MutationHookOptions,
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery,
} from '@apollo/client';
import { CompaniesBenchmarkQuery } from 'types/CompaniesBenchmarkQuery';
import {
  CompanyOverviewQuery,
  CompanyOverviewQueryVariables,
} from 'types/CompanyOverviewQuery';
import {
  DataShareRequestMutation,
  DataShareRequestMutationVariables,
} from 'types/DataShareRequestMutation';

export const COMPANY_OVERVIEW_QUERY = gql`
  query CompanyOverviewQuery($companyId: UUID!) {
    companyProfile(companyId: $companyId) {
      id
      name
      duns
      dnbRegion
      dnbCountryIso
      estimatedNumberOfEmployees
      estimatedUsdOfRevenue
      absoluteTargetType
      sectors
      isPublic
      isActive
      activeRelationship
      invitationPending
      dataShareRequestSent
      companyPrivacy {
        allPlatform
        customerNetwork
        supplierNetwork
      }
    }
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
    targets(companyId: $companyId) {
      absolute {
        scope1And2Year
        scope1And2Reduction
        scope3Year
        scope3Reduction
        strategy
        includeCarbonOffset
        companyId
      }
      intensity {
        intensityMetric
        scope1And2Year
        scope1And2Reduction
        scope3Year
        scope3Reduction
        strategy
        includeCarbonOffset
      }
    }
    emissionsAllocatedToMyCompany(supplierId: $companyId) {
      id
      year
      type
      customerId
      supplierId
      emissions
    }
  }
`;

export const COMPANIES_BENCHMARK_QUERY = gql`
  query CompaniesBenchmarkQuery($input: CompaniesBenchmarkInput) {
    companiesBenchmark(input: $input) {
      data {
        companyId
        companyName
        companyDuns
        estimatedNumberOfEmployees
        baselineYear
        totalEmissionVariance
        annualEmissionVariance
        emissionToIntensityRatio
        companyRelationshipType
        companyRelationshipStatus
      }
      total
    }
  }
`;

export const DATA_SHARE_REQUEST_MUTATION = gql`
  mutation DataShareRequestMutation($targetCompanyId: UUID!) {
    dataShareRequest(targetCompanyId: $targetCompanyId) {
      id
      companyId
      targetCompanyId
    }
  }
`;

export const useCompanyOverviewQuery = ({
  companyId,
}: CompanyOverviewQueryVariables) =>
  useQuery<CompanyOverviewQuery>(COMPANY_OVERVIEW_QUERY, {
    variables: {
      companyId,
    },
    fetchPolicy: 'cache-and-network',
  });

export const useCompaniesBenchmarkLazyQuery = (
  options: QueryHookOptions = {}
) => useLazyQuery<CompaniesBenchmarkQuery>(COMPANIES_BENCHMARK_QUERY, options);

export const useDataShareRequestMutation = (
  options: MutationHookOptions<
    DataShareRequestMutation,
    DataShareRequestMutationVariables
  > = {}
) =>
  useMutation<DataShareRequestMutation, DataShareRequestMutationVariables>(
    DATA_SHARE_REQUEST_MUTATION,
    options
  );
