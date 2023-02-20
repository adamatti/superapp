import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf, Context, Types } from 'telegraf';
import { LoggerService } from '../core';
import { TelegramConfig, WebConfig } from '../config';
import { registerBotCommands } from './commands';
import { Update } from 'telegraf/typings/core/types/typegram';

const SIGINT = 'SIGINT';
const SIGTERM = 'SIGTERM';

@Injectable()
export class BotService {
  private readonly bot: Telegraf;

  constructor(
    configService: ConfigService,
    @Inject(LoggerService)
    private readonly logger: LoggerService,
  ) {
    const appEnv = configService.get<string>('appEnv');
    const telegramConfig = configService.get<TelegramConfig>('telegram');
    const webConfig = configService.get<WebConfig>('web');

    this.bot = new Telegraf(telegramConfig.token);

    registerBotCommands(this.bot);

    if (appEnv === 'dev') {
      this.bot.launch();
    } else {
      const url = `https://${webConfig.domain}/api/telegram`;
      this.logger.debug(`Using telegram webhook: ${url}`);
      this.bot.telegram.setWebhook(url);
      this.shutdownHooks();
    }
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
