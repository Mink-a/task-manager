import { useLoginStore } from '@/store/login.store';

interface FormattedPermissions {
  [roleId: string]: {
    [menuId: string]: string[];
  };
}

export const useCan = (): FormattedPermissions => {
  const userInfo = useLoginStore((state) => state.userInfo);
  const permissions = (userInfo && userInfo.user.Role.Permissions) ?? [];
  return permissions.reduce<FormattedPermissions>((acc, { roleId, actionId, menuId }) => {
    if (!acc[roleId]) {
      acc[roleId] = {};
    }
    if (!acc[roleId][menuId]) {
      acc[roleId][menuId] = [];
    }
    acc[roleId][menuId].push(actionId);
    return acc;
  }, {});
};
