import {
  TargetsQuery_targets,
  TargetsQuery_targets_intensity as IntensityTarget,
} from 'types/TargetsQuery';
import { DashboardDataQuery_target as Target } from 'types/DashboardDataQuery';

// NOTE :: at the moment a user can only set one intensity target
// but API supports multiple
export const getIntensityTarget = (targeData?: TargetsQuery_targets | null) =>
  targeData?.intensity[0];

export const getLastTargetYear = (target?: IntensityTarget | Target | null) =>
  target && target.scope3Year && target.scope3Year > target.scope1And2Year
    ? target?.scope3Year
    : target?.scope1And2Year;
