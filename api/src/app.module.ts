import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./common/prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { TaskTypesModule } from "./task-types/task-types.module";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, TaskTypesModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
