import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "000001", description: "Login ID of the user." })
  loginId: string;

  @ApiProperty({ example: "123456", description: "Password of the user." })
  password: string;
}
