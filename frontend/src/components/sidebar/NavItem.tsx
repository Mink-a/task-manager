import { NavLink } from '@mantine/core';
import { TablerIcon } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useDrawer } from '@/hooks/useDrawer';

import classes from './Sidebar.module.css';
import { PermissionsGate } from '../common/permission-gate/PermissionGate';

interface NavItemProps {
  label: string;
  icon?: TablerIcon;
  to?: string;
  children?: NavItemProps[];
  scopes?: string[];
}

export function NavItem(props: NavItemProps) {
  const { children, icon: Icon, label, to, scopes = [] } = props;
  const location = useLocation();
  const close = useDrawer((state) => state.close);
  const [opened, navLink] = useDisclosure(children?.some((x) => x.to === location.pathname));

  if (!children && to) {
    return (
      <PermissionsGate scopes={scopes} errorProps={{ disabled: true }}>
        <NavLink
          className={classes.navItem}
          component={Link}
          active={Boolean(location.pathname === to)}
          onClick={close}
          label={label}
          to={to}
          leftSection={Icon && <Icon />}
        />
      </PermissionsGate>
    );
  }

  return (
    <PermissionsGate scopes={scopes} errorProps={{ disabled: true }}>
      <NavLink
        className={classes.navItem}
        defaultOpened={opened}
        active={children?.some((x) => x.to === location.pathname) && !opened}
        label={label}
        leftSection={Icon && <Icon />}
        opened={opened}
        onChange={() => navLink.toggle()}
      >
        {children?.map((x) => <NavItem key={x.to} {...x} />)}
      </NavLink>
    </PermissionsGate>
  );
}
