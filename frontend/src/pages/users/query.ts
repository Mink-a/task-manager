import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/users.service';
import { useParamsHelper } from '@/hooks/useParamsHelper';

export const useGetUsersQuery = () => {
  const { getParams } = useParamsHelper();
  const params = getParams();

  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
  });
};
