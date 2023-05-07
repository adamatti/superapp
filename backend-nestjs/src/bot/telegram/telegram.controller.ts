import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Update } from 'telegraf/typings/core/types/typegram';
import { LoggerService } from '../../core';
import { IsPublic } from '../../auth';
import { TelegramBotService } from './telegram.service';
import { TelegramUpdate } from './types';

@ApiTags('Telegram')
@Controller('/telegram')
export class TelegramBotController {
  constructor(
    private readonly botService: TelegramBotService,
    @Inject(LoggerService)
    private readonly logger: LoggerService,
  ) {}

  @Post()
  @IsPublic()
  @ApiBody({})
  @ApiOperation({ description: 'Telegram webhook' })
  @ApiResponse({ status: 200 })
  async handleUpdate(@Body() update: Update): Promise<void> {
    const telegramUpdate = update as TelegramUpdate;

    this.logger.debug(`Received`, {
      chatId: telegramUpdate.message.chat.id,
      msg: telegramUpdate.message.text,
    });
    await this.botService.handleUpdate(update);
  }
}
