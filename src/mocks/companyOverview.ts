import { COMPANY_OVERVIEW_QUERY } from 'containers/CompanyOverview/queries';
import { GraphQLError } from 'graphql';
import {
  CompanyOverviewQuery_companyProfile,
  CompanyOverviewQuery_corporateEmissions,
  CompanyOverviewQuery_targets,
  CompanyOverviewQuery_emissionsAllocatedToMyCompany,
  CompanyOverviewQueryVariables,
} from 'types/CompanyOverviewQuery';
import { CompanyRelationshipType, TargetPrivacyType } from 'types/globalTypes';

export const defaultCompanyProfile: CompanyOverviewQuery_companyProfile = {
  id: 'company-id',
  name: 'company-name',
  duns: '23423452335',
  dnbRegion: 'Florida',
  dnbCountryIso: 'US',
  estimatedNumberOfEmployees: 100000000,
  estimatedUsdOfRevenue: 100000,
  absoluteTargetType: TargetPrivacyType.PUBLIC,
  sectors: ['Primary sector', 'Secondary sector'],
  isPublic: true,
  isActive: true,
  activeRelationship: CompanyRelationshipType.CUSTOMER,
  dataShareRequestSent: true,
  invitationPending: true,
  companyPrivacy: {
    allPlatform: true,
    customerNetwork: true,
    supplierNetwork: true,
  },
};

export const getCompanyOverviewQueryMock = (
  companyProfileData: Partial<CompanyOverviewQuery_companyProfile> = {},
  corporateEmissionsData: CompanyOverviewQuery_corporateEmissions[] = [],
  targetsData: CompanyOverviewQuery_targets = { absolute: [], intensity: [] },
  emissionsAllocatedToMyCompanyData: CompanyOverviewQuery_emissionsAllocatedToMyCompany[] = [],
  variables: CompanyOverviewQueryVariables = {
    companyId: defaultCompanyProfile.id,
  }
) => ({
  request: {
    query: COMPANY_OVERVIEW_QUERY,
    variables,
  },
  result: {
    data: {
      companyProfile: { ...defaultCompanyProfile, ...companyProfileData },
      corporateEmissions: corporateEmissionsData,
      targets: targetsData,
      emissionsAllocatedToMyCompany: emissionsAllocatedToMyCompanyData,
    },
  },
});

export const companyOverviewQueryWithError = (errorMessage: string) => ({
  request: {
    query: COMPANY_OVERVIEW_QUERY,
    variables: {
      companyId: defaultCompanyProfile.id,
    },
  },
  result: {
    data: {
      companyProfile: null,
      corporateEmissions: null,
      targets: null,
      emissionsAllocatedToMyCompany: null,
    },
    errors: [new GraphQLError(errorMessage)],
  },
});
