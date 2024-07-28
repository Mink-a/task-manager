export const TASK_TYPES = [
  {
    id: 1,
    name: "Meeting",
  },
  {
    id: 2,
    name: "Development",
  },
  {
    id: 3,
    name: "Design",
  },
  {
    id: 4,
    name: "Learning",
  },
  {
    id: 5,
    name: "Productivity",
  },
  {
    id: 6,
    name: "Other",
  },
];

export const USERS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  username: i === 0 ? "Admin" : `User ${i + 1}`,
  loginId: i === 0 ? "admin" : `user${i + 1}`,
  role: i === 0 ? "admin" : "user",
  password: "password",
  email: i === 0 ? "admin@example.com" : `user${i + 1}@example.com`,
  phone: "1234567890",
}));

export const TASKS = Array.from({ length: 130 }, (_, i) => ({
  id: i + 1,
  title: `Task ${i + 1}`,
  taskTypeId: (i % 6) + 1,
  date: new Date(2021, i % 12, (i % 28) + 1).toISOString(),
  startTime: `${(i % 24).toString().padStart(2, "0")}:${(i % 60).toString().padStart(2, "0")}`,
  endTime: `${((i + 1) % 24).toString().padStart(2, "0")}:${((i + 1) % 60).toString().padStart(2, "0")}`,
  userId: (i % 30) + 1,
}));
