import { IsNumber, IsString, IsNotEmpty, IsObject, validateSync } from 'class-validator';

function validateOrThrow<T extends object>(obj: T): T {
  const errors = validateSync(obj, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return obj;
}

export class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  url: string;

  static build(args: Partial<DatabaseConfig>) {
    const config = Object.assign(new DatabaseConfig(), args);
    return validateOrThrow(config);
  }
}

export class WebConfig {
  @IsNumber()
  port: number;

  static build(args: Partial<WebConfig>) {
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

  static build(args: Partial<AuthConfig>) {
    const config = Object.assign(new AuthConfig(), args);
    return validateOrThrow(config);
  }
}

class Config {
  @IsObject()
  web: WebConfig;

  @IsObject()
  auth: AuthConfig;

  @IsObject()
  database: DatabaseConfig;

  static buildFromEnv(): Config {
    return Config.build({
      web: WebConfig.build({
        port: Number(process.env.PORT || 3000),
      }),
      auth: AuthConfig.build({
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
        audience: `${process.env.AUTH0_AUDIENCE}`,
        issuer: `${process.env.AUTH0_ISSUER_URL}`,
      }),
      database: DatabaseConfig.build({
        url: `${process.env.DATABASE_URL}`,
      }),
    });
  }

  static build(args: Partial<Config>): Config {
    const config = Object.assign(new Config(), args);
    return validateOrThrow(config);
  }
}

export const load = (): Config => Config.buildFromEnv();
