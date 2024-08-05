import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { TaskTypesService } from "./task-types.service";
import { CreateTaskTypeDto } from "./dto/create-task-type.dto";
import { UpdateTaskTypeDto } from "./dto/update-task-type.dto";
import { TaskTypeEntity } from "./entities/task-type.entity";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";
import { TaskTypeQueryDto } from "./dto/task-type-query.dto";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("task-types")
@Controller("task-types")
export class TaskTypesController {
  constructor(private readonly taskTypesService: TaskTypesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new task type" })
  @ApiResponse({ status: 201, description: "The task type has been successfully created.", type: TaskTypeEntity })
  @ApiResponse({ status: 400, description: "Bad Request." })
  create(@Body() createTaskTypeDto: CreateTaskTypeDto) {
    return this.taskTypesService.create(createTaskTypeDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all task types" })
  @ApiResponse({ status: 200, description: "Return all task types.", type: TaskTypeEntity, isArray: true })
  @ApiResponse({ status: 404, description: "No task types found." })
  findAll(@Query() queryParams: TaskTypeQueryDto) {
    return this.taskTypesService.findAll(queryParams);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a task type by ID" })
  @ApiResponse({ status: 200, description: "Return the task type.", type: TaskTypeEntity })
  @ApiResponse({ status: 404, description: "Task type not found." })
  findOne(@Param("id") id: string) {
    return this.taskTypesService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a task type by ID" })
  @ApiResponse({ status: 200, description: "The task type has been successfully updated.", type: TaskTypeEntity })
  @ApiResponse({ status: 404, description: "Task type not found." })
  update(@Param("id") id: string, @Body() updateTaskTypeDto: UpdateTaskTypeDto) {
    return this.taskTypesService.update(id, updateTaskTypeDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a task type by ID" })
  @ApiResponse({ status: 200, description: "The task type has been successfully deleted." })
  @ApiResponse({ status: 404, description: "Task type not found." })
  remove(@Param("id") id: string) {
    return this.taskTypesService.remove(id);
  }
}
