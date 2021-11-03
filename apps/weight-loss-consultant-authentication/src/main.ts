/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/modules/app.module';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { ENV_FILE_PATH } from './constant';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_SERVICE_NAME, AUTHENTICATION_SERVICE_PORT, HOST } from '../../../constant';
import * as admin from 'firebase-admin';
import {KAFKA_BROKER_ENDPOINT_1, KAFKA_CLIENT_ID, KAFKA_CONSUMER_GROUP_ID} from "../../common/kafka-utils";
import {v4 as uuid} from 'uuid';

async function bootstrap() {
  const settings = dotenv.parse(fs.readFileSync(ENV_FILE_PATH));
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule.forRoot(settings),
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

  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: settings.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: settings.FIREBASE_CLIENT_EMAIL,
      projectId: settings.FIREBASE_PROJECT_ID,
    } as Partial<admin.ServiceAccount>),
  })

  await app.listen();
  Logger.log(`Microservice ${AUTHENTICATION_SERVICE_NAME} is listening on http://${HOST}/${AUTHENTICATION_SERVICE_PORT}`);
}
export default admin;
bootstrap();
