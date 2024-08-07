import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskTypeDto {
  @ApiProperty({
    description: "The name of the task type",
    example: "Development",
  })
  name: string;
}
