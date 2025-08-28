import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que não estão no Dto
      forbidNonWhitelisted: true, // levata erro quando a chave não existe
      transform: true, // tenta transformar os tipos de dados de parametros e dtos
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
