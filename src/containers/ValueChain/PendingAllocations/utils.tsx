import moment from 'moment';

import { EmissionAllocationsQuery_emissionAllocations } from 'types/EmissionAllocationsQuery';
import { CorporateEmissionsQuery_corporateEmissions } from 'types/CorporateEmissionsQuery';

export const comparePendingAllocations = (
  allocation1: EmissionAllocationsQuery_emissionAllocations,
  allocation2: EmissionAllocationsQuery_emissionAllocations
) => {
  if (moment(allocation1.createdAt).isAfter(allocation2.createdAt)) {
    return -1;
  }

  if (moment(allocation1.createdAt).isBefore(allocation2.createdAt)) {
    return 1;
  }

  return 0;
};

export const getEmissionForYear = ({
  year,
  emissions,
}: {
  year: number;
  emissions: CorporateEmissionsQuery_corporateEmissions[];
}) => emissions.find(({ year: emissionYear }) => emissionYear === year);
