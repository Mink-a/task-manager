import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { PermissionEntity } from "./entities/permission.entity";

@ApiTags("permissions")
@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @ApiCreatedResponse({ description: "The permission has been successfully created.", type: PermissionEntity })
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @ApiOkResponse({ description: "Return all permissions.", type: PermissionEntity, isArray: true })
  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @ApiOkResponse({ description: "Return the permission.", type: PermissionEntity })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.permissionsService.findOne(id);
  }

  @ApiOkResponse({ description: "Return the permission.", type: PermissionEntity })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @ApiOkResponse({ description: "Return the permission.", type: PermissionEntity })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.permissionsService.remove(id);
  }
}
