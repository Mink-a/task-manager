import { Injectable } from "@nestjs/common";
import { CreateTaskTypeDto } from "./dto/create-task-type.dto";
import { UpdateTaskTypeDto } from "./dto/update-task-type.dto";
import { PrismaService } from "src/common/prisma/prisma.service";
import { TaskTypeQueryDto } from "./dto/task-type-query.dto";

@Injectable()
export class TaskTypesService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTaskTypeDto: CreateTaskTypeDto) {
    return this.prisma.taskType.create({
      data: {
        name: createTaskTypeDto.name,
      },
    });
  }

  async findAll(queryParams: TaskTypeQueryDto) {
    const { _page = 0, _per_page = 10, _search } = queryParams;
    const skip = +_page * _per_page;
    const take = +_per_page;
    const or = _search
      ? {
          OR: [{ name: { contains: _search } }],
        }
      : {};

    const taskTypes = await this.prisma.taskType.findMany({
      skip,
      take,
      where: {
        ...or,
      },
    });
    const total = await this.prisma.taskType.count({
      where: {
        ...or,
      },
    });
    return {
      data: taskTypes,
      meta: {
        page: _page,
        per_page: _per_page,
        total_pages: total,
      },
    };
  }

  findOne(id: string) {
    return this.prisma.taskType.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateTaskTypeDto: UpdateTaskTypeDto) {
    return this.prisma.taskType.update({
      where: {
        id: id,
      },
      data: {
        name: updateTaskTypeDto.name,
      },
    });
  }

  remove(id: string) {
    return this.prisma.taskType.delete({
      where: {
        id: id,
      },
    });
  }
}
