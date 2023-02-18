import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Post, Put, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UrlShortenerService } from './url-shortener.service';
import { UrlDto } from './dto';

@ApiTags('URL Shortener')
@Controller('/url-shortener')
export class UrlShortenerCrudController {
  constructor(
    @Inject(UrlShortenerService)
    private readonly service: UrlShortenerService,
  ) {}

  @Get('/urls')
  @ApiBearerAuth()
  @ApiResponse({ type: UrlDto, isArray: true })
  async list(@Req() { userId }: any): Promise<UrlDto[]> {
    const urls = await this.service.list(userId);
    return urls.map(UrlDto.fromEntity);
  }

  @Put('/urls')
  @ApiBearerAuth()
  @ApiBody({ type: UrlDto })
  @ApiOperation({ description: 'Creates an url' })
  @ApiResponse({ type: UrlDto, isArray: false })
  async create(@Body() dto: UrlDto, @Req() { userId }: any): Promise<UrlDto> {
    dto.userId = userId;
    const entity = await this.service.create(dto.toCreate());
    return UrlDto.fromEntity(entity);
  }

  @Delete('/urls/:id')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete an url' })
  @ApiResponse({ status: HttpStatus.ACCEPTED })
  async delete(@Param('id') id: number, @Req() { userId }: any, @Res() res: Response): Promise<void> {
    await this.service.delete(userId, id);
    res.send(HttpStatus.ACCEPTED).end();
  }

  @Post('/urls/:id')
  @ApiBearerAuth()
  @ApiBody({ type: UrlDto, isArray: false })
  @ApiResponse({ status: 200, description: 'Update an url', type: UrlDto, isArray: false })
  async update(@Param('id') id: number, @Req() { userId }: any, @Body() dto: UrlDto): Promise<UrlDto> {
    dto.userId = userId;
    dto.id = id;
    const entity = await this.service.upsert(dto);
    return UrlDto.fromEntity(entity);
  }
}
