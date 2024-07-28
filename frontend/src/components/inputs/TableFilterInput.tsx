import { ActionIcon, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useParamsHelper } from '@/hooks/useParamsHelper';

export function TableFilterInput() {
  const _search = '_search';
  const { setParam, getParam } = useParamsHelper();
  const [value, setValue] = useState(getParam(_search) ?? '');
  const [debounced] = useDebouncedValue(value, 500);

  useEffect(() => {
    setParam(_search, debounced);
  }, [debounced]);

  return (
    <TextInput
      type="search"
      placeholder="Search..."
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      leftSection={<IconSearch size={16} />}
      rightSection={
        <ActionIcon variant="transparent" size="sm" onClick={() => setValue('')}>
          <IconX />
        </ActionIcon>
      }
    />
  );
}
