import { Inject, Injectable } from '@nestjs/common';
import { Prisma, TodoItem as PrismaTodoItem } from '@prisma/client';
import { PrismaService } from '../core';
import { TodoItem } from './dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  async list(userId: number): Promise<TodoItem[]> {
    const entities: PrismaTodoItem[] = await this.prisma.todoItem.findMany({
      where: {
        userId,
      },
    });
    return entities.map(TodoItem.fromPrisma);
  }

  async create(userId: number, dto: Prisma.TodoItemCreateInput): Promise<TodoItem> {
    const entity = await this.prisma.todoItem.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return TodoItem.fromPrisma(entity);
  }

  async update(userId: number, id: number, dto: Prisma.TodoItemUpdateInput): Promise<TodoItem> {
    const entity = await this.prisma.todoItem.update({ data: dto, where: { id, userId } });
    return TodoItem.fromPrisma(entity);
  }

  async findById(userId: number, id: number): Promise<TodoItem> {
    const entry = await this.prisma.todoItem.findFirst({ where: { id, userId } });
    if (!entry) {
      return null;
    }
    return TodoItem.fromPrisma(entry);
  }

  delete(userId: number, id: number) {
    return this.prisma.todoItem.delete({ where: { id, userId } });
  }
}
