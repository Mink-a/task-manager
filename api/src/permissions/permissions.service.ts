import { Injectable } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { PrismaService } from "src/common/prisma/prisma.service";

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPermissionDto: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: createPermissionDto,
    });
  }

  async findAll() {
    const permissions = await this.prisma.permission.findMany({
      include: {
        Role: true,
        Action: true,
        Menu: true,
      },
    });
    return {
      data: permissions,
      meta: {
        page: 1,
        per_page: 10,
        total_pages: 1,
      },
    };
  }

  findOne(id: string) {
    return this.prisma.permission.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto) {
    return this.prisma.permission.update({
      where: {
        id,
      },
      data: updatePermissionDto,
    });
  }

  remove(id: string) {
    return this.prisma.permission.delete({ where: { id } });
  }
}
