import { PrismaClient } from "@prisma/client";
import { TASK_TYPES, USERS, TASKS } from "../data/mock-data";

const prisma = new PrismaClient();

async function seedTaskTypes() {
  return await Promise.all(
    TASK_TYPES.map(type =>
      prisma.taskType.upsert({
        where: { name: type.name },
        update: {},
        create: type,
      }),
    ),
  );
}

async function seedUsers() {
  return await Promise.all(
    USERS.map(user =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      }),
    ),
  );
}

async function main() {
  const taskTypes = await seedTaskTypes();
  const users = await seedUsers();

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
