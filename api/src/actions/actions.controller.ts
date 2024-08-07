import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ActionsService } from "./actions.service";
import { CreateActionDto } from "./dto/create-action.dto";
import { UpdateActionDto } from "./dto/update-action.dto";
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { ActionEntity } from "./entities/action.entity";

@ApiTags("actions")
@Controller("actions")
export class ActionsController {
  constructor(private readonly actionsService: ActionsService) {}

  @ApiCreatedResponse({ description: "The action has been successfully created.", type: ActionEntity })
  @Post()
  create(@Body() createActionDto: CreateActionDto) {
    return this.actionsService.create(createActionDto);
  }

  @ApiOkResponse({ description: "Return all actions.", type: ActionEntity, isArray: true })
  @Get()
  findAll() {
    return this.actionsService.findAll();
  }

  @ApiOkResponse({ description: "Return the action.", type: ActionEntity })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.actionsService.findOne(id);
  }

  @ApiOkResponse({ description: "Return the action.", type: ActionEntity })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateActionDto: UpdateActionDto) {
    return this.actionsService.update(id, updateActionDto);
  }

  @ApiOkResponse({ description: "Return the action.", type: ActionEntity })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.actionsService.remove(id);
  }
}
