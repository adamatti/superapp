import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context, Telegraf } from 'telegraf';
import { LoggerService } from '../../core';
import { TelegramConfig, WebConfig } from '../../config';
import { Update } from 'telegraf/typings/core/types/typegram';
import { BotEngineService } from '../engine/bot-engine.service';
import { TelegramUpdate } from './types';

const SIGINT = 'SIGINT';
const SIGTERM = 'SIGTERM';

@Injectable()
export class TelegramBotService {
  private readonly bot: Telegraf;

  constructor(
    configService: ConfigService,
    @Inject(LoggerService) private readonly logger: LoggerService,
    private readonly botEngineService: BotEngineService,
  ) {
    const appEnv = configService.get<string>('appEnv');
    const telegramConfig = configService.get<TelegramConfig>('telegram');
    const webConfig = configService.get<WebConfig>('web');

    this.bot = new Telegraf(telegramConfig.token);

    this.registerBotCommands(this.bot);

    if (appEnv === 'dev' || appEnv === 'local') {
      this.bot.launch();
    } else {
      const url = `https://${webConfig.domain}/api/telegram`;
      this.logger.debug(`Using telegram webhook: ${url}`);
      this.bot.telegram.setWebhook(url);
      this.shutdownHooks();
    }
  }

  private registerBotCommands(bot: Telegraf): void {
    this.botEngineService.commands.forEach((handler) => {
      handler.commands.forEach((c) => {
        bot.command(c, async (ctx: Context) => {
          const update = ctx.update as TelegramUpdate;
          const response = await handler.reply({
            command: c,
            message: update.message.text,
          });
          ctx.reply(response);
        });
      });
    });

    // default
    bot.on('message', async (ctx: Context) => {
      const update = ctx.update as TelegramUpdate;
      const response = await this.botEngineService.reply({ message: update.message.text });
      ctx.reply(response);
    });
  }

  /**
   * Method to be called by telegram itself (webhook)
   * @param update
   * @returns
   */
  handleUpdate(update: Update) {
    return this.bot.handleUpdate(update);
  }

  private shutdownHooks(): void {
    process.once(SIGINT, () => {
      this.logger.log(SIGINT);
      this.bot.stop(SIGINT);
    });

    process.once(SIGTERM, () => {
      this.logger.log(SIGTERM);
      this.bot.stop(SIGTERM);
    });
  }
}
