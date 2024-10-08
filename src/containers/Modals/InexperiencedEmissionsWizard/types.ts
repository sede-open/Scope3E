import { OptionType } from 'components/SingleSelect';

export enum EMISSION_YEAR_FIELD_KEYS {
  EMISSION_YEAR = 'year',
}

export enum SCOPE_1_SOURCE_FIELD_KEYS {
  STATIONARY_MOBILE_COMBUSTION = 'stationaryAndMobileCombustion',
  INDUSTRIAL_PROCESS_AND_REFRIGIRANTS = 'industrialProcessAndRefrigirants',
}

export enum SCOPE_2_SOURCE_FIELD_KEYS {
  PURCHASED_ELECTRICITY = 'purchasedElectricity',
  PURCHASED_HEAT_COOLING = 'purchasedHeatCooling',
}

export type WizardFieldKeys =
  | EMISSION_YEAR_FIELD_KEYS
  | SCOPE_1_SOURCE_FIELD_KEYS
  | SCOPE_2_SOURCE_FIELD_KEYS;

export enum InexperiencedFlowSteps {
  SELECT_EMISSION_YEAR = 'selectEmissionYear',
  SELECT_SCOPE_1_SOURCES = 'selectScope1',
  SELECT_SCOPE_2_SOURCES = 'selectScope2',
  DATA_NEEDED_OVERVIEW = 'dataNeededOverview',
  STATIONARY_MOBILE_COMBUSTION_FORM = 'stationaryMobileCombustionForm',
  PROCESS_REFRIGERANT_FORM = 'processRefrigerantForm',
  ELECTRICITY_FORM = 'electricityForm',
  HEAT_COOLING_FORM = 'heatCoolingForm',
  SUMMARY = 'summary',
}

export enum SCOPE1_SOURCES_FORM_FIELD_KEYS {
  EMISSION_SOURCES = 'emissionSources',
}

export enum SCOPE1_SOURCE_FIELD_KEYS {
  SOURCE = 'source',
  AMOUNT = 'amount',
}

export type Scope1SourceValues = {
  [SCOPE1_SOURCE_FIELD_KEYS.SOURCE]: OptionType | null;
  [SCOPE1_SOURCE_FIELD_KEYS.AMOUNT]: number | string;
};

export enum SCOPE2_SOURCES_FORM_FIELD_KEYS {
  EMISSION_SOURCES = 'emissionSources',
}

export enum SCOPE2_SOURCE_FIELD_KEYS {
  GRID_FACTOR_TYPE = 'gridFactorType',
  CUSTOM_GRID_FACTOR = 'customGridFactor',
  GRID_LOCATION = 'gridLocation',
  AMOUNT = 'amount',
}

export type Scope2SourceValues = {
  [SCOPE2_SOURCE_FIELD_KEYS.GRID_FACTOR_TYPE]: OptionType | null;
  [SCOPE2_SOURCE_FIELD_KEYS.CUSTOM_GRID_FACTOR]: number | string;
  [SCOPE2_SOURCE_FIELD_KEYS.AMOUNT]: number | string;
  [SCOPE2_SOURCE_FIELD_KEYS.GRID_LOCATION]?: OptionType | null;
};

export type WizardState = {
  [EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR]?: number;
  [SCOPE_1_SOURCE_FIELD_KEYS.STATIONARY_MOBILE_COMBUSTION]: boolean;
  [SCOPE_1_SOURCE_FIELD_KEYS.INDUSTRIAL_PROCESS_AND_REFRIGIRANTS]: boolean;
  [SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_ELECTRICITY]: boolean;
  [SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_HEAT_COOLING]: boolean;
  steps: InexperiencedFlowSteps[];
  stationaryCombustionTotal: number;
  stationaryCombustionSources: Scope1SourceValues[];
  processRefrigerantsTotal: number;
  processRefrigerantsSources: Scope1SourceValues[];
  electricityTotal: number;
  electricitySources: Scope2SourceValues[];
  heatCoolingTotal: number;
  heatCoolingSources: Scope2SourceValues[];
};

