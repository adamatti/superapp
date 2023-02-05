import { Module } from '@nestjs/common';
import { GlobalGuard } from './global.guard';

@Module({
  providers: [GlobalGuard],
})
export class AuthModule {}
