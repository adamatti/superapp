import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IsPublic } from '../auth';
import { UrlShortenerService } from './url-shortener.service';

@ApiTags('URL Shortener')
@Controller('/url-shortener')
export class UrlShortenerController {
  constructor(
    @Inject(UrlShortenerService)
    private readonly service: UrlShortenerService,
  ) {}

  @Get('/go/:key')
  @IsPublic()
  async go(@Param('key') key: string, @Res() res: Response): Promise<void> {
    const entry = await this.service.findByKey(key);

    if (!entry) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send({
          status: 'error',
          message: `No url found for key '${key}'`,
        })
        .end();
      return;
    }

    // TODO increase counter / lastUsage

    res.redirect(entry.url.url);
  }

  // TODO implement crud operations
}
