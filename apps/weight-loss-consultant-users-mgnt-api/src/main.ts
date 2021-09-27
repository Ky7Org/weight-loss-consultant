/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

import {AppModule} from './app/modules/app.module';
import * as dotenv from "dotenv";
import * as fs from "fs";

async function bootstrap() {
  const settings = dotenv.parse(fs.readFileSync("./apps/weight-loss-consultant-authentication/src/.env"));
  const app = await NestFactory.create(AppModule.forRoot(settings));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 8081;
  const config = new DocumentBuilder()
    .setTitle('Loss weigth consultant')
    .setDescription('The user management API description')
    .setVersion('1.0')
    .addTag('Admin')
    .addTag('Trainer')
    .addTag('Customer')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
