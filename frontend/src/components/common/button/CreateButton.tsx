import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { PermissionsGate } from '../permission-gate/PermissionGate';
import { SCOPES } from '@/config/permissions';

interface CreateButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {}

export function CreateButton({ ...props }: CreateButtonProps) {
  return (
    <PermissionsGate scopes={[SCOPES.canCreate]} errorProps={{ disabled: true }}>
      <Button {...props}>Create</Button>
    </PermissionsGate>
  );
}
