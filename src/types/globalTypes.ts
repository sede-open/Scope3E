/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum AmbitionPrivacyStatus {
  NOT_SHARED = "NOT_SHARED",
  SHARED = "SHARED",
  SHARED_SBTI = "SHARED_SBTI",
}

export enum AuthProvider {
  AKAMAI = "AKAMAI",
  INVITE = "INVITE",
  PORT = "PORT",
}

export enum CarbonIntensityGroupType {
  COMMON = "COMMON",
  OTHER = "OTHER",
}

export enum CarbonIntensityMetricType {
  BUSINESS_TRAVEL_PER_PASSENGER_KM = "BUSINESS_TRAVEL_PER_PASSENGER_KM",
  CUBIC_METRES = "CUBIC_METRES",
  EQUIVALENT_PRODUCT_UNITS = "EQUIVALENT_PRODUCT_UNITS",
  GJ = "GJ",
  KG_OF_RAW_MILK = "KG_OF_RAW_MILK",
  KM = "KM",
  KWH = "KWH",
  LETTER_AND_PARCEL_DELIVERY = "LETTER_AND_PARCEL_DELIVERY",
  LITRE_OF_FINISHED_PRODUCT = "LITRE_OF_FINISHED_PRODUCT",
  LITRE_OF_PRODUCED_BEVERAGE = "LITRE_OF_PRODUCED_BEVERAGE",
  LITRE_PACKED = "LITRE_PACKED",
  M3_OF_THROUGHPUT = "M3_OF_THROUGHPUT",
  METRIC_TONS_OF_AGRIGULTURAL_PRODUCT = "METRIC_TONS_OF_AGRIGULTURAL_PRODUCT",
  METRIC_TONS_OF_CEMENTITIOUS_MATERIALS = "METRIC_TONS_OF_CEMENTITIOUS_MATERIALS",
  METRIC_TONS_OF_FOOD_PRODUCED = "METRIC_TONS_OF_FOOD_PRODUCED",
  METRIC_TONS_OF_GOODS_DELIVERED = "METRIC_TONS_OF_GOODS_DELIVERED",
  METRIC_TONS_OF_GOOD_SHIPPED_PER_KM = "METRIC_TONS_OF_GOOD_SHIPPED_PER_KM",
  METRIC_TONS_OF_PAPER = "METRIC_TONS_OF_PAPER",
  METRIC_TONS_OF_PULP_PAPER = "METRIC_TONS_OF_PULP_PAPER",
  METRIC_TONS_OF_STAINLESS_STEEL = "METRIC_TONS_OF_STAINLESS_STEEL",
  METRIC_TONS_OF_STEEL_PRODUCED = "METRIC_TONS_OF_STEEL_PRODUCED",
  METRIC_TONS_OF_TIRES = "METRIC_TONS_OF_TIRES",
  METRIC_TON_KM = "METRIC_TON_KM",
  METRIC_TON_PRODUCTION = "METRIC_TON_PRODUCTION",
  MILLION_ENGINEERING_HOURS = "MILLION_ENGINEERING_HOURS",
  MILLION_EURO_VALUE_ADDED_X_MILLION_KM_DISTANCE_TRAVELLED = "MILLION_EURO_VALUE_ADDED_X_MILLION_KM_DISTANCE_TRAVELLED",
  MILLION_GROSS_METRIC_TON_KM = "MILLION_GROSS_METRIC_TON_KM",
  MJ = "MJ",
  MW_INSTALLED = "MW_INSTALLED",
  NAUTICAL_MILE = "NAUTICAL_MILE",
  NUMBER_OF_EMPLOYEES = "NUMBER_OF_EMPLOYEES",
  NUMBER_OF_ENGINES_MANUFACTORED = "NUMBER_OF_ENGINES_MANUFACTORED",
  NUMBER_OF_FTE = "NUMBER_OF_FTE",
  NUMBER_VEHICLES_PRODUCED = "NUMBER_VEHICLES_PRODUCED",
  OPERATING_DAYS = "OPERATING_DAYS",
  OPERATING_HOURS = "OPERATING_HOURS",
  OPERATIONAL_UTILIZATION_PER_HOUR = "OPERATIONAL_UTILIZATION_PER_HOUR",
  OPERATIONS_PER_JOULE = "OPERATIONS_PER_JOULE",
  PAIRS_OF_SHOES = "PAIRS_OF_SHOES",
  PASSENGERS_PER_KM = "PASSENGERS_PER_KM",
  PER_ROLLING_CAGE = "PER_ROLLING_CAGE",
  PER_ROOM_NIGHT_BOOKED = "PER_ROOM_NIGHT_BOOKED",
  PINTS_OF_PRODUCT_SOLD = "PINTS_OF_PRODUCT_SOLD",
  SQUARE_METRE = "SQUARE_METRE",
  TJ = "TJ",
  TRACK_KM = "TRACK_KM",
  UNITS_SOLD = "UNITS_SOLD",
  USD_OF_REVENUE = "USD_OF_REVENUE",
}

