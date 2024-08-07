import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { deleteUser, getUsers, updateUser } from '@/services/users.service';
import { useParamsHelper } from '@/hooks/useParamsHelper';
import { users } from '@/config/query-keys';
import { User } from '@/schema/users.schema';

export const useGetUsersQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: users.list(params),
    queryFn: () => getUsers(params),
  });
};

export const useGetUserQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: users.detail(params?._user),
    queryFn: () => getUsers(params),
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: User) => updateUser(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: users.lists(),
      });
      notifications.show({
        title: 'User updated',
        message: 'User has been successfully updated.',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: 'User update failed',
        message: 'User could not be updated.',
        color: 'red',
      });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: users.lists(),
      });
      notifications.show({
        title: 'User deleted',
        message: 'User has been successfully deleted.',
        color: 'green',
      });
    },
    onError: () => {
      notifications.show({
        title: 'User deletion failed',
        message: 'User could not be deleted.',
        color: 'red',
      });
    },
  });
};
