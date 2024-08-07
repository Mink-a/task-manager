import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { useParamsHelper } from '@/hooks/useParamsHelper';
import { createAction, deleteAction, getActions, updateAction } from '@/services/actions.service';
import { Action } from '@/schema/action.schema';
import { menu, action } from '@/config/query-keys';
import { getMenus } from '@/services/menus.service';

export const useGetActionsQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: action.list(params),
    queryFn: () => getActions(params),
  });
};

export const useCreateActionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Action) => createAction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: action.lists(),
      });
      showNotification({
        title: 'Action created',
        message: 'Action created successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Action creation failed',
        message: 'Action creation failed',
        color: 'red',
      });
    },
  });
};

export const useUpdateActionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Action) => updateAction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: action.lists(),
      });
      showNotification({
        title: 'Action updated',
        message: 'Action updated successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Action update failed',
        message: 'Action update failed',
        color: 'red',
      });
    },
  });
};

export const useDeleteActionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: action.lists(),
      });
      showNotification({
        title: 'Action deleted',
        message: 'Action deleted successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Action deletion failed',
        message: 'Action deletion failed',
        color: 'red',
      });
    },
  });
};

// MENUS

export const useGetMenusQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: menu.list(params),
    queryFn: () => getMenus(params),
  });
};