export enum CarbonIntensityType {
  ESTIMATED = "ESTIMATED",
  USER_SUBMITTED = "USER_SUBMITTED",
}

export enum CategoriesSystemName {
  BUSINESS_TRAVEL = "BUSINESS_TRAVEL",
  CAPITAL_GOODS = "CAPITAL_GOODS",
  DOWNSTREAM_LEASED_ASSETS = "DOWNSTREAM_LEASED_ASSETS",
  DOWNSTREAM_TRANSPORTATION_AND_DISTRIBUTION = "DOWNSTREAM_TRANSPORTATION_AND_DISTRIBUTION",
  EMPLOYEE_COMMUTING = "EMPLOYEE_COMMUTING",
  END_OF_LIFE_TREATMENT_OF_SOLD_PRODUCTS = "END_OF_LIFE_TREATMENT_OF_SOLD_PRODUCTS",
  FRANCHISES = "FRANCHISES",
  FUEL_AND_ENERGY_RELATED_ACTIVITIES = "FUEL_AND_ENERGY_RELATED_ACTIVITIES",
  INVESTMENTS = "INVESTMENTS",
  PROCESSING_OF_SOLD_PRODUCTS = "PROCESSING_OF_SOLD_PRODUCTS",
  PURCHASED_GOODS_AND_SERVICES = "PURCHASED_GOODS_AND_SERVICES",
  UPSTREAM_LEASED_ASSETS = "UPSTREAM_LEASED_ASSETS",
  UPSTREAM_TRANSPORTATION_AND_DISTRIBUTION = "UPSTREAM_TRANSPORTATION_AND_DISTRIBUTION",
  USE_OF_SOLD_PRODUCTS = "USE_OF_SOLD_PRODUCTS",
  WASTE_GENERATED_IN_OPERATIONS = "WASTE_GENERATED_IN_OPERATIONS",
}

export enum CompaniesBenchmarkOrderBy {
  ANNUAL_EMISSION_VARIANCE = "ANNUAL_EMISSION_VARIANCE",
  BASELINE_YEAR = "BASELINE_YEAR",
  CARBON_INTENSITY_RATIO = "CARBON_INTENSITY_RATIO",
  COMPANY_NAME = "COMPANY_NAME",
  COMPANY_RELATIONSHIP = "COMPANY_RELATIONSHIP",
  ESTIMATED_NUMBER_OF_EMPLOYEES = "ESTIMATED_NUMBER_OF_EMPLOYEES",
  TOTAL_EMISSION_VARIANCE = "TOTAL_EMISSION_VARIANCE",
}

export enum CompanyRelationshipRecommendationStatus {
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  UNACKNOWLEDGED = "UNACKNOWLEDGED",
}

export enum CompanyRelationshipType {
  CUSTOMER = "CUSTOMER",
  SUPPLIER = "SUPPLIER",
}

