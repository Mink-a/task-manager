import { TextInput, Modal, Button, Stack, ActionIcon, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { Action, actionSchema } from '@/schema/action.schema';
import {
  useCreateActionMutation,
  useDeleteActionMutation,
  useUpdateActionMutation,
} from '../query';

export type ActionFormProps = {
  onSubmit: (values: Action) => void;
  initialValues?: Action;
  onCancel?: () => void;
};

export function ActionForm({ onSubmit, initialValues, onCancel }: ActionFormProps) {
  const form = useForm<Action>({
    initialValues: initialValues ?? {
      name: '',
    },
    validate: zodResolver(actionSchema),
  });

  const handleSubmit = (values: Action) => {
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
  const { mutate: createAction } = useCreateActionMutation();
  const handleCreate = (values: Action) => {
    createAction(values);
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Action">
        <ActionForm onSubmit={handleCreate} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.actions} scopes={[SCOPES.canCreate]}>
        <Button onClick={open}>Add Action</Button>
      </PermissionsGate>
    </>
  );
}

export function UpdateModalButton({ prevValues }: { prevValues: Action }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateAction } = useUpdateActionMutation();

  const handleUpdate = (values: Action) => {
    updateAction(values);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Action">
        <ActionForm onSubmit={handleUpdate} initialValues={prevValues} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.actions} scopes={[SCOPES.canEdit]}>
        <ActionIcon onClick={open} variant="subtle">
          <IconEdit />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}

export function DeleteModalButton({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteAction } = useDeleteActionMutation();

  const handleDelete = () => {
    deleteAction(id);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Action">
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

      <PermissionsGate page={PAGE.actions} scopes={[SCOPES.canDelete]}>
        <ActionIcon onClick={open} variant="subtle" color="red">
          <IconTrash />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}
