import { ApiProperty } from "@nestjs/swagger";

export class PermissionPayload {
  @ApiProperty({
    example: "view | create | edit | delete",
  })
  actionId: string;

  @ApiProperty({
    example: "dashboard | tasks | task-types | users | roles",
  })
  menuId: string;
}

export class CreateRoleDto {
  @ApiProperty({
    example: "public | user | editor | admin",
  })
  name: string;

  @ApiProperty({ type: [PermissionPayload] })
  Permissions: Array<PermissionPayload>;
}
