import { Body, Controller, Header, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '~/auth';
import { LoggerService } from '../../core';
import { SlackBotService } from './slack.service';
import { SlackMessage, SlackUrlVerification } from './types';

@ApiTags('Slack')
@Controller('/slack')
@ApiResponse({ status: 200 })
export class SlackBotController {
  constructor(
    @Inject(LoggerService)
    private readonly logger: LoggerService,

    private readonly slackBotService: SlackBotService,
  ) {}

  @Post()
  @HttpCode(200)
  @Header('content-type', 'text/plain')
  @IsPublic()
  async handleUpdate(@Body() request: SlackUrlVerification | SlackMessage): Promise<string> {
    this.logger.info(`Msg received ${JSON.stringify(request)}`);
    return this.slackBotService.handleUpdate(request);
  }
}
