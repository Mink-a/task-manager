import { Loader, Select, SelectProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getTaskTypes } from '@/services/task-types.service';

const useTaskTypeSelectQuery = () =>
  useQuery({
    queryKey: ['task-types'],
    queryFn: () => getTaskTypes(),
  });

export function TaskTypeSelect({ ...props }: SelectProps) {
  const { data, isPending } = useTaskTypeSelectQuery();
  const options = data?.data.map((taskType) => ({
    value: taskType.id?.toString() ?? '',
    label: taskType.name,
  }));
  return (
    <Select
      {...props}
      value={props.value?.toString()}
      placeholder="Select task type"
      data={options ?? []}
      label="Task Type"
      searchable
      clearable
      rightSection={isPending && <Loader size="xs" />}
      checkIconPosition="right"
    />
  );
}
