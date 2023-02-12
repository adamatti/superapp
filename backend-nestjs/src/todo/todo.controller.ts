import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../core';
import { Response } from 'express';
import { Prisma, TodoItem as PrismaTodoItem } from '@prisma/client';
import { TodoItem } from './dto';

@ApiTags('Todo')
@Controller('/todo/item')
export class TodoController {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: TodoItem, isArray: true })
  @ApiBearerAuth()
  async list(): Promise<TodoItem[]> {
    const entities: PrismaTodoItem[] = await this.prisma.todoItem.findMany({});
    return entities.map(TodoItem.fromPrisma);
  }

  @Get('/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Find a record', type: TodoItem, isArray: false })
  async getOne(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
    const entry = await this.prisma.todoItem.findFirst({ where: { id } });
    if (!entry) {
      res.status(HttpStatus.NOT_FOUND).end();
    } else {
      return TodoItem.fromPrisma(entry);
    }
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({})
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(@Body() dto: Prisma.TodoItemCreateInput, @Res() res: Response): Promise<void> {
    await this.prisma.todoItem.create({ data: dto });
    res.status(HttpStatus.CREATED).end();
  }

  @Delete('/:id')
  @ApiBearerAuth()
  async delete(@Param('id') id: number, @Res() res: Response): Promise<void> {
    const entry = await this.prisma.todoItem.findFirst({ where: { id } });
    if (!entry) {
      res.status(HttpStatus.NOT_FOUND).end();
      return;
    }
    await this.prisma.todoItem.delete({ where: { id } });
    res.status(HttpStatus.ACCEPTED).end();
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Row not found' })
  @ApiResponse({ status: 200, type: TodoItem, isArray: false, description: 'Update accepted' })
  async update(
    @Param('id') id: number,
    @Body() dto: Prisma.TodoItemUpdateInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TodoItem | null> {
    let entry = await this.prisma.todoItem.findFirst({ where: { id } });
    if (!entry) {
      res.status(HttpStatus.NOT_FOUND).end();
      return null;
    }
    entry = await this.prisma.todoItem.update({ data: dto, where: { id } });
    return TodoItem.fromPrisma(entry);
  }
}
