/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/modules/app.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {ENV_FILE_PATH} from './app/constants/env-file-path';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {HOST, USERS_MANAGEMENT_SERVICE_NAME, USERS_MANAGEMENT_SERVICE_PORT} from '../../../constant';
import {KAFKA_BROKER_ENDPOINT_1, KAFKA_CONSUMER_GROUP_ID} from "../../common/kafka-utils";
import {v4 as uuid} from 'uuid';

async function bootstrap() {
  const settings = dotenv.parse(fs.readFileSync(ENV_FILE_PATH));
  const app = await NestFactory
    .createMicroservice<MicroserviceOptions>(AppModule.forRoot(settings),
      {
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['bangmaple.tech:9092'],
          },
          consumer: {
            groupId: `user.${uuid()}`,
          },
        },
      },);
  await app.listen();
  Logger.log(`Microservice ${USERS_MANAGEMENT_SERVICE_NAME} is registered on port ${USERS_MANAGEMENT_SERVICE_PORT}`);

}

void bootstrap();
