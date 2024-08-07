import { Loader, Select, SelectProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getRoles } from '@/services/role.service';

const useRolesSelectQuery = () =>
  useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles(),
  });

export function RolesSelect({ ...props }: SelectProps) {
  const { data, isPending } = useRolesSelectQuery();

  const options = data?.data.map((role) => ({
    value: role.id ?? '',
    label: role.name,
  }));

  return (
    <Select
      {...props}
      placeholder="Select Role"
      data={options ?? []}
      searchable
      clearable
      rightSection={isPending && <Loader size="xs" />}
      checkIconPosition="right"
    />
  );
}
