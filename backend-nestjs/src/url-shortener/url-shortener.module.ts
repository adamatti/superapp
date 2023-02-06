import { Module } from '@nestjs/common';
import { UrlShortenerController } from './url-shortener.controller';
import { UrlShortenerService } from './url-shortener.service';

@Module({
  providers: [UrlShortenerService],
  controllers: [UrlShortenerController],
})
export class UrlShortenerModule {}
