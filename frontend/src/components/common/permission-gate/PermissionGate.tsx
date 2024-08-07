import { cloneElement, ReactElement } from 'react';
import { useLoginStore } from '@/store/login.store';
import { useCan } from '@/hooks/useCan';

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
  page = '',
  errorProps = null,
  RenderError = () => <></>,
}: PageProps) {
  const role = useLoginStore((state) => state.userInfo?.user.Role.name) || 'user';
  const rolePermissionsMap = useCan();
  const rolePermissions =
    rolePermissionsMap?.[role] && rolePermissionsMap?.[role][page]
      ? rolePermissionsMap?.[role][page]
      : [];

  const permissionGranted = scopes.every((permission) => rolePermissions.includes(permission));

  if (!permissionGranted && !errorProps) return <RenderError />;

  if (!permissionGranted && errorProps) return cloneElement(children, { ...errorProps });

  return <>{children}</>;
}
