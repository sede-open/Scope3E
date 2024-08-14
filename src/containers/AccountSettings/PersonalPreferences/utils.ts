import { RoleName } from 'types/globalTypes';
import { UserSolutionInterestsQuery_userSolutionInterests } from 'types/UserSolutionInterestsQuery';

export const getUserRoleName = (t: any, roleName: RoleName | undefined) =>
  roleName === undefined ? '-' : t(`accountSettings:role-${roleName}`);

export const getUserSolutionInterestsList = (
  t: any,
  userSolutionInterests: UserSolutionInterestsQuery_userSolutionInterests[]
) =>
  userSolutionInterests
    .map(({ solutionInterest: { systemName } }) =>
      t(`solutionInterests:${systemName}`)
    )
    .join(', ');
