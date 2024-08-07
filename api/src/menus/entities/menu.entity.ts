import { ApiProperty } from "@nestjs/swagger";
import { Menu } from "@prisma/client";

export class MenuEntity implements Menu {
  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  updatedAt: Date;
  @ApiProperty({ description: "ID of the menu" })
  id: string;

  @ApiProperty({ description: "Name of the menu" })
  name: string;
}
