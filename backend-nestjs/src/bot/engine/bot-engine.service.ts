import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '../../core';
import { DollarCommand } from './commands/dollar';
import { BotRequest, BotCommand } from './types';

@Injectable()
export class BotEngineService {
  readonly commands: BotCommand[] = [new DollarCommand()];

  constructor(
    @Inject(LoggerService)
    private readonly logger: LoggerService,
  ) {}
  async reply(request: BotRequest): Promise<string> {
    const foundCommand = this.commands.find((c) => c.accept(request));

    if (foundCommand) {
      return foundCommand.reply(request);
    }

    if (request.command || request.message?.startsWith('/')) {
      return `Command '${request.command ?? request.message}' not implemented`;
    }

    return `Don't know what to answer - text received: ${request.message}`;
  }
}
