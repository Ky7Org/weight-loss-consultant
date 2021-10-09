/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/modules/app.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {MicroserviceOptions} from '@nestjs/microservices';
import {
  GRPC_SERVICES_HOST,
  USERS_MANAGEMENT_GRPC_SERVICE,
  USERS_MANAGEMENT_GRPC_SERVICE_NAME,
  USERS_MANAGEMENT_GRPC_SERVICE_PORT
} from "../../common/grpc-services.route";
import {ENV_FILE_PATH} from "../../common/constants/env-file-path";

async function bootstrap() {
  const settings = dotenv.parse(fs.readFileSync(ENV_FILE_PATH));
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule.forRoot(settings), USERS_MANAGEMENT_GRPC_SERVICE);
  await app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  Logger.log(`Microservice ${USERS_MANAGEMENT_GRPC_SERVICE_NAME} is listening on`);
  Logger.log(`[ grpc://${GRPC_SERVICES_HOST}:${USERS_MANAGEMENT_GRPC_SERVICE_PORT} ]`);
}

bootstrap();
