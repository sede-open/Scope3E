import { EmissionAllocationStatus } from 'types/globalTypes';
import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';
import { Scope3DashboardAllocationsQuery_emissionAllocations } from 'types/Scope3DashboardAllocationsQuery';
import { round } from 'utils/number';
import { companySectorsPrimarySectorName } from 'utils/companySectors';

export const getYearOptions = (emissions: Emission[]) =>
  emissions ? emissions.map(({ year }) => year).sort((a, b) => b - a) : [];

export const getTotalAllocatedEmissions = (
  allocations: Scope3DashboardAllocationsQuery_emissionAllocations[]
) =>
  allocations.reduce(
    (acc, { emissions, status }) =>
      status !== EmissionAllocationStatus.REJECTED
        ? acc + Number(emissions)
        : acc,
    0
  );

export const getScope3TotalForYear = (
  emissions: Emission[],
  selectedYear: number
) => {
  const emissionForYear = emissions.find(
    (emission) => emission.year === selectedYear
  );

  return emissionForYear?.scope3 ?? 0;
};

export const getTotalUnallocatedEmissions = (
  totalAllocatedEmissions: number,
  scope3Total: number | null
) => {
  if (!scope3Total) {
    return 0;
  }
  if (!totalAllocatedEmissions) {
    return scope3Total;
  }
  const totalUnallocatedEmissions = scope3Total - totalAllocatedEmissions;
  return totalUnallocatedEmissions;
};

export const setChartPadding = (hasAllocatedEmissions: boolean) => {
  if (hasAllocatedEmissions) {
    return 5;
  }
  return 0;
};

export const getPercentAllocated = (
  emissionsTotal: number,
  allocatedPartTotal: number
) => {
  if (emissionsTotal === 0) {
    return 0;
  }
  return Number(round((allocatedPartTotal * 100) / emissionsTotal));
};

export const sortCategoriesByEmissionTotal = (
  allocations: Scope3DashboardAllocationsQuery_emissionAllocations[]
) =>
  Array.from(
    allocations.reduce(
      (m, { category, emissions }) =>
        m.set(category, (m.get(category) || 0) + emissions),
      new Map()
    ),
    ([category, emissions]) => ({ category, emissions })
  ).sort((a, b) => (b.emissions || 0) - (a.emissions || 0));

export const sortSectorsByEmissionTotal = (
  allocations: Scope3DashboardAllocationsQuery_emissionAllocations[]
) =>
  Array.from(
    allocations.reduce((m, { supplier, emissions }) => {
      const primarySector =
        supplier && companySectorsPrimarySectorName(supplier.companySectors);
      return m.set(primarySector, (m.get(primarySector) || 0) + emissions);
    }, new Map()),
    ([primarySector, emissions]) => ({ primarySector, emissions })
  ).sort((a, b) => (b.emissions || 0) - (a.emissions || 0));

export const getCategoryName = (t: any, systemName: string) =>
  t(`categories:${systemName}`);
