import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { useParamsHelper } from '@/hooks/useParamsHelper';
import { createRole, deleteRole, getRoles, updateRole } from '@/services/role.service';
import { Role } from '@/schema/role.schema';
import { menu, role } from '@/config/query-keys';
import { getMenus } from '@/services/menus.service';

export const useGetRolesQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: role.list(params),
    queryFn: () => getRoles(params),
  });
};

export const useCreateRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Role) => createRole(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: role.lists(),
      });
      showNotification({
        title: 'Role created',
        message: 'Role created successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Role creation failed',
        message: 'Role creation failed',
        color: 'red',
      });
    },
  });
};

export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: Role) => updateRole(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: role.lists(),
      });
      showNotification({
        title: 'Role updated',
        message: 'Role updated successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Role update failed',
        message: 'Role update failed',
        color: 'red',
      });
    },
  });
};

export const useDeleteRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: role.lists(),
      });
      showNotification({
        title: 'Role deleted',
        message: 'Role deleted successfully',
        color: 'green',
      });
    },
    onError: () => {
      showNotification({
        title: 'Role deletion failed',
        message: 'Role deletion failed',
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
