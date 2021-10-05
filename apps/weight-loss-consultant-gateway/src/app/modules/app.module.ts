import { DynamicModule, Module } from '@nestjs/common';
import {AppController} from "../controllers/app.controller";
import {AppService} from "../services/app.service";
import {ClientsModule, Transport} from "@nestjs/microservices";
import { ConfigModule, ConfigService } from '@nestjs/config';
import {HealthCheckModule} from "./health-check.module";
import {
  AUTHENTICATION_SERVICE_NAME,
  AUTHENTICATION_SERVICE_PORT,
  HEALTH_MANAGEMENT_SERVICE_NAME,
  HEALTH_MANAGEMENT_SERVICE_PORT,
  HOST,
  PACKAGES_MANAGEMENT_SERVICE_NAME,
  PACKAGES_MANAGEMENT_SERVICE_PORT,
  SCHEDULING_SERVICE_NAME, SCHEDULING_SERVICE_PORT,
  USERS_MANAGEMENT_SERVICE_NAME,
  USERS_MANAGEMENT_SERVICE_PORT
} from "../../../../../constant";
import { TrainerModule } from './trainer.module';
import { PackageModule } from './package.module';
import { AdminModule } from './admin.module';
import { CampaignModule } from './campaign.module';
import { CustomerModule } from './customer.module';
import { AuthenticationModule } from './auth.module';
import { AppJwtModule } from '../auth/auth.module';
import { ENV_FILE_PATH } from '../../../../weight-loss-consultant-authentication/src/constant';
import * as Joi from 'joi';

export class AppModule {
  static forRoot(settings): DynamicModule {
    return {
      module: AppModule,
      imports: [
        AppJwtModule,
        TrainerModule,
        PackageModule,
        AdminModule,
        CampaignModule,
        CustomerModule,
        AuthenticationModule,
        HealthCheckModule,
        ClientsModule.register([
          {
            name: AUTHENTICATION_SERVICE_NAME,
            transport: Transport.TCP,
            options: {
              host: HOST,
              port: AUTHENTICATION_SERVICE_PORT,
            }
          },
          {
            name: USERS_MANAGEMENT_SERVICE_NAME,
            transport: Transport.TCP,
            options: {
              host: HOST,
              port: USERS_MANAGEMENT_SERVICE_PORT
            }
          },
          {
            name: PACKAGES_MANAGEMENT_SERVICE_NAME,
            transport: Transport.TCP,
            options: {
              host: HOST,
              port: PACKAGES_MANAGEMENT_SERVICE_PORT,
            }
          },
          {
            name: HEALTH_MANAGEMENT_SERVICE_NAME,
            transport: Transport.TCP,
            options: {
              host: HOST,
              port: HEALTH_MANAGEMENT_SERVICE_PORT,
            }
          },
          {
            name: SCHEDULING_SERVICE_NAME,
            transport: Transport.TCP,
            options: {
              host: HOST,
              port: SCHEDULING_SERVICE_PORT,
            }
          }
        ]),
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ENV_FILE_PATH,
          validationSchema: Joi.object({
            REDIS_HOST: Joi.string().required(),
            REDIS_PORT: Joi.number().required(),
          })
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
      exports: [AppService],
    };
  }
}
