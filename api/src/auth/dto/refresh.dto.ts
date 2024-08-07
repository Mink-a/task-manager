import { ApiProperty } from "@nestjs/swagger";

export class RefreshDto {
  @ApiProperty({ example: "token", description: "Refresh token of the user." })
  refresh_token: string;
}
