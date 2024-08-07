import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/common/prisma/prisma.service";
import { UserQueryDto } from "./dto/user-query.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async createOrUpdate(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.upsert({
      where: {
        loginId: createUserDto.loginId,
      },
      update: {
        deptCode: createUserDto.deptCode,
      },
      create: {
        loginId: createUserDto.loginId,
        username: createUserDto.username,
        deptCode: createUserDto.deptCode,
        roleId: createUserDto.roleId,
      },
    });
    return user;
  }

  async findAll(queryParams: UserQueryDto) {
    const { _page = 0, _per_page = 10, _search } = queryParams;
    const skip = +_page * _per_page;
    const take = +_per_page;
    const or = _search
      ? {
          OR: [{ username: { contains: _search } }, { loginId: { contains: _search } }],
        }
      : {};
    const users = await this.prisma.user.findMany({
      skip,
      take,
      where: or,
      include: {
        Role: true,
      },
    });

    const total = await this.prisma.user.count({
      where: or,
    });

    return {
      data: users,
      meta: {
        page: _page,
        per_page: _per_page,
        total_pages: total,
      },
    };
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        Role: {
          include: {
            Permissions: true,
          },
        },
      },
    });
  }

  findByLoginId(loginId: string) {
    return this.prisma.user.findUnique({
      where: {
        loginId,
      },
      include: {
        Role: true,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
