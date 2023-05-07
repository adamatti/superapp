import { Module } from '@nestjs/common';
import { TelegramBotModule } from './telegram/bot.module';
import { SlackBotModule } from './slack/slack.module';

const imports = [];

// FIXME find a way of doing it using config.ts instead of env vars
if (process.env.TELEGRAM_TOKEN) imports.push(TelegramBotModule);
if (process.env.SLACK_BOT_TOKEN) imports.push(SlackBotModule);

@Module({
  imports,
})
export class BotModule {}
