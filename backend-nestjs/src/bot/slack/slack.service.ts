import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '../../core';
import { WebClient } from '@slack/web-api';
import { SlackMessage, SlackUrlVerification } from './types';
import { ConfigService } from '@nestjs/config';
import { SlackConfig } from '~/config';

@Injectable({})
export class SlackBotService {
  private slackWebClient: WebClient;

  constructor(configService: ConfigService, @Inject(LoggerService) private readonly logger: LoggerService) {
    const slackConfig = configService.get<SlackConfig>('slack');
    this.slackWebClient = new WebClient(slackConfig.token);
  }

  async handleUpdate(request: SlackUrlVerification | SlackMessage): Promise<string> {
    this.logger.info(`Msg received ${JSON.stringify(request)}`);
    if (request.challenge && request.type === 'url_verification') {
      return request.challenge;
    }

    if (request.type === 'event_callback' && request.event.subtype !== 'bot_message') {
      try {
        await this.slackWebClient.chat.postMessage({
          channel: request.event.channel,
          text: 'test',
        });
      } catch (error) {
        this.logger.error(error);
      }
    }

    return '';
  }
}
