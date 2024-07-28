import { MRT_ColumnDef } from 'mantine-react-table';
import { Flex, Stack, Title } from '@mantine/core';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { DataTable } from '@/components/data-table/DataTable';
import { TableFilterInput } from '@/components/inputs/TableFilterInput';
import { User } from '@/schema/users.schema';
import { useGetUsersQuery } from './query';
import { Error301Page } from '@/components/common/pages/Error301Page';

const columns: MRT_ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    id: 'id',
    size: 100,
  },
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
    accessorKey: 'role',
    header: 'Role',
    id: 'role',
    size: 100,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    id: 'email',
    size: 200,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    id: 'phone',
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
        />
      </Stack>
    </PermissionsGate>
  );
}
