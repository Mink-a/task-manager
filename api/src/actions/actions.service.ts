import { Injectable } from "@nestjs/common";
import { CreateActionDto } from "./dto/create-action.dto";
import { UpdateActionDto } from "./dto/update-action.dto";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class ActionsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createActionDto: CreateActionDto) {
    return this.prisma.action.create({
      data: createActionDto,
    });
  }

  async findAll() {
    const actions = await this.prisma.action.findMany();
    return {
      data: actions,
      meta: {
        page: 1,
        per_page: 10,
        total_pages: 1,
      },
    };
  }

  findOne(id: string) {
    return this.prisma.action.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateActionDto: UpdateActionDto) {
    return this.prisma.action.update({
      where: {
        id,
      },
      data: updateActionDto,
    });
  }

  remove(id: string) {
    return this.prisma.action.delete({ where: { id } });
  }
}
