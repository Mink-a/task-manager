import { Loader, MultiSelect, MultiSelectProps } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getActions } from '@/services/actions.service';

const useActionsSelectQuery = () =>
  useQuery({
    queryKey: ['permissions'],
    queryFn: () => getActions(),
  });

type CustomMultiSelectProps = MultiSelectProps & {
  menuId: string;
  permissions?: Array<{ actionId: string; menuId: string }>;
  setPermissions?: (values: Array<{ actionId: string; menuId: string }>) => void;
};

export function ActionsSelect({
  permissions,
  setPermissions,
  menuId,
  ...props
}: CustomMultiSelectProps) {
  const [value, setValue] = useState<string[]>([]);
  const { data, isPending } = useActionsSelectQuery();
  const options = data?.data.map((d) => d.name) ?? [];

  useEffect(() => {
    if (permissions) {
      const selectedValues = permissions
        .filter((fv) => fv.menuId === menuId)
        .map((fv) => fv.actionId);
      setValue(selectedValues);
    }
  }, [permissions, menuId]);

  const handleChange = (values: string[]) => {
    setValue(values);

    if (setPermissions) {
      const updatedValues = (permissions ?? []).filter((fv) => fv.menuId !== menuId);
      values.forEach((actionId) => {
        updatedValues.push({ actionId, menuId });
      });
      setPermissions(updatedValues);
    }
  };

  return (
    <MultiSelect
      {...props}
      placeholder="Select permissions"
      label={menuId}
      searchable
      clearable
      rightSection={isPending && <Loader size="xs" />}
      checkIconPosition="right"
      data={options}
      value={value}
      onChange={handleChange}
    />
  );
}
