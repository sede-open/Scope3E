import { OptionType } from 'components/SingleSelect';
import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';

export interface IProps {
  allocation?: EmissionAllocationsQuery_emissionAllocations;
  isEditing: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selectedYear: number;
  yearOptions: number[];
}

export interface FormValues {
  allocationMethod: OptionType;
  customer: OptionType;
  emissions: string;
  year: OptionType;
}
