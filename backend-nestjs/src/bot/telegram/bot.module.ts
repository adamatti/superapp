import { Module } from '@nestjs/common';
import { TelegramBotController } from './bot.controller';
import { TelegramBotService } from './bot.service';

@Module({
  controllers: [TelegramBotController],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
