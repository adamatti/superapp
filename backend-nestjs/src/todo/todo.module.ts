import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';

@Module({
  imports: [],
  controllers: [TodoController],
})
export class TodoModule {}
