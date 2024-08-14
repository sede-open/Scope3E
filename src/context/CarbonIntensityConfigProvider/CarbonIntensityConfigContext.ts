import { createContext } from 'react';

import { CarbonIntensityConfigQuery_carbonIntensityConfig as CarbonIntensityConfig } from 'types/CarbonIntensityConfigQuery';

export const defaultConfig = [];

export const CarbonIntensityConfigContext = createContext<
  CarbonIntensityConfig[]
>(defaultConfig);
