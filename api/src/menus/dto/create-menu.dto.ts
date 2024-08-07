import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuDto {
  @ApiProperty()
  name: string;
}
