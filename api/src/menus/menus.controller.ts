import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { MenusService } from "./menus.service";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { MenuEntity } from "./entities/menu.entity";

@ApiTags("menus")
@Controller("menus")
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @ApiCreatedResponse({ description: "The menu has been successfully created.", type: MenuEntity })
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @ApiOkResponse({ description: "Return all menus.", type: MenuEntity, isArray: true })
  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @ApiOkResponse({ description: "Return the menu.", type: MenuEntity })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.menusService.findOne(id);
  }

  @ApiOkResponse({ description: "Return the menu.", type: MenuEntity })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @ApiOkResponse({ description: "Return the menu.", type: MenuEntity })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.menusService.remove(id);
  }
}
