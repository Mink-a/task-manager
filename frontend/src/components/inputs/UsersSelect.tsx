import { Loader, Select, SelectProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { getUsers } from '@/services/users.service';
import { useParamsHelper } from '@/hooks/useParamsHelper';

const useUsersSelectQuery = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

export function UsersSelect({ ...props }: SelectProps) {
  const { data, isPending } = useUsersSelectQuery();
  const _user = '_user';
  const { setParam, getParam } = useParamsHelper();
  const [value, setValue] = useState(getParam(_user) ?? '');
  const [debounced] = useDebouncedValue(value, 500);

  const options = data?.data.map((user) => ({
    value: user.id ?? '',
    label: user.username,
  }));

  useEffect(() => {
    setParam(_user, debounced);
  }, [debounced]);

  return (
    <Select
      {...props}
      placeholder="Select User"
      data={options ?? []}
      searchable
      clearable
      rightSection={isPending && <Loader size="xs" />}
      checkIconPosition="right"
      value={value}
      onChange={(val) => setValue(val ?? '')}
    />
  );
}
