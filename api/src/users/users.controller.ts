import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserQueryDto } from "./dto/user-query.dto";
import { UserEntity } from "./entities/user.entity";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({ status: 201, description: "The user has been successfully created.", type: UserEntity })
  @ApiResponse({ status: 400, description: "Bad Request." })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, description: "Successfully retrieved list of users.", type: UserEntity, isArray: true })
  findAll(@Query() queryParams: UserQueryDto) {
    return this.usersService.findAll(queryParams);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  @ApiResponse({ status: 200, description: "User found and returned.", type: UserEntity })
  @ApiResponse({ status: 404, description: "User not found." })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({ status: 200, description: "The user has been successfully updated.", type: UserEntity })
  @ApiResponse({ status: 404, description: "User not found." })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({ status: 200, description: "The user has been successfully deleted." })
  @ApiResponse({ status: 404, description: "User not found." })
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
