import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../core';
import { Response } from 'express';
import { Prisma, TodoItem } from '@prisma/client';

@ApiTags('Todo')
@Controller('/todo')
export class TodoController {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  @ApiResponse({})
  list() {
    return this.prisma.todoItem.findMany({});
  }

  @Get('/:id')
  async getOne(
    @Param('id') id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const entry = await this.prisma.todoItem.findFirst({ where: { id } });
    if (!entry) {
      res.status(HttpStatus.NOT_FOUND).end();
    } else {
      return entry;
    }
  }

  @Post()
  @ApiBody({})
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(
    @Body() dto: Prisma.TodoItemCreateInput,
    @Res() res: Response,
  ): Promise<void> {
    await this.prisma.todoItem.create({ data: dto });
    res.status(HttpStatus.CREATED).end();
  }

  @Delete('/:id')
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
    return entry;
  }
}
