import { MRT_ColumnDef } from 'mantine-react-table';
import { ActionIcon, Flex, Group, Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconEye } from '@tabler/icons-react';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { DataTable } from '@/components/data-table/DataTable';
import { TableFilterInput } from '@/components/inputs/TableFilterInput';
import { User } from '@/schema/users.schema';
import { useGetUsersQuery } from './query';
import { Error301Page } from '@/components/common/pages/Error301Page';
import { UpdateModalButton } from './components/Form';

const columns: MRT_ColumnDef<User>[] = [
  // {
  //   accessorKey: 'id',
  //   header: 'ID',
  //   id: 'id',
  //   size: 100,
  // },
  {
    accessorKey: 'loginId',
    header: 'Login ID',
    id: 'loginId',
    size: 100,
  },
  {
    accessorKey: 'username',
    header: 'Name',
    id: 'username',
    size: 200,
  },
  {
    accessorKey: 'Role.name',
    header: 'Role',
    id: 'Role.name',
    size: 100,
  },
  {
    accessorKey: 'deptCode',
    header: 'Dept Code',
    id: 'deptCode',
    size: 200,
  },
];

export function UsersPage() {
  const { data, isPending } = useGetUsersQuery();

  return (
    <PermissionsGate page={PAGE.users} scopes={[SCOPES.canView]} RenderError={Error301Page}>
      <Stack p="md">
        <Flex justify="space-between" align="center">
          <Title order={2}>Users List</Title>
          <TableFilterInput />
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
                  <ActionIcon
                    c="blue"
                    variant="subtle"
                    component={Link}
                    to={`/d/tasks?_user=${row.original.id}`}
                  >
                    <IconEye />
                  </ActionIcon>
                  <UpdateModalButton prevValues={row.original} />
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
