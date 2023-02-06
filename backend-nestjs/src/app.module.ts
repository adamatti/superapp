import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth';
import { CoreModule } from './core';
import { TodoModule } from './todo';
import { join } from 'path';
import { UrlShortenerModule } from './url-shortener';

@Module({
  imports: [
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
