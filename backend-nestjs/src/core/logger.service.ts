import { Scope } from '@nestjs/common';
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LeveledLogMethod, createLogger, Logger, format, transports } from 'winston';
import { LoggerConfig } from '~/config';
const { combine, timestamp, printf } = format;

const Colors = {
  debug: '\x1b[42m',
  info: '\x1b[36m',
  warn: '\x1b[33m',
  error: '\x1b[31m',
};

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements NestLoggerService {
  private readonly logger: Logger;

  constructor(configService: ConfigService) {
    const config = configService.get<LoggerConfig>('logger');

    const myFormat = printf((params) => {
      const { level, message, timestamp, '0': moduleName, ...args } = params;
      const stringLevel = config.useColor ? `${Colors[level]}${level.toUpperCase()}\x1b[0m` : level.toLocaleUpperCase();

      let logMessage = `${timestamp} [${stringLevel}] - ${moduleName}: ${message}`;
      if (args && Object.keys(args).length) {
        logMessage = logMessage + ` - ${JSON.stringify(args)}`;
      }
      return logMessage;
    });

    this.logger = createLogger({
      level: config.level,
      format: combine(timestamp(), myFormat),
      transports: [new transports.Console()],
    });

    this.debug = this.logger.debug.bind(this.logger);
    this.info = this.logger.info.bind(this.logger);
    this.warn = this.logger.warn.bind(this.logger);
    this.error = this.logger.error.bind(this.logger);
  }

  public debug: LeveledLogMethod;
  public info: LeveledLogMethod;
  public warn: LeveledLogMethod;
  public error: LeveledLogMethod;
  public flush: () => Promise<void>;

  public log(message: any, ...optionalParams: any[]): any {
    const { '0': moduleName } = optionalParams;
    const shallIgnore = ['InstanceLoader', 'RouterExplorer', 'RoutesResolver'].includes(moduleName);
    if (shallIgnore) {
      return null;
    }
    return this.info(message, optionalParams);
  }
}
