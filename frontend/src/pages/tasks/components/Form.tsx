import { TextInput, Modal, Button, Stack, ActionIcon, Text, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm, zodResolver } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Task, taskSchema, TaskWithTaskType } from '@/schema/task.schema';
import { TaskTypeSelect } from '@/components/inputs/TaskTypeSelect';
import { TimePickerInput } from '@/components/inputs/TimePickerInput';
import { useLoginStore } from '@/store/login.store';
import { useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } from '../query';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';

export type TaskFormProps = {
  onSubmit: (values: Task) => void;
  initialValues?: Task;
  onCancel?: () => void;
};

export function TaskForm({ onSubmit, initialValues, onCancel }: TaskFormProps) {
  const userInfo = useLoginStore((state) => state.userInfo);
  const form = useForm<Task>({
    initialValues: initialValues ?? {
      id: undefined,
      title: '',
      taskTypeId: null,
      userId: userInfo?.user.id,
      date: new Date(),
      startTime: '09:00',
      endTime: '15:00',
    },
    validate: zodResolver(taskSchema),
  });

  const handleSubmit = (values: Task) => onSubmit(values);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Enter title"
          {...form.getInputProps('title')}
        />
        <TaskTypeSelect {...form.getInputProps('taskTypeId')} />
        <DatePickerInput
          withAsterisk
          label="Pick date"
          placeholder="Pick date"
          {...form.getInputProps('date')}
          value={new Date(form.values.date)}
        />
        <TimePickerInput withAsterisk label="Start time" {...form.getInputProps('startTime')} />
        <TimePickerInput withAsterisk label="End time" {...form.getInputProps('endTime')} />
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
  const { mutate: createTask } = useCreateTaskMutation();
  const handleCreate = (values: Task) => {
    const { id, ...task } = values;
    createTask(task);
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Task Form">
        <TaskForm onSubmit={handleCreate} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.tasks} scopes={[SCOPES.canCreate]}>
        <Button onClick={open}>Add Task</Button>
      </PermissionsGate>
    </>
  );
}

export function UpdateModalButton({ prevValues }: { prevValues: TaskWithTaskType }) {
  const { taskType, ...prevTask } = prevValues;
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: updateTask } = useUpdateTaskMutation();

  const handleUpdate = (values: Task) => {
    updateTask(values);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Task">
        <TaskForm onSubmit={handleUpdate} initialValues={prevTask} onCancel={close} />
      </Modal>

      <PermissionsGate page={PAGE.tasks} scopes={[SCOPES.canEdit]}>
        <ActionIcon onClick={open} variant="subtle">
          <IconEdit />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}

export function DeleteModalButton({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutate: deleteTask } = useDeleteTaskMutation();

  const handleDelete = () => {
    deleteTask(id);
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Task">
        <Stack>
          <Text>Are you sure you want to delete this task?</Text>
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

      <PermissionsGate page={PAGE.tasks} scopes={[SCOPES.canDelete]}>
        <ActionIcon onClick={open} variant="subtle" color="red">
          <IconTrash />
        </ActionIcon>
      </PermissionsGate>
    </>
  );
}
