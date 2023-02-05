import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { GlobalGuard } from './auth';

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
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const guard = await app.resolve(GlobalGuard);
  app.useGlobalGuards(guard);

  createSwagger(app);
  // FIXME get it from a config
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
