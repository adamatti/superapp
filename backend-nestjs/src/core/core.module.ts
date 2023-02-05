import { Global, Module } from '@nestjs/common';
import { HealthcheckController } from './healthcheck.controller';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  controllers: [HealthcheckController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CoreModule {}
