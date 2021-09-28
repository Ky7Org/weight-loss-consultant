/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from "./app/modules/app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  const config = new DocumentBuilder()
    .setTitle('Weight Loss Consultant')
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
    Logger.log('Listening at http://localhost:' + port + '/');
  });
}

bootstrap();
