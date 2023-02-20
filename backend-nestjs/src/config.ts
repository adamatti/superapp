import { IsNumber, IsString, IsNotEmpty, IsObject, validateSync, IsBoolean } from 'class-validator';

function validateOrThrow<T extends object>(obj: T): T {
  const errors = validateSync(obj, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return obj;
}

export class TelegramConfig {
  @IsString()
  @IsNotEmpty()
  token: string;

  static build(args: Partial<TelegramConfig>): TelegramConfig {
    const config = Object.assign(new TelegramConfig(), args);
    return validateOrThrow(config);
  }
}

export class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  url: string;

  static build(args: Partial<DatabaseConfig>): DatabaseConfig {
    const config = Object.assign(new DatabaseConfig(), args);
    return validateOrThrow(config);
  }
}

export class WebConfig {
  @IsNumber()
  port: number;

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsString()
  @IsNotEmpty()
  cookieSecret: string;

  static build(args: Partial<WebConfig>): WebConfig {
    const config = Object.assign(new WebConfig(), args);
    return validateOrThrow(config);
  }
}

export class AuthConfig {
  @IsString()
  @IsNotEmpty()
  jwksUri: string;

  @IsString()
  @IsNotEmpty()
  audience: string;

  @IsString()
  @IsNotEmpty()
  issuer: string;

  static build(args: Partial<AuthConfig>): AuthConfig {
    const config = Object.assign(new AuthConfig(), args);
    return validateOrThrow(config);
  }
}

export class LoggerConfig {
  /**
   * log level
   */
  @IsString()
  @IsNotEmpty()
  level: string;

  /**
   * shall use colors on console log
   */
  @IsBoolean()
  @IsNotEmpty()
  useColor: boolean;

  /**
   * Shall log sql
   */
  @IsBoolean()
  @IsNotEmpty()
  sql: boolean;

  static build(args: Partial<LoggerConfig>): LoggerConfig {
    const config = Object.assign(new LoggerConfig(), args);
    return validateOrThrow(config);
  }
}

class Config {
  @IsString()
  @IsNotEmpty()
  appEnv: string;

  @IsObject()
  web: WebConfig;

  @IsObject()
  auth: AuthConfig;

  @IsObject()
  database: DatabaseConfig;

  @IsObject()
  logger: LoggerConfig;

  @IsObject()
  telegram: TelegramConfig;

  static buildFromEnv(): Config {
    return Config.build({
      appEnv: `${process.env.APP_ENV || 'dev'}`,
      web: WebConfig.build({
        port: Number(process.env.PORT || 3000),
        domain: `${process.env.DOMAIN || ''}`,
        cookieSecret: `${process.env.COOKIE_SECRET || 'potato'}`,
      }),
      auth: AuthConfig.build({
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
        audience: `${process.env.AUTH0_AUDIENCE || ''}`,
        issuer: `${process.env.AUTH0_ISSUER_URL || ''}`,
      }),
      database: DatabaseConfig.build({
        url: `${process.env.DATABASE_URL || ''}`,
      }),
      logger: LoggerConfig.build({
        level: `${process.env.LOG_LEVEL || 'info'}`,
        sql: process.env.LOG_SQL === 'true',
        useColor: process.env.LOG_USE_COLOR === 'true',
      }),
      telegram: TelegramConfig.build({
        token: `${process.env.TELEGRAM_TOKEN || ''}`,
      }),
    });
  }

  static build(args: Partial<Config>): Config {
    const config = Object.assign(new Config(), args);
    return validateOrThrow(config);
  }
}

export const load = (): Config => Config.buildFromEnv();
