import { MRT_ColumnDef } from 'mantine-react-table';
import { Flex, Group, Stack, Title } from '@mantine/core';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { DataTable } from '@/components/data-table/DataTable';
import { TableFilterInput } from '@/components/inputs/TableFilterInput';
import { useGetMenusQuery } from './query';
import { Error301Page } from '@/components/common/pages/Error301Page';
import { CreateModalButton, DeleteModalButton, UpdateModalButton } from './components/Form';
import { Menu } from '@/schema/menu.schema';

const columns: MRT_ColumnDef<Menu>[] = [
  // {
  //   accessorKey: 'id',
  //   header: 'ID',
  //   id: 'id',
  //   size: 100,
  // },
  {
    accessorKey: 'name',
    header: 'Name',
    id: 'name',
    size: 100,
  },
];

export function MenusPage() {
  const { data, isPending } = useGetMenusQuery();

  return (
    <PermissionsGate page={PAGE.menus} scopes={[SCOPES.canView]} RenderError={Error301Page}>
      <Stack p="md">
        <Flex justify="space-between" align="center">
          <Title order={2}>Menus List</Title>
          <Group>
            <CreateModalButton />
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
