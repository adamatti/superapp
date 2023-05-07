import { Module } from '@nestjs/common';
import { BotEngineService } from './bot-engine.service';

@Module({
  providers: [BotEngineService],
  exports: [BotEngineService],
})
export class BotEngineModule {}
