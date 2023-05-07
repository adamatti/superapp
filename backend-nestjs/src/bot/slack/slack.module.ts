import { Module } from '@nestjs/common';
import { SlackBotService } from './slack.service';
import { SlackBotController } from './slack.controller';

@Module({
  controllers: [SlackBotController],
  providers: [SlackBotService],
})
export class SlackBotModule {}
