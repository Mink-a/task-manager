import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "The username of the user",
    example: "joe",
  })
  username: string;

  @ApiProperty({
    description: "The password of the user",
    example: "123456",
  })
  password: string;

  @ApiProperty({
    description: "The phone number of the user",
    example: "+121232434",
  })
  phone: string;

  @ApiProperty({
    description: "The email address of the user",
    example: "joe@email.com",
  })
  email: string;

  @ApiProperty({
    description: "The login ID of the user",
    example: "000001",
  })
  loginId: string;

  @ApiProperty({
    description: "The role of the user",
    enum: ["user", "editor", "admin"],
    example: "user",
  })
  role: string;
}
