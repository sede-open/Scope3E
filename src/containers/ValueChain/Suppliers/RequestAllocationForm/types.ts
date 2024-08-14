import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { OptionType } from 'components/SingleSelect';

export interface IProps {
  allocation?: EmissionAllocationsQuery_emissionAllocations;
  isEditing: boolean;
  onClose: () => void;
  selectedYear: number;
  yearOptions: number[];
}

export interface FormValues {
  supplier: OptionType;
  year: OptionType;
  note?: string;
}
