import { TextInput, Modal, Button, Stack, ActionIcon, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { Role, roleSchema } from '@/schema/role.schema';
import {
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useGetMenusQuery,
  useUpdateRoleMutation,
} from '../query';
import { ActionsSelect } from '@/components/inputs/ActionsSelect';

export type RoleFormProps = {
  onSubmit: (values: Role) => void;
  initialValues?: Role;
  onCancel?: () => void;
};

export function TaskForm({ onSubmit, initialValues, onCancel }: RoleFormProps) {
  const [permissions, setPermissions] = useState<Array<{ actionId: string; menuId: string }>>(
    initialValues?.Permissions ?? []
  );

  const { data: menus, isPending: isMenusPending } = useGetMenusQuery();

  const form = useForm<Role>({
    initialValues: initialValues ?? {
      name: '',
      Permissions: [
        {
          actionId: 'view',
          menuId: 'dashboard',
        },
      ],
    },
    validate: zodResolver(roleSchema),
  });

  const handleSubmit = (values: Role) => {
    onSubmit({ ...values, Permissions: permissions });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Enter title"
          {...form.getInputProps('name')}
        />
        {!isMenusPending &&
          menus?.data.map((menu) => (
            <ActionsSelect
              key={menu.id}
              permissions={permissions}
              setPermissions={setPermissions}
              menuId={menu.name}
              {...form.getInputProps('Permissions')}
            />
          ))}
        <Group>
          <Button type="submit">Submit</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export function CreateModalButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: createRole } = useCreateRoleMutation();
  const handleCreate = (values: Role) => {
    createRole(values);
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Role">
        <TaskForm onSubmit={handleCreate} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.roles} scopes={[SCOPES.canCreate]}>
        <Button onClick={open}>Add Role</Button>
      </PermissionsGate>
    </>
  );
}

export function UpdateModalButton({ prevValues }: { prevValues: Role }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateRole } = useUpdateRoleMutation();

  const handleUpdate = (values: Role) => {
    updateRole(values);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Role">
        <TaskForm onSubmit={handleUpdate} initialValues={prevValues} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.roles} scopes={[SCOPES.canEdit]}>
        <ActionIcon onClick={open} variant="subtle">
          <IconEdit />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}

export function DeleteModalButton({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteRole } = useDeleteRoleMutation();

  const handleDelete = () => {
    deleteRole(id);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Role">
        <Stack>
          <Text>Are you sure you want to delete this role?</Text>
          <Group justify="flex-end">
            <Button onClick={handleDelete} color="red">
              Delete
            </Button>
            <Button type="button" variant="outline" onClick={close}>
              Cancel
            </Button>
          </Group>
        </Stack>
      </Modal>

      <PermissionsGate page={PAGE.roles} scopes={[SCOPES.canDelete]}>
        <ActionIcon onClick={open} variant="subtle" color="red">
          <IconTrash />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}
