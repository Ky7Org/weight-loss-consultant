/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/modules/app.module';
import * as fs from 'fs';
import * as dotenv from 'dotenv';


async function bootstrap() {
  const settings = dotenv.parse(fs.readFileSync("./apps/weight-loss-consultant-authentication/src/.env"));
  console.log(settings)
  const app = await NestFactory.create(AppModule.forRoot(settings));
  const globalPrefix = settings.API_ENDPOINT;
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