export enum CompanySectorType {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

export enum CompanyStatus {
  ACTIVE = "ACTIVE",
  INVITATION_DECLINED = "INVITATION_DECLINED",
  PENDING_USER_ACTIVATION = "PENDING_USER_ACTIVATION",
  PENDING_USER_CONFIRMATION = "PENDING_USER_CONFIRMATION",
  VETOED = "VETOED",
  VETTING_IN_PROGRESS = "VETTING_IN_PROGRESS",
}

export enum CorporateEmissionType {
  ACTUAL = "ACTUAL",
  BASELINE = "BASELINE",
}

export enum EmailEnquiry {
  ADIP_ULTRA = "ADIP_ULTRA",
  BATTERY_STORAGE = "BATTERY_STORAGE",
  BLUE_HYDROGEN = "BLUE_HYDROGEN",
  CANSOLV = "CANSOLV",
  CO2_CAPTURE_TECHNOLOGY = "CO2_CAPTURE_TECHNOLOGY",
  CO2_FLEET_EMISSION_COMPENSATION = "CO2_FLEET_EMISSION_COMPENSATION",
  CORPORATE_POWER_PURCHASE_AGREEMENTS = "CORPORATE_POWER_PURCHASE_AGREEMENTS",
  CORROSION_FREE_PIPELINES = "CORROSION_FREE_PIPELINES",
  DECARBONISE_YOUR_FLEET = "DECARBONISE_YOUR_FLEET",
  DEMO = "DEMO",
  DETECT_TECHNOLOGY_INDUSTRIAL_EFFICIENCY = "DETECT_TECHNOLOGY_INDUSTRIAL_EFFICIENCY",
  EMOBILITY = "EMOBILITY",
  ENERGY_MANAGEMENT = "ENERGY_MANAGEMENT",
  GENERAL_ENQUIRY = "GENERAL_ENQUIRY",
  HYDROGEN = "HYDROGEN",
  I6_FUEL_MANAGEMENT = "I6_FUEL_MANAGEMENT",
  IMMERSION_COOLING = "IMMERSION_COOLING",
  INNOWATTS_CARBON_ENERGY_ANALYTICS = "INNOWATTS_CARBON_ENERGY_ANALYTICS",
  INSTA_FREIGHT = "INSTA_FREIGHT",
  JOIN = "JOIN",
  LEVERAGING_DISTRIBUTED_ENERGY = "LEVERAGING_DISTRIBUTED_ENERGY",
  LNG = "LNG",
  LO3_ENERGY_CONSUMPTION_TRACKING = "LO3_ENERGY_CONSUMPTION_TRACKING",
  LONG_HAUL_BIO_LNG = "LONG_HAUL_BIO_LNG",
  LOW_CARBON_SOLUTION = "LOW_CARBON_SOLUTION",
  LUBRICANT_SOLUTIONS = "LUBRICANT_SOLUTIONS",
  MACHINE_MAX = "MACHINE_MAX",
  NATURE_BASED = "NATURE_BASED",
  ONSITE_RENEWABLE_POWER_GENERATION = "ONSITE_RENEWABLE_POWER_GENERATION",
  ONSITE_SOLAR = "ONSITE_SOLAR",
  REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS = "REDUCING_CO2_INTENSITY_WITH_example_CHEMICALS",
  RENEWABLE_ENERGY_CERTIFICATES = "RENEWABLE_ENERGY_CERTIFICATES",
  RENEWABLE_NATURAL_GAS = "RENEWABLE_NATURAL_GAS",
  RENEWABLE_POWER = "RENEWABLE_POWER",
  SIMULATION_TECHNOLOGY = "SIMULATION_TECHNOLOGY",
  SOLAR_SOLUTION = "SOLAR_SOLUTION",
  SUSTAINABLE_AVIATION = "SUSTAINABLE_AVIATION",
  SUSTAINABLE_BITUMEN = "SUSTAINABLE_BITUMEN",
  SUSTAINABLE_LAND_ASSET_ENHANCEMENT = "SUSTAINABLE_LAND_ASSET_ENHANCEMENT",
  TELEMATICS = "TELEMATICS",
  VESSELS_SOFTWARE = "VESSELS_SOFTWARE",
}

export enum EmissionAllocationDirection {
  EMISSION_ALLOCATED_BY_SUPPLIERS = "EMISSION_ALLOCATED_BY_SUPPLIERS",
  EMISSION_ALLOCATED_TO_CUSTOMERS = "EMISSION_ALLOCATED_TO_CUSTOMERS",
}

export enum EmissionAllocationMethod {
  ECONOMICAL = "ECONOMICAL",
  OTHER = "OTHER",
  PHYSICAL = "PHYSICAL",
}

export enum EmissionAllocationStatus {
  APPROVED = "APPROVED",
  AWAITING_APPROVAL = "AWAITING_APPROVAL",
  REJECTED = "REJECTED",
  REQUESTED = "REQUESTED",
  REQUEST_DISMISSED = "REQUEST_DISMISSED",
}

export enum EmissionAllocationType {
  SCOPE_3 = "SCOPE_3",
}

export enum EmissionPrivacyStatus {
  NOT_SHARED = "NOT_SHARED",
  SHARED = "SHARED",
}

export enum ExpertiseDomain {
  BUSINESS_DEVELOPMENT = "BUSINESS_DEVELOPMENT",
  FINANCE = "FINANCE",
  OTHER = "OTHER",
  PROCUREMENT = "PROCUREMENT",
  SUSTAINABILITY = "SUSTAINABILITY",
}

export enum InviteStatus {
  APPROVED = "APPROVED",
  AWAITING_CUSTOMER_APPROVAL = "AWAITING_CUSTOMER_APPROVAL",
  AWAITING_SUPPLIER_APPROVAL = "AWAITING_SUPPLIER_APPROVAL",
  REJECTED_BY_CUSTOMER = "REJECTED_BY_CUSTOMER",
  REJECTED_BY_SUPPLIER = "REJECTED_BY_SUPPLIER",
}

export enum OrderBy {
  ASC = "ASC",
  DESC = "DESC",
}

export enum ReductionRankType {
  OTHER = "OTHER",
  SELECTED = "SELECTED",
}

export enum RegionName {
  AFRICA = "AFRICA",
  AMERICAS = "AMERICAS",
  ASIA = "ASIA",
  EUROPE = "EUROPE",
  OCEANIA = "OCEANIA",
}

export enum RoleName {
  ACCOUNT_MANAGER = "ACCOUNT_MANAGER",
  ADMIN = "ADMIN",
  SUPPLIER_EDITOR = "SUPPLIER_EDITOR",
  SUPPLIER_VIEWER = "SUPPLIER_VIEWER",
}

export enum Scope2Type {
  LOCATION = "LOCATION",
  MARKET = "MARKET",
}

export enum SolutionInterestsSystemName {
  BEHAVIOUR_CHANGE = "BEHAVIOUR_CHANGE",
  CARBON_CAPTURE = "CARBON_CAPTURE",
  FUEL_SWITCH = "FUEL_SWITCH",
  MATERIAL_AND_PROCESS_EFFICIENCY = "MATERIAL_AND_PROCESS_EFFICIENCY",
  NATURE_BASED_SOLUTIONS = "NATURE_BASED_SOLUTIONS",
  RECYCLING = "RECYCLING",
  RENEWABLE_HEAT = "RENEWABLE_HEAT",
  RENEWABLE_POWER = "RENEWABLE_POWER",
}

export enum TargetPrivacyType {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
  SCIENCE_BASED_INITIATIVE = "SCIENCE_BASED_INITIATIVE",
}

export enum TargetStrategyType {
  AGGRESSIVE = "AGGRESSIVE",
  MODERATE = "MODERATE",
  PASSIVE = "PASSIVE",
}

export enum TargetType {
  ABSOLUTE = "ABSOLUTE",
  INTENSITY = "INTENSITY",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  PENDING = "PENDING",
}

export interface AcceptCompanyInviteInput {
  companyId: any;
}

export interface ApproveCompanyInput {
  companyId: any;
}

export interface CompaniesBenchmarkInput {
  intensityMetric: CarbonIntensityMetricType;
  intensityType: CarbonIntensityType;
  limit: number;
  offset: number;
  order: OrderBy;
  orderBy: CompaniesBenchmarkOrderBy;
  selectedCompanyId: string;
}

export interface CompanyPrivacyInput {
  allPlatform: boolean;
  customerNetwork: boolean;
  supplierNetwork: boolean;
}

export interface CompanySectorInput {
  id: any;
  sectorType: CompanySectorType;
}

export interface CorporateEmissionAccessInput {
  carbonIntensity: boolean;
  carbonOffsets: boolean;
  publicLink?: any | null;
  scope1And2: boolean;
  scope3: boolean;
}

export interface CreateCarbonIntensityData {
  type: CarbonIntensityMetricType;
  value: number;
}

export interface CreateCompanyRelationshipInput {
  customerId: any;
  inviteType: CompanyRelationshipType;
  note?: any | null;
  supplierId: any;
}

export interface CreateCompanyUserInput {
  authProvider: AuthProvider;
  companyId: any;
  email: any;
  expertiseDomain?: ExpertiseDomain | null;
  firstName: any;
  lastName: any;
  roleName: RoleName;
}

export interface CreateCorporateEmissionInput {
  carbonIntensities?: CreateCarbonIntensityData[] | null;
  companyId: any;
  corporateEmissionAccess: CorporateEmissionAccessInput;
  headCount?: number | null;
  offset?: number | null;
  scope1: number;
  scope2: number;
  scope2Type?: Scope2Type | null;
  scope3?: number | null;
  examplePercentage?: number | null;
  type: CorporateEmissionType;
  verificationFileId?: any | null;
  year: number;
}

export interface CreateEmissionAllocationInput {
  allocationMethod?: EmissionAllocationMethod | null;
  customerEmissionId?: any | null;
  customerId: any;
  emissions?: number | null;
  note?: any | null;
  supplierEmissionId?: any | null;
  supplierId: any;
  year: number;
}

export interface CreateUserInput {
  authProvider: AuthProvider;
  companyId: any;
  email: any;
  expertiseDomain?: ExpertiseDomain | null;
  firstName: any;
  lastName: any;
  roleName: RoleName;
}

export interface DeclineCompanyInviteInput {
  companyId: any;
  reason: any;
}

export interface DeleteCorporateEmissionInput {
  id: any;
}

export interface DeleteEmissionAllocationInput {
  id: any;
}

export interface DeleteUserInput {
  id: any;
}

export interface EditCompanyUserInput {
  email: any;
  expertiseDomain?: ExpertiseDomain | null;
  firstName: any;
  lastName: any;
  roleName: RoleName;
}

export interface EditUserInput {
  companyId?: any | null;
  email: any;
  firstName?: any | null;
  lastName?: any | null;
  roleName: RoleName;
}

export interface EnquiryEmailInput {
  company?: any | null;
  consent: boolean;
  email: any;
  enquiries: EmailEnquiry[];
  message: any;
  name: any;
  regions?: RegionName[] | null;
}

export interface InviteAndConnectToCompanyInput {
  companyDuns: any;
  email: any;
  firstName: any;
  inviteType: CompanyRelationshipType;
  lastName: any;
  note?: any | null;
}

export interface ResendUserInviteToJoinEmailInput {
  userId: any;
}

export interface ResentAkamaiInviteInput {
  userId: any;
}

export interface SaveTargetsInput {
  companyId: any;
  toSave: SaveTargetsTargetInstance[];
}

export interface SaveTargetsTargetInstance {
  includeCarbonOffset: boolean;
  intensityMetric?: CarbonIntensityMetricType | null;
  scope1And2PrivacyType: TargetPrivacyType;
  scope1And2Reduction: number;
  scope1And2Year: number;
  scope3PrivacyType?: TargetPrivacyType | null;
  scope3Reduction?: number | null;
  scope3Year?: number | null;
  strategy: TargetStrategyType;
  targetType: TargetType;
}

export interface UpdateCompanyRelationshipInput {
  id: any;
  note?: any | null;
  status?: InviteStatus | null;
}

export interface UpdateCompanySectorsInput {
  companyId: any;
  sectors: CompanySectorInput[];
}

export interface UpdateCompanyStatusInput {
  id: any;
  status: CompanyStatus;
}

export interface UpdateCorporateEmissionInput {
  carbonIntensities?: CreateCarbonIntensityData[] | null;
  corporateEmissionAccess: CorporateEmissionAccessInput;
  headCount?: number | null;
  id: any;
  offset?: number | null;
  scope1: number;
  scope2: number;
  scope2Type: Scope2Type;
  scope3?: number | null;
  examplePercentage?: number | null;
  type: CorporateEmissionType;
  verificationFileId?: any | null;
  year: number;
}

export interface UpdateEmissionAllocationInput {
  addedToCustomerScopeTotal?: boolean | null;
  allocationMethod?: EmissionAllocationMethod | null;
  categoryId?: any | null;
  customerEmissionId?: any | null;
  emissions?: number | null;
  id: any;
  note?: any | null;
  status?: EmissionAllocationStatus | null;
  supplierEmissionId?: any | null;
}

export interface UpdateMeInput {
  expertiseDomain?: ExpertiseDomain | null;
  firstName?: any | null;
  lastName?: any | null;
}

export interface UpdateUserSolutionInterestsInput {
  solutionInterestIds: any[];
}

export interface VetoCompanyInput {
  companyId: any;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
