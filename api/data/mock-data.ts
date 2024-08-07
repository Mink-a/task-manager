export const TASK_TYPES = [
  {
    name: "Meeting",
  },
  {
    name: "Development",
  },
  {
    name: "Design",
  },
  {
    name: "Learning",
  },
  {
    name: "Productivity",
  },
  {
    name: "Other",
  },
];

export const ROLES = [
  {
    name: "user",
  },
  {
    name: "editor",
  },
  {
    name: "admin",
  },
];

export const USERS = [
  {
    username: "Min Khant Kyaw",
    loginId: "026560",
    deptCode: "F21",
  },
  {
    username: "Test User",
    loginId: "000000",
    deptCode: "F21",
  },
  {
    username: "Test User 2",
    loginId: "909090",
    deptCode: "F21",
  },
];

export const TASKS = Array.from({ length: 130 }, (_, i) => ({
  title: `Task ${i + 1}`,
  date: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
  startTime: `${(i % 24).toString().padStart(2, "0")}:${(i % 60).toString().padStart(2, "0")}`,
  endTime: `${((i + 1) % 24).toString().padStart(2, "0")}:${((i + 1) % 60).toString().padStart(2, "0")}`,
}));
