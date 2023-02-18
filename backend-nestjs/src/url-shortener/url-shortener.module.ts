import { Module } from '@nestjs/common';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerCrudController } from './url-shortener.crud.controller';
import { UrlShortenerService } from './url-shortener.service';

@Module({
  providers: [UrlShortenerService],
  controllers: [UrlShortenerCrudController, UrlShortenerController],
})
export class UrlShortenerModule {}
