import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { useParamsHelper } from '@/hooks/useParamsHelper';
import { createMenu, deleteMenu, getMenus, updateMenu } from '@/services/menus.service';
import { Menu } from '@/schema/menu.schema';
import { menu } from '@/config/query-keys';

export const useGetMenusQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: menu.list(params),
    queryFn: () => getMenus(params),
  });
};

export const useCreateMenuMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Menu) => createMenu(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: menu.lists(),
      });
      showNotification({
        title: 'Menu created',
        message: 'Menu created successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Menu creation failed',
        message: 'Menu creation failed',
        color: 'red',
      });
    },
  });
};

export const useUpdateMenuMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Menu) => updateMenu(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: menu.lists(),
      });
      showNotification({
        title: 'Menu updated',
        message: 'Menu updated successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Menu update failed',
        message: 'Menu update failed',
        color: 'red',
      });
    },
  });
};

export const useDeleteMenuMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMenu(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: menu.lists(),
      });
      showNotification({
        title: 'Menu deleted',
        message: 'Menu deleted successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Menu deletion failed',
        message: 'Menu deletion failed',
        color: 'red',
      });
    },
  });
};