export enum FuelName {
  CNG = 'CNG',
  LNG = 'LNG',
  LPG = 'LPG',
  NATURAL_GAS = 'NATURAL_GAS',
  NATURAL_GAS_MINERAL = 'NATURAL_GAS_MINERAL',
  OTHER_PETROLEUM = 'OTHER_PETROLEUM',
  AVIATION_SPIRIT = 'AVIATION_SPIRIT',
  AVIATION_TURBINE_FUEL = 'AVIATION_TURBINE_FUEL',
  BURNING_OIL = 'BURNING_OIL',
  DIESEL_BIOFUEL_BLEND = 'DIESEL_BIOFUEL_BLEND',
  DIESEL_MINERAL = 'DIESEL_MINERAL',
  FUEL_OIL = 'FUEL_OIL',
  GAS_OIL = 'GAS_OIL',
  LUBRICANTS = 'LUBRICANTS',
  NAPHTHA = 'NAPHTHA',
  PETROL_BIOFUEL_BLEND = 'PETROL_BIOFUEL_BLEND',
  PETROL_MINERAL = 'PETROL_MINERAL',
  PROCESSED_FUEL_OILS_RESIDUAL = 'PROCESSED_FUEL_OILS_RESIDUAL',
  PROCESSED_FUEL_OILS_DISTILLATE = 'PROCESSED_FUEL_OILS_DISTILLATE',
  REFINERY_MISCELLANEOUS = 'REFINERY_MISCELLANEOUS',
  WASTE_OILS = 'WASTE_OILS',
  MARINE_GAS_OIL = 'MARINE_GAS_OIL',
  MARINE_FUEL_OIL = 'MARINE_FUEL_OIL',
  COAL_INDUSTRIAL = 'COAL_INDUSTRIAL',
  COAL_ELECTRICITY_GENERATION = 'COAL_ELECTRICITY_GENERATION',
  COAL_DOMESTIC = 'COAL_DOMESTIC',
  COAL_COKING = 'COAL_COKING',
  PETROLEUM_COKE = 'PETROLEUM_COKE',
  COAL_ELECTRICITY_GENERATION_HOME = 'COAL_ELECTRICITY_GENERATION_HOME',
  BIOETHANOL = 'BIOETHANOL',
  BIODIESEL = 'BIODIESEL',
  BIOMETHANE = 'BIOMETHANE',
  BIODIESEL_COOKING_OIL = 'BIODIESEL_COOKING_OIL',
  BIODIESEL_TALLOW = 'BIODIESEL_TALLOW',
  E5 = 'E5',
  E10 = 'E10',
  E20 = 'E20',
  E30 = 'E30',
}

export enum ElectricityGridTypes {
  LOCATION = 'LOCATION',
  CUSTOM = 'CUSTOM',
}

export enum HeatCoolingGridTypes {
  DEFRA = 'DEFRA',
  CUSTOM = 'CUSTOM',
}

