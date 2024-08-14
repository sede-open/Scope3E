import { useContext } from 'react';
import { CarbonIntensityConfigContext } from 'context/CarbonIntensityConfigProvider/CarbonIntensityConfigContext';

export const useCarbonIntensityConfig = () =>
  useContext(CarbonIntensityConfigContext);
