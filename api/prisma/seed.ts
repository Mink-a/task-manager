import { PrismaClient } from "@prisma/client";
import { TASK_TYPES, USERS, TASKS, ROLES } from "../data/mock-data";

const prisma = new PrismaClient();

async function main() {
  const menus = await Promise.all(
    [{ name: "dashboard" }, { name: "users" }, { name: "tasks" }, { name: "task-types" }, { name: "roles" }, { name: "actions" }, { name: "menus" }].map(menu =>
      prisma.menu.upsert({
        where: { name: menu.name },
        update: {},
        create: menu,
      }),
    ),
  );

  const actions = await Promise.all(
    [{ name: "create" }, { name: "view" }, { name: "update" }, { name: "delete" }].map(action =>
      prisma.action.upsert({
        where: { name: action.name },
        update: {},
        create: action,
      }),
    ),
  );

  const roles = await Promise.all(
    ROLES.map(role =>
      prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: role,
      }),
    ),
  );

  const menuIds = menus.map(menu => menu.name); // 3 menus
  const actionIds = actions.map(action => action.name); // 4 actions
  const roleIds = roles.map(role => role.name); // 3 roles

  // user role permissions
  const adminMenus = [0, 1, 2, 3, 4, 5, 6];
  const adminActions = [0, 1, 2, 3];
  const adminMaps = [] as Array<{ roleId: string; menuId: string; actionId: string }>;
  adminMenus.forEach(menuId => adminActions.forEach(actionId => adminMaps.push({ roleId: roleIds[2], menuId: menuIds[menuId], actionId: actionIds[actionId] })));
  console.log("adminMaps", adminMaps);
  await Promise.all(adminMaps.map(map => prisma.permission.create({ data: map })));

  // editor role permissions
  const editorMenus = [0, 1, 2, 3, 4, 5, 6];
  const editorActions = [0, 1, 2, 3];
  const editorMaps = [] as Array<{ roleId: string; menuId: string; actionId: string }>;
  editorMenus.forEach(menuId => editorActions.forEach(actionId => editorMaps.push({ roleId: roleIds[1], menuId: menuIds[menuId], actionId: actionIds[actionId] })));
  await Promise.all(editorMaps.map(map => prisma.permission.create({ data: map })));

  // user role permissions
  const userMenus = [0, 2, 4];
  const userActions = [1];
  const userMaps = [] as Array<{ roleId: string; menuId: string; actionId: string }>;
  userMenus.forEach(menuId => userActions.forEach(actionId => userMaps.push({ roleId: roleIds[0], menuId: menuIds[menuId], actionId: actionIds[actionId] })));
  await Promise.all(userMaps.map(map => prisma.permission.create({ data: map })));

  const taskTypes = await Promise.all(
    TASK_TYPES.map(type =>
      prisma.taskType.upsert({
        where: { name: type.name },
        update: {},
        create: type,
      }),
    ),
  );

  const users = await Promise.all(
    USERS.map((user, i) =>
      prisma.user.upsert({
        where: { loginId: user.loginId },
        update: {},
        create: { ...user, roleId: i === 0 ? roles[2].id : i === 1 ? roles[1].id : roles[0].id },
      }),
    ),
  );

  const taskPromises = TASKS.map((task, i) => {
    const userId = users[i % users.length].id;
    const taskTypeId = taskTypes[i % taskTypes.length].id;
    return prisma.task.create({
      data: {
        ...task,
        userId,
        taskTypeId,
      },
    });
  });

  await Promise.all(taskPromises);

  console.log("Database has been seeded.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
