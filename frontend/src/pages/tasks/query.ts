import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { useParamsHelper } from '@/hooks/useParamsHelper';
import { createTask, deleteTask, getTasks, updateTask } from '@/services/tasks.service';
import { Task } from '@/schema/task.schema';
import { task } from '@/config/query-keys';

export const useGetTasksQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: task.list(params),
    queryFn: () => getTasks(params),
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Omit<Task, 'id'>) => createTask(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: task.lists(),
      });
      notifications.show({
        title: 'Task Created',
        message: 'Task has been successfully created.',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: 'Task Creation Failed',
        message: 'Task could not be created.',
        color: 'red',
      });
    },
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Task) => updateTask(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: task.details(),
      });
      queryClient.invalidateQueries({
        queryKey: task.list({}),
      });
      notifications.show({
        title: 'Task Updated',
        message: 'Task has been successfully updated.',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: 'Task Update Failed',
        message: 'Task could not be updated.',
        color: 'red',
      });
    },
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: task.lists(),
      });
      notifications.show({
        title: 'Task Deleted',
        message: 'Task has been successfully deleted.',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: 'Task Delete Failed',
        message: 'Task could not be deleted.',
        color: 'red',
      });
    },
  });
};
