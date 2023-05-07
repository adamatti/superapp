import { Module } from '@nestjs/common';
import { TelegramBotController } from './telegram.controller';
import { TelegramBotService } from './telegram.service';
import { BotEngineModule } from '../engine';

@Module({
  imports: [BotEngineModule],
  controllers: [TelegramBotController],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
