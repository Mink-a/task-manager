import { TextInput, Modal, Button, Stack, ActionIcon, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { User, userSchema } from '@/schema/users.schema';
import { useDeleteUserMutation, useUpdateUserMutation } from '../query';
import { RolesSelect } from '@/components/inputs/RolesSelect';

export type UserFormProps = {
  onSubmit: (values: User) => void;
  initialValues?: User;
  onCancel?: () => void;
};

export function UserForm({ onSubmit, initialValues, onCancel }: UserFormProps) {
  const form = useForm<User>({
    initialValues: initialValues ?? {
      id: undefined,
      username: '',
      loginId: '',
      deptCode: '',
      roleId: '',
    },
    validate: zodResolver(userSchema),
  });

  const handleSubmit = (values: User) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          readOnly
          withAsterisk
          label="Username"
          placeholder="Enter username"
          {...form.getInputProps('username')}
        />
        <TextInput
          readOnly
          withAsterisk
          label="Login ID"
          placeholder="Enter login ID"
          {...form.getInputProps('loginId')}
        />
        <TextInput
          readOnly
          withAsterisk
          label="Dept Code"
          placeholder="Enter dept code"
          {...form.getInputProps('deptCode')}
        />
        <RolesSelect
          withAsterisk
          {...form.getInputProps('roleId')}
          placeholder="Select role"
          label="Role"
        />
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

export function UpdateModalButton({ prevValues }: { prevValues: User }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateUser } = useUpdateUserMutation();

  const handleUpdate = (values: User) => {
    updateUser(values);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update User">
        <UserForm onSubmit={handleUpdate} initialValues={prevValues} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.menus} scopes={[SCOPES.canEdit]}>
        <ActionIcon onClick={open} variant="subtle">
          <IconEdit />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}

export function DeleteModalButton({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteUser } = useDeleteUserMutation();

  const handleDelete = () => {
    deleteUser(id);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete User">
        <Stack>
          <Text>Are you sure you want to delete this action?</Text>
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

      <PermissionsGate page={PAGE.menus} scopes={[SCOPES.canDelete]}>
        <ActionIcon onClick={open} variant="subtle" color="red">
          <IconTrash />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}
