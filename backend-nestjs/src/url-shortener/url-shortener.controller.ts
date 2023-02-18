import { Controller, Get, HttpStatus, Inject, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @Get('/go/:applicationKey/:key')
  @IsPublic()
  @ApiOperation({ description: 'Redirect to the key provided' })
  @ApiResponse({ status: 200, description: 'Redirect to the valid URL' })
  @ApiResponse({ status: 400, description: 'Key not found' })
  async go(
    @Param('key') key: string,
    @Param('applicationKey') applicationKey: string,
    @Res() res: Response,
  ): Promise<void> {
    const url = await this.service.findUrlPathByKey(applicationKey, key);

    if (!url) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send({
          status: 'error',
          message: `No url found for key '${key}'`,
        })
        .end();
      return;
    }

    res.redirect(url);
  }
}
