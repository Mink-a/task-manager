import { ApiProperty } from "@nestjs/swagger";

export class CreateActionDto {
  @ApiProperty()
  name: string;
}
