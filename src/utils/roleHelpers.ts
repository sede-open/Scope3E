import { RoleName } from 'types/globalTypes';

export const getRoleOptions = (t: any) => [
  {
    value: RoleName.ADMIN,
    label: `${t(`roles:form-role-type-label-${RoleName.ADMIN}`)} ${t(
      `roles:form-role-type-label-${RoleName.ADMIN}-extra-context`
    )}`,
    meta: t(`roles:form-role-type-meta-${RoleName.ADMIN}`),
  },
  {
    value: RoleName.SUPPLIER_EDITOR,
    label: t(`roles:form-role-type-label-${RoleName.SUPPLIER_EDITOR}`),
    meta: t(`roles:form-role-type-meta-${RoleName.SUPPLIER_EDITOR}`),
  },
  {
    value: RoleName.ACCOUNT_MANAGER,
    label: t(`roles:form-role-type-label-${RoleName.ACCOUNT_MANAGER}`),
    meta: t(`roles:form-role-type-meta-${RoleName.ACCOUNT_MANAGER}`),
  },
  {
    value: RoleName.SUPPLIER_VIEWER,
    label: t(`roles:form-role-type-label-${RoleName.SUPPLIER_VIEWER}`),
    meta: t(`roles:form-role-type-meta-${RoleName.SUPPLIER_VIEWER}`),
  },
];

export const getRoleTypeFromRoles = (roles: RoleName[]) => {
  const hasAdminRole = roles.includes(RoleName.ADMIN);
  const hasEditorRole = roles.includes(RoleName.SUPPLIER_EDITOR);
  const hasAccountManagerRole = roles.includes(RoleName.ACCOUNT_MANAGER);
  const hasViewerRole = roles.includes(RoleName.SUPPLIER_VIEWER);

  if (hasAdminRole && hasEditorRole && hasViewerRole) {
    return RoleName.ADMIN;
  }

  if (hasEditorRole && hasViewerRole) {
    return RoleName.SUPPLIER_EDITOR;
  }

  if (hasAccountManagerRole && hasViewerRole) {
    return RoleName.ACCOUNT_MANAGER;
  }

  if (hasViewerRole) {
    return RoleName.SUPPLIER_VIEWER;
  }

  /* If we cannot determine role, assume viewer */
  return RoleName.SUPPLIER_VIEWER;
};

export const getRoleLabel = (roleName: RoleName, t: any) => {
  const roleNameToLabelMap = {
    [RoleName.ADMIN]: t(`roles:form-role-type-label-${RoleName.ADMIN}`),
    [RoleName.SUPPLIER_EDITOR]: t(
      `roles:form-role-type-label-${RoleName.SUPPLIER_EDITOR}`
    ),
    [RoleName.ACCOUNT_MANAGER]: t(
      `roles:form-role-type-label-${RoleName.ACCOUNT_MANAGER}`
    ),
    [RoleName.SUPPLIER_VIEWER]: t(
      `roles:form-role-type-label-${RoleName.SUPPLIER_VIEWER}`
    ),
  };

  return roleNameToLabelMap[roleName] ?? '';
};
