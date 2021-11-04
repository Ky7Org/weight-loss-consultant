/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { APPLIED_MANAGEMENT_SERVICE_NAME, APPLIED_MANAGEMENT_SERVICE_PORT, HOST } from '../../../constant';
import { ENV_FILE_PATH } from './app/constants/env-file-path';
import { AppModule } from './app/modules/app.module';
import { KAFKA_BROKER_ENDPOINT_1 } from '../../common/kafka-utils';
import { v4 as uuid } from 'uuid';

async function bootstrap() {
  const settings = dotenv.parse(fs.readFileSync(ENV_FILE_PATH));
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule.forRoot(settings), {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [KAFKA_BROKER_ENDPOINT_1],
      },
      consumer: {
        groupId: `user.${uuid()}`,
      },
    },
  });
  await app.listen();
  Logger.log(`Microservice ${APPLIED_MANAGEMENT_SERVICE_NAME} is listening on http://${HOST}:${APPLIED_MANAGEMENT_SERVICE_PORT}`);
}

void bootstrap();
