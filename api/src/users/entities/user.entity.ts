import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
  @ApiProperty({ description: "Role of the user", enum: ["user", "editor", "admin"] })
  role: string;

  @ApiProperty({ description: "Unique identifier for the user" })
  id: number;

  @ApiProperty({ description: "Login ID for the user" })
  loginId: string;

  @ApiProperty({ description: "Username of the user" })
  username: string;

  // @ApiProperty({ description: "Password of the user" })
  // omit password
  password: string;

  @ApiProperty({ description: "Phone number of the user" })
  phone: string;

  @ApiProperty({ description: "Email address of the user" })
  email: string;

  // @ApiProperty({ type: TaskEntity, description: "Tasks associated with the user" })
  // tasks: Task[];
}
