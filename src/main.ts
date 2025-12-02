import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app
    .useGlobalPipes
    // new ValidationPipe({
    //   whitelist: true,
    //   forbidNonWhitelisted: true,
    //   transform: true,
    //   disableErrorMessages: false,
    // }),
    ();
  console.log('DATABASE_URL:', process.env.DATABASE_URL);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
