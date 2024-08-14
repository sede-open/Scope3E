import {
  CompanySectorType,
  UpdateCompanySectorsInput,
} from 'types/globalTypes';

export type UnfilteredSectorInput = {
  id: string | undefined;
  sectorType: CompanySectorType;
};

export type UnfilteredUpdateCompanySectorsInput = Omit<
  UpdateCompanySectorsInput,
  'sectors'
> & {
  sectors: UnfilteredSectorInput[];
};
