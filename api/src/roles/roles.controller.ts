import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { RoleEntity } from "./entities/role.entity";

@ApiTags("roles")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiCreatedResponse({ description: "The role has been successfully created.", type: RoleEntity })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOkResponse({ description: "Return all roles.", type: RoleEntity, isArray: true })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOkResponse({ description: "Return the role.", type: RoleEntity })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.rolesService.findOne(id);
  }

  @ApiOkResponse({ description: "Return the role.", type: RoleEntity })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @ApiOkResponse({ description: "Return the role.", type: RoleEntity })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.rolesService.remove(id);
  }
}
