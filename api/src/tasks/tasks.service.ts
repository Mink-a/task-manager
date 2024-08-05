import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PrismaService } from "src/common/prisma/prisma.service";
import { TaskQueryDto } from "./dto/task-query.dto";
import { JwtUserDto } from "src/auth/dto/jwt-user.dto";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll(queryParams: TaskQueryDto, user: JwtUserDto) {
    const { _page = 0, _per_page = 10, _search } = queryParams;
    const skip = +_page * _per_page;
    const take = +_per_page;
    const or = _search
      ? {
          OR: [{ title: { contains: _search } }],
          AND: user.role === "admin" ? [] : [{ user: { id: user.id } }],
        }
      : user.role === "admin"
        ? {}
        : { AND: [{ user: { id: user.id } }] };

    const tasks = await this.prisma.task.findMany({
      skip,
      take,
      where: or,
      include: {
        taskType: true,
      },
    });

    const total = await this.prisma.task.count({ where: or });

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
        user: true,
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
