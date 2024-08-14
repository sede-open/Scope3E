import { Scope2Type } from 'types/globalTypes';

import {
  ElectricityGridTypes,
  HeatCoolingGridTypes,
  SCOPE2_SOURCE_FIELD_KEYS,
  WizardState,
} from '../../types';

export const getScope2Type = (wizardState: WizardState) => {
  const electricitySourceForLocation = wizardState.electricitySources.find(
    (source) =>
      source[SCOPE2_SOURCE_FIELD_KEYS.GRID_FACTOR_TYPE]?.value ===
      ElectricityGridTypes.LOCATION
  );

  const heatCoolingSourceForLocation = wizardState.heatCoolingSources.find(
    (source) =>
      source[SCOPE2_SOURCE_FIELD_KEYS.GRID_FACTOR_TYPE]?.value ===
      HeatCoolingGridTypes.DEFRA
  );

  return electricitySourceForLocation || heatCoolingSourceForLocation
    ? Scope2Type.LOCATION
    : Scope2Type.MARKET;
};
