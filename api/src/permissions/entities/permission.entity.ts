import { ApiProperty } from "@nestjs/swagger";
import { Permission } from "@prisma/client";

export class PermissionEntity implements Permission {
  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiProperty({ description: "ID of the permission" })
  id: string;

  @ApiProperty({ description: "ID of the role" })
  roleId: string;

  @ApiProperty({ description: "ID of the action" })
  actionId: string;

  @ApiProperty({ description: "ID of the menu" })
  menuId: string;
}
