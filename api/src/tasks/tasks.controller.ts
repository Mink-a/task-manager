import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskQueryDto } from "./dto/task-query.dto";
import { TaskEntity } from "./entities/task.entity";
import { JwtUserDto } from "src/auth/dto/jwt-user.dto";
import { User } from "src/auth/decorator/user.decorator";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("tasks")
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: "Create a new task" })
  @ApiResponse({ status: 201, description: "Task successfully created.", type: TaskEntity })
  @ApiResponse({ status: 400, description: "Bad request." })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all tasks" })
  @ApiResponse({ status: 200, description: "Return all tasks.", type: TaskEntity, isArray: true })
  @ApiResponse({ status: 404, description: "No tasks found." })
  findAll(@Query() queryParams: TaskQueryDto, @User() user: JwtUserDto) {
    return this.tasksService.findAll(queryParams, user);
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a task by ID" })
  @ApiResponse({ status: 200, description: "Return the task.", type: TaskEntity })
  @ApiResponse({ status: 404, description: "Task not found." })
  findOne(@Param("id") id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a task by ID" })
  @ApiResponse({ status: 200, description: "Task successfully updated.", type: TaskEntity })
  @ApiResponse({ status: 404, description: "Task not found." })
  update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a task by ID" })
  @ApiResponse({ status: 200, description: "Task successfully deleted." })
  @ApiResponse({ status: 404, description: "Task not found." })
  remove(@Param("id") id: string) {
    return this.tasksService.remove(+id);
  }
}
