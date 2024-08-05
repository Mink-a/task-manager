import { ApiProperty } from "@nestjs/swagger";
import { TaskType } from "@prisma/client";

export class TaskTypeEntity implements TaskType {
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
