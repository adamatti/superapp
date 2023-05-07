import { Module } from '@nestjs/common';
import { SlackBotService } from './slack.service';
import { SlackBotController } from './slack.controller';
import { BotEngineModule } from '../engine';

@Module({
  imports: [BotEngineModule],
  controllers: [SlackBotController],
  providers: [SlackBotService],
})
export class SlackBotModule {}
