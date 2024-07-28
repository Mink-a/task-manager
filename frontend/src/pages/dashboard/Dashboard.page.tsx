import { Card, Loader, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { PermissionsGate } from '@/components/common/permission-gate/PermissionGate';
import { PAGE, SCOPES } from '@/config/permissions';
import { useGetTasksQuery } from '../tasks/query';
import { useGetUsersQuery } from '../users/query';
import { useGetTaskTypesQuery } from '../task-types/query';
import { Error301Page } from '@/components/common/pages/Error301Page';

export function DashboardPage() {
  const { data: tasks, isPending: isTasksPending } = useGetTasksQuery();
  const { data: users, isPending: isUsersPending } = useGetUsersQuery();
  const { data: taskTypes, isPending: isTaskTypesPending } = useGetTaskTypesQuery();
  return (
    <PermissionsGate page={PAGE.dashboard} scopes={[SCOPES.canView]} RenderError={Error301Page}>
      <Stack p="md">
        <Title order={2}>Dashboard</Title>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            bg="blue.3"
            style={{ minWidth: '200px' }}
          >
            <Text fz="h1" fw={900}>
              {isTasksPending ? <Loader size="sm" /> : tasks?.meta.total_pages}
            </Text>
            <Text size="xl" fw={600}>
              Tasks
            </Text>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            bg="gray.3"
            style={{ minWidth: '200px' }}
          >
            <Text fz="h1" fw={900}>
              {isUsersPending ? <Loader size="sm" /> : users?.meta.total_pages}
            </Text>
            <Text size="xl" fw={600}>
              Users
            </Text>
          </Card>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            bg="lime.3"
            style={{ minWidth: '200px' }}
          >
            <Text fz="h1" fw={900}>
              {isTaskTypesPending ? <Loader size="sm" /> : taskTypes?.meta.total_pages}
            </Text>
            <Text size="xl" fw={600}>
              Task Types
            </Text>
          </Card>
        </SimpleGrid>
      </Stack>
    </PermissionsGate>
  );
}
