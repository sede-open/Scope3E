import { RoleName } from 'types/globalTypes';

export const getRoleName = (role: RoleName | undefined) => {
  switch (role) {
    case RoleName.ADMIN:
      return 'Admin';
    case RoleName.SUPPLIER_EDITOR:
      return 'Editor';
    case RoleName.ACCOUNT_MANAGER:
      return 'Account Manager';
    case RoleName.SUPPLIER_VIEWER:
      return 'Viewer';
    default:
      return '-';
  }
};
