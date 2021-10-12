/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/modules/app.module';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import {MicroserviceOptions} from '@nestjs/microservices';
import {
  AUTHENTICATION_GRPC_SERVICE,
  AUTHENTICATION_GRPC_SERVICE_NAME,
  AUTHENTICATION_GRPC_SERVICE_PORT
} from "../../common/grpc-services.route";
import { ENV_FILE_PATH } from '../../common/constants/env-file-path';

async function bootstrap() {
  const settings = dotenv.parse(fs.readFileSync(ENV_FILE_PATH));
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule.forRoot(settings), AUTHENTICATION_GRPC_SERVICE);
  await app.listen();
  Logger.log(`Microservice ${AUTHENTICATION_GRPC_SERVICE_NAME} is listening on grpc://localhost:${AUTHENTICATION_GRPC_SERVICE_PORT}`);
}

bootstrap();
