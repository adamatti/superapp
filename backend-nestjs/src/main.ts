import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { GlobalGuard } from './auth';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

const createSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Superapp')
    .setDescription('Multiple apps here')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.use(cookieParser('batata'));
  app.setGlobalPrefix('api', { exclude: ['healthcheck'] });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const guard = await app.resolve(GlobalGuard);
  app.useGlobalGuards(guard);

  createSwagger(app);

  const configService = await app.resolve(ConfigService);
  await app.listen(configService.get<number>('web.port'), '0.0.0.0');
}
bootstrap();
