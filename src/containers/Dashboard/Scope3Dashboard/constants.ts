type Tabs = { value: string; label: string };

export enum Scope3PieChartKeys {
  SCOPE3 = 'scope3',
  UNALLOCATED_EMISSIONS = 'unallocatedEmissions',
  ALLOCATED_EMISSIONS = 'allocatedEmissions',
  FILLER_VALUE = 'fillerValue',
}

export const TabOptions = {
  CATEGORIES: 'CATEGORIES',
  SECTORS: 'SECTORS',
};

export const scope3DashboardTabs: Tabs[] = [
  { value: TabOptions.CATEGORIES, label: 'scope3Dashboard:tabs-categories' },
  { value: TabOptions.SECTORS, label: 'scope3Dashboard:tabs-sectors' },
];
