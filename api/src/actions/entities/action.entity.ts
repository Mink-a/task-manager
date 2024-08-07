import { ApiProperty } from "@nestjs/swagger";
import { Action } from "@prisma/client";

export class ActionEntity implements Action {
  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
