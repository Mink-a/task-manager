import { PrismaClient } from "@prisma/client";
import { TASK_TYPES, USERS, TASKS } from "../data/mock-data";

const prisma = new PrismaClient();

async function seedTaskTypes() {
  await prisma.taskType.createMany({
    data: TASK_TYPES,
  });
  console.log("task-types seeded.");
}

async function seedUsers() {
  await prisma.user.createMany({
    data: USERS,
  });
  console.log("users seeded.");
}

async function seedTasks() {
  await prisma.task.createMany({
    data: TASKS,
  });
  console.log("tasks seeded.");
}

async function main() {
  await seedTaskTypes();
  await seedUsers();
  await seedTasks();
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
