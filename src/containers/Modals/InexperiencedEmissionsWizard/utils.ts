import {
  WizardState,
  WizardFieldKeys,
  EMISSION_YEAR_FIELD_KEYS,
  SCOPE_1_SOURCE_FIELD_KEYS,
  SCOPE_2_SOURCE_FIELD_KEYS,
  FuelName,
  InexperiencedFlowSteps,
  ProcessRefrigerantName,
} from './types';

export const getDefaultFormValues = (
  fields: WizardFieldKeys[],
  wizardState: WizardState
) =>
  fields.reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: wizardState[cur],
    }),
    {}
  );

export const getInitialSteps = () => [
  InexperiencedFlowSteps.SELECT_EMISSION_YEAR,
  InexperiencedFlowSteps.SELECT_SCOPE_1_SOURCES,
  InexperiencedFlowSteps.SELECT_SCOPE_2_SOURCES,
  InexperiencedFlowSteps.DATA_NEEDED_OVERVIEW,
];

export const getInitialWizardState = () => ({
  [EMISSION_YEAR_FIELD_KEYS.EMISSION_YEAR]: undefined,
  [SCOPE_1_SOURCE_FIELD_KEYS.STATIONARY_MOBILE_COMBUSTION]: false,
  [SCOPE_1_SOURCE_FIELD_KEYS.INDUSTRIAL_PROCESS_AND_REFRIGIRANTS]: false,
  [SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_ELECTRICITY]: false,
  [SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_HEAT_COOLING]: false,
  steps: getInitialSteps(),
  stationaryCombustionTotal: 0,
  stationaryCombustionSources: [],
  processRefrigerantsTotal: 0,
  processRefrigerantsSources: [],
  electricityTotal: 0,
  electricitySources: [],
  heatCoolingTotal: 0,
  heatCoolingSources: [],
});

export enum FuelUnits {
  LITRES = 'L',
  KG = 'kg',
}

export const FUEL_EMISSIONS_PER_UNIT_IN_TCO2: {
  [name in FuelName]: { unit: FuelUnits; tco2PerUnit: number };
} = {
  [FuelName.CNG]: { unit: FuelUnits.LITRES, tco2PerUnit: 0.00044327 },
  [FuelName.LNG]: { unit: FuelUnits.LITRES, tco2PerUnit: 0.00115041 },
  [FuelName.LPG]: { unit: FuelUnits.LITRES, tco2PerUnit: 0.00155537 },
  [FuelName.NATURAL_GAS]: { unit: FuelUnits.KG, tco2PerUnit: 0.002533 },
  [FuelName.NATURAL_GAS_MINERAL]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.00254241,
  },
  [FuelName.OTHER_PETROLEUM]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.00095279,
  },
  [FuelName.AVIATION_SPIRIT]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.00229082,
  },
  [FuelName.AVIATION_TURBINE_FUEL]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.0025431,
  },
  [FuelName.BURNING_OIL]: { unit: FuelUnits.LITRES, tco2PerUnit: 0.00254039 },
  [FuelName.DIESEL_BIOFUEL_BLEND]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.00254603,
  },
  [FuelName.DIESEL_MINERAL]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.00268787,
  },
  [FuelName.FUEL_OIL]: { unit: FuelUnits.LITRES, tco2PerUnit: 0.00318317 },
  [FuelName.GAS_OIL]: { unit: FuelUnits.LITRES, tco2PerUnit: 0.00275776 },
  [FuelName.LUBRICANTS]: { unit: FuelUnits.KG, tco2PerUnit: 0.00318142 },
  [FuelName.NAPHTHA]: { unit: FuelUnits.KG, tco2PerUnit: 0.00314287 },
  [FuelName.PETROL_BIOFUEL_BLEND]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.00216802,
  },
  [FuelName.PETROL_MINERAL]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.00231467,
  },
  [FuelName.PROCESSED_FUEL_OILS_RESIDUAL]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.00318317,
  },
  [FuelName.PROCESSED_FUEL_OILS_DISTILLATE]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.00275776,
  },
  [FuelName.REFINERY_MISCELLANEOUS]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.00294482,
  },
  [FuelName.WASTE_OILS]: { unit: FuelUnits.KG, tco2PerUnit: 0.00322458 },
  [FuelName.MARINE_GAS_OIL]: { unit: FuelUnits.LITRES, tco2PerUnit: 0.0027754 },
  [FuelName.MARINE_FUEL_OIL]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.00312204,
  },
  [FuelName.COAL_INDUSTRIAL]: { unit: FuelUnits.KG, tco2PerUnit: 0.00238001 },
  [FuelName.COAL_ELECTRICITY_GENERATION]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.00222294,
  },
  [FuelName.COAL_DOMESTIC]: { unit: FuelUnits.KG, tco2PerUnit: 0.00288326 },
  [FuelName.COAL_COKING]: { unit: FuelUnits.KG, tco2PerUnit: 0.00322204 },
  [FuelName.PETROLEUM_COKE]: { unit: FuelUnits.KG, tco2PerUnit: 0.00339779 },
  [FuelName.COAL_ELECTRICITY_GENERATION_HOME]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.00221947,
  },
  [FuelName.BIOETHANOL]: { unit: FuelUnits.LITRES, tco2PerUnit: 0.00000837 },
  [FuelName.BIODIESEL]: { unit: FuelUnits.LITRES, tco2PerUnit: 0.0001658 },
  [FuelName.BIOMETHANE]: { unit: FuelUnits.KG, tco2PerUnit: 0.00000518 },
  [FuelName.BIODIESEL_COOKING_OIL]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.0001658,
  },
  [FuelName.BIODIESEL_TALLOW]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.0001658,
  },
  [FuelName.E5]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.0021996685,
  },
  [FuelName.E10]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.002084337,
  },
  [FuelName.E20]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.001853674,
  },
  [FuelName.E30]: {
    unit: FuelUnits.LITRES,
    tco2PerUnit: 0.001623011,
  },
};

