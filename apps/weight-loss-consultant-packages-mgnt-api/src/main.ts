/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/modules/app.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ENV_FILE_PATH } from './app/constants/env-file-path';
import { CampaignModule } from './app/modules/campaign.module';
import { PackageModule } from './app/modules/package.module';

async function bootstrap() {
  const settings = dotenv.parse(fs.readFileSync(ENV_FILE_PATH));
  const app = await NestFactory.create(AppModule.forRoot(settings));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 5001;
  const config = new DocumentBuilder()
    .setTitle('Loss weight consultant')
    .setDescription('The packages management API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config,
    { include:[ CampaignModule, PackageModule] });
  SwaggerModule.setup('swagger-ui', app, document);
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
