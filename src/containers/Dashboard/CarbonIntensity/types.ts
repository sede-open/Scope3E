import { DashboardDataQuery_corporateEmissions as Emission } from 'types/DashboardDataQuery';

export interface IProps {
  baseline: Emission;
  emissions: Emission[];
}
