/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_actions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_actions" ("id", "name") SELECT "id", "name" FROM "actions";
DROP TABLE "actions";
ALTER TABLE "new_actions" RENAME TO "actions";
CREATE UNIQUE INDEX "actions_name_key" ON "actions"("name");
CREATE TABLE "new_menus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_menus" ("id", "name") SELECT "id", "name" FROM "menus";
DROP TABLE "menus";
ALTER TABLE "new_menus" RENAME TO "menus";
CREATE UNIQUE INDEX "menus_name_key" ON "menus"("name");
CREATE TABLE "new_permissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roleId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "permissions_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "actions" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "permissions_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menus" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_permissions" ("actionId", "id", "menuId", "roleId") SELECT "actionId", "id", "menuId", "roleId" FROM "permissions";
DROP TABLE "permissions";
ALTER TABLE "new_permissions" RENAME TO "permissions";
CREATE UNIQUE INDEX "permissions_roleId_menuId_actionId_key" ON "permissions"("roleId", "menuId", "actionId");
CREATE TABLE "new_roles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_roles" ("id", "name") SELECT "id", "name" FROM "roles";
DROP TABLE "roles";
ALTER TABLE "new_roles" RENAME TO "roles";
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");
CREATE TABLE "new_task_types" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_task_types" ("id", "name") SELECT "id", "name" FROM "task_types";
DROP TABLE "task_types";
ALTER TABLE "new_task_types" RENAME TO "task_types";
CREATE UNIQUE INDEX "task_types_name_key" ON "task_types"("name");
CREATE TABLE "new_tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "taskTypeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tasks_taskTypeId_fkey" FOREIGN KEY ("taskTypeId") REFERENCES "task_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("date", "endTime", "id", "startTime", "taskTypeId", "title", "userId") SELECT "date", "endTime", "id", "startTime", "taskTypeId", "title", "userId" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "loginId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "deptCode" TEXT NOT NULL DEFAULT 'NONE',
    "roleId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users" ("id", "loginId", "roleId", "username") SELECT "id", "loginId", "roleId", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_loginId_key" ON "users"("loginId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
