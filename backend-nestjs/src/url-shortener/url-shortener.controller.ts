import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { IsPublic } from '../auth';
import { UrlShortenerService } from './url-shortener.service';
import { UrlDto } from './dto';

@ApiTags('URL Shortener')
@Controller('/url-shortener')
export class UrlShortenerController {
  constructor(
    @Inject(UrlShortenerService)
    private readonly service: UrlShortenerService,
  ) {}

  @Get('/go/:key')
  @IsPublic()
  @ApiResponse({ status: 200, description: 'Redirect to the valid URL' })
  @ApiResponse({ status: 400, description: 'Key not found' })
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

  @Get('/urls')
  @ApiBearerAuth()
  @ApiResponse({ type: UrlDto, isArray: true })
  async list(): Promise<UrlDto[]> {
    const urls = await this.service.list();
    return urls.map(UrlDto.fromEntity);
  }

  @Put('/urls')
  @ApiBearerAuth()
  @ApiBody({ type: UrlDto })
  @ApiOperation({ description: 'Creates an url' })
  @ApiResponse({ type: UrlDto, isArray: false })
  async create(@Body() dto: UrlDto): Promise<UrlDto> {
    const entity = await this.service.create(dto.toCreate());
    return UrlDto.fromEntity(entity);
  }

  @Delete('/urls/:id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete an url' })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  async delete(@Param('id') id: number, @Res() res: Response): Promise<void> {
    await this.service.delete(id);
    res.send(HttpStatus.ACCEPTED).end();
  }

  @Post('/urls/:id')
  @ApiBearerAuth()
  @ApiBody({ type: UrlDto, isArray: false })
  @ApiResponse({ status: 200, description: 'Update an url', type: UrlDto, isArray: false })
  async update(@Param('id') id: number, @Body() dto: UrlDto): Promise<UrlDto> {
    dto.id = id;
    const entity = await this.service.upsert(dto);
    return UrlDto.fromEntity(entity);
  }
}
