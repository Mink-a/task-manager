import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDateString, IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly taskTypeId: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  readonly date: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly startTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly endTime: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly userId: string;
}
