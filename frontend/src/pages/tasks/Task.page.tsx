import { MRT_ColumnDef } from 'mantine-react-table';
import { Flex, Group, Stack, Title } from '@mantine/core';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { SCOPES } from '@/config/permissions';
import { DataTable } from '@/components/data-table/DataTable';
import { TableFilterInput } from '@/components/inputs/TableFilterInput';
import { useGetTasksQuery } from './query';
import { TaskWithTaskTypeAndUser } from '@/schema/task.schema';
import { CreateModalButton, DeleteModalButton, UpdateModalButton } from './components/Form';
import { DateCell, TimeCell } from '@/components/data-table/CustomCell';
import { Error301Page } from '@/components/common/pages/Error301Page';
import { UsersSelect } from '@/components/inputs/UsersSelect';
import { DateRangeFilter } from '@/components/inputs/DateRangeFilter';

const columns: MRT_ColumnDef<TaskWithTaskTypeAndUser>[] = [
  {
    accessorKey: 'title',
    header: 'Task Title',
    id: 'title',
    size: 100,
  },
  {
    accessorKey: 'TaskType.name',
    header: 'Task Type',
    id: 'TaskType.name',
  },
  {
    accessorKey: 'User.username',
    header: 'User',
    id: 'User.username',
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    id: 'startTime',
    Cell: ({ cell }) => TimeCell(cell.getValue<string>()),
  },
  {
    accessorKey: 'endTime',
    header: 'End Time',
    id: 'endTime',
    Cell: ({ cell }) => TimeCell(cell.getValue<string>()),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    id: 'date',
    size: 100,
    Cell: ({ cell }) => DateCell(cell.getValue<string>()),
  },
];

export function TasksPage() {
  const { data, isPending } = useGetTasksQuery();

  return (
    <PermissionsGate page="tasks" scopes={[SCOPES.canView]} RenderError={Error301Page}>
      <Stack p="md">
        <Flex
          justify={{ base: 'flex-start', md: 'space-between' }}
          align={{ base: 'flex-start', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
          gap="md"
        >
          <Title order={2}>Task List</Title>
          <Group>
            <CreateModalButton />
            <DateRangeFilter />
            <UsersSelect />
            <TableFilterInput />
          </Group>
        </Flex>
        <DataTable
          isLoading={isPending}
          columns={columns}
          data={data?.data ?? []}
          total={data?.meta.total_pages ?? 0}
          renderRowActions={(row) => {
            if (row.original && row.original.id) {
              return (
                <Group wrap="nowrap">
                  <UpdateModalButton prevValues={row.original} />
                  <DeleteModalButton id={row.original.id} />
                </Group>
              );
            }
            return null;
          }}
        />
      </Stack>
    </PermissionsGate>
  );
}
