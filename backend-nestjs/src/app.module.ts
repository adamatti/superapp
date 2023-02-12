import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth';
import { CoreModule } from './core';
import { TodoModule } from './todo';
import { join } from 'path';
import { UrlShortenerModule } from './url-shortener';
import { ConfigModule } from '@nestjs/config';
import { load as loadConfig } from './config';

const APP_ENV: string = process.env.APP_ENV || 'dev';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`, `.${APP_ENV}.env.local`, `.${APP_ENV}.env`],
      load: [loadConfig],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CoreModule,
    AuthModule,
    TodoModule,
    UrlShortenerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