export const PROCESS_REFRIGERANT_EMISSIONS_PER_UNIT_IN_TCO2: {
  [name in ProcessRefrigerantName]: { unit: FuelUnits; tco2PerUnit: number };
} = {
  [ProcessRefrigerantName.CARBON_DIOXIDE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.001,
  },
  [ProcessRefrigerantName.METHANE]: { unit: FuelUnits.KG, tco2PerUnit: 0.025 },
  [ProcessRefrigerantName.NITROUS_OXIDE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.298,
  },
  [ProcessRefrigerantName.HFC_23]: { unit: FuelUnits.KG, tco2PerUnit: 14.8 },
  [ProcessRefrigerantName.HFC_32]: { unit: FuelUnits.KG, tco2PerUnit: 0.675 },
  [ProcessRefrigerantName.HFC_41]: { unit: FuelUnits.KG, tco2PerUnit: 0.092 },
  [ProcessRefrigerantName.HFC_125]: { unit: FuelUnits.KG, tco2PerUnit: 3.5 },
  [ProcessRefrigerantName.HFC_134]: { unit: FuelUnits.KG, tco2PerUnit: 1.1 },
  [ProcessRefrigerantName.HFC_134a]: { unit: FuelUnits.KG, tco2PerUnit: 1.43 },
  [ProcessRefrigerantName.HFC_143]: { unit: FuelUnits.KG, tco2PerUnit: 0.353 },
  [ProcessRefrigerantName.HFC_143a]: { unit: FuelUnits.KG, tco2PerUnit: 4.47 },
  [ProcessRefrigerantName.HFC_152a]: { unit: FuelUnits.KG, tco2PerUnit: 0.124 },
  [ProcessRefrigerantName.HFC_227ea]: { unit: FuelUnits.KG, tco2PerUnit: 3.22 },
  [ProcessRefrigerantName.HFC_236fa]: { unit: FuelUnits.KG, tco2PerUnit: 9.81 },
  [ProcessRefrigerantName.HFC_245fa]: { unit: FuelUnits.KG, tco2PerUnit: 1.03 },
  [ProcessRefrigerantName.HFC_43_I0mee]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 1.64,
  },
  [ProcessRefrigerantName.PERFLUOROMETHANE_PFC_14]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 7.39,
  },
  [ProcessRefrigerantName.PERFLUOROETHANE_PFC_116]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 12.2,
  },
  [ProcessRefrigerantName.PERFLUOROPROPOANE_PFC_218]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 8.83,
  },
  [ProcessRefrigerantName.PERFLUOROCYCLOBUTANE_PFC_318]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 10.3,
  },
  [ProcessRefrigerantName.PERFLUOROBUTANE_PFC_3_1_10]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 8.86,
  },
  [ProcessRefrigerantName.PERFLUOROPENTANE_PFC_4_1_12]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 9.16,
  },
  [ProcessRefrigerantName.PERFLUOROHEXANE_PFC_5_1_14]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 9.3,
  },
  [ProcessRefrigerantName.SULPHUR_HEXAFLUORIDE_SF6]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 22.8,
  },
  [ProcessRefrigerantName.HFC_152]: { unit: FuelUnits.KG, tco2PerUnit: 0.053 },
  [ProcessRefrigerantName.HFC_161]: { unit: FuelUnits.KG, tco2PerUnit: 0.012 },
  [ProcessRefrigerantName.HFC_236cb]: { unit: FuelUnits.KG, tco2PerUnit: 1.34 },
  [ProcessRefrigerantName.HFC_236ea]: { unit: FuelUnits.KG, tco2PerUnit: 1.37 },
  [ProcessRefrigerantName.HFC_245ca]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.693,
  },
  [ProcessRefrigerantName.HFC_365mfc]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.794,
  },
  [ProcessRefrigerantName.R404A]: { unit: FuelUnits.KG, tco2PerUnit: 3.922 },
  [ProcessRefrigerantName.R407A]: { unit: FuelUnits.KG, tco2PerUnit: 2.107 },
  [ProcessRefrigerantName.R407C]: { unit: FuelUnits.KG, tco2PerUnit: 1.774 },
  [ProcessRefrigerantName.R407F]: { unit: FuelUnits.KG, tco2PerUnit: 1.825 },
  [ProcessRefrigerantName.R408A]: { unit: FuelUnits.KG, tco2PerUnit: 3.152 },
  [ProcessRefrigerantName.R410A]: { unit: FuelUnits.KG, tco2PerUnit: 2.088 },
  [ProcessRefrigerantName.R507A]: { unit: FuelUnits.KG, tco2PerUnit: 3.985 },
  [ProcessRefrigerantName.R508B]: { unit: FuelUnits.KG, tco2PerUnit: 13.396 },
  [ProcessRefrigerantName.R403A]: { unit: FuelUnits.KG, tco2PerUnit: 3.124 },
  [ProcessRefrigerantName.CFC_11_R11_TRICHLOROFLUOROMETHANE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 4.75,
  },
  [ProcessRefrigerantName.CFC_12_R12_DICHLORODIFLUOROMETHANE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 10.9,
  },
  [ProcessRefrigerantName.CFC_13]: { unit: FuelUnits.KG, tco2PerUnit: 14.4 },
  [ProcessRefrigerantName.CFC_113]: { unit: FuelUnits.KG, tco2PerUnit: 6.13 },
  [ProcessRefrigerantName.CFC_114]: { unit: FuelUnits.KG, tco2PerUnit: 10 },
  [ProcessRefrigerantName.CFC_115]: { unit: FuelUnits.KG, tco2PerUnit: 7.37 },
  [ProcessRefrigerantName.HALON_1211]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 1.89,
  },
  [ProcessRefrigerantName.HALON_1301]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 7.14,
  },
  [ProcessRefrigerantName.HALON_2402]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 1.64,
  },
  [ProcessRefrigerantName.CARBON_TETRACHLORIDE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 1.4,
  },
  [ProcessRefrigerantName.METHYL_BROMIDE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.005,
  },
  [ProcessRefrigerantName.METHYL_CHLOROFORM]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.146,
  },
  [ProcessRefrigerantName.HCFC_22_R22_CHLORODIFLUOROMETHANE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 1.81,
  },
  [ProcessRefrigerantName.HCFC_123]: { unit: FuelUnits.KG, tco2PerUnit: 0.077 },
  [ProcessRefrigerantName.HCFC_124]: { unit: FuelUnits.KG, tco2PerUnit: 0.609 },
  [ProcessRefrigerantName.HCFC_141b]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.725,
  },
  [ProcessRefrigerantName.HCFC_142b]: { unit: FuelUnits.KG, tco2PerUnit: 2.31 },
  [ProcessRefrigerantName.HCFC_225ca]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.122,
  },
  [ProcessRefrigerantName.HCFC_225cb]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.595,
  },
  [ProcessRefrigerantName.HCFC_21]: { unit: FuelUnits.KG, tco2PerUnit: 0.151 },
  [ProcessRefrigerantName.NITROGEN_TRIFLUORIDE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 17.2,
  },
  [ProcessRefrigerantName.PFC_9_1_18]: { unit: FuelUnits.KG, tco2PerUnit: 7.5 },
  [ProcessRefrigerantName.TRIFLUOROMETHYL_SULPHUR_PENTAFLUORIDE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 17.7,
  },
  [ProcessRefrigerantName.PERFLUOROCYCLOPROPANE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 17.34,
  },
  [ProcessRefrigerantName.HFE_125]: { unit: FuelUnits.KG, tco2PerUnit: 14.9 },
  [ProcessRefrigerantName.HFE_134]: { unit: FuelUnits.KG, tco2PerUnit: 6.32 },
  [ProcessRefrigerantName.HFE_143a]: { unit: FuelUnits.KG, tco2PerUnit: 0.756 },
  [ProcessRefrigerantName.HCFE_235da2]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.35,
  },
  [ProcessRefrigerantName.HFE_245cb2]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.708,
  },
  [ProcessRefrigerantName.HFE_245fa2]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.659,
  },
  [ProcessRefrigerantName.HFE_254cb2]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.359,
  },
  [ProcessRefrigerantName.HFE_347mcc3]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.575,
  },
  [ProcessRefrigerantName.HFE_347pcf2]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.58,
  },
  [ProcessRefrigerantName.HFE_356pcc3]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.11,
  },
  [ProcessRefrigerantName.HFE_449sl_HFE_7100]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.297,
  },
  [ProcessRefrigerantName.HFE_569sf2_HFE_7200]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.059,
  },
  [ProcessRefrigerantName.HFE_43_10pccc124_H_Galden1040x]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 1.87,
  },
  [ProcessRefrigerantName.HFE_236ca12_HG_10]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 2.8,
  },
  [ProcessRefrigerantName.HFE_338pcc13_HG_01]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 1.5,
  },
  [ProcessRefrigerantName.PFPMIE]: { unit: FuelUnits.KG, tco2PerUnit: 10.3 },
  [ProcessRefrigerantName.DIMETHYLETHER]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.001,
  },
  [ProcessRefrigerantName.METHYLENE_CHLORIDE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.009,
  },
  [ProcessRefrigerantName.METHYL_CHLORIDE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.013,
  },
  [ProcessRefrigerantName.R290_PROPANE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.003,
  },
  [ProcessRefrigerantName.R600A_ISOBUTANE]: {
    unit: FuelUnits.KG,
    tco2PerUnit: 0.003,
  },
  [ProcessRefrigerantName.R1234yf]: { unit: FuelUnits.KG, tco2PerUnit: 0.001 },
  [ProcessRefrigerantName.R1234ze]: { unit: FuelUnits.KG, tco2PerUnit: 0.001 },
  [ProcessRefrigerantName.R406A]: { unit: FuelUnits.KG, tco2PerUnit: 1.943 },
  [ProcessRefrigerantName.R409A]: { unit: FuelUnits.KG, tco2PerUnit: 1.585 },
  [ProcessRefrigerantName.R502]: { unit: FuelUnits.KG, tco2PerUnit: 4.657 },
  [ProcessRefrigerantName.R134]: { unit: FuelUnits.KG, tco2PerUnit: 1.3 },
  [ProcessRefrigerantName.R449A]: { unit: FuelUnits.KG, tco2PerUnit: 1.397 },
};

