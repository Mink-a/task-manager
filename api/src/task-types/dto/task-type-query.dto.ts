import { ApiProperty } from "@nestjs/swagger";

export class TaskTypeQueryDto {
  @ApiProperty({
    description: "Number of records to skip for pagination",
    example: 0,
  })
  _page: number;

  @ApiProperty({
    description: "Number of records to return",
    example: 10,
  })
  _per_page: number;

  @ApiProperty({
    description: "Search query",
    example: "",
    required: false,
  })
  _search: string;
}
