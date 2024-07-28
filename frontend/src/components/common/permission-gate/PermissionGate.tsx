import { cloneElement, ReactElement } from 'react';
import { PERMISSIONS } from '@/config/permissions';
import { useLoginStore } from '@/store/login.store';

interface PageProps {
  children: ReactElement;
  scopes?: string[];
  page?: string;
  errorProps?: any;
  RenderError?: () => JSX.Element;
}

export function PermissionsGate({
  children,
  scopes = [],
  page = 'tasks',
  errorProps = null,
  RenderError = () => <></>,
}: PageProps) {
  const userInfo = useLoginStore((state) => state.userInfo);
  const role = userInfo?.user.role || 'user';
  const rolePermissions =
    PERMISSIONS[role] && PERMISSIONS[role][page] ? PERMISSIONS[role][page] : [];
  const permissionGranted = scopes.every((permission) => rolePermissions.includes(permission));

  if (!permissionGranted && !errorProps) return <RenderError />;

  if (!permissionGranted && errorProps) return cloneElement(children, { ...errorProps });

  return <>{children}</>;
}
