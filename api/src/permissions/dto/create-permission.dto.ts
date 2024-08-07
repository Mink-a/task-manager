import { ApiProperty } from "@nestjs/swagger";

export class CreatePermissionDto {
  @ApiProperty()
  roleId: string;

  @ApiProperty()
  actionId: string;

  @ApiProperty()
  menuId: string;
}
