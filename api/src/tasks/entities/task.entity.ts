import { ApiProperty } from "@nestjs/swagger";
import { Task } from "@prisma/client";
import { UserEntity } from "src/users/entities/user.entity";

export class TaskEntity implements Task {
  @ApiProperty({ description: "Date of the task", example: "2021-01-01T00:00:00.000Z" })
  createdAt: Date;

  @ApiProperty({ description: "Date of the task", example: "2021-01-01T00:00:00.000Z" })
  updatedAt: Date;

  @ApiProperty({ description: "Unique identifier for the task", example: 1 })
  id: string;

  @ApiProperty({ description: "Title of the task", example: "Meeting with team" })
  title: string;

  @ApiProperty({ description: "ID of the task type", example: 1 })
  taskTypeId: string;

  @ApiProperty({ description: "Date of the task", example: "2021-01-01T00:00:00.000Z" })
  date: Date;

  @ApiProperty({ description: "Start time of the task", example: "19:00" })
  startTime: string;

  @ApiProperty({ description: "End time of the task", example: "20:00" })
  endTime: string;

  @ApiProperty({ description: "ID of the user associated with the task", example: 1 })
  userId: string;

  @ApiProperty({
    description: "",
    type: UserEntity,
  })
  user: UserEntity;
}
