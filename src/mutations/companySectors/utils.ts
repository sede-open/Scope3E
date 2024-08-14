import {
  CompanySectorType,
  UpdateCompanySectorsInput,
} from 'types/globalTypes';
import { UnfilteredSectorInput, UnfilteredUpdateCompanySectorsInput } from '.';

export const removeNullishCompanySectors = (
  sectorInput: UnfilteredSectorInput
): sectorInput is {
  sectorType: CompanySectorType;
  id: string;
} => !!sectorInput.id;

export const isValidCompanySectorUpdateData = (
  data: UpdateCompanySectorsInput | UnfilteredUpdateCompanySectorsInput
) =>
  data.companyId &&
  data.sectors.find(
    (companySector) =>
      companySector.sectorType === CompanySectorType.PRIMARY && companySector.id
  );
