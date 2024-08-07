import { TextInput, Modal, Button, Stack, ActionIcon, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { Menu, menuSchema } from '@/schema/menu.schema';
import { useCreateMenuMutation, useDeleteMenuMutation, useUpdateMenuMutation } from '../query';

export type MenuFormProps = {
  onSubmit: (values: Menu) => void;
  initialValues?: Menu;
  onCancel?: () => void;
};

export function MenuForm({ onSubmit, initialValues, onCancel }: MenuFormProps) {
  const form = useForm<Menu>({
    initialValues: initialValues ?? {
      name: '',
    },
    validate: zodResolver(menuSchema),
  });

  const handleSubmit = (values: Menu) => {
    onSubmit(values);
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
  const { mutate: createMenu } = useCreateMenuMutation();
  const handleCreate = (values: Menu) => {
    createMenu(values);
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Menu">
        <MenuForm onSubmit={handleCreate} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.menus} scopes={[SCOPES.canCreate]}>
        <Button onClick={open}>Add Menu</Button>
      </PermissionsGate>
    </>
  );
}

export function UpdateModalButton({ prevValues }: { prevValues: Menu }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateMenu } = useUpdateMenuMutation();

  const handleUpdate = (values: Menu) => {
    updateMenu(values);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Menu">
        <MenuForm onSubmit={handleUpdate} initialValues={prevValues} onCancel={close} />
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
  const { mutate: deleteMenu } = useDeleteMenuMutation();

  const handleDelete = () => {
    deleteMenu(id);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Menu">
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
