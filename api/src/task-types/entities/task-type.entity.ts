import { ApiProperty } from "@nestjs/swagger";
import { TaskType } from "@prisma/client";

export class TaskTypeEntity implements TaskType {
  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ description: "Date", example: "2021-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiProperty({
    description: "The name of the task type",
    example: "Development",
  })
  name: string;

  @ApiProperty({
    description: "The id of the task type",
    example: 1,
  })
  id: string;
}
