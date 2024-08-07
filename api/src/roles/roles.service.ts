import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: {
        name: createRoleDto.name,
        Permissions: {
          create: createRoleDto.Permissions.map(permission => ({ actionId: permission.actionId, menuId: permission.menuId })),
        },
      },
    });
  }

  async findAll() {
    const roles = await this.prisma.role.findMany({
      include: {
        Permissions: true,
      },
    });
    return {
      data: roles,
      meta: {
        page: 1,
        per_page: 10,
        total_pages: 1,
      },
    };
  }

  findOne(id: string) {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  findByName(name: string) {
    return this.prisma.role.findUnique({
      where: {
        name,
      },
    });
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: {
        id,
      },
      data: {
        name: updateRoleDto.name,
        Permissions: {
          deleteMany: {},
          create: updateRoleDto.Permissions.map(permission => ({
            menuId: permission.menuId,
            actionId: permission.actionId,
          })),
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.role.delete({
      where: {
        id,
      },
    });
  }
}
