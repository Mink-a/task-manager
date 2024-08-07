import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PrismaService } from "src/common/prisma/prisma.service";
import { TaskQueryDto } from "./dto/task-query.dto";
import { JwtUserDto } from "src/auth/dto/jwt-user.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll(queryParams: TaskQueryDto, user: JwtUserDto) {
    console.log(user, user.role.name);
    const { _page = 0, _per_page = 10, _search, _user, _fromDate, _toDate } = queryParams;
    const skip = +_page * _per_page;
    const take = +_per_page;

    // Construct the where clause dynamically based on available filters
    const where: Prisma.TaskWhereInput = {};
    const orderBy: Prisma.TaskOrderByWithRelationInput[] = [{ date: "desc" }];

    if (_search) {
      where.OR = [
        { title: { contains: _search } },
        {
          User: { username: { contains: _search } },
        },
      ];
    }

    if (_fromDate && _toDate) {
      where.date = {
        gte: new Date(_fromDate),
        lte: new Date(_toDate),
      };
    }

    if (_user) {
      where.userId = { equals: _user };
    }

    const tasks = await this.prisma.task.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        TaskType: true,
        User: true, // Assuming you also want to include user data
      },
    });

    const total = await this.prisma.task.count({
      where,
    });

    return {
      data: tasks,
      meta: {
        page: _page,
        per_page: _per_page,
        total_pages: total,
      },
    };
  }

  findOne(id: string) {
    return this.prisma.task.findUnique({
      where: {
        id: id,
      },
      include: {
        User: true,
      },
    });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    console.log(updateTaskDto);
    return this.prisma.task.update({
      where: {
        id: id,
      },
      data: updateTaskDto,
    });
  }

  remove(id: string) {
    return this.prisma.task.delete({
      where: {
        id: id,
      },
    });
  }
}
