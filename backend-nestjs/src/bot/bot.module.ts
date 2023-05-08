import { Module } from '@nestjs/common';
import { TelegramBotModule } from './telegram';
import { SlackBotModule } from './slack';
import { BotEngineModule } from './engine';
import { ChatGptModule } from './chatgpt';

const imports = [BotEngineModule];

// FIXME find a way of doing it using config.ts instead of env vars
if (process.env.OPENAI_TOKEN) imports.push(ChatGptModule);
if (process.env.TELEGRAM_TOKEN) imports.push(TelegramBotModule);
if (process.env.SLACK_BOT_TOKEN) imports.push(SlackBotModule);

@Module({
  imports,
})
export class BotModule {}
