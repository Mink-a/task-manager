import { ApiProperty } from "@nestjs/swagger";

export class TaskQueryDto {
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
    description: "Filter by a specific field",
    example: "",
    required: false,
  })
  _search?: string;

  @ApiProperty({
    description: "Filter by a specific field",
    example: "",
    required: false,
  })
  _user?: string;

  @ApiProperty({
    description: "Filter by a specific field",
    example: "",
    required: false,
  })
  _fromDate?: string;

  @ApiProperty({
    description: "Filter by a specific field",
    example: "",
    required: false,
  })
  _toDate?: string;
}
