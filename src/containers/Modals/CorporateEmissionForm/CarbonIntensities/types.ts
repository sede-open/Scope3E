import { Control, FieldError } from 'react-hook-form';
import { CarbonIntensityValues, FIELD_KEYS } from '../types';

export interface IProps {
  isDisabled: boolean;
  carbonIntensities: CarbonIntensityValues[];
  control: Control<Record<string, any>>;
  errors: {
    [FIELD_KEYS.CARBON_INTENSITIES]?: (FieldError | any)[]; // any is used as undefined blows up typescript
  };
}
