import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { DatePickerInput } from '@mantine/dates';
import { useParamsHelper } from '@/hooks/useParamsHelper';

export function DateRangeFilter() {
  const { setParams, getParam } = useParamsHelper();
  const fromDate = getParam('_fromDate') ? new Date(getParam('_fromDate') ?? '') : null;
  const toDate = getParam('_toDate') ? new Date(getParam('_toDate') ?? '') : null;
  const [value, setValue] = useState<[Date | null, Date | null]>([fromDate, toDate]);
  const [debounced] = useDebouncedValue(value, 500);

  useEffect(() => {
    setParams({ _fromDate: debounced[0]?.toISOString(), _toDate: debounced[1]?.toISOString() });
  }, [debounced]);

  return (
    <DatePickerInput
      valueFormat="YYYY-MMM-DD"
      type="range"
      placeholder="Pick date"
      w={230}
      clearable
      onChange={setValue}
    />
  );
}
