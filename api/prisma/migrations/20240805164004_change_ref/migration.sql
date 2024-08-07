-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_permissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roleId" TEXT NOT NULL,
    "actionId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    CONSTRAINT "permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "permissions_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "actions" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "permissions_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "menus" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_permissions" ("actionId", "id", "menuId", "roleId") SELECT "actionId", "id", "menuId", "roleId" FROM "permissions";
DROP TABLE "permissions";
ALTER TABLE "new_permissions" RENAME TO "permissions";
CREATE UNIQUE INDEX "permissions_roleId_menuId_actionId_key" ON "permissions"("roleId", "menuId", "actionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
