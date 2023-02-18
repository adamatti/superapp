import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime';
import { LoggerConfig } from '~/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(configService: ConfigService) {
    const config = configService.get<LoggerConfig>('logger');
    const args: PrismaClientOptions = config.sql ? { log: ['query'] } : {};
    super(args);
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication): void {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
