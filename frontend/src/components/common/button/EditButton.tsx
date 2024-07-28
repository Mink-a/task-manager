import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { PermissionsGate } from '../permission-gate/PermissionGate';
import { SCOPES } from '@/config/permissions';

interface EditButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {}

export function EditButton({ ...props }: EditButtonProps) {
  return (
    <PermissionsGate scopes={[SCOPES.canEdit]} errorProps={{ disabled: true }}>
      <Button {...props}>Edit</Button>
    </PermissionsGate>
  );
}
