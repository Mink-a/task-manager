import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class RoleEntity implements Role {
  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiProperty({ description: "ID of the role" })
  id: string;

  @ApiProperty({ description: "Name of the role" })
  name: string;
}
