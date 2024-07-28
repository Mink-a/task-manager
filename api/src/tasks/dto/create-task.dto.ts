import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateTaskDto {
  @ApiProperty({ description: "Title of the task", example: "Meeting with team" })
  title: string;

  @ApiProperty({ description: "Date of the task", example: "2021-01-01T00:00:00.000Z" })
  date: Date;

  @ApiProperty({ description: "Start time of the task", example: "2021-01-01T19:00:00.000Z" })
  startTime: string;

  @ApiProperty({ description: "End time of the task", example: "2021-01-01T20:00:00.000Z" })
  endTime: string;

  @ApiProperty({ description: "ID of the user associated with the task", example: 1 })
  @Transform(({ value }) => parseInt(value, 10))
  userId: number;

  @ApiProperty({ description: "ID of the task type", example: 1 })
  @Transform(({ value }) => parseInt(value, 10))
  taskTypeId: number;
}