export const getWizardSteps = (wizardState: WizardState) => {
  const updatedSteps = getInitialSteps();

  if (wizardState[SCOPE_1_SOURCE_FIELD_KEYS.STATIONARY_MOBILE_COMBUSTION]) {
    updatedSteps.push(InexperiencedFlowSteps.STATIONARY_MOBILE_COMBUSTION_FORM);
  }

  if (
    wizardState[SCOPE_1_SOURCE_FIELD_KEYS.INDUSTRIAL_PROCESS_AND_REFRIGIRANTS]
  ) {
    updatedSteps.push(InexperiencedFlowSteps.PROCESS_REFRIGERANT_FORM);
  }

  if (wizardState[SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_ELECTRICITY]) {
    updatedSteps.push(InexperiencedFlowSteps.ELECTRICITY_FORM);
  }

  if (wizardState[SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_HEAT_COOLING]) {
    updatedSteps.push(InexperiencedFlowSteps.HEAT_COOLING_FORM);
  }

  updatedSteps.push(InexperiencedFlowSteps.SUMMARY);

  return updatedSteps;
};

export const getWizardStateWithEmissionResets = (
  updates: Partial<WizardState>
) => {
  const newWizardState: Partial<WizardState> = {};

  if (
    updates[SCOPE_1_SOURCE_FIELD_KEYS.STATIONARY_MOBILE_COMBUSTION] === false
  ) {
    newWizardState.stationaryCombustionSources = [];
    newWizardState.stationaryCombustionTotal = 0;
  }

  if (
    updates[SCOPE_1_SOURCE_FIELD_KEYS.INDUSTRIAL_PROCESS_AND_REFRIGIRANTS] ===
    false
  ) {
    newWizardState.processRefrigerantsSources = [];
    newWizardState.processRefrigerantsTotal = 0;
  }

  if (updates[SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_ELECTRICITY] === false) {
    newWizardState.electricitySources = [];
    newWizardState.electricityTotal = 0;
  }

  if (updates[SCOPE_2_SOURCE_FIELD_KEYS.PURCHASED_HEAT_COOLING] === false) {
    newWizardState.heatCoolingSources = [];
    newWizardState.heatCoolingTotal = 0;
  }

  return newWizardState;
};

export const isCancelConfirmationStep = (currentStep: InexperiencedFlowSteps) =>
  [
    InexperiencedFlowSteps.STATIONARY_MOBILE_COMBUSTION_FORM,
    InexperiencedFlowSteps.PROCESS_REFRIGERANT_FORM,
    InexperiencedFlowSteps.ELECTRICITY_FORM,
    InexperiencedFlowSteps.HEAT_COOLING_FORM,
    InexperiencedFlowSteps.SUMMARY,
  ].includes(currentStep);
