import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '../../core';
import { WebClient } from '@slack/web-api';
import { SlackMessage, SlackUrlVerification } from './types';
import { ConfigService } from '@nestjs/config';
import { SlackConfig } from '~/config';
import { SlashCommand } from '@slack/bolt';
import { BotEngineService } from '../engine/bot-engine.service';

@Injectable({})
export class SlackBotService {
  private slackWebClient: WebClient;

  constructor(
    configService: ConfigService,
    @Inject(LoggerService) private readonly logger: LoggerService,
    @Inject(BotEngineService) private readonly botEngineService: BotEngineService,
  ) {
    const slackConfig = configService.get<SlackConfig>('slack');
    this.slackWebClient = new WebClient(slackConfig.token);
  }

  async handleUpdate(request: SlackUrlVerification | SlackMessage): Promise<string> {
    this.logger.info(`Msg received ${JSON.stringify(request)}`);
    if (request.challenge && request.type === 'url_verification') {
      return request.challenge;
    }

    if (request.type === 'event_callback' && request.event.subtype !== 'bot_message' && !request.event.bot_id) {
      try {
        const text = await this.botEngineService.reply({ message: request.event.text });

        await this.slackWebClient.chat.postMessage({
          channel: request.event.channel,
          text,
        });
      } catch (error) {
        this.logger.error(error);
      }
    }

    return '';
  }

  async handleCommands(command: SlashCommand): Promise<string> {
    return this.botEngineService.reply({
      command: command.command,
      message: command.text,
    });
  }
}
