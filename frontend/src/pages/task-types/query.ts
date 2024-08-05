import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { useParamsHelper } from '@/hooks/useParamsHelper';
import {
  createTaskType,
  deleteTaskType,
  getTaskTypes,
  updateTaskType,
} from '@/services/task-types.service';
import { TaskType } from '@/schema/task-type.schema';
import { taskType } from '@/config/query-keys';

export const useGetTaskTypesQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: taskType.list(params),
    queryFn: () => getTaskTypes(params),
  });
};

export const useCreateTaskTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Omit<TaskType, 'id'>) => createTaskType(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskType.lists(),
      });
      showNotification({
        title: 'Task type created',
        message: 'Task type created successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Task type creation failed',
        message: 'Task type creation failed',
        color: 'red',
      });
    },
  });
};

export const useUpdateTaskTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: TaskType) => updateTaskType(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskType.lists(),
      });
      showNotification({
        title: 'Task type updated',
        message: 'Task type updated successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Task type update failed',
        message: 'Task type update failed',
        color: 'red',
      });
    },
  });
};

export const useDeleteTaskTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTaskType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskType.lists(),
      });
      showNotification({
        title: 'Task type deleted',
        message: 'Task type deleted successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Task type deletion failed',
        message: 'Task type deletion failed',
        color: 'red',
      });
    },
  });
};
