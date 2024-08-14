/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TargetPrivacyType, CompanyRelationshipType, CorporateEmissionType, Scope2Type, CarbonIntensityMetricType, TargetStrategyType, EmissionAllocationType } from "./globalTypes";

// ====================================================
// GraphQL query operation: CompanyOverviewQuery
// ====================================================

export interface CompanyOverviewQuery_companyProfile_companyPrivacy {
  allPlatform: boolean;
  customerNetwork: boolean;
  supplierNetwork: boolean;
}

export interface CompanyOverviewQuery_companyProfile {
  id: any;
  name: string;
  duns: string | null;
  dnbRegion: string | null;
  dnbCountryIso: string | null;
  estimatedNumberOfEmployees: number | null;
  estimatedUsdOfRevenue: number | null;
  absoluteTargetType: TargetPrivacyType | null;
  sectors: string[];
  isPublic: boolean;
  isActive: boolean;
  activeRelationship: CompanyRelationshipType | null;
  invitationPending: boolean;
  dataShareRequestSent: boolean;
  companyPrivacy: CompanyOverviewQuery_companyProfile_companyPrivacy | null;
}

export interface CompanyOverviewQuery_corporateEmissions_verificationFile {
  id: any;
  originalFilename: string;
}

export interface CompanyOverviewQuery_corporateEmissions_carbonIntensities {
  intensityMetric: CarbonIntensityMetricType;
  intensityValue: number;
}

export interface CompanyOverviewQuery_corporateEmissions {
  id: any;
  type: CorporateEmissionType;
  year: number;
  scope1: number;
  scope2: number;
  scope3: number | null;
  scope2Type: Scope2Type;
  offset: number | null;
  examplePercentage: number | null;
  headCount: number | null;
  verificationFile: CompanyOverviewQuery_corporateEmissions_verificationFile | null;
  carbonIntensities: CompanyOverviewQuery_corporateEmissions_carbonIntensities[];
}

export interface CompanyOverviewQuery_targets_absolute {
  scope1And2Year: number;
  scope1And2Reduction: number;
  scope3Year: number | null;
  scope3Reduction: number | null;
  strategy: TargetStrategyType;
  includeCarbonOffset: boolean;
  companyId: string;
}

export interface CompanyOverviewQuery_targets_intensity {
  intensityMetric: CarbonIntensityMetricType;
  scope1And2Year: number;
  scope1And2Reduction: number;
  scope3Year: number | null;
  scope3Reduction: number | null;
  strategy: TargetStrategyType;
  includeCarbonOffset: boolean;
}

export interface CompanyOverviewQuery_targets {
  absolute: CompanyOverviewQuery_targets_absolute[];
  intensity: CompanyOverviewQuery_targets_intensity[];
}

export interface CompanyOverviewQuery_emissionsAllocatedToMyCompany {
  id: any;
  year: number;
  type: EmissionAllocationType;
  customerId: any;
  supplierId: any | null;
  emissions: number | null;
}

export interface CompanyOverviewQuery {
  companyProfile: CompanyOverviewQuery_companyProfile;
  corporateEmissions: CompanyOverviewQuery_corporateEmissions[];
  targets: CompanyOverviewQuery_targets | null;
  emissionsAllocatedToMyCompany: CompanyOverviewQuery_emissionsAllocatedToMyCompany[];
}

export interface CompanyOverviewQueryVariables {
  companyId: any;
}
