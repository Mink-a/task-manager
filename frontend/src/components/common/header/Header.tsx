import { Group, AppShellHeader, Burger, Menu, ActionIcon, rem } from '@mantine/core';
import {
  IconBrandAirbnb,
  IconLogout,
  IconMail,
  IconUser,
  IconUserCircle,
} from '@tabler/icons-react';
import { useDrawer } from '@/hooks/useDrawer';
import { useLoginStore } from '@/store/login.store';

export function RightSection() {
  const removeUser = useLoginStore((state) => state.removeUser);
  const userInfo = useLoginStore((state) => state.userInfo);
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon size="md" variant="subtle" radius="xl">
          <IconUserCircle size={30} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>User Info</Menu.Label>
        <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
          {userInfo?.user.username}
        </Menu.Item>
        <Menu.Item leftSection={<IconMail style={{ width: rem(14), height: rem(14) }} />}>
          {userInfo?.user.email}
        </Menu.Item>
        <Menu.Item
          color="red"
          leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
          onClick={removeUser}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export function Header() {
  const opened = useDrawer((state) => state.opened);
  const toggle = useDrawer((state) => state.toggle);

  return (
    <AppShellHeader p="md">
      <Group h="100%" justify="space-between">
        <Group h="100%">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconBrandAirbnb size={30} />
        </Group>
        <RightSection />
      </Group>
    </AppShellHeader>
  );
}
