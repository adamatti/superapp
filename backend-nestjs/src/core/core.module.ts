import { Global, Module } from '@nestjs/common';
import { HealthcheckController } from './healthcheck.controller';
import { LoggerService } from './logger.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  controllers: [HealthcheckController],
  providers: [PrismaService, LoggerService],
  exports: [PrismaService, LoggerService],
})
export class CoreModule {}
