import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
  @ApiProperty({ description: "Dept code", example: "F21" })
  deptCode: string;

  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiProperty({ description: "ID of the role associated with the user" })
  roleId: string;

  @ApiProperty({ description: "Unique identifier for the user" })
  id: string;

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
}
