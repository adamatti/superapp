import { Controller, Get } from '@nestjs/common';
import { ApiProduces } from '@nestjs/swagger';
import { IsPublic } from '../auth';

@Controller()
export class HealthcheckController {
  @Get('/healthcheck')
  @IsPublic()
  @ApiProduces('application/json')
  healthcheck() {
    return {
      status: 'ok',
      date: new Date(),
    };
  }
}
