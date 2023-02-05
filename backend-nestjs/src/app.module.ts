import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { CoreModule } from './core';
import { TodoModule } from './todo';

@Module({
  imports: [CoreModule, AuthModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
