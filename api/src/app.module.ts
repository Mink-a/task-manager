import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./common/prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { TaskTypesModule } from "./task-types/task-types.module";
import { TasksModule } from "./tasks/tasks.module";
import { MenusModule } from "./menus/menus.module";
import { RolesModule } from "./roles/roles.module";
import { ActionsModule } from "./actions/actions.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    TaskTypesModule,
    TasksModule,
    MenusModule,
    RolesModule,
    ActionsModule,
    PermissionsModule,
    ConfigModule.forRoot({
      envFilePath: [".env.development.local", ".env.development", ".env"],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
