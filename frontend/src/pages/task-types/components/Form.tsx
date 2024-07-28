import { TextInput, Modal, Button, Stack, ActionIcon, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { TaskType, taskTypeSchema } from '@/schema/task-type.schema';
import {
  useCreateTaskTypeMutation,
  useDeleteTaskTypeMutation,
  useUpdateTaskTypeMutation,
} from '../query';

export type TaskTypeFormProps = {
  onSubmit: (values: TaskType) => void;
  initialValues?: TaskType;
  onCancel?: () => void;
};

export function TaskForm({ onSubmit, initialValues, onCancel }: TaskTypeFormProps) {
  const form = useForm<TaskType>({
    initialValues: initialValues ?? {
      id: undefined,
      name: '',
    },
    validate: zodResolver(taskTypeSchema),
  });

  const handleSubmit = (values: TaskType) => onSubmit(values);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Enter title"
          {...form.getInputProps('name')}
        />
        <Group justify="flex-end">
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
  const { mutate: createTask } = useCreateTaskTypeMutation();
  const handleCreate = (values: TaskType) => {
    const { id, ...task } = values;
    createTask(task);
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Create Task Type">
        <TaskForm onSubmit={handleCreate} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.taskTypes} scopes={[SCOPES.canCreate]}>
        <Button onClick={open}>Add Task Type</Button>
      </PermissionsGate>
    </>
  );
}

export function UpdateModalButton({ prevValues }: { prevValues: TaskType }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateTask } = useUpdateTaskTypeMutation();

  const handleUpdate = (values: TaskType) => {
    updateTask(values);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Task Type">
        <TaskForm onSubmit={handleUpdate} initialValues={prevValues} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.taskTypes} scopes={[SCOPES.canEdit]}>
        <ActionIcon onClick={open} variant="subtle">
          <IconEdit />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}

export function DeleteModalButton({ id }: { id: number }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteTask } = useDeleteTaskTypeMutation();

  const handleDelete = () => {
    deleteTask(id);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Task Type">
        <Stack>
          <Text>Are you sure you want to delete this task type?</Text>
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

      <PermissionsGate page={PAGE.taskTypes} scopes={[SCOPES.canDelete]}>
        <ActionIcon onClick={open} variant="subtle" color="red">
          <IconTrash />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}
