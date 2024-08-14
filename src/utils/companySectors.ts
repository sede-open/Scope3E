import { CompanySectorType } from 'types/globalTypes';

interface DetailedCompanySectors {
  sectorType: CompanySectorType;
  sector: { name: string };
}

export const companySectorForSectorType = <T extends DetailedCompanySectors>(
  type: CompanySectorType,
  companySectors?: T[] | null
): T['sector'] | null => {
  const companySector = (companySectors ?? []).find(
    (cs) => cs.sectorType === CompanySectorType[type]
  );

  return companySector?.sector ?? null;
};

export const companySectorsPrimarySectorName = <
  T extends DetailedCompanySectors
>(
  companySectors?: T[] | null
) => {
  const sector = companySectorForSectorType(
    CompanySectorType.PRIMARY,
    companySectors
  );

  return sector?.name ?? null;
};

export const companySectorsSecondarySectorName = <
  T extends DetailedCompanySectors
>(
  companySectors?: T[] | null
) => {
  const sector = companySectorForSectorType(
    CompanySectorType.SECONDARY,
    companySectors
  );

  return sector?.name ?? null;
};