export enum ProcessRefrigerantName {
  CARBON_DIOXIDE = 'CARBON_DIOXIDE',
  METHANE = 'METHANE',
  NITROUS_OXIDE = 'NITROUS_OXIDE',
  HFC_23 = 'HFC_23',
  HFC_32 = 'HFC_32',
  HFC_41 = 'HFC_41',
  HFC_125 = 'HFC_125',
  HFC_134 = 'HFC_134',
  HFC_134a = 'HFC_134a',
  HFC_143 = 'HFC_143',
  HFC_143a = 'HFC_143a',
  HFC_152a = 'HFC_152a',
  HFC_227ea = 'HFC_227ea',
  HFC_236fa = 'HFC_236fa',
  HFC_245fa = 'HFC_245fa',
  HFC_43_I0mee = 'HFC_43_I0mee',
  PERFLUOROMETHANE_PFC_14 = 'PERFLUOROMETHANE_PFC_14',
  PERFLUOROETHANE_PFC_116 = 'PERFLUOROETHANE_PFC_116',
  PERFLUOROPROPOANE_PFC_218 = 'PERFLUOROPROPOANE_PFC_218',
  PERFLUOROCYCLOBUTANE_PFC_318 = 'PERFLUOROCYCLOBUTANE_PFC_318',
  PERFLUOROBUTANE_PFC_3_1_10 = 'PERFLUOROBUTANE_PFC_3_1_10',
  PERFLUOROPENTANE_PFC_4_1_12 = 'PERFLUOROPENTANE_PFC_4_1_12',
  PERFLUOROHEXANE_PFC_5_1_14 = 'PERFLUOROHEXANE_PFC_5_1_14',
  SULPHUR_HEXAFLUORIDE_SF6 = 'SULPHUR_HEXAFLUORIDE_SF6',
  HFC_152 = 'HFC_152',
  HFC_161 = 'HFC_161',
  HFC_236cb = 'HFC_236cb',
  HFC_236ea = 'HFC_236ea',
  HFC_245ca = 'HFC_245ca',
  HFC_365mfc = 'HFC_365mfc',
  R404A = 'R404A',
  R407A = 'R407A',
  R407C = 'R407C',
  R407F = 'R407F',
  R408A = 'R408A',
  R410A = 'R410A',
  R507A = 'R507A',
  R508B = 'R508B',
  R403A = 'R403A',
  CFC_11_R11_TRICHLOROFLUOROMETHANE = 'CFC_11_R11_TRICHLOROFLUOROMETHANE',
  CFC_12_R12_DICHLORODIFLUOROMETHANE = 'CFC_12_R12_DICHLORODIFLUOROMETHANE',
  CFC_13 = 'CFC_13',
  CFC_113 = 'CFC_113',
  CFC_114 = 'CFC_114',
  CFC_115 = 'CFC_115',
  HALON_1211 = 'HALON_1211',
  HALON_1301 = 'HALON_1301',
  HALON_2402 = 'HALON_2402',
  CARBON_TETRACHLORIDE = 'CARBON_TETRACHLORIDE',
  METHYL_BROMIDE = 'METHYL_BROMIDE',
  METHYL_CHLOROFORM = 'METHYL_CHLOROFORM',
  HCFC_22_R22_CHLORODIFLUOROMETHANE = 'HCFC_22_R22_CHLORODIFLUOROMETHANE',
  HCFC_123 = 'HCFC_123',
  HCFC_124 = 'HCFC_124',
  HCFC_141b = 'HCFC_141b',
  HCFC_142b = 'HCFC_142b',
  HCFC_225ca = 'HCFC_225ca',
  HCFC_225cb = 'HCFC_225cb',
  HCFC_21 = 'HCFC_21',
  NITROGEN_TRIFLUORIDE = 'NITROGEN_TRIFLUORIDE',
  PFC_9_1_18 = 'PFC_9_1_18',
  TRIFLUOROMETHYL_SULPHUR_PENTAFLUORIDE = 'TRIFLUOROMETHYL_SULPHUR_PENTAFLUORIDE',
  PERFLUOROCYCLOPROPANE = 'PERFLUOROCYCLOPROPANE',
  HFE_125 = 'HFE_125',
  HFE_134 = 'HFE_134',
  HFE_143a = 'HFE_143a',
  HCFE_235da2 = 'HCFE_235da2',
  HFE_245cb2 = 'HFE_245cb2',
  HFE_245fa2 = 'HFE_245fa2',
  HFE_254cb2 = 'HFE_254cb2',
  HFE_347mcc3 = 'HFE_347mcc3',
  HFE_347pcf2 = 'HFE_347pcf2',
  HFE_356pcc3 = 'HFE_356pcc3',
  HFE_449sl_HFE_7100 = 'HFE_449sl_HFE_7100',
  HFE_569sf2_HFE_7200 = 'HFE_569sf2_HFE_7200',
  HFE_43_10pccc124_H_Galden1040x = 'HFE_43_10pccc124_H_Galden1040x',
  HFE_236ca12_HG_10 = 'HFE_236ca12_HG_10',
  HFE_338pcc13_HG_01 = 'HFE_338pcc13_HG_01',
  PFPMIE = 'PFPMIE',
  DIMETHYLETHER = 'DIMETHYLETHER',
  METHYLENE_CHLORIDE = 'METHYLENE_CHLORIDE',
  METHYL_CHLORIDE = 'METHYL_CHLORIDE',
  R290_PROPANE = 'R290_PROPANE',
  R600A_ISOBUTANE = 'R600A_ISOBUTANE',
  R1234yf = 'R1234yf',
  R1234ze = 'R1234ze',
  R406A = 'R406A',
  R409A = 'R409A',
  R502 = 'R502',
  R134 = 'R134',
  R449A = 'R449A',
}

export enum WizardModalType {
  CANCEL_CONFIRMATION = 'CANCEL_CONFIRMATION',
  STEPS = 'STEPS',
  EXTERNAL_LINK_DISCLAIMER = 'EXTERNAL_LINK_DISCLAIMER',
}
