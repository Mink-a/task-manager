import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "The username of the user",
    example: "joe",
  })
  username: string;

  @ApiProperty({
    description: "The login ID of the user",
    example: "000001",
  })
  loginId: string;

  @ApiProperty({ description: "The dept code of the user" })
  deptCode: string;

  @ApiProperty({
    description: "The role id of the user",
  })
  roleId: string;
}
