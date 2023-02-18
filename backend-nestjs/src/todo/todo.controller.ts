import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { TodoItem } from './dto';
import { TodoService } from './todo.service';

@ApiTags('Todo')
@Controller('/todo/item')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiResponse({ status: 200, type: TodoItem, isArray: true })
  @ApiBearerAuth()
  async list(@Req() { userId }: any): Promise<TodoItem[]> {
    return this.todoService.list(userId);
  }

  @Get('/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Find a record', type: TodoItem, isArray: false })
  async getOne(@Param('id') id: number, @Req() { userId }: any, @Res({ passthrough: true }) res: Response) {
    const dto = await this.todoService.findById(userId, id);
    if (!dto) {
      res.status(HttpStatus.NOT_FOUND).end();
    } else {
      return dto;
    }
  }

  @Post()
  @ApiBearerAuth()
  @ApiBody({})
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(@Body() dto: Prisma.TodoItemCreateInput, @Req() { userId }: any, @Res() res: Response): Promise<void> {
    await this.todoService.create(userId, dto);
    res.status(HttpStatus.CREATED).end();
  }

  @Delete('/:id')
  @ApiBearerAuth()
  async delete(@Param('id') id: number, @Req() { userId }: any, @Res() res: Response): Promise<void> {
    const dto = await this.todoService.findById(userId, id);
    if (!dto) {
      res.status(HttpStatus.NOT_FOUND).end();
      return;
    }
    await this.todoService.delete(userId, id);
    res.status(HttpStatus.ACCEPTED).end();
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Row not found' })
  @ApiResponse({ status: 200, type: TodoItem, isArray: false, description: 'Update accepted' })
  async update(
    @Param('id') id: number,
    @Body() dto: Prisma.TodoItemUpdateInput,
    @Req() { userId }: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TodoItem | null> {
    const entry = await this.todoService.findById(userId, id);
    if (!entry) {
      res.status(HttpStatus.NOT_FOUND).end();
      return null;
    }
    return this.todoService.update(userId, id, dto);
  }
}
