import { Injectable } from "@nestjs/common";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: {
        name: createMenuDto.name,
      },
    });
  }

  async findAll() {
    const menus = await this.prisma.menu.findMany();
    return {
      data: menus,
      meta: {
        page: 1,
        per_page: 10,
        total_pages: 10,
      },
    };
  }

  findOne(id: string) {
    return this.prisma.menu.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.prisma.menu.update({
      where: {
        id,
      },
      data: {
        name: updateMenuDto.name,
      },
    });
  }

  remove(id: string) {
    return this.prisma.menu.delete({
      where: {
        id,
      },
    });
  }
}
